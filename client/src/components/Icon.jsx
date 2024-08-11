import React from "react";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
export const Icon = () => {
  return (
    <div className="p-8">
      <Link to={"/"}>
        {" "}
        <IoMdHome className="bg-white" />
      </Link>
    </div>
  );
};
