// components/ExcelExport.tsx
"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExcelExportProps {
  data: unknown[];
  filename: string;
  sheetName?: string;
  children: React.ReactNode; // button element
  onComplete?: () => void;
}

export default function ExcelExport({
  data,
  filename,
  sheetName = "Sheet1",
  children,
  onComplete,
}: ExcelExportProps) {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${filename}.xlsx`);

    onComplete?.();
  };

  return (
    <span onClick={handleExport} className="cursor-pointer">
      {children}
    </span>
  );
}
