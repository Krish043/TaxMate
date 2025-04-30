import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AI from "./pages/AI";
import ITC from "./pages/ITC";
import Mismatch from "./pages/Mismatch";
import Wallet from "./pages/Wallet";
import Tax from "./pages/Tax";
import Signup from "./pages/Signup";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
function App() {
  const [isAuth, setIsAuth] = useState({ name: "", email: "", auth: false });
  const localAuth = localStorage.getItem("auth");
  if (!localAuth)
    localStorage.setItem(
      "auth",
      JSON.stringify({ name: "", email: "", auth: "" })
    );
  const auth = JSON.parse(localAuth);
  return (
    <div className="mt-12">
      <BrowserRouter>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/ai" element={<AI />}></Route>
          <Route path="/itc" element={<ITC />}></Route>
          <Route path="/mismatch" element={<Mismatch />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
          <Route path="/tax" element={<Tax />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
