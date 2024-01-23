import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Website-Admin/DropDown/dropdown.css";
import config from "../../config";
import axios from "axios"
function DropDown(){
    const navigate = useNavigate();
    const LogOut = () => {
        axios
          .post(config.MGT_BASE_URL + "/logOut", {
          })
          .then((response) => {
            const data = response.data;
            console.log(data);
            if (data === "LogOut Successful") {
              navigate("/");
            } else {
              navigate("/web-admin");
            }
            localStorage.clear()
          })
          .catch((error) => {
            console.error(error);
          });
      };
    const[status, setStatus]= useState("close")
    return(
        <div className="web-ad-dropdown">
            <div className="web-ad-dropdown-triger"
            role="button"
            onClick={()=>setStatus(status==="open"? "close":"open")}
            >
        <i className={status}></i>
        <i className={status}></i>
        <i className={status}></i>
            </div>
<div className={`web-ad-dropdown-menu ${status === "open" ? "active" : "inactive"}`}>

<div className="dropdown-menu-container">
<ul>
      <Link className="dropdown-links" to="/web-admin">
          <li> DASHBOARD</li>
        </Link>
        <Link to="/web-create-location" className="dropdown-links">
          <li> CREATE LOCATION </li>
        </Link>
        <Link className="dropdown-links" to="/web-admin/cinema">
          <li> CREATE CINEMA</li>
        </Link>
        <Link to="/web-admin/add-user" className="dropdown-links">
          <li> CREATE ADMIN</li>
        </Link>
        <Link to="/web-view-location" className="dropdown-links">
          <li> VIEW LOCATIONS</li>
        </Link>
        <Link className="dropdown-links" to="/web-cinemas">
          <li>VIEW CINEMAS</li>
        </Link>
        <Link className="dropdown-links" to="/web-users">
          <li> VIEW CINEMA ADMINS</li>
        </Link>
        {/* <Link className="dropdown-links" to="/web-movies">
          <li> VIEW MOVIES</li>
        </Link>/ */}
        {/* <Link to="/web-theaters" className="dropdown-links">
          <li> VIEW THEATERS</li>
        </Link> */}
        {/* <Link className="dropdown-links">
          <li> BOOKING SUMMARY </li>
        </Link> */}
        {/* <Link className="dropdown-links" to="/web-archives">
          <li> ARCHIVED</li>
        </Link> */}

        <li className="exist" onClick={LogOut}>LOGOUT</li>
      </ul>
</div>
</div>
        </div>
    )
}
export default DropDown

