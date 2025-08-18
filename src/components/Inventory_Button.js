"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function InventoryMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block group"
      ref={menuRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="mr-2 p-4 border-green-400 border rounded-4xl hover:bg-green-600 hover:cursor-pointer text-white"
        onClick={() => setOpen(!open)}
      >
        Inventory
      </div>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <ul className="py-1 text-black">
            <li>
              <Link
                href="/brands"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="/frame"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Frame
              </Link>
            </li>
            <li>
              <Link
                href="/lenses"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Lenses
              </Link>
            </li>
            <li>
              <Link
                href="/vendor"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Vendor
              </Link>
            </li>
            <li>
              <Link
                href="/purchases"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Purchases
              </Link>
            </li>
            <li>
              <Link
                href="/item-ledger"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Item Ledger
              </Link>
            </li>
            <li>
              <Link
                href="/sales-in-hand"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Sales in Hand
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
