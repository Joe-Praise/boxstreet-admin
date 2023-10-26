import React, { useEffect, useState } from "react";
import axios from "axios";
import "../stylesCounter/nav.css";
import logo from "../../uploads/Screenshot__335_-removebg-preview (1).png";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import config from "../../config";

function CounterNav() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fullname = localStorage.getItem("fullname");
  const cinema = localStorage.getItem("cinema");
  const location = localStorage.getItem("branch");

  return (
    <header>
      <div className="navHead">
        <nav className="navigation">
          <div>
            <Link to="/web-admin">
              <img className="logo" src={logo} alt="web logo" />
            </Link>
          </div>
          <div>
            <ul className="navlinks">
              <Link to="/" className="textdecor">
                <li className="bsColour">Counter User - {cinema} - {location}</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="navlinks">
              <li className="from-left-and-back">Welcome back {fullname}</li>
            </ul>
          </div>
        </nav>
      </div>
      <SideNav />
    </header>
  );
}

export default CounterNav;
