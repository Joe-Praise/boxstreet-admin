import React from "react";
import '../stylesCounter/sidenav.css'
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/counter">
          <li>HOME</li>
        </Link>

        <Link to="/counter/history" className="sideNavLinks">
          <li>BOOKING HISTORY</li>
        </Link>

        <Link className="sideNavLinks" to="/counter/profile">
          <li> PROFILE</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideNav;
