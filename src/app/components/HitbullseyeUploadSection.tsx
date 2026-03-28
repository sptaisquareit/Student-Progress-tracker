"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FileUpload from "./common/FileUpload";
import { processHitbullseyeFile } from "@/utils/processHitbullseye";
import HitbullseyeTable from "./HitbullseyeTable";
import { HitbullseyeStudent } from "@/types/Student";

interface Props {
  department: string;
}

export default function HitbullseyeUploadSection({ department }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [rollCallFile, setRollCallFile] = useState<File | null>(null);
  const [finalList, setFinalList] = useState<HitbullseyeStudent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const rollKey = `hitbulls_roll_${department}`;

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
    const ws = XLSX.utils.json_to_sheet(finalList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Result");
    XLSX.writeFile(wb, "Hitbullseye_Result.xlsx");
  };

  const processFile = async () => {
    if (!file) return;
    if (!rollCallFile) return;

    setIsProcessing(true);

    try {
      const data = await processHitbullseyeFile(file, rollCallFile);
      setFinalList(data);
    } catch (error) {
      console.error(error);
      alert("Error while processing file");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Hitbullseye Processing</h2>

      <div className="grid sm:grid-cols-2 gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <FileUpload label="Hitbullseye File" file={file} onChange={setFile} />
        <FileUpload
          label="HitbullseyeID & RollCall"
          file={rollCallFile}
          onChange={setRollCallFile}
          cacheKey={rollKey}
        />
      </div>

      <button
        disabled={!file || !rollCallFile || isProcessing}
        onClick={processFile}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Process File"}
      </button>

      {finalList.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between mb-3">
            <h3 className="text-lg font-semibold">Processed Data</h3>
            <button
              onClick={downloadExcel}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Download Excel
            </button>
          </div>
          <HitbullseyeTable students={finalList} />
        </div>
      )}
    </section>
  );
}
