"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import InventoryMenu from "./Inventory_Button";
import ReportsMenu from "./Reports_Menu";
import ProfileSettings from "./ProfileSettings";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) setUser(JSON.parse(userData));
    }
  }, [isHydrated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".avatar-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  const getUserInitial = () => {
    if (user && user.name) return user.name.charAt(0).toUpperCase();
    return "U";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const openProfile = () => {
    setShowDropdown(false);
    setShowProfileSettings(true);
  };

  const navbarBaseClasses =
    "w-full flex items-center justify-between space-x-4 py-3 bg-[linear-gradient(135deg,_rgb(0,0,0)_0%,_#035e26_69%,_#019f32_89%)] text-white px-6";
  const navbarFixedClasses = showProfileSettings
    ? "fixed top-0 left-0 right-0 z-60"
    : "";

  if (!isHydrated) {
    return (
      <>
        <div className={`${navbarFixedClasses}`}>
          <div className={navbarBaseClasses}>
            <div className="flex items-center gap-3">
              <img
                src="/Images/opticofynav.png"
                alt="Opticofy"
                className="h-10 w-10 object-contain"
              />
              <p className="font-bold text-2xl">Opticofy</p>
            </div>
          </div>
        </div>
        {showProfileSettings && <div className="h-16" />}
      </>
    );
  }

  return (
    <>
      <div className={`${navbarFixedClasses}`}>
        <div className={navbarBaseClasses}>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center gap-3 hover:cursor-pointer">
                <img
                  src="/Images/opticofynav.png"
                  alt="Opticofy"
                  className="object-contain h-10 w-10"
                />
                <p className="font-bold text-2xl">Opticofy</p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="px-4 py-2 border border-green-400 rounded-full hover:bg-green-600"
              >
                Home
              </Link>
              <Link
                href="/customer"
                className="px-4 py-2 border border-green-400 rounded-full hover:bg-green-600"
              >
                Customer
              </Link>
              <Link
                href="/order"
                className="px-4 py-2 border border-green-400 rounded-full hover:bg-green-600"
              >
                Order
              </Link>
              <InventoryMenu />
              <ReportsMenu />
              <Link
                href="/analytics"
                className="px-4 py-2 border border-green-400 rounded-full hover:bg-green-600"
              >
                Analytics
              </Link>
            </div>
          </div>

          <div className="flex items-center relative avatar-container">
            <div
              className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-lg border-2 border-green-400 cursor-pointer hover:bg-green-700 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-white font-bold text-sm">
                {getUserInitial()}
              </span>
            </div>

            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-700 font-bold text-sm">
                        {getUserInitial()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
                      Admin
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={openProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </button>
                  <Link href="/settings">
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      App Settings
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showProfileSettings && <div className="h-16" />}

      {showProfileSettings && (
        <ProfileSettings onClose={() => setShowProfileSettings(false)} />
      )}
    </>
  );
}
