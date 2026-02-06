"use client";
import { useState } from "react";
const data: Record<string, string[]> = {
  "Andhra Pradesh": ["Vijayawada", "Guntur", "Visakhapatnam"],
  Telangana: ["Hyderabad", "Warangal", "Khammam"],
  Karnataka: ["Bengaluru", "Mysore", "Mangalore"],
};



export default function NestedDropdown() {
  const [open, setOpen] = useState(false);
  const [activeState, setActiveState] = useState<string | null>(null);

  return (
    <div className="relative inline-block">
      {/* Main Dropdown Button */}
      <button
        className="border px-4 py-2 rounded bg-white shadow"
        onClick={() => setOpen(!open)}
      >
        Select State
      </button>

      {/* MAIN DROPDOWN */}
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow z-50">
          {Object.keys(data).map((state) => (
            <div
              key={state}
              className="px-3 py-2 hover:bg-gray-100 relative"
              onMouseEnter={() => setActiveState(state)}
              onMouseLeave={() => setActiveState(null)}
            >
              {state}

              {/* SUBMENU (CITIES) */}
              {activeState === state && (
                <div className="absolute top-0 left-full ml-2 w-48 bg-white border rounded shadow z-50">
                  {data[state].map((city) => (
                    <div
                      key={city}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
