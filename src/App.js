import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Login/Register";
import Login from "./Components/Login/Login";
import "./App.css";
import Home from "./Components/Home/Home";
import Report from "./Components/Report/Report";
import Profile from "./Components/Profile/Profile";
import CheckIn from "./Components/Checkin/CheckIn";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route element={<Main />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkin" element={<CheckIn />} />
      </Route>
    </Routes>
  );
}

export default App;
