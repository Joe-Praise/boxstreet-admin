import React from "react";
import "../stylesTheater/theatersidenav.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import homeicon from '../TheaterIcons/dashboard.png'
import viewtheater from '../TheaterIcons/theater.png'
import addtheater from '../TheaterIcons/seats.png'
import addseat from '../TheaterIcons/car-seat.png'
import viewmovies from '../TheaterIcons/clapperboard.png'
import addmovies from '../TheaterIcons/add-movie.png'
import viewschedule from '../TheaterIcons/calendar.png'
import createschedule from '../TheaterIcons/to-do-list.png'
import logout from '../TheaterIcons/logout.png'

function TheaterSideNav() {
  const navigate = useNavigate();

  const handleLogOut = () => {
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
          <img src={homeicon} alt="" />
          <li>HOME</li>
        </Link>
        <Link className="theatersideNavLinks" to="/theater/view-theaters">
          <img src={viewtheater} alt="" />
          <li>VIEW THEATERS</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/new-theater">
          <img src={addtheater} alt="" />
          <li>ADD THEATER</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/add-seat">
          <img src={addseat} alt="" />
          <li>ADD SEAT</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/view-movies">
          <img src={viewmovies} alt="" />
          <li>VIEW MOVIES</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/add-movie">
          <img src={addmovies} alt="" />
          <li>ADD MOVIE</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/movieschedulelisting">
          <img src={viewschedule} alt="" />
          <li>VIEW SCHEDULES</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/movieschedule" >
          <img src={createschedule} alt="" />
          <li>CREATE SCHEDULE</li>
        </Link>

        <Link className="theatersideNavLinks" to="/theater/profile">
          <li>PROFILE</li>
        </Link>

        <li className="exist" onClick={handleLogOut}>
          <img src={logout} alt="" />
          LOGOUT
        </li>
      </ul>
    </div>
  );
}

export default TheaterSideNav;
