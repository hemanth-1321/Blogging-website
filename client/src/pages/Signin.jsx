import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../components/Icon";
import { setUsername } from "../redux/counter/userSlice";
export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Corrected to camelCase
  const [loading, setLoading] = useState(false); // Include the loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  console.log(username);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true at the start of the submission

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      const { username } = response.data;
      dispatch(setUsername(username));
      toast.success("SignUp Successful!");
      console.log("submitted", response.data);
      navigate(`/profile/${username}`);
    } catch (error) {
      toast.error("SignUp Failed!");
      console.log("failed", error.message);
    } finally {
      setLoading(false); // Reset loading to false after the request is complete
    }
  };

  return (
    <div className="bg-black h-screen w-screen relative">
      <Icon />

      <div className="flex flex-col justify-center items-center m-10">
        <h1 className="text-slate-300 text-xl lg:text-3xl mb-8 font-bold text-center">
          Sign-In!
        </h1>{" "}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-10 py-8">
          <ToastContainer />
          <form className="flex flex-col" onSubmit={handlerSubmit}>
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
              onChange={(e) => setPassword(e.target.value)} // Corrected to camelCase
            />
            <div className="flex justify-center items-center m-4">
              <button
                className="bg-slate-300 text-lg p-2 rounded"
                type="submit"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Signing In..." : "SignIn"}
              </button>
            </div>
          </form>
          <div className="flex w-full justify-center items-center m-4">
            <p className="text-slate-300">
              Do not have an Account?{" "}
              <a href="/register" className="font-bold">
                Sign-up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
