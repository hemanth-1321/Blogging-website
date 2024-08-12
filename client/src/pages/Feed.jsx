import React from "react";
import { Link } from "react-router-dom";

export const Feed = () => {
  return (
    <div>
      Feed
      <Link to={"/"}>
        {" "}
        <button className="bg-slate-500">Home</button>
      </Link>
    </div>
  );
};
