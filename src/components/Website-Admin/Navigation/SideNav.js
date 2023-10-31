import React from "react";
import { Link, useNavigate } from "react-router-dom";
import sidenav from './sidenav.css';
import axios from "axios";
import config from "../../config";

function SideNav() {
  const navigate = useNavigate();

  const LogOut = () => {
    axios
      .post(config.MGT_BASE_URL + "/logOut", {
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data === "LogOut Successful") {
          navigate("/");
        } else {
          navigate("/admin-web");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="sideNav">
      <ul>
      <Link className="sideNavLinks" to="/web-admin">
          <li> DASHBOARD</li>
        </Link>
        <Link to="/web-create-location" className="sideNavLinks">
          <li> CREATE LOCATION </li>
        </Link>
        <Link className="sideNavLinks" to="/web-admin/cinema">
          <li> CREATE CINEMA</li>
        </Link>
        <Link to="/web-admin/add-user" className="sideNavLinks">
          <li> CREATE ADMIN</li>
        </Link>
        <Link to="/web-view-location" className="sideNavLinks">
          <li> VIEW LOCATIONS</li>
        </Link>
        <Link className="sideNavLinks" to="/web-cinemas">
          <li>VIEW CINEMAS</li>
        </Link>
        <Link className="sideNavLinks" to="/web-users">
          <li> VIEW CINEMA ADMINS</li>
        </Link>
        {/* <Link className="sideNavLinks" to="/web-movies">
          <li> VIEW MOVIES</li>
        </Link>/ */}
        {/* <Link to="/web-theaters" className="sideNavLinks">
          <li> VIEW THEATERS</li>
        </Link> */}
        {/* <Link className="sideNavLinks">
          <li> BOOKING SUMMARY </li>
        </Link> */}
        {/* <Link className="sideNavLinks" to="/web-archives">
          <li> ARCHIVED</li>
        </Link> */}

        <li className="exist" onClick={LogOut}>LOGOUT</li>
      </ul>
    </div>
  );
}

export default SideNav;
