import React from "react";
import { NavBar } from "../components/NavBar";

export const LandingPage = () => {
  return (
    <div className="h-lvh w-lvw bg-black relative">
      <header>
        <NavBar />
      </header>

      <div className="absolute left-4 top-56  md:left-20 md:top-40 lg:left-40 lg:top-60">
        <h1 className="text-slate-200 font-extrabold text-2xl md:text-4xl lg:text-6xl leading-tight">
          "Where every moment becomes a shared memory."
        </h1>
      </div>
    </div>
  );
};
