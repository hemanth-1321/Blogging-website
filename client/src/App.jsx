import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./authComponent/Signup";
import { Signin } from "./authComponent/Signin";
import { Landing } from "./pages/Landing";
import InfiniteScrollPosts from "./pages/Home";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/home" element={<InfiniteScrollPosts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
