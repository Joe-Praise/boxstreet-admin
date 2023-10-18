import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import CounterNav from '../Navigation/CounterNav';
import dp from '../../uploads/dpdp.jpg';
import config from "../../config";

import '../stylesCounter/profile.css';

function Profile() {
  const [managementData, setManagementData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(config.MANAGEMENT_BASE_URL);
              setManagementData(response.data);
          } catch (err) {
              setError(err);
              console.error("Error fetching management data:", err);
          }
      };

      fetchData();
  }, []);

  

    return (
        <div className='cPPage'>
            <CounterNav />
            <div className='cProfile'>
                {managementData?.map((management) => (
                    <div className='cProfileInfo' key={management._id}>
                        <img src={dp} alt="" />
                        <div className='cProfileDetails'>
                            <h3>Full Name:</h3> <span>{management.fullname}</span>
                            <h3>Department:</h3> <span>{management.role}</span>
                            <h3>Phone Number:</h3> <span>{management.phone}</span>
                            <h3>Cinema:</h3> <span>{management.cinema_id.name}</span>
                            <h3>Branch:</h3> <span>{management.branch_id.location}</span>
                        </div>
                        <div className='cUserandPass'>
                            {/* <h4>Username:</h4> <span>{management.username}</span> */}
                            <Link to={`/counter/change-password/${management._id}`}>
                                <button>Change Password</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
