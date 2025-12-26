"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { useUserData } from "@/hooks/useUserData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logOut } = useContext(AuthContext);

  const { userData, loading } = useUserData();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
      if (
        isUserMenuOpen &&
        !event.target.closest(".user-menu") &&
        !event.target.closest(".user-menu-button")
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, isUserMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener("popstate", closeMenu);
    return () => window.removeEventListener("popstate", closeMenu);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/course" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (loading) {
    return (
      <nav className="bg-[#0B1221] text-[#07A8ED] px-6 py-4 shadow-lg border-b border-[#1E3A8A] sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-extrabold">
            <span className="text-[#07A8ED]">CWT</span>
          </Link>
          <div className="animate-pulse bg-gray-700 h-8 w-24 rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-[#0B1221] text-[#07A8ED] px-6 py-4 shadow-lg border-b border-[#1E3A8A] sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-extrabold">
            <span className="text-[#07A8ED] hover:text-white transition-colors">
              CWT
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 font-semibold text-lg">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-200
                      ${
                        isActive(item.path)
                          ? "text-white bg-[#1E3A8A]"
                          : "text-[#E5E7EB] hover:text-white hover:bg-[#1E3A8A]/50"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {userData ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-menu-button flex items-center space-x-2 border border-[#07A8ED] text-[#07A8ED] px-6 py-2 rounded-lg font-bold hover:bg-[#07A8ED] hover:text-[#0B1221] transition-all duration-300"
                >
                  {userData?.photoURL ? (
                    <Image
                      src={userData.photoURL}
                      alt={userData.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#07A8ED] flex items-center justify-center text-[#0B1221] font-bold">
                      {userData.name?.[0] || userData.email?.[0] || "U"}
                    </div>
                  )}
                  <span>{userData.name || "Account"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0B1221] border border-[#1E3A8A] rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-[#1E3A8A]">
                        <p className="text-sm font-medium text-white">
                          {userData.name || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {userData.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1E3A8A] hover:text-white transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1E3A8A] hover:text-white transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="border border-[#07A8ED] text-[#07A8ED] px-6 py-2 rounded-lg font-bold hover:bg-[#07A8ED] hover:text-[#0B1221] transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {userData ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="text-sm text-[#07A8ED] hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-red-500 text-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="border border-[#07A8ED] text-[#07A8ED] px-4 py-1 rounded-lg font-bold hover:bg-[#07A8ED] hover:text-[#0B1221] transition-all duration-300 text-sm"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button text-[#07A8ED] hover:text-white transition p-2 rounded-lg hover:bg-[#1E3A8A]/30"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`mobile-menu fixed top-0 left-0 h-full w-64 bg-[#0B1221] shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#1E3A8A]">
          <h2 className="text-xl font-bold text-[#07A8ED]">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#07A8ED] hover:text-white p-2 rounded-lg hover:bg-[#1E3A8A]/30 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {userData && (
            <div className="mb-6 p-4 bg-[#1E3A8A]/20 rounded-lg">
              <div className="flex items-center space-x-3">
                {userData?.photoURL ? (
                  <Image
                    src={userData.photoURL}
                    alt={userData.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#07A8ED] flex items-center justify-center text-[#0B1221] font-bold text-lg">
                    {userData.name?.[0] || userData.email?.[0] || "U"}
                  </div>
                )}
                <div>
                  <p className="font-medium text-white">
                    {userData.name || "User"}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {userData.email}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <Link
                  href="/dashboard"
                  className="flex-1 text-center py-2 bg-[#07A8ED] text-[#0B1221] rounded-lg font-medium hover:bg-[#07A8ED]/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 text-center py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-lg font-medium
                    ${
                      isActive(item.path)
                        ? "text-white bg-gradient-to-r from-[#1E3A8A] to-[#07A8ED]/30"
                        : "text-[#E5E7EB] hover:text-white hover:bg-[#1E3A8A]/30"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {isActive(item.path) && (
                    <span className="ml-2 w-2 h-2 bg-[#07A8ED] rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {!userData && (
            <div className="mt-8 pt-6 border-t border-[#1E3A8A]/50">
              <Link
                href="/login"
                className="block w-full text-center border-2 border-[#07A8ED] text-[#07A8ED] py-3 px-4 rounded-lg font-bold hover:bg-[#07A8ED] hover:text-[#0B1221] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-[#E5E7EB]/70">
            <p>Code With Tonmoy</p>
            <p className="mt-1">Learn to Code</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
