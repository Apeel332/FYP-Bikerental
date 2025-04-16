import React from "react";
import {
  BsShield,
  BsGrid1X2Fill,
  BsHousesFill,
  BsHouseAddFill,
  BsExclamationTriangle,
  BsFileEarmarkText,
} from "react-icons/bs";
import "../admin/admin.css"
import { IoIosLogOut } from "react-icons/io";
// import BikeShops from "./bikeshops";



function ManagerSidebar({ openSidebarToggle, OpenSidebar }) {
   // Function to handle logout
   const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page or any other desired page
    window.location.href = "/Login";
  };
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsShield className="icon_header" /> Manager
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/manager">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/shopdetail">
            <BsHousesFill className="icon" /> Shop Details
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/shopmanage">
            <BsHouseAddFill className="icon" /> Shop Manage
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/managebikes">
            <BsExclamationTriangle className="icon" /> Manage Bikes 
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/bookingreq">
            <BsExclamationTriangle className="icon" /> Bike Booking 
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/Login" onClick={handleLogout}>
            <IoIosLogOut className="icon" /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default ManagerSidebar;
