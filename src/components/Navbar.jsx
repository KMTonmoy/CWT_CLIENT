'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/course' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-[#0B1221] text-[#07A8ED] px-6 py-4 shadow-lg border-b border-[#1E3A8A] sticky top-0 z-40">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold cursor-pointer select-none">
            <span className="text-[#07A8ED] hover:text-white transition-colors">CWT</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 font-semibold text-lg">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-200
                      ${isActive(item.path)
                        ? 'text-white bg-[#1E3A8A]'
                        : 'text-[#E5E7EB] hover:text-white hover:bg-[#1E3A8A]/50'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className="border border-[#07A8ED] text-[#07A8ED] px-6 py-2 rounded-lg font-bold hover:bg-[#07A8ED] hover:text-[#0B1221] transition-all duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/login"
              className="border border-[#07A8ED] text-[#07A8ED] px-4 py-1 rounded-lg font-bold hover:bg-[#07A8ED] hover:text-[#0B1221] transition-all duration-300 text-sm"
            >
              Login
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button text-[#07A8ED] hover:text-white transition p-2 rounded-lg hover:bg-[#1E3A8A]/30"
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Side Menu */}
      <div
        className={`mobile-menu fixed top-0 left-0 h-full w-64 bg-[#0B1221] shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E3A8A]">
          <h2 className="text-xl font-bold text-[#07A8ED]">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#07A8ED] hover:text-white p-2 rounded-lg hover:bg-[#1E3A8A]/30 transition-colors"
            type="button"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-lg font-medium
                    ${isActive(item.path)
                      ? 'text-white bg-gradient-to-r from-[#1E3A8A] to-[#07A8ED]/30'
                      : 'text-[#E5E7EB] hover:text-white hover:bg-[#1E3A8A]/30'
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

          {/* Extra Mobile Login Button */}
          <div className="mt-8 pt-6 border-t border-[#1E3A8A]/50">
            <Link
              href="/login"
              className="block w-full text-center border-2 border-[#07A8ED] text-[#07A8ED] py-3 px-4 rounded-lg font-bold hover:bg-[#07A8ED] hover:text-[#0B1221] transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>

          {/* Footer Info */}
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