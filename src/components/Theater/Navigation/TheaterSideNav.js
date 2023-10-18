import React from "react";
import "../stylesTheater/theatersidenav.css";
import { Link } from "react-router-dom";

function TheaterSideNav() {
  return (
    <div className="theaterSideNav">
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

          <Link className="theatersideNavLinks" to="/theater/view-movies">
            <li>VIEW MOVIES</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater/add-movie">
            <li>ADD MOVIE</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater/movieschedulelisting">
            <li>VIEW SCHEDULES</li>
          </Link>


          <Link className="theatersideNavLinks" to="">
            <li>CREATE SCHEDULE</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater/add-counter">
            <li>REGISTER COUNTER</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater/profile">
            <li>PROFILE</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default TheaterSideNav;
