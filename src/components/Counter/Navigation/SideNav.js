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
      <Link className="sideNavLinks" to="/counter">
          <li> DASHBOARD</li>
        </Link>
        <Link className="sideNavLinks" to="/counter/history">
          <li> BOOKINGS</li>
        </Link>
        <Link className="sideNavLinks" to="/counter/profile">
          <li> SETTING</li>
        </Link>
        <li className="exist" onClick={LogOut}>LOGOUT</li>
      </ul>
    </div>
  );
}

export default SideNav;
