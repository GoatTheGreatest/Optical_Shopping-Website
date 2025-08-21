"use client";
import { useState } from "react";

export default function CollectionReportPage() {
  const [filters, setFilters] = useState({
    branch: "Main Branch",
    orderType: "All",
    fromDate: "",
    toDate: ""
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching with filters:", filters);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Collection Report
      </h1>

      {/* Filter Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch <span className="text-red-500">*</span>
            </label>
            <select
              value={filters.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Main Branch">Main Branch</option>
              <option value="Branch 1">Branch 1</option>
              <option value="Branch 2">Branch 2</option>
            </select>
          </div>

          {/* Order Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Type <span className="text-red-500">*</span>
            </label>
            <select
              value={filters.orderType}
              onChange={(e) => handleFilterChange('orderType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="All">All</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Phone">Phone</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Select Date"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Select Date"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button
              onClick={handleSearch}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Data Display Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Table Headers */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
            <div>No</div>
            <div>Reference No</div>
            <div>Name</div>
            <div>Order Date</div>
            <div>Order Type</div>
            <div>Branch</div>
            <div>Delivery Date</div>
            <div>Delivered Date</div>
            <div>Total</div>
            <div>Deposit</div>
            <div>Balance</div>
            <div>Received</div>
          </div>
        </div>

        {/* Table Body - Empty State */}
        <div className="px-6 py-12 text-center">
          <div className="flex flex-col items-center justify-center">
            {/* Empty State Icon */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No data</p>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-700 mr-4">Total</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg">
            <span className="text-xl font-bold">0</span>
          </div>
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            <span className="text-xl font-bold">0</span>
          </div>
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg">
            <span className="text-xl font-bold">0</span>
          </div>
          <div className="bg-orange-500 text-white px-6 py-3 rounded-lg">
            <span className="text-xl font-bold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}


