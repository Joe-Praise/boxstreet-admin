import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../stylesCounter/nav.css";
import logo from "../../uploads/Screenshot__335_-removebg-preview (1).png";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import config from "../../config"

function CounterNav() {

  const [managers, setManagers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getManagersByRole(role) {
        try {
          const response = await axios.get(config.MGT_BASE_URL + "/role", {
            params: {
              role: role,
            },
          });
      
          if (response.status === 200) {
            setManagers(response.data);
            // console.log('Response data:', response.data);

          } else {
            setError('Failed to retrieve managers');
          }
        } catch (error) {
          console.error('Axios error:', error); 
          setError('Axios error: ' + error.message);
        } finally {
          setLoading(false);
        }
      }
      

    getManagersByRole('COUNTER');
  }, []);

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
                <li className="bsColour">Counter User</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="navlinks">
            <li className="from-left-and-back">Welcome back {managers.fullname}</li>
            </ul>
          </div>
        </nav>
      </div>
      <SideNav />
    </header>
  );
}

export default CounterNav;
