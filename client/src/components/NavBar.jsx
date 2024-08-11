import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4">
        <div className="text-slate-300 font-extrabold">Tweeko</div>
        <div className="hidden lg:flex space-x-4">
          <Link to="/register">
            <button className="bg-slate-300 p-1.5 rounded">Register</button>
          </Link>
          <Link to="/login">
            <button className="bg-slate-300 p-1.5 rounded">Login</button>
          </Link>
        </div>

        <div className="lg:hidden bg-slate-300 p-2 rounded">
          <AiOutlineMenu size={24} onClick={toggleMenu} />
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute right-4 top-12 bg-gray-800 p-4 rounded-lg space-y-2 ">
            <Link to="/register">
              <button className="bg-slate-300 p-1 rounded w-full mb-2">
                Register
              </button>
            </Link>

            <Link to="/login">
              <button className="bg-slate-300 p-1 rounded w-full">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
