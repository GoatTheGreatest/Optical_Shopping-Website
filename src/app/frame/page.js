"use client";
import React, { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { RefreshCw, Plus } from "lucide-react";
import Link from "next/link";

const initialRows = [
  {
    id: 1,
    brand: "hjj",
    model: "H-100",
    size: "54",
    color: "Black",
    cost: "1200",
    price: "1500",
    barcode: "000111222333",
    stock: 24,
    openingBalance: 24,
    remarks: "",
    active: true,
  },
  {
    id: 2,
    brand: "gucci",
    model: "G-200",
    size: "52",
    color: "Brown",
    cost: "2200",
    price: "2800",
    barcode: "000111222334",
    stock: 12,
    openingBalance: 12,
    remarks: "yu",
    active: true,
  },
  {
    id: 3,
    brand: "gucci",
    model: "G-300",
    size: "56",
    color: "Clear",
    cost: "1800",
    price: "2300",
    barcode: "000111222335",
    stock: 8,
    openingBalance: 8,
    remarks: "",
    active: true,
  },
  {
    id: 4,
    brand: "promax",
    model: "P-400",
    size: "55",
    color: "Black & Brown",
    cost: "900",
    price: "1200",
    barcode: "000111222336",
    stock: 40,
    openingBalance: 40,
    remarks: "",
    active: true,
  },
];

function Badge({ children }) {
  const color = String(children).toLowerCase() === "frame" ? "pink" : "blue";
  const bg = color === "pink" ? "bg-pink-100" : "bg-blue-50";
  const text = color === "pink" ? "text-pink-600" : "text-blue-600";
  return (
    <span
      className={`${bg} ${text} text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center`}
    >
      {children}
    </span>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        className="sr-only peer"
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300 transition-colors" />
      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform" />
    </label>
  );
}

export default function Frames() {
  const [rows, setRows] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    brand: "",
    model: "",
    size: "",
    color: "",
    cost: "",
    price: "",
    barcode: "",
    stock: "",
    openingBalance: "",
    remarks: "",
    active: true,
  });
  const dropdownRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const stored = localStorage.getItem("frames");
    if (stored) setRows(JSON.parse(stored));
    else {
      localStorage.setItem("frames", JSON.stringify(initialRows));
      setRows(initialRows);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("frames", JSON.stringify(rows));
  }, [rows]);

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

  function toggleActive(id) {
    setRows((prev) => {
      const updated = prev.map((r) =>
        r.id === id ? { ...r, active: !r.active } : r
      );
      localStorage.setItem("frames", JSON.stringify(updated));
      return updated;
    });
  }

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
    if (!window.confirm("Delete this frame?")) return;
    const updated = rows.filter((r) => r.id !== id);
    setRows(updated);
  };

  const handleEditOpen = (id) => {
    const item = rows.find((r) => r.id === id);
    if (!item) return;
    setEditForm({
      brand: item.brand || "",
      model: item.model || "",
      size: item.size || "",
      color: item.color || "",
      cost: item.cost || "",
      price: item.price || "",
      barcode: item.barcode || "",
      stock: item.stock ?? "",
      openingBalance: item.openingBalance ?? "",
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
            model: editForm.model,
            size: editForm.size,
            color: editForm.color,
            cost: editForm.cost,
            price: editForm.price,
            barcode: editForm.barcode,
            stock: Number(editForm.stock),
            openingBalance: Number(editForm.openingBalance),
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
        <div className="title ml-2 text-lg font-bold">Frames List</div>
        <div className="buttons mr-2 grid grid-cols-2 gap-3">
          <button className="p-2 flex items-center justify-center space-x-4 bg-white bg-opacity-10 backdrop-blur-md border-1 border-gray-500 rounded-sm hover:-translate-0.5 duration-300">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
          <Link href="/frame/create">
            <button className="p-2 hover:-translate-0.5 duration-300 flex items-center justify-center bg-[#22C55E] space-x-4 border-1 border-gray-500 rounded-sm text-white">
              <Plus className="w-5 h-5" />
              <span>Add New Frame</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden mt-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-700">Frames</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1200px] text-sm divide-y divide-gray-100">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Brand
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Model
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Color
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Barcode
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Opening Balance
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Remarks
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Active
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.brand}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.model}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.size}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.color}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.cost}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.price}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.barcode}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.stock}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {r.openingBalance}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {r.remarks || ""}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Toggle
                        checked={r.active}
                        onChange={() => toggleActive(r.id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      type="button"
                      className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      aria-label="actions"
                      onClick={(e) => openMenu(e, r.id)}
                    >
                      <MoreVertical className="w-4 h-4" />
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
              <h3 className="text-lg font-semibold">Edit Frame</h3>
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
                  Model
                </label>
                <input
                  name="model"
                  value={editForm.model}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <input
                  name="size"
                  value={editForm.size}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  name="color"
                  value={editForm.color}
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
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Barcode
                </label>
                <input
                  name="barcode"
                  value={editForm.barcode}
                  onChange={handleEditChange}
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
                  name="openingBalance"
                  value={editForm.openingBalance}
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
