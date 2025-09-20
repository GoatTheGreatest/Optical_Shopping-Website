"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [rows, setRows] = useState(() => {
    try {
      const stored = localStorage.getItem("lenses");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
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
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem("lenses", JSON.stringify(rows));
    } catch (e) {}
  }, [rows]);

  function toggleActive(id) {
    setRows((prev) => {
      const updated = prev.map((r) =>
        r.id === id ? { ...r, active: !r.active } : r
      );
      return updated;
    });
  }

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    brand: "",
    name: "",
    sph: "",
    cyl: "",
    cost: "",
    price: "",
    stock: "",
    opening_balance: "",
    remarks: "",
    active: true,
  });
  const dropdownRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    function onDocClick(e) {
      const dropdown = dropdownRef.current;
      if (!dropdown) {
        setActiveMenuId(null);
        return;
      }
      if (dropdown.contains(e.target)) return;
      const btn = buttonRefs.current[activeMenuId];
      if (btn && btn.contains(e.target)) return;
      setActiveMenuId(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [activeMenuId]);

  const openMenu = (e, id) => {
    e.stopPropagation();
    if (activeMenuId === id) {
      setActiveMenuId(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownWidth = 160;
    const left = Math.max(8, rect.right - dropdownWidth + window.scrollX);
    const top = rect.bottom + 8 + window.scrollY;
    setMenuPos({ top, left });
    setActiveMenuId(id);
    buttonRefs.current[id] = e.currentTarget;
  };

  const handleDelete = (id) => {
    setActiveMenuId(null);
    if (!window.confirm("Delete this lens?")) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEditOpen = (id) => {
    const item = rows.find((r) => r.id === id);
    if (!item) return;
    setEditForm({
      brand: item.brand || "",
      name: item.name || "",
      sph: item.sph || "",
      cyl: item.cyl || "",
      cost: item.cost ?? "",
      price: item.price ?? "",
      stock: item.stock ?? "",
      opening_balance: item.opening_balance ?? "",
      remarks: item.remarks || "",
      active: !!item.active,
    });
    setEditingId(id);
    setActiveMenuId(null);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updated = rows.map((r) =>
      r.id === editingId
        ? {
            ...r,
            brand: editForm.brand,
            name: editForm.name,
            sph: editForm.sph,
            cyl: editForm.cyl,
            cost: Number(editForm.cost),
            price: Number(editForm.price),
            stock: Number(editForm.stock),
            opening_balance: Number(editForm.opening_balance),
            remarks: editForm.remarks,
            active: !!editForm.active,
          }
        : r
    );
    setRows(updated);
    setEditingId(null);
  };

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
                      onClick={(e) => openMenu(e, r.id)}
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

      {activeMenuId && (
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: menuPos.top,
            left: menuPos.left,
            zIndex: 9999,
            width: 160,
          }}
          className="bg-white border rounded-md shadow-md"
        >
          <button
            onClick={() => handleEditOpen(activeMenuId)}
            className="w-full text-left px-3 py-2 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(activeMenuId)}
            className="w-full text-left px-3 py-2 hover:bg-gray-50"
          >
            Delete
          </button>
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 transition-opacity pointer-events-auto">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setEditingId(null)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white border-l shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Lense</h3>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={saveEdit}
              className="space-y-4 overflow-y-auto h-[calc(100%-72px)]"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  name="brand"
                  value={editForm.brand}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sph
                </label>
                <input
                  name="sph"
                  value={editForm.sph}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cyl
                </label>
                <input
                  name="cyl"
                  value={editForm.cyl}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cost
                </label>
                <input
                  name="cost"
                  value={editForm.cost}
                  onChange={handleEditChange}
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  name="stock"
                  value={editForm.stock}
                  onChange={handleEditChange}
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Opening Balance
                </label>
                <input
                  name="opening_balance"
                  value={editForm.opening_balance}
                  onChange={handleEditChange}
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={editForm.remarks}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Toggle
                  checked={!!editForm.active}
                  onChange={(val) =>
                    setEditForm((s) => ({ ...s, active: val }))
                  }
                />
                <span className="text-gray-700">Active</span>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="ml-3 px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
