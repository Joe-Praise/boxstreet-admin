import React from "react";
import "../stylesCounter/nav.css";
import logo from "../uploads/FHC LOGO.png";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";

function CounterNav() {
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
                <li className="bsColour">MOVIE LISTINGS</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="navlinks">
              <li className="from-left-and-back">BOOKING HISTORY</li>
              <li className="from-left-and-back">SIGN IN</li>
            </ul>
          </div>
        </nav>
      </div>
      <SideNav />
    </header>
  );
}

export default CounterNav;
