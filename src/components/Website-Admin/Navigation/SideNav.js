import React from "react";
import { Link } from "react-router-dom";
import sidenav from './sidenav.css';

function SideNav() {
  return (
    <div className="sideNav">
      <ul>
      <Link className="sideNavLinks" to="/web-admin">
          <li> DASHBOARD</li>
        </Link>
        <Link className="sideNavLinks" to="/web-admin/cinema">
          <li> CREATE CINEMA</li>
        </Link>
        <Link to="/web-admin/add-user" className="sideNavLinks">
          <li> CREATE CINEMA ADMIN</li>
        </Link>
        <Link to="/counter/history" className="sideNavLinks">
          <li> UPDATE CINEMA </li>
        </Link>
        <Link to="/counter/history" className="sideNavLinks">
          <li> UPDATE CINEMA ADMIN</li>
        </Link>
        <Link className="sideNavLinks" to="/web-cinemas">
          <li> CINEMAS</li>
        </Link>
        <Link className="sideNavLinks" to="/web-users">
          <li> CINEMA ADMINS</li>
        </Link>
        <Link className="sideNavLinks" to="/web-movies">
          <li> MOVIES</li>
        </Link>
        <Link className="sideNavLinks" to="/counter">
          <li> ARCHIVED</li>
        </Link>

        <li className="exist">LOGOUT</li>
      </ul>
    </div>
  );
}

export default SideNav;
