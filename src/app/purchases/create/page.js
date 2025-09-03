"use client";

import React, { useState, useEffect } from "react";

export default function CreatePurchase() {
  const today = new Date().toISOString().slice(0, 10);
  const [vendor, setVendor] = useState("");
  const [invoice, setInvoice] = useState("");
  const [date, setDate] = useState(today);
  const [branch, setBranch] = useState("Main Branch");
  const [productType, setProductType] = useState("frame");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState("");
  const [items, setItems] = useState([]);

  const [frameOptions, setFrameOptions] = useState([]);
  const [lensOptions, setLensOptions] = useState([]);

  useEffect(() => {
    const storedFrames =
      typeof window !== "undefined" && localStorage.getItem("frames");
    const storedLenses =
      typeof window !== "undefined" && localStorage.getItem("lenses");
    if (storedFrames) setFrameOptions(JSON.parse(storedFrames));
    else
      setFrameOptions([
        { id: "F1", label: "Frame A" },
        { id: "F2", label: "Frame B" },
        { id: "F3", label: "Frame C" },
      ]);
    if (storedLenses) setLensOptions(JSON.parse(storedLenses));
    else
      setLensOptions([
        { id: "L1", label: "Lens X" },
        { id: "L2", label: "Lens Y" },
        { id: "L3", label: "Lens Z" },
      ]);
  }, []);

  function saveFrames(list) {
    setFrameOptions(list);
    localStorage.setItem("frames", JSON.stringify(list));
  }
  function saveLenses(list) {
    setLensOptions(list);
    localStorage.setItem("lenses", JSON.stringify(list));
  }

  function addNewFrame() {
    const name = prompt("New frame name");
    if (!name || !name.trim()) return;
    const id = "F" + Date.now();
    const next = [...frameOptions, { id, label: name.trim() }];
    saveFrames(next);
    setProduct(id);
    setProductType("frame");
  }

  function addNewLens() {
    const name = prompt("New lens name");
    if (!name || !name.trim()) return;
    const id = "L" + Date.now();
    const next = [...lensOptions, { id, label: name.trim() }];
    saveLenses(next);
    setProduct(id);
    setProductType("lens");
  }

  function genBarcode() {
    return String(Math.floor(100000000000 + Math.random() * 899999999999));
  }

  function addItem(e) {
    e.preventDefault();
    if (!product || !quantity || !cost) return;
    const name =
      productType === "frame"
        ? (frameOptions.find((f) => f.id === product) || { label: product })
            .label
        : (lensOptions.find((l) => l.id === product) || { label: product })
            .label;
    const newItem = {
      id: Date.now(),
      item: name,
      name,
      branch,
      quantity: Number(quantity),
      barcode: genBarcode(),
      cost: Number(cost),
      total: Number(cost) * Number(quantity),
    };
    setItems((s) => [...s, newItem]);
    setProduct("");
    setQuantity(1);
    setCost("");
  }

  function formatCurrency(v) {
    const n = Number(v);
    if (Number.isNaN(n)) return v;
    return n.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-center text-lg font-semibold mb-6">
        Create Purchase
      </h2>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Vendor</label>
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="">Select vendor</option>
              <option value="salman">salman</option>
              <option value="vendor2">vendor2</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Invoice Number</label>
            <input
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              placeholder="Vendor Invoice Number"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            >
              <option>Main Branch</option>
              <option>Branch B</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="text-sm font-medium block mb-2">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setProductType("frame");
                  setProduct("");
                }}
                className={`px-3 py-2 rounded ${
                  productType === "frame"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                Frame
              </button>
              <button
                type="button"
                onClick={() => {
                  setProductType("lens");
                  setProduct("");
                }}
                className={`px-3 py-2 rounded ${
                  productType === "lens"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                Lens
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Item</label>
            <div className="mt-1 flex items-center gap-2">
              {productType === "frame" ? (
                <>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  >
                    <option value="">Select Frame</option>
                    {frameOptions.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addNewFrame}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </>
              ) : (
                <>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  >
                    <option value="">Select Lens</option>
                    {lensOptions.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addNewLens}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-sm font-medium">Cost</label>
            <div className="mt-1 flex">
              <span className="inline-flex items-center px-3 border border-r-0 bg-gray-50 rounded-l">
                $
              </span>
              <input
                type="number"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full p-2 border rounded-r"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center">
            <button
              onClick={addItem}
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6">
        <div className="bg-white rounded border">
          <div className="p-4 border-b">
            <h3 className="text-sm font-medium">Items</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-xs text-gray-500">Item</th>
                  <th className="p-3 text-left text-xs text-gray-500">Name</th>
                  <th className="p-3 text-left text-xs text-gray-500">
                    Branch
                  </th>
                  <th className="p-3 text-left text-xs text-gray-500">
                    Quantity
                  </th>
                  <th className="p-3 text-left text-xs text-gray-500">
                    Barcode
                  </th>
                  <th className="p-3 text-left text-xs text-gray-500">Cost</th>
                  <th className="p-3 text-left text-xs text-gray-500">Total</th>
                  <th className="p-3 text-right text-xs text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-gray-400">
                      No data
                    </td>
                  </tr>
                ) : (
                  items.map((it) => (
                    <tr key={it.id} className="border-t">
                      <td className="p-3">{it.item}</td>
                      <td className="p-3">{it.name}</td>
                      <td className="p-3">{it.branch}</td>
                      <td className="p-3">{it.quantity}</td>
                      <td className="p-3">{it.barcode}</td>
                      <td className="p-3">{formatCurrency(it.cost)}</td>
                      <td className="p-3">{formatCurrency(it.total)}</td>
                      <td className="p-3 text-right">
                        <button className="px-2 py-1 border rounded text-sm">
                          ...
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t flex items-center justify-end gap-3">
            <div className="text-sm text-gray-600">
              Showing 1 - {items.length}
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 border rounded text-gray-600">
                ‹
              </button>
              <button className="px-2 py-1 border rounded text-gray-600">
                1
              </button>
              <button className="px-2 py-1 border rounded text-gray-600">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
