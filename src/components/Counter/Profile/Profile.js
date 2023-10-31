import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import CounterNav from '../Navigation/CounterNav';
import config from "../../config";
import dp from '../../uploads/WhatsApp Image 2023-06-17 at 3.34.12 PM.jpeg';
import '../stylesCounter/profile.css';

function Profile() {
  const [userData, setUserData] = useState({});
  const [location,setLocation] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response;
        const user_id = localStorage.getItem("user_id")
        const profile_url =config.MANAGEMENT_BASE_URL+"/"+ user_id+"/user-info"
        
        response = await axios.get(profile_url);
        setUserData(response.data);
        const location_url = config.LOCATION_BASE_URL +"/"+ response?.data?.branch_id.location_id
        response = await axios.get(location_url);
        setLocation(response.data)
        
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='cPPage'>
      <CounterNav />
      <div className='cProfile'>
        <div className='cProfileInfo'>
          <img src={dp} alt="Profile Image" />
          <h3>{userData.image}</h3>
          <div className='cProfileDetails'>
            <h3>Full Name:</h3> <span>{userData?.fullname}</span>
            <h3>Department:</h3> <span>{userData?.role}</span>
            <h3>Phone Number:</h3> <span>{userData?.phone}</span>
            <h3>Email:</h3> <span>{userData?.email}</span>
            <h3>Location:</h3> <span>{location?.name }</span>
            <h3>Branch:</h3> <span>{userData?.branch_id?.name }</span>
            <h3>Address:</h3> <span>{userData?.branch_id?.address }</span>
          </div>
          <div className='cUserandPass'>
            <Link to={`/counter/change-password`}>
              <button>Change Password</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

