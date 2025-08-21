"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function InventoryMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const hoverTimerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleMouseEnter() {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setOpen(true);
  }

  function handleMouseLeave() {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setOpen(false), 180);
  }

  return (
    <div
      className="relative inline-block"
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="mr-2 p-4 border-green-400 border rounded-4xl hover:bg-green-600 hover:cursor-pointer text-white"
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        aria-haspopup="menu"
        aria-expanded={open}
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
                href="/stock-in-hand"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Stock in Hand
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
