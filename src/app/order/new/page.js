"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X, Calendar, Copy } from "lucide-react";
import { isFieldEnabled, renderIfEnabled } from "@/lib/orderSettings";
import {
  isPrescriptionFieldEnabled,
  renderIfPrescriptionEnabled,
} from "@/lib/prescriptionSettings";

export default function NewOrder() {
  const [products, setProducts] = useState([
    { make: "", color: "", frame: "", lenses: "" },
  ]);
  const [totalCharges, setTotalCharges] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
    orderDate: "",
    deliveryDate: "",
    reference: "",
    doctorName: "",
    orderType: "Spectacle",
    salesPerson: "arslan nafees",
    remarks: "",
    frameSize: "",
    framePrice: "",
    lensesPrice: "",
    rightEye: {
      sphere: "",
      cylinder: "",
      axis: "",
      addition: "",
      dia: "",
      bc: "",
      segment: "",
      pupillaryDistance: "",
      prism: "",
    },
    leftEye: {
      sphere: "",
      cylinder: "",
      axis: "",
      addition: "",
      dia: "",
      bc: "",
      segment: "",
      pupillaryDistance: "",
      prism: "",
    },
  });

  useEffect(() => {
    setDefaultDate();
    updatePayments();
  }, []);

  const setDefaultDate = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, orderDate: today }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEyeChange = (eye, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [field]: value,
      },
    }));
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      { make: "", color: "", frame: "", lenses: "" },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateProduct = (index, field, value) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    );
  };

  const updatePayments = () => {
    const newTotalCharges = products.length * 100; // Example calculation
    const newBalance = newTotalCharges - deposit;
    setTotalCharges(newTotalCharges);
    setBalance(newBalance);
  };

  useEffect(() => {
    updatePayments();
  }, [products, deposit]);

  const collectFormData = () => {
    return {
      ...formData,
      products,
      totalCharges,
      deposit,
      balance,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
  };

  const saveOrder = (orderData) => {
    try {
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        id: orderData.id,
        customer: orderData.customerName,
        orderType: orderData.orderType,
        date: orderData.orderDate,
        deliveryDate: orderData.deliveryDate,
        total: orderData.totalCharges,
        ...orderData,
      };

      existingOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));
      return true;
    } catch (e) {
      console.error("Error saving order:", e);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.orderDate ||
      !formData.deliveryDate ||
      !formData.orderType ||
      !formData.salesPerson
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = collectFormData();
    console.log("Order submitted:", orderData);

    if (saveOrder(orderData)) {
      alert("Order saved successfully!");
      resetForm();
    } else {
      alert("Error saving order. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerAddress: "",
      orderDate: "",
      deliveryDate: "",
      reference: "",
      doctorName: "",
      orderType: "Spectacle",
      salesPerson: "arslan nafees",
      remarks: "",
      frameSize: "",
      framePrice: "",
      lensesPrice: "",
      rightEye: {
        sphere: "",
        cylinder: "",
        axis: "",
        addition: "",
        dia: "",
        bc: "",
        segment: "",
        pupillaryDistance: "",
        prism: "",
      },
      leftEye: {
        sphere: "",
        cylinder: "",
        axis: "",
        addition: "",
        dia: "",
        bc: "",
        segment: "",
        pupillaryDistance: "",
        prism: "",
      },
    });
    setProducts([{ make: "", color: "", frame: "", lenses: "" }]);
    setTotalCharges(0);
    setDeposit(0);
    setBalance(0);
    setDefaultDate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Orders</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">New Order</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
          {/* Customer and Order Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Customer Name <span className="text-red-600">*</span>
                </label>
                <select
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select A Customer</option>
                  <option value="arslan">Arslan</option>
                </select>
              </div>

              {/* Customer Address */}
              <div>
                <label
                  htmlFor="customerAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Customer Address
                </label>
                <input
                  type="text"
                  id="customerAddress"
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              {/* Order Date */}
              <div>
                <label
                  htmlFor="orderDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Order Date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="orderDate"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label
                  htmlFor="deliveryDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Delivery Date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              {/* Reference */}
              <div>
                <label
                  htmlFor="reference"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Reference
                </label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              {/* Doctor Name - Conditional Field */}
              {renderIfEnabled(
                "doctorName",
                <div>
                  <label
                    htmlFor="doctorName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Doctor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="doctorName"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    required={isFieldEnabled("doctorName")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              )}

              {/* Order Type */}
              <div>
                <label
                  htmlFor="orderType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Order Type <span className="text-red-600">*</span>
                </label>
                <select
                  id="orderType"
                  name="orderType"
                  value={formData.orderType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Spectacle">Spectacle</option>
                  <option value="Contact Lens">Contact Lens</option>
                  <option value="Sunglasses">Sunglasses</option>
                </select>
              </div>

              {/* Sales Person */}
              <div>
                <label
                  htmlFor="salesPerson"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Sales Person <span className="text-red-600">*</span>
                </label>
                <select
                  id="salesPerson"
                  name="salesPerson"
                  value={formData.salesPerson}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="arslan nafees">arslan nafees</option>
                </select>
              </div>
            </div>
          </div>

          {/* Eye Prescription and Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Right Eye */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Right Eye
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {/* Right Sphere */}
                {renderIfPrescriptionEnabled(
                  "rightSphere",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Sphere <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.sphere}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "sphere", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightSphere")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Cylinder */}
                {renderIfPrescriptionEnabled(
                  "rightCylinder",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Cylinder <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.cylinder}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "cylinder", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightCylinder")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Axis */}
                {renderIfPrescriptionEnabled(
                  "rightAxis",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Axis <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.axis}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "axis", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightAxis")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Addition */}
                {renderIfPrescriptionEnabled(
                  "rightAddition",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Addition <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.addition}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "addition", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightAddition")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Diameter */}
                {renderIfPrescriptionEnabled(
                  "rightDiameter",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Diameter <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.dia}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "dia", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightDiameter")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Base Curve */}
                {renderIfPrescriptionEnabled(
                  "rightBaseCurve",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Base Curve <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.bc}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "bc", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightBaseCurve")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Segment */}
                {renderIfPrescriptionEnabled(
                  "rightSegment",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Segment <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.segment || ""}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "segment", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightSegment")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Pupillary Distance */}
                {renderIfPrescriptionEnabled(
                  "rightPupillaryDistance",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Pupillary Distance <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.pupillaryDistance || ""}
                      onChange={(e) =>
                        handleEyeChange(
                          "rightEye",
                          "pupillaryDistance",
                          e.target.value
                        )
                      }
                      required={isPrescriptionFieldEnabled(
                        "rightPupillaryDistance"
                      )}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Right Prism */}
                {renderIfPrescriptionEnabled(
                  "rightPrism",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Prism <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rightEye.prism || ""}
                      onChange={(e) =>
                        handleEyeChange("rightEye", "prism", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("rightPrism")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Left Eye */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Left Eye
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {/* Left Sphere */}
                {renderIfPrescriptionEnabled(
                  "leftSphere",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Sphere <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.sphere}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "sphere", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftSphere")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Cylinder */}
                {renderIfPrescriptionEnabled(
                  "leftCylinder",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Cylinder <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.cylinder}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "cylinder", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftCylinder")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Axis */}
                {renderIfPrescriptionEnabled(
                  "leftAxis",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Axis <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.axis}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "axis", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftAxis")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Addition */}
                {renderIfPrescriptionEnabled(
                  "leftAddition",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Addition <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.addition}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "addition", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftAddition")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Diameter */}
                {renderIfPrescriptionEnabled(
                  "leftDiameter",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Diameter <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.dia}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "dia", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftDiameter")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Base Curve */}
                {renderIfPrescriptionEnabled(
                  "leftBaseCurve",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Base Curve <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.bc}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "bc", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftBaseCurve")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Segment */}
                {renderIfPrescriptionEnabled(
                  "leftSegment",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Segment <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.segment || ""}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "segment", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftSegment")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Pupillary Distance */}
                {renderIfPrescriptionEnabled(
                  "leftPupillaryDistance",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Pupillary Distance <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.pupillaryDistance || ""}
                      onChange={(e) =>
                        handleEyeChange(
                          "leftEye",
                          "pupillaryDistance",
                          e.target.value
                        )
                      }
                      required={isPrescriptionFieldEnabled(
                        "leftPupillaryDistance"
                      )}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}

                {/* Left Prism */}
                {renderIfPrescriptionEnabled(
                  "leftPrism",
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Prism <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.leftEye.prism || ""}
                      onChange={(e) =>
                        handleEyeChange("leftEye", "prism", e.target.value)
                      }
                      required={isPrescriptionFieldEnabled("leftPrism")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Payments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payments
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="totalCharges"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Total Charges <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="totalCharges"
                    value={`$ ${totalCharges.toFixed(2)}`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="deposit"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Deposit
                  </label>
                  <input
                    type="number"
                    id="deposit"
                    value={deposit}
                    onChange={(e) =>
                      setDeposit(parseFloat(e.target.value) || 0)
                    }
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="balance"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Balance
                  </label>
                  <input
                    type="text"
                    id="balance"
                    value={`$ ${balance.toFixed(2)}`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Remarks and Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            {/* Remarks - Conditional Field */}
            {renderIfEnabled(
              "remarks",
              <div className="mb-6">
                <label
                  htmlFor="remarks"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Remarks <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  required={isFieldEnabled("remarks")}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter any additional notes..."
                />
              </div>
            )}

            {/* Add Products Section */}
            <div className="border-t-2 border-dashed border-gray-300 pt-6">
              <button
                type="button"
                onClick={addProduct}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-lg"
              >
                <Plus className="w-5 h-5" />
                Add Products
              </button>

              {/* Product Items Container */}
              <div className="mt-6 space-y-4">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                  >
                    {/* Make - Conditional Field */}
                    {renderIfEnabled(
                      "make",
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Make <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={product.make}
                          onChange={(e) =>
                            updateProduct(index, "make", e.target.value)
                          }
                          required={isFieldEnabled("make")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    )}

                    {/* Color - Conditional Field */}
                    {renderIfEnabled(
                      "color",
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={product.color}
                          onChange={(e) =>
                            updateProduct(index, "color", e.target.value)
                          }
                          required={isFieldEnabled("color")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    )}

                    {/* Frame - Conditional Field */}
                    {renderIfEnabled(
                      "frame",
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frame <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={product.frame}
                          onChange={(e) =>
                            updateProduct(index, "frame", e.target.value)
                          }
                          required={isFieldEnabled("frame")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    )}

                    {/* Lenses - Conditional Field */}
                    {renderIfEnabled(
                      "lenses",
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lenses <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={product.lenses}
                            onChange={(e) =>
                              updateProduct(index, "lenses", e.target.value)
                            }
                            required={isFieldEnabled("lenses")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          />
                        </div>
                        {products.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProduct(index)}
                            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            title="Remove product"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Frame Size - Conditional Field */}
                    {renderIfEnabled(
                      "frameSize",
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frame Size <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.frameSize}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              frameSize: e.target.value,
                            }))
                          }
                          required={isFieldEnabled("frameSize")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    )}

                    {/* Frame Price - Conditional Field */}
                    {renderIfEnabled(
                      "framePrice",
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frame Price <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.framePrice}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              framePrice: e.target.value,
                            }))
                          }
                          required={isFieldEnabled("framePrice")}
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    )}

                    {/* Lenses Price - Conditional Field */}
                    {renderIfEnabled(
                      "lensesPrice",
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lenses Price <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.lensesPrice}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              lensesPrice: e.target.value,
                            }))
                          }
                          required={isFieldEnabled("lensesPrice")}
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                <Copy className="w-5 h-5" />
                <span>Copy From Last Order</span>
              </button>
            </div>
            <Link
              href="/order"
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
