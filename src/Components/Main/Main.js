import React, { useState } from "react";
import Header from "../Layout/Header/Header";
import Sidebar from "../Layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Main.css"; // Import a CSS file for layout styles

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is open by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`main-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="content-container">
          <Outlet context={{ isSidebarOpen }} />
        </div>
      </div>
    </div>
  );
};

export default Main;
