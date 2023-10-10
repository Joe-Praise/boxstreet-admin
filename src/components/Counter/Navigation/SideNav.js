import React from "react";
import '../stylesCounter/sidenav.css'
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/counter">
          <li>Movies</li>
        </Link>

        <Link className="sideNavLinks" to="">
          <li>Payments</li>
        </Link>

        <Link to="/seat" className="sideNavLinks">
          <li>Seat Bookings</li>
        </Link>

        <Link className="sideNavLinks" to="">
          <li>Counter Settings</li>
        </Link>
        
        <Link className="sideNavLinks" to="">
          <li>FAQs</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideNav;
