import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 text-black py-4  z-10 shadow">
      <div className="container mx-auto flex justify-between items-center px-1 max-w-4xl">
        <a href="#" className="font-bold text-xl ml-1">
          Cute Timetable
        </a>
        <div className="flex items-center">
          <a href="#approvals" className="hidden sm:block mr-4">
            Support Me
          </a>
          <a href="#notifications" className="hidden sm:block mr-4">
            Suggestions
          </a>
          <a href="#api-details" className="hidden sm:block mr-4">
            About
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="hamburger"
            className="sm:hidden mr-4 -mt-0"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="sm:hidden">
        <div
          id="mobile-nav"
          className={`container ${isOpen ? "" : "hidden"} mx-auto px-4 py-2`}
        >
          <a
            href="#approvals"
            className="block sm:inline-block  font-medium mr-4 mt-4 md:mt-0"
          >
            Support Me
          </a>
          <a
            href="#notifications"
            className="block md:inline-block font-medium mr-4 mt-4 md:mt-0"
          >
            Suggestions
          </a>
          <a
            href="#api-details"
            className="block md:inline-block font-medium mr-4 mt-4 md:mt-0"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
