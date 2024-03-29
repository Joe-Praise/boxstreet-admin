import React from "react";
import "./sidenav.css";
import { Link,useNavigate } from "react-router-dom";
import config from "../../../config";
import axios from "axios";
function Sidenav() {
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
          navigate("/cinema");
        }
        localStorage.clear()
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="sidenav">
      <ul>
        <Link className="sideNavLinks" to="/cinema">
          <li>DASHBOARD</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/create-branch">
          <li>CREATE BRANCH</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/create-theater">
          <li>CREATE THEATER</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/create-category">
          <li>CREATE SEAT CLASS</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/create-theater-admin">
          <li>ADD USER</li>
        </Link>
        <Link to="/cinema/view-branch" className="sideNavLinks">
          <li>VIEW BRANCH</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/view-user">
          <li>VIEW USERS</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/account">
          <li>CINEMA ACCOUNT</li>
        </Link>
        <Link className="sideNavLinks" to="/cinema/profile">
          <li>PROFILE</li>
        </Link>
        <div className="sideNavLinks">
        <li className="cinem-admin-log-out" onClick={LogOut}>LOG OUT</li>
        </div>
       
      </ul>
    </div>
  );
}

export default Sidenav;