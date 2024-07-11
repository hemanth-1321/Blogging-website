import React from "react";
import { NavBar } from "../components/NavBar";

export const Landing = () => {
  return (
    <div>
      <NavBar />
      <div className=" grid lg:grid-cols-2  sm:grid-cols-1 ">
        <div className="bg-slate-900 flex flex-col h-screen items-center justify-center">
          <h1 className="text-white font-extrabold text-5xl hover:text-shadow-glow">
            BLOGY-VERSE
          </h1>
          <p className="text-white mt-2 hover:text-shadow-glow">
            Unleash Your Thoughts
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};
