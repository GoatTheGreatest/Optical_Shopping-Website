"use client";

import React, { useState } from "react";
import { RefreshCw, Plus, MoreVertical, Check } from "lucide-react";
import Link from "next/link";

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        className="sr-only peer"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 transition-colors" />
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-6 transition-transform flex items-center justify-center">
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
    </label>
  );
}

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export default function Lenses() {
  const [rows, setRows] = useState([
    {
      id: 1,
      brand: "promax",
      name: "prime",
      sph: "0.50",
      cyl: "0.50",
      cost: 1000,
      price: 2500,
      stock: 12,
      opening_balance: 12,
      remarks: "jh",
      active: true,
    },
  ]);

  function toggleActive(id) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  }

  return (
    <div className="mt-5">
      <div className="heading w-full flex justify-between">
        <div className="title ml-2 text-lg font-bold w-70%">Lenses List</div>
        <div className="buttons mr-2 grid grid-cols-2 gap-3">
          <button className="p-2 flex items-center justify-center space-x-4 bg-white bg-opacity-10 backdrop-blur-md border-1 border-gray-500 rounded-sm hover:-translate-0.5 duration-300">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
          <Link href="/lenses/create">
            <button className="p-2 hover:-translate-0.5 duration-300 flex items-center justify-center bg-[#22C55E] space-x-4 border-1 border-gray-500 rounded-sm text-white">
              <Plus className="w-5 h-5" />
              <span>Add New Lense</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden mt-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-700">Lenses</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-100">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sph
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cyl
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opening Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {r.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {r.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {r.sph}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {r.cyl}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {formatPrice(r.cost)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {formatPrice(r.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {r.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {r.opening_balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {r.remarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-start">
                      <Toggle
                        checked={r.active}
                        onChange={() => toggleActive(r.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      type="button"
                      className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      aria-label="actions"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
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
