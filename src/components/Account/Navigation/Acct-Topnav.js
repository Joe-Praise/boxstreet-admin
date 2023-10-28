// import "../stylesCounter/nav.css";
// import logo from "../../../uploads/FHC LOGO.png";
import logo from "../../uploads/FHC LOGO.png";
// import Sidenav from "../Sidenav/Sidenav";
import Sidebar from "./Acct-Sidebar";
import "./navigation.css";
import { Link } from "react-router-dom";

function Topbar() {
  let username = localStorage.getItem("fullname");
  return (
    <header>
      <div className="navHead">
        <nav className="navigation">
          <div>
            <Link to="/account">
              <img className="logo" src={logo} alt="web logo" />
            </Link>
          </div>
          <div>
            <ul className="navlinks">
              <Link to="/account" className="textdecor">
                <li className="bsColour">{`Welcome-${username}`}</li>
              </Link>
            </ul>
          </div>
          {/* <div>
            <ul className="navlinks">
              <Link to="/counter/history">
                <li className="from-left-and-back">BOOKING HISTORY</li>
              </Link>
              <li className="from-left-and-back">SIGN IN</li>
            </ul>
          </div> */}
        </nav>
      </div>
      <Sidebar />
    </header>
  );
}

export default Topbar;
