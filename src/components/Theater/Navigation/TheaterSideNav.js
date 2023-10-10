import React from "react";
import "../stylesTheater/theatersidenav.css";
import { Link } from "react-router-dom";

function TheaterSideNav() {
  return (
    <div className="theaterSideNav">
      <div className="sideNav">
        <ul>
          <Link className="sideNavLinks" to="/viewTheaters">
            <li>THEATERS</li>
          </Link>

          <Link className="sideNavLinks" to="/seatLayout">
            <li>SEAT LAYOUT</li>
          </Link>
          <Link className="sideNavLinks" to="/">
            <li>THEATERS</li>
          </Link>

          <Link className="sideNavLinks" to="">
            <li>SEATING</li>
          </Link>

          <Link
            className="sideNavLinks"
            to="/theaterAdmin/movieschedulelisting"
          >
            <li>MOVIE SCHEDULES</li>
          </Link>

          <Link className="sideNavLinks" to="/newTheater">
            <li>ADD THEATER SEAT</li>
          </Link>

          <Link className="sideNavLinks" to="">
            <li>CREATE A NEW MOVIE SCHEDULE</li>
          </Link>

          <Link className="sideNavLinks" to="/addCounter">
            <li>REGISTER A NEW COUNTER</li>
          </Link>
          <Link className="sideNavLinks" to="">
            <li>ADD THEATER SEAT</li>
          </Link>

          <Link className="sideNavLinks" to="/theaterAdmin/movieschedule">
            <li>CREATE A NEW MOVIE SCHEDULE</li>
          </Link>

          <Link className="sideNavLinks" to="">
            <li>REGISTER A NEW COUNTER</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default TheaterSideNav;
