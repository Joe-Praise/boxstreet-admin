import React from "react";
import '../stylesCounter/sidenav.css'
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/counter">
          <li>Home</li>
        </Link>

        <Link to="/counter/history" className="sideNavLinks">
          <li>Booking History</li>
        </Link>

        <Link className="sideNavLinks" to="/counter/profile">
          <li>Counter Profile</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideNav;
