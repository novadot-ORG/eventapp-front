import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import { message } from "antd";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activePage = location.pathname.split("/")[1];

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");

  //   navigate("/");
  // };
  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.log("No auth token found");
      message.error("You are not logged in.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://appevent-2d8g.onrender.com/logout2",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Response Status:", response.status);
      console.log("Response Body:", await response.clone().text());
  
      if (response.ok) {
     
        const responseText = await response.text();
        console.log("Response Text:", responseText);
  

        if (responseText === "Logged out successfully") {
          message.success("Logged out successfully");
          localStorage.removeItem("authToken");
          navigate("/");
        } else {
          message.error("Unexpected response: " + responseText);
          console.log(responseText); 
        }
      } else {
    
        message.error(`Logout failed: ${response.statusText}`);
        console.error("Error:", response.statusText);
      }
    } catch (error) {
    
      message.error("An error occurred during logout.");
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
    const handleStorageChange = () => {
      if (!localStorage.getItem("authToken")) {
        navigate("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link
            className={`nav-link ${activePage === "home" ? "active" : ""}`}
            to="/home"
          >
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link
            className={`nav-link ${activePage === "checkin" ? "active" : ""}`}
            to="/checkin"
          >
            <i className="bi bi-check-circle"></i>
            <span>Check IN</span>
          </Link>
        </li> */}
        <li className="nav-item">
          <Link
            className={`nav-link ${activePage === "report" ? "active" : ""}`}
            to="/report"
          >
            <i className="bi bi-bar-chart-line"></i>
            <span>Report</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activePage === "profile" ? "active" : ""}`}
            to="/profile"
          >
            <i className="bi bi-person-circle"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
