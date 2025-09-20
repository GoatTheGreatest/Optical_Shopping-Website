"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { RefreshCw, Plus } from "lucide-react";
import Link from "next/link";

const rows = [
  { id: 1, brand: "hjj", type: "Lens", remarks: "", active: true },
  { id: 2, brand: "gucci", type: "Lens", remarks: "yu", active: true },
  { id: 3, brand: "gucci", type: "Frame", remarks: "", active: true },
  { id: 4, brand: "promax", type: "Lens", remarks: "", active: true },
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
        onChange={(e) => onChange && onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300 transition-colors" />
      <div
        className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </label>
  );
}

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    brand: "",
    type: "Lens",
    remarks: "",
    active: true,
  });
  const dropdownRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const stored = localStorage.getItem("brands");
    if (stored) setBrands(JSON.parse(stored));
    else {
      localStorage.setItem("brands", JSON.stringify(rows));
      setBrands(rows);
    }
  }, []);

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
    const dropdownWidth = 144;
    const left = Math.max(8, rect.right - dropdownWidth + window.scrollX);
    const top = rect.bottom + 8 + window.scrollY;
    setMenuPos({ top, left });
    setActiveMenuId(id);
    buttonRefs.current[id] = e.currentTarget;
  };

  const handleDelete = (id) => {
    setActiveMenuId(null);
    if (!window.confirm("Delete this brand?")) return;
    const updated = brands.filter((b) => b.id !== id);
    setBrands(updated);
    localStorage.setItem("brands", JSON.stringify(updated));
  };

  const handleEditOpen = (id) => {
    const item = brands.find((b) => b.id === id);
    if (!item) return;
    setEditForm({
      brand: item.brand,
      type: item.type,
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
    const updated = brands.map((b) =>
      b.id === editingId
        ? {
            ...b,
            brand: editForm.brand,
            type: editForm.type,
            remarks: editForm.remarks,
            active: !!editForm.active,
          }
        : b
    );
    setBrands(updated);
    localStorage.setItem("brands", JSON.stringify(updated));
    setEditingId(null);
  };

  return (
    <div className="mt-5">
      <div className="heading w-full flex justify-between">
        <div className="title ml-2 text-lg font-bold w-70%">Brands List</div>
        <div className="buttons mr-2 grid grid-cols-2 gap-3">
          <button className="p-2 flex items-center justify-center space-x-4 bg-white bg-opacity-10 backdrop-blur-md border-1 border-gray-500 rounded-sm hover:-translate-0.5 duration-300">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
          <Link href="/brands/create">
            <button className="p-2 hover:-translate-0.5 duration-300 flex items-center justify-center bg-[#22C55E] space-x-4 border-1 border-gray-500 rounded-sm text-white">
              <Plus className="w-5 h-5" />
              <span>Add New Brand</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-700">Brands</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-100">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Type
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
              {brands.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 whitespace-nowrap text-gray-600">
                    {r.brand}
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">
                    <Badge>{r.type}</Badge>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap text-gray-500">
                    {r.remarks || ""}
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Toggle
                        checked={!!r.active}
                        onChange={(val) => {
                          const updated = brands.map((b) =>
                            b.id === r.id ? { ...b, active: val } : b
                          );
                          setBrands(updated);
                          localStorage.setItem(
                            "brands",
                            JSON.stringify(updated)
                          );
                        }}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap text-right">
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
            Showing 1 - {brands.length}
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
            width: 144,
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
        <div className={`fixed inset-0 transition-opacity pointer-events-auto`}>
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setEditingId(null)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white border-l shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Brand</h3>
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
                  Brand Name
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
                  Brand Type
                </label>
                <select
                  name="type"
                  value={editForm.type}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                >
                  <option value="Lens">Lens</option>
                  <option value="Frame">Frames</option>
                </select>
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
