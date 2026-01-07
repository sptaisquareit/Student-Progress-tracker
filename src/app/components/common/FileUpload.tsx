"use client";

import React from "react";

interface FileUploadProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  cacheKey?: string;
}

export default function FileUpload({
  label,
  file,
  onChange,
  accept = ".xlsx",
  cacheKey
}: FileUploadProps) {

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    onChange(selected);

    if (cacheKey && selected) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(cacheKey, reader.result as string);
        localStorage.setItem(cacheKey + "_name", selected.name);
      };
      reader.readAsDataURL(selected);
    }
  };

  const clearFile = () => {
    onChange(null);
    if (cacheKey) {
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(cacheKey + "_name");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium">{label}:</span>

      {!file ? (
        <label className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition w-fit">
          Choose File
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-green-700 dark:text-green-400 font-medium">
            {file.name}
          </span>
          <button
            onClick={clearFile}
            className="text-red-600 dark:text-red-400 font-bold text-lg hover:text-red-800 dark:hover:text-red-300"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
}
