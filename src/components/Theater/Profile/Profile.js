import React, { useEffect, useState } from 'react'
import TheaterNav from '../Navigation/TheaterNav'
import dp from '../../uploads/dp-thumbnail.png'
import '../stylesTheater/profile.css'
import axios from 'axios';
import config from "../../config";

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
    <div className='tPPage'>
        <TheaterNav />
        <div className='tProfile'>
            <div className='tProfileInfo'>
                <img src={dp} alt="" />
                <div className='tProfileDetails'>
                    <h3>Full Name:</h3> <span>{userData.fullname}</span>
                    <h3>Position:</h3> <span>{userData.role}</span>
                    <h3>Phone Number:</h3> <span>{userData.phone}</span>
                    <h3>Email:</h3> <span>{userData.email}</span>
                    <h3>Branch:</h3> <span>{location.name}</span>
                </div>
            </div>
            <div className='tUserandPass'>
                <button>Change Password</button>
            </div>
        </div>
    </div>
  )
}

export default Profile