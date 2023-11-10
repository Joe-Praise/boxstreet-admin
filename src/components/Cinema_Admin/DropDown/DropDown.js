import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dropdown.css";
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
              navigate("/cinema");
            }
            localStorage.clear()
          })
          .catch((error) => {
            console.error(error);
          });
      };
    const[status, setStatus]= useState("close")
    return(
        <div className="cinema-dropdown">
            <div className="cinema-dropdown-triger"
            role="button"
            onClick={()=>setStatus(status==="open"? "close":"open")}
            >
        <i className={status}></i>
        <i className={status}></i>
        <i className={status}></i>
            </div>
<div className={`cinema-dropdown-menu ${status === "open" ? "active" : "inactive"}`}>

<div className="dropdown-menu-container">
    <ul>
        <Link className="dropdown-links" to="/cinema">
        <li>Dashboard</li>
        </Link>
        <Link className="dropdown-links" to="/cinema/create-branch">
        <li>Create Branch</li>
        </Link>
       
        <Link className="dropdown-links" to="/cinema/create-theater">
        <li>Create Theater</li>
        </Link>
        <Link className="dropdown-links" to="/cinema/create-category">
        <li>Create Seat Class</li>
        </Link>
        <Link className="dropdown-links" to="/cinema/create-theater-admin">
        <li>Add User</li>
        </Link>
        <Link className="dropdown-links" to="/cinema/view-branch">
        <li>View Branch</li>
        </Link>
        <Link className="dropdown-links" to="/cinema/view-user">
        <li>View Users</li>
        </Link>
        <Link className="dropdown-links" to="/cinema/account">
        <li>Cinema Account</li>
        </Link>
        <Link className="dropdown-links" to="/cinema/profile">
        <li>Profile</li>
        </Link>
        <div className="dropdown-links">
        <li onClick={LogOut}>Log Out</li>
        </div>
     
    </ul>
</div>
</div>
        </div>
    )
}
export default DropDown

