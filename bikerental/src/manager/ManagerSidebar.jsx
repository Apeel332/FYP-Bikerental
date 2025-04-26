import React from "react";
import {
  BsShield,
  BsGrid1X2Fill,
  BsHousesFill,
  BsHouseAddFill,
  BsExclamationTriangle,
  
} from "react-icons/bs";

import { TbMotorbike, TbBike } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
// import BikeShops from "./bikeshops";



function ManagerSidebar({ openSidebarToggle, OpenSidebar }) {
   // Function to handle logout
   const handleLogout = () => {
    // Remove the token from local storag
    localStorage.removeItem("token");
    // Redirect to the login page or any other desired page
    window.location.href = "/Login";
  };
  return (
    <aside
    id="managersidebar"
    className={`sidebar ${openSidebarToggle ? "sidebar-responsive" : ""}`}
    style={{ backgroundColor: "red", color: "white", minHeight: "100vh" }}
  >
    
  
      <div className="sidebar-title">
        <div className="sidebar-brand">
          Shop Dashboard
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
          <a href="/shopdetails ">
            <BsHousesFill className="icon" /> Shop Details
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/manageshop">
            <BsHouseAddFill className="icon" /> Manage Shop
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/managebikes">
            <TbMotorbike className="icon" /> Manage Bikes 
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/bookingreq">
            <TbBike className="icon" /> Bike Booking 
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/Login" onClick={handleLogout} style={{color: "red"
          }}>
            <IoIosLogOut className="icon" style={{color: "red"}} /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default ManagerSidebar;
