import React from "react";
import "./sidenav.css";
import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/cinema">
          <li>DASHBOARD</li>
        </Link>

        <Link to="/cinema/view-branch" className="sideNavLinks">
          <li>VIEW BRANCH</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/create-branch">
          <li>CREATE BRANCH</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/create-theater">
          <li>CREATE THEATER</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/create-category">
          <li>CREATE CATEGORY</li>
        </Link>

        <Link className="sideNavLinks" to="/cinema/create-theater-admin">
          <li>ADD USER</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/account">
          <li>VIEW ACCOUNT</li>
        </Link>
       
        <div className="sideNavLinks">
        <li className="">LOG OUT</li>
        </div>
       
      </ul>
    </div>
  );
}

export default Sidenav;