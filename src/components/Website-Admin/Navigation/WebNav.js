import React from "react";
import logo from "../../uploads/Screenshot__335_-removebg-preview (1).png";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import webnav from './webnav.css'

function WebNav() {
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
                <li className="bsColour">Website Admin</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="navlinks">
            <li className="from-left-and-back">John Doe</li>
            </ul>
          </div>
        </nav>
      </div>
      <SideNav />
    </header>
  );
}

export default WebNav;
