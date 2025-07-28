"use client";

import { useState } from "react";
import { navItems } from "../../_constants/sidebar";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-[#0d1b3f] text-white py-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Welcome Mitesh !!</h1>

          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-[70%] h-full bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map(({ name, icon: Icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-colors duration-200"
                >
                  <Icon className="w-6 h-6 mr-3 text-white" />
                  <span className="text-white font-medium">{name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
