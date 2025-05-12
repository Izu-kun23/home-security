import React from "react";

const DashCards = ({ title, value, percentage, icon: Icon, color, bgColor }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
      {/* Icon wrapper */}
      <div className={`flex items-center justify-center w-12 h-12 ${bgColor} rounded-xl`}>
        {Icon && <Icon className={`text-xl ${color}`} />}
      </div>

      {/* Title, Value & Percentage */}
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500">{title}</span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm">{value}</h4>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-sm ${bgColor} ${color}`}
        >
          {/* Up arrow icon */}
          <svg className="fill-current" width="1em" height="1em" viewBox="0 0 13 12" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.06462 1.62393C6.20193 1.47072 6.40135 1.37432 6.62329 1.37432C6.81631 1.37415 7.00845 1.44731 7.15505 1.5938L10.1551 4.5918C10.4481 4.88459 10.4483 5.35946 10.1555 5.65246C9.86273 5.94546 9.38785 5.94562 9.09486 5.65283L7.37329 3.93247V10.125C7.37329 10.5392 7.03751 10.875 6.62329 10.875C6.20908 10.875 5.87329 10.5392 5.87329 10.125V3.93578L4.15516 5.65281C3.86218 5.94561 3.3873 5.94546 3.0945 5.65248C2.8017 5.35949 2.80185 4.88462 3.09484 4.59182L6.06462 1.62393Z"
              fill="currentColor"
            />
          </svg>
          {percentage}
        </span>
      </div>
    </div>
  );
};

export default DashCards;