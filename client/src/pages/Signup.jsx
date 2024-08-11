import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "../redux/counter/userSlice";

export const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/register", {
        fullname,
        username: usernameInput,
        email,
        password,
      });
      toast.success("SignUp Successful!");
      console.log("submitted", response.data);
      dispatch(setUsername(usernameInput));
      navigate(`/profile/${usernameInput}`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User Already Exists, please do login");
      } else {
        toast.error("SignUp Failed!");
        console.log("failed", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black h-screen w-screen relative flex flex-col justify-center items-center">
      <h1 className="text-slate-300 text-xl lg:text-3xl mb-8 font-bold text-center">
        Register Via Email!
      </h1>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-10 py-8">
        <ToastContainer />
        <form className="flex flex-col" onSubmit={handlerSubmit}>
          <label
            className="text-slate-300 text-xl m-2 font-bold"
            htmlFor="username"
          >
            FullName
          </label>
          <input
            className="lg:p-2 rounded outline-none"
            type="text"
            id="fullname"
            placeholder="Full-Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label
            className="text-slate-300 text-xl m-2 font-bold"
            htmlFor="username"
          >
            UserName
          </label>
          <input
            className="lg:p-2 rounded outline-none"
            type="text"
            id="username"
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <label
            className="text-slate-300 text-xl m-2 font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="lg:p-2 rounded outline-none"
            type="text"
            id="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="text-slate-300 text-xl m-2 font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="lg:p-2 rounded outline-none"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center items-center m-4">
            <button
              className="bg-slate-300 text-lg p-2 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center m-4">
          <p className="text-slate-300">
            Already have an Account?{" "}
            <a href="/login" className="font-bold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
