import React from "react";
import logo from "../../../uploads/Screenshot__335_-removebg-preview (1).png";
import Sidenav from "../Sidenav/Sidenav";
import "./topnav.css"
import { Link } from "react-router-dom";
import DropDown from "../../DropDown/DropDown";

function Topnav() {
  let username = localStorage.getItem("fullname")
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
          <div className="drop-down-control">
          <DropDown/>
          </div>
        </nav>
      </div>
      <div>
      <Sidenav/>
      </div>
     
    </header>
  );
}

export default Topnav;