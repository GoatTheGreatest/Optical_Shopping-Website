"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import InventoryMenu from "./Inventory_Button";
import ReportsMenu from "./Reports_Menu";
import ProfileSettings from "./ProfileSettings";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [isHydrated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".avatar-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleProfileSettings = () => {
    setShowDropdown(false);
    setShowProfileSettings(true);
  };

  // Show loading state until hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex space-x-10 align-middle py-3 bg-[linear-gradient(135deg,_rgb(0,0,0)_0%,_#035e26_69%,_#019f32_89%)] text-white p-6 max-w-full flex-wrap justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex align-middle justify-center">
            <img
              src="/Images/opticofynav.png"
              alt="Opticofy"
              className="object-contain h-10 w-10"
            />
            <p className="py-1 font-bold text-2xl">Opticofy</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex space-x-10 align-middle py-3 bg-[linear-gradient(135deg,_rgb(0,0,0)_0%,_#035e26_69%,_#019f32_89%)] text-white p-6 max-w-full flex-wrap justify-between">
        <div className="flex items-center space-x-4">
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

        {/* User Avatar */}
        <div className="flex items-center relative avatar-container">
          <div
            className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-lg border-2 border-green-400 cursor-pointer hover:bg-green-700 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-white font-bold text-sm">
              {getUserInitial()}
            </span>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
              {/* User Profile Section */}
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

              {/* Settings and Logout Section */}
              <div className="py-1">
                <button
                  onClick={handleProfileSettings}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Profile Settings</span>
                </button>
                <Link href="/settings">
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>App Settings</span>
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Settings Page */}
      {showProfileSettings && (
        <ProfileSettings onClose={() => setShowProfileSettings(false)} />
      )}
    </div>
  );
}

export default Navbar;
