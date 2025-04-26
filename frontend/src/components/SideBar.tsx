import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo-container">
        <div className="logo-icon">
          <div className="logo-dot"></div>
        </div>
        <h1 className="logo-text">
          Form<span className="logo-separator">›</span>Fitness
        </h1>
      </div>

      {/* Menu */}
      <div className="menu">
        <button className="menu-button">
          <FaTachometerAlt className="menu-icon" />
          <span>Dashboard</span>
        </button>
      </div>

      {/* User Info */}
      <div className="user-info">
        <div className="user-details">
          <div className="user-avatar"></div>
          <span className="user-name">NAME</span>
        </div>
        <FiChevronDown className="dropdown-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
