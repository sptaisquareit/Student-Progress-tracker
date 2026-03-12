"use client";
import { TestResult } from "@/types/Student";
import { processGFGCodingTestFiles } from "@/utils/processesGFGCodingTest";
import { useState, useEffect } from "react";
import FileUpload from "./common/FileUpload";
import * as XLSX from "xlsx";
import GFGTestTable from "./GFGTestTable";

interface Props {
  department: string;
}
export default function GFGTestUploadSection({ department }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [finalList, setFinalList] = useState<TestResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const downloadExcel = () => {
    if (!finalList.length) return;
    const ws = XLSX.utils.json_to_sheet(finalList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GFG_Test_Record");
    XLSX.writeFile(wb, "GFG_Test_Record.xlsx");
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const data = await processGFGCodingTestFiles(file);
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
      <h2 className="text-2xl font-semibold mb-4">GFG Coding Test Upload</h2>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <FileUpload label="GFG Coding Test" file={file} onChange={setFile} />
      </div>

      <button
        disabled={!file || isProcessing}
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
          <GFGTestTable students={finalList} />
        </div>
      )}
    </section>
  );
}
