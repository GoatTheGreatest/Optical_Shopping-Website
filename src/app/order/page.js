'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Plus, FileText, DollarSign, Users } from 'lucide-react';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      if (typeof window !== 'undefined') {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders);
      }
    } catch (e) {
      console.error('Error loading orders:', e);
      setOrders([]);
    }
  };

  const saveOrders = (newOrders) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('orders', JSON.stringify(newOrders));
      }
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  };

  const refreshOrders = () => {
    console.log('Refreshing orders...');
    loadOrders();
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const activeCustomers = new Set(orders.map(o => o.customer)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Order List</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshOrders}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                const demoOrders = [
                  {
                    id: '1',
                    customer: 'John Smith',
                    orderType: 'Standard',
                    date: '2024-01-15',
                    deliveryDate: '2024-01-20',
                    total: 299.99,
                    description: 'Electronics order - Laptop accessories'
                  },
                  {
                    id: '2',
                    customer: 'Sarah Johnson',
                    orderType: 'Express',
                    date: '2024-01-16',
                    deliveryDate: '2024-01-17',
                    total: 149.50,
                    description: 'Urgent delivery - Office supplies'
                  },
                  {
                    id: '3',
                    customer: 'Mike Davis',
                    orderType: 'Premium',
                    date: '2024-01-14',
                    deliveryDate: '2024-01-18',
                    total: 599.99,
                    description: 'Premium service - Custom furniture'
                  }
                ];
                localStorage.setItem('orders', JSON.stringify(demoOrders));
                loadOrders();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <span>Load Demo Data</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all orders?')) {
                  localStorage.removeItem('orders');
                  loadOrders();
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <span>Clear All</span>
            </button>
            <Link
              href="/order/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Order</span>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-4">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mr-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active Customers</h3>
                <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Order Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Order Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Delivery Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No orders found. Add your first order to get started.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {order.customer || 'N/A'}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {order.orderType || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-900">
                        {order.date || 'N/A'}
                      </td>
                      <td className="px-4 py-4 text-gray-900">
                        {order.deliveryDate || 'N/A'}
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-900">
                        ${(order.total || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
