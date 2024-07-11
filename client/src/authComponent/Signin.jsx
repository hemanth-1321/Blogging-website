import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", {
        username,
        email,
        password,
      });

      toast.success("Login Sucessfull!");
      console.log("submitted", response.data);
      navigate("/home");
    } catch (error) {
      toast.error("Login Failed!");
      console.log("falied", error.message);
    }
  };
  return (
    <div className="bg-black h-screen flex flex-col justify-center ">
      <div>
        <ToastContainer />
        <form
          className="flex flex-col items-center p-5 gap-4 "
          onSubmit={handlerSubmit}
        >
          <h1 className="text-5xl font-semibold mb-9 text-white">
            Welcome Back!
          </h1>
          <div className="flex flex-col gap-3">
            <label className="font-bold text-4xl text-white" htmlFor="username">
              Username
            </label>
            <input
              className="p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="username"
              name="username"
              type="text"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            {" "}
            <label
              className="font-bold text-4xl  text-white"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              name="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-950 rounded text-red-50 p-2"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
