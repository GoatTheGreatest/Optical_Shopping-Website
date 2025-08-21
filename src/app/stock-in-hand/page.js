"use client";

import React, { useMemo, useState } from "react";
import { Inbox, Search } from "lucide-react";

function Select({ label, value, onChange, options, placeholder }) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm text-gray-600">{label}</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function StockInHandPage() {
  const [brand, setBrand] = useState("");
  const [frame, setFrame] = useState("");
  const [results, setResults] = useState([]);

  const totalStock = useMemo(
    () => results.reduce((sum, r) => sum + (Number(r.stock) || 0), 0),
    [results]
  );

  function handleSearch(e) {
    e.preventDefault();
    // Placeholder: integrate data fetching here
    setResults([]);
  }

  const brandOptions = [
    { value: "gucci", label: "Gucci" },
    { value: "rayban", label: "Ray-Ban" },
  ];
  const frameOptions = [
    { value: "fullrim", label: "Full Rim" },
    { value: "halfrim", label: "Half Rim" },
  ];

  return (
    <div className="mt-5">
      <h1 className="text-center text-2xl font-bold">Stock On Hand</h1>

      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
      >
        <Select
          label="Brand"
          value={brand}
          onChange={setBrand}
          options={brandOptions}
          placeholder="Brand"
        />
        <Select
          label="Frame"
          value={frame}
          onChange={setFrame}
          options={frameOptions}
          placeholder="Frame"
        />
        <div className="md:col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-[#22C55E] text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </form>

      <div className="mt-6 w-full bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-100">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {results.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="w-10 h-10" />
                      <span>No data</span>
                    </div>
                  </td>
                </tr>
              ) : (
                results.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 whitespace-nowrap text-gray-600">{idx + 1}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-gray-600">{r.name}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-gray-600">{r.item}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-gray-600">{r.branch}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-gray-600">{r.stock}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-100">
          <div className="w-full grid grid-cols-2">
            <div className="px-6 text-sm font-medium text-gray-700">Total</div>
            <div className="px-6 text-right text-sm font-semibold text-gray-700">{totalStock}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


