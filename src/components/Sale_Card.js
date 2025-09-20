import React from "react";

function Sale_Card({ heading, num, results = [] }) {
  const currentYear = new Date().getFullYear();
  const isFourCol = num == 2;
  const headers = isFourCol
    ? ["Customer", "Date", "Items", "Cost"]
    : [
        "Refrence",
        "Customer",
        "Order Type",
        "Order Date",
        "Delivery Date",
        "Total",
      ];

  return (
    <div className="mt-6 w-full bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-green-800 text-sm">Total {heading}</h1>
        <input
          type="number"
          defaultValue={currentYear}
          className="w-24 text-sm border border-gray-200 rounded px-2 py-1"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-100">
          <thead className="bg-white">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {results.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-16 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-10 h-10"
                    >
                      <rect
                        x="2"
                        y="4"
                        width="20"
                        height="14"
                        rx="2"
                        stroke="#E5E7EB"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 9h8"
                        stroke="#D1D5DB"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 13h5"
                        stroke="#D1D5DB"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>No data</span>
                  </div>
                </td>
              </tr>
            ) : (
              results.map((r, idx) => (
                <tr key={r.id ?? idx} className="hover:bg-gray-50">
                  {headers.map((h, i) => {
                    let value = "";
                    if (isFourCol) {
                      if (h === "Customer") value = r.customer ?? r.name ?? "-";
                      if (h === "Date") value = r.date ?? "-";
                      if (h === "Items") value = r.items ?? r.item ?? "-";
                      if (h === "Cost") value = r.cost ?? r.total ?? "-";
                    } else {
                      if (h === "Refrence")
                        value = r.reference ?? r.ref ?? idx + 1;
                      if (h === "Customer") value = r.customer ?? r.name ?? "-";
                      if (h === "Order Type")
                        value = r.orderType ?? r.type ?? "-";
                      if (h === "Order Date")
                        value = r.orderDate ?? r.date ?? "-";
                      if (h === "Delivery Date")
                        value = r.deliveryDate ?? r.delivery ?? "-";
                      if (h === "Total") value = r.total ?? r.amount ?? "-";
                    }
                    return (
                      <td
                        key={i}
                        className="px-6 py-3 whitespace-nowrap text-gray-600"
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sale_Card;
