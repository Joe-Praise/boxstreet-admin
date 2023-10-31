import React, { useEffect, useState } from "react";
import WebNav from "./Navigation/WebNav";
import axios from "axios";
import config from "../config";
import "./style/cinemas.css";

function CinemaBranch() {
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // Open the modal
  const openModal = (cinema) => {
    setBranches(cinema.branches);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="counterBooking">
      <div>
        <WebNav />
      </div>
      <div className="web-cinema">
        <div className="web-cinema-page">

          <div className="web-cinema-table-container">
          {showModal && branches && (
            <div className="modal">
              <div className="modal-content">
                <h2>Branches for {branches[0].name}</h2>
                <div className="web-movies-table-container">
                  <table className="web-movies-table">
                  <thead>
                <tr className="web-movies-table-header">
                  <th>S/N</th>
                  <th>Branch Name</th>
                  <th>Location Names</th>
                </tr>
              </thead>
              <tbody>
              {branches.map((branch, index) => (
                    <tr key={branch._id}>
                        <td>{index + 1}</td>
                        <td>{branch.name}</td>
                        <td>{branch.location_id.name}</td>
                      {/* <strong>Branch Name:</strong> {branch.name}
                      <br />
                      <strong>Location Name:</strong> {branch.location_id.name}
                      <br /> */}
                    </tr>
                  ))}
              </tbody>
                  </table>
                </div>
                {/* <ul>
                  {branches.map((branch, index) => (
                    <li key={branch._id}>
                      <strong>Branch Name:</strong> {branch.name}
                      <br />
                      <strong>Location Name:</strong> {branch.location_id.name}
                      <br />
                    </li>
                  ))}
                </ul> */}
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
          </div>
        
        </div>
      </div>
     
    </div>
  )
}

export default CinemaBranch