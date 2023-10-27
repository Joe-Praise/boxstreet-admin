import React from "react";
import "./navigation.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/account">
          <li>DASHBOARD</li>
        </Link>
        
        <Link className="sideNavLinks" to="/account/view-account">
          <li>VIEW BRANCH ACCOUNT</li>
        </Link>
       
        <div className="sideNavLinks">
        <li className="">LOG OUT</li>
        </div>
       
      </ul>
    </div>
  );
}

export default Sidebar;