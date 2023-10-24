import React, { useEffect, useState,  } from 'react'
import { Link } from "react-router-dom";
import WebNav from './Navigation/WebNav';
import  './style/cinemas.css';
import axios from "axios";
import config from "../config";


function Cinemas() {
    const [cinema, setCinema] = useState([]);

    useEffect(() => {
        axios.get(config.CINEMA_BASE_URL).then((result) => {
          setCinema(result.data);
        });
    
      }, []);

  return (
    <div className="counterBooking">
    <div>
        <WebNav/>
      </div>
       
        <div className="web-cinema">
        <div className="web-cinema-page">
          <div className="web-cinema-page-top">
            <div className="web-cinema-input">
              <input
                placeholder="Search Cinema by ID"
                // value={ticket}
                // onChange={(e) => setTicket(e.target.value)}
              />
              <span className="web-cinema-input-btn"
            //    onClick={handleFindTicket}
               >
                Search
              </span>
              <span className="web-cinema-input-btn"
            //    onClick={handleReset}
              >
                Reset
              </span>
            </div>
          </div>
          <div className="web-cinema-select">
            <div></div>

            <Link to="/web-admin/cinema" className="newBooking">
              Create New Cinema
            </Link>
          </div>
          <div className="web-cinema-table-container">
            <table className="web-cinema-table">
              <thead>
                <tr className="web-cinema-table-header">
                  <th>S/N</th>
                  <th>Cinema ID</th>
                  <th>Cinema Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cinema.map((cinema, id) => (
                  <tr key={cinema._id}>
                    <td>{id + 1}</td>
                    <td>{cinema._id}</td>
                    <td>{cinema.name}</td>
                    <td>{cinema.email}</td>
                    <td>{cinema.phone}</td>
                    <td className="actions">       
                        <button className="web-cinema-table-view">Edit</button>              
                      <button className="web-cinema-table-print">Archive</button>
                      {/* <button
                        className={
                          b.is_checked
                            ? "web-cinema-table-check-success"
                            : "web-cinema-table-check"
                        }
                        // onClick={() => handleCheckIn(b)}
                      >
                        {b.is_checked ? "Checked" : "Check-In"}
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
       
     
             
       
    </div>
   
  )
}

export default Cinemas