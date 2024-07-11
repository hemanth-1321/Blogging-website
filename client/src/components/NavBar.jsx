import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-3  top-0 w-full shadow-lg z-50 bg-black text-white">
      <div className="ml-4 lg:ml-32">
        <h1 className="font-semibold">Blogy-Verse</h1>
      </div>

      <div className="hidden lg:flex gap-4 mr-4 lg:mr-32">
        <Link to={"/login"}>
          <button className="px-4 py-2 bg-blue-900 text-white rounded">
            Login
          </button>
        </Link>
        <Link to={"/register"}>
          <button className="px-4 py-2 bg-blue-900 text-white rounded">
            Get started
          </button>
        </Link>
      </div>

      <div className="lg:hidden flex items-center mr-4">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FiAlignJustify size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-12 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2">
          <Link to={"/login"} onClick={() => setMenuOpen(false)}>
            <button className="w-full px-4 py-2 bg-blue-800 text-white rounded">
              Login
            </button>
          </Link>
          <Link to={"/register"} onClick={() => setMenuOpen(false)}>
            <button className="w-full px-4 py-2 bg-blue-800 text-white rounded">
              Get started
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
