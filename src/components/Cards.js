import React from "react";

function Cards({ title, quantity, icon }) {
  return (
    <div>
      <div className="bg-gray-50 p-4 shadow rounded-lg flex items-center justify-between mx-3 max-md:mx-1 max-md:mt-2">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-black text-2xl font-semibold">{quantity}</p>
        </div>
        <div className="text-3xl text-green-500">{icon}</div>
      </div>
    </div>
  );
}

export default Cards;
