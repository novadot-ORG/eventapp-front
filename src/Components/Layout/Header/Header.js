import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSidebarToggle = () => {
    document.body.classList.toggle("toggle-sidebar");
    toggleSidebar(); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <div className="logo d-flex align-items-center">
          <span className="">MMI</span>
        </div>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={handleSidebarToggle}
        ></i>
      </div>

      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        ></form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <div
              className="nav-link nav-profile d-flex align-items-center pe-0"
              style={{cursor:"pointer"}}
              onClick={toggleDropdown}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&s"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                ADMIN
              </span>
            </div>
            {/* <ul
              className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${
                dropdownOpen ? "show" : ""
              }`}
              style={{
                marginTop: "30px",
                right: "0",
                maxWidth: "200px",
              }}
            >
              <li>
              <div className="dropdown-item d-flex align-items-center "  >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                  </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <div className="dropdown-item d-flex align-items-center" >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </div>
              </li>
            </ul> */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
