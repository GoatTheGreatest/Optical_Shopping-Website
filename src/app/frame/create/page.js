"use client";

import React, { useState } from "react";

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        className="sr-only peer"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 transition-colors" />
      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform" />
    </label>
  );
}

export default function BrandForm({ onSave }) {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    size: "",
    color: "",
    cost: "",
    price: "",
    barcode: "",
    branch: "",
    opening_balance: "",
    remarks: "",
    active: true,
  });

  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const requiredFields = [
    "brand",
    "model",
    "size",
    "color",
    "cost",
    "price",
    "barcode",
    "branch",
    "opening_balance",
  ];

  function validate() {
    const errors = {};
    requiredFields.forEach((key) => {
      if (!String(form[key]).trim()) errors[key] = "This field is required";
    });

    // optional: numeric checks
    if (form.size && isNaN(Number(form.size))) errors.size = "Must be a number";
    if (form.cost && isNaN(Number(form.cost))) errors.cost = "Must be a number";
    if (form.price && isNaN(Number(form.price)))
      errors.price = "Must be a number";
    if (
      form.opening_balance &&
      (isNaN(Number(form.opening_balance)) || Number(form.opening_balance) < 0)
    )
      errors.opening_balance = "Must be a non-negative number";

    return errors;
  }

  const errors = validate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(
      requiredFields.reduce((acc, k) => {
        acc[k] = true;
        return acc;
      }, {})
    );

    const errs = validate();
    if (Object.keys(errs).length) return;

    setSaving(true);
    setSavedMessage("");

    // Example: call API or pass to parent
    // For now just simulate save and call onSave if provided
    try {
      const payload = {
        ...form,
        // normalize numeric fields
        size: Number(form.size),
        cost: Number(form.cost),
        price: Number(form.price),
        opening_balance: Number(form.opening_balance),
      };

      // example: await fetch("/api/brands", { method: "POST", body: JSON.stringify(payload) })
      // call parent callback if provided
      if (typeof onSave === "function") onSave(payload);

      // simulate
      await new Promise((r) => setTimeout(r, 500));

      setSavedMessage("Saved successfully");
      // optional: reset form (comment out if you want to keep values)
      // setForm({...});
    } catch (err) {
      setSavedMessage("Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setSavedMessage(""), 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Brand <span className="text-red-500">*</span>
          </label>
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.brand && errors.brand
                ? "border-red-500"
                : "border-gray-200"
            }`}
          />
          {touched.brand && errors.brand && (
            <p className="text-xs text-red-500 mt-1">{errors.brand}</p>
          )}
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Model <span className="text-red-500">*</span>
          </label>
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.model && errors.model
                ? "border-red-500"
                : "border-gray-200"
            }`}
          />
          {touched.model && errors.model && (
            <p className="text-xs text-red-500 mt-1">{errors.model}</p>
          )}
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Size <span className="text-red-500">*</span>
          </label>
          <input
            name="size"
            type="number"
            value={form.size}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.size && errors.size ? "border-red-500" : "border-gray-200"
            }`}
          />
          {touched.size && errors.size && (
            <p className="text-xs text-red-500 mt-1">{errors.size}</p>
          )}
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Color <span className="text-red-500">*</span>
          </label>
          <input
            name="color"
            value={form.color}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.color && errors.color
                ? "border-red-500"
                : "border-gray-200"
            }`}
          />
          {touched.color && errors.color && (
            <p className="text-xs text-red-500 mt-1">{errors.color}</p>
          )}
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">
            Cost <span className="text-red-500">*</span>
          </label>
          <input
            name="cost"
            type="number"
            value={form.cost}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.cost && errors.cost ? "border-red-500" : "border-gray-200"
            }`}
          />
          {touched.cost && errors.cost && (
            <p className="text-xs text-red-500 mt-1">{errors.cost}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.price && errors.price
                ? "border-red-500"
                : "border-gray-200"
            }`}
          />
          {touched.price && errors.price && (
            <p className="text-xs text-red-500 mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Barcode <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`flex-1 p-2 border rounded ${
                touched.barcode && errors.barcode
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setForm((s) => ({
                  ...s,
                  barcode: String(
                    Math.floor(100000000000 + Math.random() * 900000000000)
                  ),
                }))
              }
              className="px-3 rounded bg-gray-100 hover:bg-gray-200"
            >
              Generate
            </button>
          </div>
          {touched.barcode && errors.barcode && (
            <p className="text-xs text-red-500 mt-1">{errors.barcode}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Branch <span className="text-red-500">*</span>
          </label>
          <input
            name="branch"
            value={form.branch}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.branch && errors.branch
                ? "border-red-500"
                : "border-gray-200"
            }`}
          />
          {touched.branch && errors.branch && (
            <p className="text-xs text-red-500 mt-1">{errors.branch}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Opening Balance <span className="text-red-500">*</span>
          </label>
          <input
            name="opening_balance"
            type="number"
            value={form.opening_balance}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              touched.opening_balance && errors.opening_balance
                ? "border-red-500"
                : "border-gray-200"
            }`}
          />
          {touched.opening_balance && errors.opening_balance && (
            <p className="text-xs text-red-500 mt-1">
              {errors.opening_balance}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Remarks (optional)
          </label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="w-full p-2 border rounded resize-y border-gray-200"
            rows={3}
          />
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3 md:col-span-1">
          <label className="block text-sm font-medium">Active</label>
          <Toggle
            checked={form.active}
            onChange={(val) => setForm((s) => ({ ...s, active: val }))}
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-between gap-4">
          <div className="text-sm text-green-600">{savedMessage}</div>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => {
                // reset form
                setForm({
                  brand: "",
                  model: "",
                  size: "",
                  color: "",
                  cost: "",
                  price: "",
                  barcode: "",
                  branch: "",
                  opening_balance: "",
                  remarks: "",
                  active: true,
                });
                setTouched({});
                setSavedMessage("");
              }}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded text-white ${
                saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
