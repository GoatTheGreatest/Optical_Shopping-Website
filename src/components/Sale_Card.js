import React from "react";

function Sale_Card({ heading, num }) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-1 border-gray-200 shadow mx-4 h-full max-md:mx-1">
      <div className="heading flex items-center justify-between my-4 max-md:my-2 max-sm:my-1">
        <h1 className="font-bold text-green-800 text-sm">Total {heading}</h1>
        <input
          type="number"
          defaultValue={currentYear}
          className="w-24 text-sm border-1 border-gray-400 rounded-[3.5] mr-3"
        />
      </div>
      <div className="Data">
        {num == 2 ? (
          <div className="grid grid-cols-4 p-6 gap-2 text-center">
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Customer
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">Date</h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">Items</h3>
            <h3 className="shadow text-sm">Cost</h3>
          </div>
        ) : (
          <div className="grid grid-cols-6 p-4 gap-2 text-center">
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Refrence
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Customer
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Order Type
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Order Date
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Delivery Date
            </h3>
            <h3 className="shadow text-sm">Total</h3>
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-gray-500 w-full py-6">
          <svg
            width="160"
            height="100"
            viewBox="0 0 160 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="mb-3"
          >
            <rect
              x="4"
              y="4"
              width="152"
              height="92"
              rx="10"
              stroke="#D1D5DB"
              strokeWidth="2"
              fill="#FFFFFF"
            />
            <g transform="translate(36,18)">
              <rect
                x="0"
                y="0"
                width="88"
                height="48"
                rx="6"
                fill="#EFFCF6"
                stroke="#34D399"
                strokeWidth="1.5"
              />
              <path
                d="M14 30c4-6 18-6 22 0"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M10 18h68"
                stroke="#34D399"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="12" r="6" fill="#34D399" opacity="0.15" />
              <circle cx="36" cy="12" r="6" fill="#34D399" opacity="0.15" />
              <circle cx="56" cy="12" r="6" fill="#34D399" opacity="0.15" />
            </g>
            <text
              x="80"
              y="78"
              textAnchor="middle"
              fontSize="14"
              fill="#6B7280"
              fontFamily="sans-serif"
            >
              No Data
            </text>
          </svg>
          <div className="text-center">
            <h1 className="text-sm font-medium text-gray-500">No Data</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale_Card;
