import React from "react";

function Sale_Card({ heading, num }) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-1 border-gray-200 shadow mx-4 h-full max-md:mx-1">
      <div className="heading flex items-center justify-between my-4 max-md:my-2 max-sm:my-1">
        <h1 className="font-bold text-green-800 text-sm">Total {heading}</h1>
        <input
          type="number"
          defaultValue={currentYear}
          className="w-24 text-sm border-1 border-gray-400 rounded-[3.5] mr-3"
        />
      </div>
      <div className="Data">
        {num == 2 ? (
          <div className="grid grid-cols-4 p-6 gap-2 text-center">
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Customer
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">Date</h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">Items</h3>
            <h3 className="shadow text-sm">Cost</h3>
          </div>
        ) : (
          <div className="grid grid-cols-6 p-4 gap-2 text-center">
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Refrence
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Customer
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Order Type
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Order Date
            </h3>
            <h3 className="shadow border-r-1 border-gray-400 text-sm">
              Delivery Date
            </h3>
            <h3 className="shadow text-sm">Total</h3>
          </div>
        )}
        <div className="items-center justify-center text-gray-500 w-full">
          <h1 className="text-center text-sm">No Data</h1>
        </div>
      </div>
    </div>
  );
}

export default Sale_Card;
