import React from "react";
import "../stylesTheater/theatersidenav.css";
import { Link } from "react-router-dom";

function TheaterSideNav() {
  return (
    <div className="theaterSideNav">
      <div className="sideNav">
        <ul>
          <Link className="sideNavLinks" to="/theater-admin">
            <li>HOME</li>
          </Link>
          <Link className="sideNavLinks" to="/view-theaters">
            <li>VIEW THEATERS</li>
          </Link>

          <Link className="sideNavLinks" to="/new-theater">
            <li>ADD THEATER</li>
          </Link>

          <Link className="sideNavLinks" to="/seat-layout">
            <li>SEAT LAYOUT</li>
          </Link>

          <Link
            className="sideNavLinks"
            to="/theater-admin/movieschedulelisting"
          >
            <li>VIEW SCHEDULES</li>
          </Link>

          <Link className="sideNavLinks" to="/theater-admin/movieschedule">
            <li>CREATE SCHEDULE</li>
          </Link>

          <Link className="sideNavLinks" to="/add-counter">
            <li>REGISTER COUNTER</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default TheaterSideNav;
