import { useEffect, useState } from "react";

import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "./redux/counter/userSlice";
import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { ProfilePage } from "./pages/ProfilePage";
import axiosInstance from "./axiosConfig";
import { Feed } from "./pages/Feed";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axiosInstance.get("check-auth", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.isAuthenticated) {
            dispatch(setUsername(response.data.username));
            setSuccess(true);
          } else {
            setSuccess(false);
          }
        } catch (error) {
          console.log("Authentication check failed:", error.message);
          toast.error("Authentication Failed");
          navigate("/login");
        }
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (success == true) {
      navigate("/feed");
    } else {
      navigate("/");
    }
  }, [success, navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
