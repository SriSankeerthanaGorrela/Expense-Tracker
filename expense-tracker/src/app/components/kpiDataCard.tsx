// "use client";

// import React, { ReactNode } from "react";

// interface KpiDataCardProps {
//   title: string;
//   value: string | number;
//   change?: string;
//   icon?: ReactNode;          // right-side icon
//   changeIcon?: ReactNode;    // optional dynamic change icon
// }

// const KpiDataCard: React.FC<KpiDataCardProps> = ({
//   title,
//   value,
//   change,
//   icon,
//   changeIcon,
// }) => {
//   return (
//     <div className="bg-gray-50 p-4 shadow-md rounded-xl">
//       <div className="flex items-start justify-between">
        
//         <div className="flex-1">
//           <h3 className="text-gray-500 font-semibold text-sm mb-2">{title}</h3>
//           <p className="text-lg font-semibold text-gray-700 mb-1">{value}</p>

//           {change && (
//             <p className="text-sm font-medium flex items-center text-center gap-3 text-gray-600">
//               {icon && <span className="h-4 w-4 flex items-center justify-center">{icon}</span>}
//               {change}
//             </p>
//           )}
//         </div>

        
//         {icon && <p className="p-3 border rounded-3xl">{icon}</p>}
//       </div>
//     </div>
//   );
// };

// export default KpiDataCard;


"use client";

import React, { ReactNode } from "react";

interface KpiDataCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: ReactNode;          // right-side icon
  changeIcon?: ReactNode;    // optional dynamic change icon
  type?: "positive" | "negative" | "neutral"; // to control color
}

const KpiDataCard: React.FC<KpiDataCardProps> = ({
  title,
  value,
  change,
  icon,
  changeIcon,
  type = "neutral",
}) => {
  // Color logic
  const colorClasses = {
    positive: {
      iconBg: "bg-green-100 text-green-600",
      text: "text-green-600",
    },
    negative: {
      iconBg: "bg-red-100 text-red-600",
      text: "text-red-600",
    },
    neutral: {
      iconBg: "bg-gray-100 text-gray-600",
      text: "text-gray-600",
    },
  }[type];

  return (
    <div className="bg-white p-4 shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        {/* Left content */}
        <div className="flex-1">
          <h3 className="text-gray-500 font-semibold text-sm mb-2">{title}</h3>
          <p className="text-lg font-semibold text-gray-800 mb-1">{value}</p>

          {change && (
            <p className={`text-sm font-medium flex items-center gap-2 ${colorClasses.text}`}>
              {changeIcon && (
                <span className="h-4 w-4 flex items-center justify-center">
                  {changeIcon}
                </span>
              )}
              {change}
            </p>
          )}
        </div>

        {/* Right icon */}
        {icon && (
          <div
            className={`p-3 rounded-2xl ${colorClasses.iconBg} flex items-center justify-center`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiDataCard;
