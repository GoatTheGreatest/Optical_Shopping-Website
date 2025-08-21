import React from "react";
import Link from "next/link";
import InventoryMenu from "./Inventory_Button";
import ReportsMenu from "./Reports_Menu";
function Navbar() {
  return (
    <div>
      <div className="flex space-x-10 align-middle py-3 bg-[linear-gradient(135deg,_rgb(0,0,0)_0%,_#035e26_69%,_#019f32_89%)] text-white p-6 max-w-full flex-wrap">
        <Link href="/">
          <div className="flex align-middle justify-center hover:cursor-pointer">
            <img
              src="/Images/opticofynav.png"
              alt="Opticofy"
              className="object-contain h-10 w-10"
            />
            <p className="py-1 font-bold text-2xl">Opticofy</p>
          </div>
        </Link>
        <div className="flex flex-wrap">
          <Link
            href="/"
            className="mr-2 p-4 border-green-400 border-1 rounded-4xl hover:bg-green-600 hover:cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/customer"
            className="mr-2 p-4 border-green-400 border-1 rounded-4xl hover:bg-green-600 hover:cursor-pointer"
          >
            Customer
          </Link>
          <Link
            href="/order"
            className="mr-2 p-4 border-green-400 border-1 rounded-4xl hover:bg-green-600 hover:cursor-pointer"
          >
            Order
          </Link>
          <InventoryMenu />
          <ReportsMenu />
          <Link
            href="/analytics"
            className="mr-2 p-4 border-green-400 border-1 rounded-4xl hover:bg-green-600 hover:cursor-pointer"
          >
            Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
