import React from "react";
import '../stylesCounter/sidenav.css'
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/">
          <li>MOVIE SCHDULES</li>
        </Link>

        <Link className="sideNavLinks" to="">
          <li>VIEW BOOKINGS</li>
        </Link>

        {/* <Link to="/seat" className="sideNavLinks">
          <li>SEAT BOOKINGS</li>
        </Link> */}

        <Link className="sideNavLinks" to="">
          <li> SETTINGS</li>
        </Link>
        
        <Link className="sideNavLinks" to="">
          <li>FAQs</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideNav;
