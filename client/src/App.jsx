import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./authComponent/Signup";
import { Signin } from "./authComponent/Signin";
import { Landing } from "./pages/Landing";
import { UpdateProfile } from "./pages/UpdateProfile";
import { Home } from "./pages/Home";
import { Profile } from "./components/Profile";
import { Provider } from "react-redux";

import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
