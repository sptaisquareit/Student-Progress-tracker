"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FileUpload from "./common/FileUpload";
import { processGFGFiles } from "@/utils/processGFG";
import { Student } from "@/types/Student";
import StudentTable from "./StudentTable";

interface Props {
  department: string;
}

export default function GFGUploadSection({ department }: Props) {
  const [javaFile, setJavaFile] = useState<File | null>(null);
  const [cppFile, setCppFile] = useState<File | null>(null);
  const [rollCallFile, setRollCallFile] = useState<File | null>(null);
  const [finalList, setFinalList] = useState<Student[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const rollKey = `gfg_roll_${department}`;

  /** Load cached rollcall from localStorage */
  useEffect(() => {
    const cachedData = localStorage.getItem(rollKey);
    const cachedName = localStorage.getItem(rollKey + "_name");

    if (!cachedData || !cachedName) return;

    const arr = cachedData.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream";
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);

    setRollCallFile(new File([u8arr], cachedName, { type: mime }));
  }, [rollKey]);

  const downloadExcel = () => {
    if (!finalList.length) return;
    const ws = XLSX.utils.json_to_sheet(finalList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GFG_Result");
    XLSX.writeFile(wb, "GFG_Final.xlsx");
  };

  const processFiles = async () => {
    if (!javaFile || !cppFile || !rollCallFile) return;

    setIsProcessing(true);

    try {
      const result = await processGFGFiles(javaFile, cppFile, rollCallFile);
      setFinalList(result);
    } catch (e) {
      console.error(e);
      alert("Processing error. Check console.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">GFG Processing</h2>

      <div className="grid sm:grid-cols-3 gap-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <FileUpload label="Java File" file={javaFile} onChange={setJavaFile} />
        <FileUpload label="C++ File" file={cppFile} onChange={setCppFile} />
        <FileUpload
          label="Roll Call File"
          file={rollCallFile}
          onChange={setRollCallFile}
          cacheKey={rollKey}
        />
      </div>

      <button
        disabled={!javaFile || !cppFile || !rollCallFile || isProcessing}
        onClick={processFiles}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Process GFG Data"}
      </button>

      {finalList.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between mb-3">
            <h3 className="text-lg font-semibold">Processed Student List</h3>
            <button
              onClick={downloadExcel}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Download Excel
            </button>
          </div>
          <StudentTable data={finalList} />
        </div>
      )}
    </section>
  );
}
