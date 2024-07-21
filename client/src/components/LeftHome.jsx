import React from "react";
import { IoMdHome } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export const LeftHome = () => {
  const location = useLocation();

  return (
    <div className="pl- bg-black h-screen">
      {" "}
      <div className="flex flex-col  items-start w-auto pl-60 pt-10">
        <div className="mb-4">
          <Link to="/home">
            {location.pathname === "/home" ? (
              <MdOutlineHome className="bg-white text-4xl m-4" />
            ) : (
              <IoMdHome className="bg-white text-4xl m-4" />
            )}
          </Link>
        </div>
        <div className="mt-4">
          <Link to="/profile">
            <CgProfile className="bg-white text-4xl m-4" />
          </Link>
        </div>
        <div className="w-px h-full bg-white ml-2"></div>
      </div>
    </div>
  );
};
