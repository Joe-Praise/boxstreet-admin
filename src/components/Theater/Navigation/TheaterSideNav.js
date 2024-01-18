import React from "react";
import "../stylesTheater/theatersidenav.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";

function TheaterSideNav() {
  const navigate = useNavigate();

  const LogOut = () => {
    axios
      .post(config.MGT_BASE_URL + "/logOut", {})
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data === "LogOut Successful") {
          navigate("/");
        } else {
          navigate("/theater");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="theatersideNav">
      <ul>
        <Link className="theatersideNavLinks" to="/theater">
          <li>HOME</li>
        </Link>
        <Link className="theatersideNavLinks" to="/theater/view-theaters">
          <li>VIEW THEATERS</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/new-theater">
          <li>ADD THEATER</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/add-seat">
          <li>ADD SEAT</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/view-movies">
          <li>VIEW MOVIES</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/add-movie">
          <li>ADD MOVIE</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/movieschedulelisting">
          <li>VIEW SCHEDULES</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/movieschedule" >
          <li>CREATE SCHEDULE</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/profile">
          <li>PROFILE</li>
        </Link>

        <li
          className="exist"
          onClick={LogOut}
        >
          LOGOUT
        </li>
      </ul>
    </div>
  );
}

export default TheaterSideNav;
