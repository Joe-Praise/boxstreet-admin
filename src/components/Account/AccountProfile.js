import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import dp from "../uploads/WhatsApp Image 2023-06-17 at 3.34.12 PM.jpeg";
import "../Counter/stylesCounter/profile.css";
import Config from "../config";
import CounterNav from "../Counter/Navigation/CounterNav";

function AccountProfile() {
  const [userData, setUserData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response;
        const user_id = localStorage.getItem("user_id");
        const profile_url =
          Config.MANAGEMENT_BASE_URL + "/" + user_id + "/user-info";

        response = await axios.get(profile_url);
        setUserData(response.data);
        const location_url =
          Config.LOCATION_BASE_URL +
          "/" +
          response?.data?.branch_id.location_id;
        response = await axios.get(location_url);
        setLocation(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="cPPage">
      <CounterNav />
      <div className="cProfile">
        <div className="cProfileInfo">
          <img src={dp} alt="Profile avi" />
          <h3>{userData.image}</h3>
          <div className="cProfileDetails">
            <h3>Full Name:</h3> <span>{userData.fullname}</span>
            <h3>Department:</h3> <span>{userData.role}</span>
            <h3>Phone Number:</h3> <span>{userData.phone}</span>
            <h3>Email:</h3> <span>{userData?.email}</span>
            <h3>Branch:</h3> <span>{location.name}</span>
          </div>
          {/* <div className='cUserandPass'>
            <Link to={`/counter/change-password/${userData._id}`}>
              <button>Change Password</button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
