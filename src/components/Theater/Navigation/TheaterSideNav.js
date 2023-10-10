import React from 'react'
import { Link } from "react-router-dom";

function TheaterSideNav() {
  return (
    <div>
        <div className="sideNav">
      <ul>
        <Link className="sideNavLinks" to="/">
          <li>THEATERS</li>
        </Link>

        <Link className="sideNavLinks" to="">
          <li>SEATING</li>
        </Link>

        <Link className="sideNavLinks" to="">
          <li>MOVIE SCHEDULES</li>
        </Link>

        <Link className="sideNavLinks" to="">
          <li>ADD THEATER SEAT</li>
        </Link>
        
        <Link className="sideNavLinks" to="">
          <li>CREATE A NEW MOVIE SCHEDULE</li>
        </Link>

        <Link className="sideNavLinks" to="">
          <li>REGISTER A NEW COUNTER</li>
        </Link>
      </ul>
    </div>
    </div>
  )
}

export default TheaterSideNav