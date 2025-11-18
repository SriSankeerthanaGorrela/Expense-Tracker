"use client";

import React from "react";
import { Download, FileText } from "lucide-react";

function ExportButtons() {
  return (
    <div className="flex gap-3">
      <button className="btn-secondary flex items-center gap-2">
        <FileText className="w-4 h-4" /> Export PDF
      </button>

      <button className="btn-secondary flex items-center gap-2">
        <Download className="w-4 h-4" /> Export CSV
      </button>
    </div>
  );
}

export default ExportButtons;
