import React from "react";
import "../stylesTheater/theatersidenav.css";
import { Link } from "react-router-dom";

function TheaterSideNav() {
  return (
    <div className="theaterSideNav">
      <div className="theatersideNav">
        <ul>
        <Link className="theatersideNavLinks" to="/theater-admin">
            <li>HOME</li>
          </Link>
          <Link className="theatersideNavLinks" to="/theater-admin/view-theaters">
            <li>VIEW THEATERS</li>
          </Link>
          
          <Link className="theatersideNavLinks" to="/theater-admin/new-theater">
            <li>ADD THEATER</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater-admin/view-movies">
            <li>VIEW MOVIES</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater-admin/add-movie">
            <li>ADD MOVIE</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater-admin/movieschedulelisting">
            <li>VIEW SCHEDULES</li>
          </Link>


          <Link className="theatersideNavLinks" to="">
            <li>CREATE SCHEDULE</li>
          </Link>

          <Link className="theatersideNavLinks" to="/theater-admin/add-counter">
            <li>REGISTER COUNTER</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default TheaterSideNav;
