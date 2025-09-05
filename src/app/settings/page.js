"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [employeeDrawerOpen, setEmployeeDrawerOpen] = useState(false);
  const [branchDrawerOpen, setBranchDrawerOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    mobile: "",
    email: "",
    position: "",
    department: "",
    address: "",
  });
  const [branchForm, setBranchForm] = useState({
    branchName: "",
    branchCode: "",
    address: "",
    phone: "",
    mobile: "",
    email: "",
    manager: "",
    city: "",
  });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [activeTab, setActiveTab] = useState("company");
  const [multiBranch, setMultiBranch] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Order Settings State
  const [orderSettings, setOrderSettings] = useState({
    doctorName: true,
    color: true,
    frame: true,
    lenses: true,
    make: true,
    frameSize: false,
    framePrice: false,
    lensesPrice: false,
    remarks: true,
    sendWhatsapp: false,
    printReceipt: false,
  });

  // Prescription Settings State
  const [prescriptionSettings, setPrescriptionSettings] = useState({
    // Right Eye Settings
    rightSphere: true,
    rightCylinder: true,
    rightAxis: true,
    rightAddition: true,
    rightDiameter: true,
    rightBaseCurve: true,
    rightSegment: false,
    rightPupillaryDistance: false,
    rightPrism: false,

    // Left Eye Settings
    leftSphere: true,
    leftCylinder: true,
    leftAxis: true,
    leftAddition: true,
    leftDiameter: true,
    leftBaseCurve: true,
    leftSegment: false,
    leftPupillaryDistance: false,
    leftPrism: false,
  });

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Load saved settings on component mount
  useEffect(() => {
    if (isHydrated) {
      // Load order settings
      const savedOrderSettings = localStorage.getItem("orderSettings");
      if (savedOrderSettings) {
        try {
          const parsedOrderSettings = JSON.parse(savedOrderSettings);
          setOrderSettings(parsedOrderSettings);
        } catch (error) {
          console.error("Error loading order settings:", error);
        }
      }

      // Load prescription settings
      const savedPrescriptionSettings = localStorage.getItem(
        "prescriptionSettings"
      );
      if (savedPrescriptionSettings) {
        try {
          const parsedPrescriptionSettings = JSON.parse(
            savedPrescriptionSettings
          );
          setPrescriptionSettings(parsedPrescriptionSettings);
        } catch (error) {
          console.error("Error loading prescription settings:", error);
        }
      }
    }
  }, [isHydrated]);

  const handleToggleChange = (field) => {
    setOrderSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSaveOrderSettings = () => {
    // Save to localStorage or send to API
    if (isHydrated) {
      localStorage.setItem("orderSettings", JSON.stringify(orderSettings));
      alert("Order settings saved successfully!");
    }
  };

  const handlePrescriptionToggleChange = (field) => {
    setPrescriptionSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSavePrescriptionSettings = () => {
    // Save to localStorage or send to API
    if (isHydrated) {
      localStorage.setItem(
        "prescriptionSettings",
        JSON.stringify(prescriptionSettings)
      );
      alert("Prescription settings saved successfully!");
    }
  };

  const menuItems = [
    {
      id: "employee",
      label: "Employee",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "branch",
      label: "Branch",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: "company",
      label: "Company Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: "order",
      label: "Order Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-7-7v6m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "prescription",
      label: "Prescription Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  // Toggle Switch Component
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div className="flex items-center">
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
          isOn ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
        <span className="sr-only">{isOn ? "On" : "Off"}</span>
      </button>
      {isOn && (
        <svg
          className="w-4 h-4 text-green-600 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {!isOn && (
        <svg
          className="w-4 h-4 text-gray-400 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );

  // Show loading state until hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }
  const openNewEmployeeDrawer = () => {
    setEditingEmployeeId(null);
    setEmployeeForm({
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
      position: "",
      department: "",
      address: "",
    });
    setEmployeeDrawerOpen(true);
  };

  const openNewBranchDrawer = () => {
    setEditingBranchId(null);
    setBranchForm({
      branchName: "",
      branchCode: "",
      address: "",
      phone: "",
      mobile: "",
      email: "",
      manager: "",
      city: "",
    });
    setBranchDrawerOpen(true);
  };

  const closeEmployeeDrawer = () => {
    setEmployeeDrawerOpen(false);
    setEditingEmployeeId(null);
  };

  const closeBranchDrawer = () => {
    setBranchDrawerOpen(false);
    setEditingBranchId(null);
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm((s) => ({ ...s, [name]: value }));
  };

  const handleBranchChange = (e) => {
    const { name, value } = e.target;
    setBranchForm((s) => ({ ...s, [name]: value }));
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!employeeForm.firstName.trim() || !employeeForm.mobile.trim()) return;
    if (editingEmployeeId) {
      setEmployees((arr) =>
        arr.map((emp) =>
          emp.id === editingEmployeeId ? { ...emp, ...employeeForm } : emp
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        ...employeeForm,
      };
      setEmployees((emp) => [newEmployee, ...emp]);
    }
    setEmployeeForm({
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
      position: "",
      department: "",
      address: "",
    });
    setEditingEmployeeId(null);
    setEmployeeDrawerOpen(false);
  };

  const handleBranchSubmit = (e) => {
    e.preventDefault();
    if (!branchForm.branchName.trim() || !branchForm.branchCode.trim()) return;
    if (editingBranchId) {
      setBranches((arr) =>
        arr.map((branch) =>
          branch.id === editingBranchId ? { ...branch, ...branchForm } : branch
        )
      );
    } else {
      const newBranch = {
        id: Date.now(),
        ...branchForm,
      };
      setBranches((branch) => [newBranch, ...branch]);
    }
    setBranchForm({
      branchName: "",
      branchCode: "",
      address: "",
      phone: "",
      mobile: "",
      email: "",
      manager: "",
      city: "",
    });
    setEditingBranchId(null);
    setBranchDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span
                  className={
                    activeTab === item.id ? "text-green-600" : "text-gray-500"
                  }
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab === "employee"
                ? "Employee List"
                : activeTab === "branch"
                ? "Branch List"
                : activeTab === "company"
                ? "Company Settings"
                : activeTab === "order"
                ? "Order Settings"
                : activeTab === "prescription"
                ? "Prescription Settings"
                : "Settings"}
            </h1>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4"
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
                <span>Refresh</span>
              </button>
              {activeTab === "employee" && (
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={openNewEmployeeDrawer}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add New Employee</span>
                </button>
              )}
              {activeTab === "branch" && (
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={openNewBranchDrawer}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add New Branch</span>
                </button>
              )}
              {activeTab === "order" && (
                <Link
                  href="/order"
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-7-7v6m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6"
                    />
                  </svg>
                  <span>Go to Orders</span>
                </Link>
              )}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "employee" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-8 gap-4 text-sm font-medium text-gray-700">
                  <div>Firstname</div>
                  <div>Lastname</div>
                  <div>Email</div>
                  <div>Mobile</div>
                  <div>Position</div>
                  <div>Address</div>
                  <div>Active</div>
                  <div>Actions</div>
                </div>
              </div>

              {/* Table Body - Empty State */}
              <div className="px-6 py-12 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No data</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "branch" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Mobile</div>
                  <div>Address</div>
                  <div>Public</div>
                  <div>Actions</div>
                </div>
              </div>

              {/* Table Body - Empty State */}
              <div className="px-6 py-12 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No data</p>
                </div>
              </div>

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-end items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <form className="space-y-6">
                  {/* Multi Branch Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">
                        Multi Branch
                      </span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="multiBranch"
                          checked={Boolean(multiBranch)}
                          onChange={(e) =>
                            setMultiBranch(Boolean(e.target.checked))
                          }
                        />
                        <label
                          htmlFor="multiBranch"
                          className="flex items-center cursor-pointer"
                        >
                          <div
                            className={`w-10 h-6 rounded-full p-1 transition-colors ${
                              multiBranch ? "bg-green-600" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                                multiBranch ? "translate-x-4" : "translate-x-0"
                              }`}
                            ></div>
                          </div>
                        </label>
                      </div>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company name"
                    />
                  </div>

                  {/* Company Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company address"
                    />
                  </div>

                  {/* Company State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company state"
                    />
                  </div>

                  {/* Company Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company country"
                    />
                  </div>

                  {/* Company Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company email"
                    />
                  </div>

                  {/* Company Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company phone"
                    />
                  </div>

                  {/* Company Mobile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company mobile"
                    />
                  </div>

                  {/* Company Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Website <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter company website"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Order Settings Content */}
          {activeTab === "order" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Settings
                </h2>

                {/* Additional Order Fields Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    ADDITIONAL ORDER FIELDS
                  </h3>
                  <div className="space-y-4">
                    {/* Doctor Name */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Doctor Name
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.doctorName}
                        onToggle={() => handleToggleChange("doctorName")}
                      />
                    </div>

                    {/* Color */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Color
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.color}
                        onToggle={() => handleToggleChange("color")}
                      />
                    </div>

                    {/* Frame */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Frame
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.frame}
                        onToggle={() => handleToggleChange("frame")}
                      />
                    </div>

                    {/* Lenses */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Lenses
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.lenses}
                        onToggle={() => handleToggleChange("lenses")}
                      />
                    </div>

                    {/* Make */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Make
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.make}
                        onToggle={() => handleToggleChange("make")}
                      />
                    </div>

                    {/* Frame Size */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Frame Size
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.frameSize}
                        onToggle={() => handleToggleChange("frameSize")}
                      />
                    </div>

                    {/* Frame Price */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Frame Price
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.framePrice}
                        onToggle={() => handleToggleChange("framePrice")}
                      />
                    </div>

                    {/* Lenses Price */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Lenses Price
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.lensesPrice}
                        onToggle={() => handleToggleChange("lensesPrice")}
                      />
                    </div>

                    {/* Remarks */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Remarks
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.remarks}
                        onToggle={() => handleToggleChange("remarks")}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-300 my-8" />

                {/* Send and Print by Default Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    SEND AND PRINT BY DEFAULT
                  </h3>
                  <div className="space-y-4">
                    {/* Send Whatsapp */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Send Whatsapp
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.sendWhatsapp}
                        onToggle={() => handleToggleChange("sendWhatsapp")}
                      />
                    </div>

                    {/* Print Receipt */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <label className="flex items-center space-x-2">
                        <span className="text-red-500">*</span>
                        <span className="text-sm font-medium text-gray-700">
                          Print Receipt
                        </span>
                      </label>
                      <ToggleSwitch
                        isOn={orderSettings.printReceipt}
                        onToggle={() => handleToggleChange("printReceipt")}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSaveOrderSettings}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Prescription Settings Content */}
          {activeTab === "prescription" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Prescription Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Right Eye Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Right Eye
                    </h3>
                    <div className="space-y-4">
                      {/* Right Sphere */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Sphere
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightSphere}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightSphere")
                          }
                        />
                      </div>

                      {/* Right Cylinder */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Cylinder
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightCylinder}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightCylinder")
                          }
                        />
                      </div>

                      {/* Right Axis */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Axis
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightAxis}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightAxis")
                          }
                        />
                      </div>

                      {/* Right Addition */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Addition
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightAddition}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightAddition")
                          }
                        />
                      </div>

                      {/* Right Diameter */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Diameter
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightDiameter}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightDiameter")
                          }
                        />
                      </div>

                      {/* Right Base Curve */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Base Curve
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightBaseCurve}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightBaseCurve")
                          }
                        />
                      </div>

                      {/* Right Segment */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Segment
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightSegment}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightSegment")
                          }
                        />
                      </div>

                      {/* Right Pupillary Distance */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Pupillary Distance
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightPupillaryDistance}
                          onToggle={() =>
                            handlePrescriptionToggleChange(
                              "rightPupillaryDistance"
                            )
                          }
                        />
                      </div>

                      {/* Right Prism */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Right Prism
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.rightPrism}
                          onToggle={() =>
                            handlePrescriptionToggleChange("rightPrism")
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Left Eye Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Left Eye
                    </h3>
                    <div className="space-y-4">
                      {/* Left Sphere */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Sphere
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftSphere}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftSphere")
                          }
                        />
                      </div>

                      {/* Left Cylinder */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Cylinder
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftCylinder}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftCylinder")
                          }
                        />
                      </div>

                      {/* Left Axis */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Axis
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftAxis}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftAxis")
                          }
                        />
                      </div>

                      {/* Left Addition */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Addition
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftAddition}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftAddition")
                          }
                        />
                      </div>

                      {/* Left Diameter */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Diameter
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftDiameter}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftDiameter")
                          }
                        />
                      </div>

                      {/* Left Base Curve */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Base Curve
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftBaseCurve}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftBaseCurve")
                          }
                        />
                      </div>

                      {/* Left Segment */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Segment
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftSegment}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftSegment")
                          }
                        />
                      </div>

                      {/* Left Pupillary Distance */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Pupillary Distance
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftPupillaryDistance}
                          onToggle={() =>
                            handlePrescriptionToggleChange(
                              "leftPupillaryDistance"
                            )
                          }
                        />
                      </div>

                      {/* Left Prism */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <label className="flex items-center space-x-2">
                          <span className="text-red-500">*</span>
                          <span className="text-sm font-medium text-gray-700">
                            Left Prism
                          </span>
                        </label>
                        <ToggleSwitch
                          isOn={prescriptionSettings.leftPrism}
                          onToggle={() =>
                            handlePrescriptionToggleChange("leftPrism")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSavePrescriptionSettings}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab !== "employee" &&
            activeTab !== "branch" &&
            activeTab !== "company" &&
            activeTab !== "order" &&
            activeTab !== "prescription" && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                      Settings content coming soon
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Employee Drawer */}
      <div
        className={`fixed inset-0 transition-opacity pointer-events-auto ${
          employeeDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={closeEmployeeDrawer}
          className="absolute inset-0 backdrop-blur-sm"
        ></div>

        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white border-l shadow-lg transform transition-transform ${
            employeeDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">ADD NEW EMPLOYEE</h3>
            <button
              onClick={closeEmployeeDrawer}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleEmployeeSubmit}
            className="px-6 py-6 space-y-4 overflow-y-auto h-[calc(100%-72px)]"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span> First Name
              </label>
              <input
                name="firstName"
                value={employeeForm.firstName}
                onChange={handleEmployeeChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={employeeForm.lastName}
                onChange={handleEmployeeChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                value={employeeForm.phone}
                onChange={handleEmployeeChange}
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
                value={employeeForm.mobile}
                onChange={handleEmployeeChange}
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
                value={employeeForm.email}
                onChange={handleEmployeeChange}
                placeholder="email@gmail.com"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                name="position"
                value={employeeForm.position}
                onChange={handleEmployeeChange}
                placeholder="Manager, Sales Rep, etc."
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                name="department"
                value={employeeForm.department}
                onChange={handleEmployeeChange}
                placeholder="Sales, HR, IT, etc."
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                name="address"
                value={employeeForm.address}
                onChange={handleEmployeeChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                {editingEmployeeId ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={closeEmployeeDrawer}
                className="ml-3 px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Branch Drawer */}
      <div
        className={`fixed inset-0 transition-opacity pointer-events-auto ${
          branchDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={closeBranchDrawer}
          className="absolute inset-0 backdrop-blur-sm"
        ></div>

        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white border-l shadow-lg transform transition-transform ${
            branchDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">ADD NEW BRANCH</h3>
            <button
              onClick={closeBranchDrawer}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleBranchSubmit}
            className="px-6 py-6 space-y-4 overflow-y-auto h-[calc(100%-72px)]"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span> Branch Name
              </label>
              <input
                name="branchName"
                value={branchForm.branchName}
                onChange={handleBranchChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span> Branch Code
              </label>
              <input
                name="branchCode"
                value={branchForm.branchCode}
                onChange={handleBranchChange}
                placeholder="BR001, NYC01, etc."
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                name="address"
                value={branchForm.address}
                onChange={handleBranchChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                value={branchForm.phone}
                onChange={handleBranchChange}
                placeholder="+1 123 456 789"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                name="mobile"
                value={branchForm.mobile}
                onChange={handleBranchChange}
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
                value={branchForm.email}
                onChange={handleBranchChange}
                placeholder="branch@company.com"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manager
              </label>
              <input
                name="manager"
                value={branchForm.manager}
                onChange={handleBranchChange}
                placeholder="Manager Name"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                name="city"
                value={branchForm.city}
                onChange={handleBranchChange}
                placeholder="New York, London, etc."
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                {editingBranchId ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={closeBranchDrawer}
                className="ml-3 px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
