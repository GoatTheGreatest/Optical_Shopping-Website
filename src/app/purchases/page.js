"use client";

import React, { useState } from "react";
import { RefreshCw, Plus, MoreVertical } from "lucide-react";
import Link from "next/link";

function formatCurrency(v) {
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export default function PurchaseList() {
  const [rows] = useState([
    {
      id: 1,
      vendor: "salman",
      invoice: "776",
      date: "2025-08-14",
      items: 1,
      total: 4000,
    },
  ]);

  const [expanded, setExpanded] = useState({});

  function toggleExpand(id) {
    setExpanded((s) => ({ ...s, [id]: !s[id] }));
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Purchase List</h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 bg-white border rounded shadow-sm text-sm hover:bg-gray-50"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M22 3H2l8 9v5l4 2v-7l8-9z" />
            </svg>
            <span>Filter</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 bg-white border rounded shadow-sm text-sm hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>

          <Link
            href="/purchases/create"
            className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded shadow-sm text-sm hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Purchase</span>
          </Link>
        </div>
      </div>

      <div className="w-full bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Invoice Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                  Total
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {rows.map((r) => (
                <React.Fragment key={r.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleExpand(r.id)}
                        className="w-8 h-8 inline-flex items-center justify-center border rounded-full text-sm"
                        aria-label="expand"
                        type="button"
                      >
                        {expanded[r.id] ? "−" : "+"}
                      </button>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {r.vendor}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {r.invoice}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-3 py-1 text-xs bg-gray-100 rounded">
                        {r.date}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {r.items}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700">
                      {formatCurrency(r.total)}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <button
                        className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        aria-label="actions"
                        type="button"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>

                  {expanded[r.id] && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          Detailed items would appear here. Invoice{" "}
                          <strong>{r.invoice}</strong> — total{" "}
                          <strong>{formatCurrency(r.total)}</strong>.
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-end">
          <div className="text-xs text-gray-500 mr-3">
            Showing 1 - {rows.length}
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-50">
              ‹
            </button>
            <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-50">
              1
            </button>
            <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-50">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
