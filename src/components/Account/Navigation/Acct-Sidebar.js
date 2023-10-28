import React from "react";
import "./navigation.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../../config";

function Sidebar() {
  const navigate = useNavigate();
  const LogOut = () => {
    axios
      .post(Config.MGT_BASE_URL + "/logOut", {})
      .then((response) => {
        const data = response.data;

        if (data === "LogOut Successful") {
          localStorage.removeItem("branch_id");
          localStorage.removeItem("branch");
          localStorage.removeItem("cinema_id");
          localStorage.removeItem("cinema");
          localStorage.removeItem("user_id");
          localStorage.removeItem("fullname");
          navigate("/");
        } else {
          alert("Log out unsucessful!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/account">
          <li>DASHBOARD</li>
        </Link>

        {/* <Link className="sideNavLinks" to="/account/view-account">
          <li>VIEW BRANCH ACCOUNT</li>
        </Link> */}

        <div className="sideNavLinks">
          <li className="exist" onClick={LogOut}>
            LOG OUT
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
