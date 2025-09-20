"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CustomerPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!activeMenuId) return;
      const wrapper = document.querySelector(
        `[data-menu-id="${activeMenuId}"]`
      );
      const dropdown = document.querySelector('[data-menu-dropdown="true"]');
      if (wrapper && wrapper.contains(e.target)) return;
      if (dropdown && dropdown.contains(e.target)) return;
      setActiveMenuId(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [activeMenuId]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const openNewDrawer = () => {
    setEditingId(null);
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
      address: "",
    });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.mobile.trim()) return;
    if (editingId) {
      setCustomers((arr) =>
        arr.map((c) => (c.id === editingId ? { ...c, ...form } : c))
      );
    } else {
      const newCustomer = {
        id: Date.now(),
        ...form,
      };
      setCustomers((c) => [newCustomer, ...c]);
    }
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
      address: "",
    });
    setEditingId(null);
    setDrawerOpen(false);
  };

  const handleMenuToggle = (e, id) => {
    e.stopPropagation();
    if (activeMenuId === id) {
      setActiveMenuId(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownWidth = 144;
    const left = rect.right - dropdownWidth + window.scrollX;
    const top = rect.bottom + 8 + window.scrollY;
    setMenuPos({ top, left });
    setActiveMenuId(id);
  };

  const handleEdit = (id) => {
    const customer = customers.find((c) => c.id === id);
    if (!customer) return;
    setForm({
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      phone: customer.phone || "",
      mobile: customer.mobile || "",
      email: customer.email || "",
      address: customer.address || "",
    });
    setEditingId(id);
    setDrawerOpen(true);
    setActiveMenuId(null);
  };

  const handleDelete = (id) => {
    setActiveMenuId(null);
    if (!window.confirm("Delete this customer?")) return;
    setCustomers((arr) => arr.filter((c) => c.id !== id));
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="w-full px-6 py-6">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer List</h2>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRefreshing ? (
                  <svg
                    className="w-4 h-4 animate-spin inline mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 inline mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                )}
                Refresh
              </button>

              <button
                onClick={openNewDrawer}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <svg
                  className="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Customer
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    First Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Last Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Mobile
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <span className="text-gray-500 text-sm">No data</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {c.firstName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {c.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {c.phone}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {c.mobile}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {c.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {c.address}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div
                          className="relative inline-block"
                          data-menu-id={c.id}
                          ref={menuRef}
                        >
                          <button
                            onClick={(e) => handleMenuToggle(e, c.id)}
                            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                          >
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <circle cx="5" cy="12" r="1.5" />
                              <circle cx="12" cy="12" r="1.5" />
                              <circle cx="19" cy="12" r="1.5" />
                            </svg>
                          </button>

                          {activeMenuId === c.id && (
                            <div
                              data-menu-dropdown="true"
                              style={{
                                position: "fixed",
                                top: menuPos.top,
                                left: menuPos.left,
                              }}
                              className="mt-2 w-36 bg-white border rounded-md shadow-md z-50"
                            >
                              <button
                                onClick={() => handleEdit(c.id)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 transition-opacity pointer-events-auto ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={closeDrawer}
          className="absolute inset-0 backdrop-blur-sm"
        ></div>

        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white border-l shadow-lg transform transition-transform ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">ADD NEW CUSTOMER</h3>
            <button
              onClick={closeDrawer}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-6 py-6 space-y-4 overflow-y-auto h-[calc(100%-72px)]"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span> First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 123 456 789"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span> Mobile
              </label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="+1 123 456 789"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@gmail.com"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                {editingId ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={closeDrawer}
                className="ml-3 px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
