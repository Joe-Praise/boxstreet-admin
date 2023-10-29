import React from "react";
// import "../stylesCounter/nav.css";
import logo from "../../../uploads/Screenshot__335_-removebg-preview (1).png";
import Sidenav from "../Sidenav/Sidenav";
import "./topnav.css"
import { Link } from "react-router-dom";

function Topnav() {
  let username = localStorage.getItem("fullname")
  console.log(username)
  return (
    <header>
      <div className="navHead">
        <nav className="navigation">
          <div>
            <Link to="/">
              <img className="logo" src={logo} alt="web logo" />
            </Link>
          </div>
          <div>
            <ul className="navlinks">
              <Link to="/" className="textdecor">
                <li className="bsColour">{ "Cinema Admin " + username}</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="navlinks">
              <Link to='/counter/history'>
                {/* <li className="from-left-and-back">BOOKING HISTORY</li> */}
              </Link>
              {/* <li className="from-left-and-back">SIGN IN</li> */}
            </ul>
          </div>
        </nav>
      </div>
      <Sidenav/>
    </header>
  );
}

export default Topnav;