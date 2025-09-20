"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ReportsMenu() {
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
      if (event.key === "Escape") setOpen(false);
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
        className="mr-2 px-4 py-2 border-green-400 border-1 rounded-4xl hover:bg-green-600 hover:cursor-pointer text-white"
        onClick={() => setOpen((p) => !p)}
        role="button"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Reports
      </div>
      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg z-10">
          <ul className="py-1 text-black">
            <li>
              <Link
                href="/reports/sales"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Sales
              </Link>
            </li>
            <li>
              <Link
                href="/reports/purchases"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Purchases
              </Link>
            </li>
            <li>
              <Link
                href="/reports/collection"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Collection
              </Link>
            </li>
            <li>
              <Link
                href="/reports/receivable"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Receivable
              </Link>
            </li>
            <li>
              {/* Item Ledger is under Inventory menu, so no link here */}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
