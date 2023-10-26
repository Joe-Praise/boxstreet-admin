import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import WebNav from './Navigation/WebNav';
import config from "../config";

// Define your BASE_URL based on the MODE (PROD or LOCAL)
const MODE = "PROD";
const LOCAL = "http://localhost:5000";
const ONLINE = "https://boxstreet.onrender.com";
const BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function Theaters() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Handle navigation to update theater page
  const handleEditButtonClick = (theaterId, theater) => {
    navigate(`/theater/update-theater/${theaterId}`, {
      state: { theaterData: theater },
    });
  };

  // Handle navigation to seat layout page
  const handleViewButtonClick = (theaterId) => {
    navigate(`/web-layout/${theaterId}`);
  };

  // State for the theater data and search term
  const [theaterTable, setTheaterTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle navigation to web-seat page
  const handleSeatTableButtonClick = (id) => {
    console.log("Theater ID:", id);
    navigate(`/web-seat/${id}`);
  };

  // Fetch theater data based on the provided ID
  const handleFindTheaters = () => {
    const theaterUrl = `${config.THEATER_BASE_URL}/${id}`;
    if (theaterUrl) {
      axios
        .get(theaterUrl)
        .then((response) => {
          const theaterData = response.data;
          const formattedTheater = {
            id: theaterData._id, // Fixed to 'id'
            name: theaterData.theater?.name,
            email: theaterData.theater?.email,
            phone: theaterData.theater?.phone,
          };
          setTheaterTable([formattedTheater]);
        })
        .catch((error) => {
          setTheaterTable([]);
        });
    }
  };

  // Handle theater deletion
  const handleDeleteButtonClick = (theaterId) => {
    axios
      .delete(`${BASE_URL}/api/v1/theaters/${theaterId}`)
      .then((response) => {
        console.log("Theater successfully deleted");

        setTheaterTable((prevTheaterTable) => {
          const updatedTheaterTable = prevTheaterTable.filter(
            (theater) => theater.id !== theaterId
          );
          return updatedTheaterTable;
        });
      })
      .catch((error) => {
        console.error("Error Deleting Theater", error);
      });
  };

  // Fetch theater data when the ID changes
  useEffect(() => {
    if (id) {
      handleFindTheaters();
    }
  }, [id]);

  // Fetch theater data when the component mounts
  useEffect(() => {
    axios.get(config.THEATER_BASE_URL).then((result) => {
      setTheaterTable(result.data);
    });
  }, []);

  return (
    <div>
      <WebNav />
      <div className="vtPage">
        <div className="vt-page">
          <div className="vt-page-top">
            <div className="vt-input">
              <input
                placeholder="Search Theater by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span
                className="web-cinema-input-btn"
                onClick={handleFindTheaters}
              >
                Search
              </span>
            </div>
          </div>
          {/* <div className="vt-select">
            {theaterTable.map((theater) => (
              <span key={theater.id}>{theater.name}</span>
            ))}
          </div> */}
          <div className="vt-table-container">
            <table className="vt-table">
              <thead>
                <tr className="web-cinema-table-header">
                  <th>S/N</th>
                  <th>Theater Name</th>
                  <th>Screen</th>
                  <th>Seating Capacity</th>
                  <th>Available</th>
                  <th>Unavailable</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {theaterTable
                  .filter((theater) =>
                    theater.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((theater, index) => (
                    <tr key={theater.id}>
                      <td>{index + 1}</td>
                      <td>{theater.name}</td>
                      <td>{theater.screen}</td>
                      <td>{theater.seat_capacity}</td>
                      <td>{theater.available_seat}</td>
                      <td>{theater.unavailable_seat}</td>
                      <td className="actions">
                        <button
                          className="web-cinema-table-view"
                          onClick={() => handleSeatTableButtonClick(theater._id)}
                        >
                          View Seats
                        </button>
                        <button
                          className="web-cinema-table-print"
                          onClick={() => handleViewButtonClick(theater.id)}
                        >
                          View Layout
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theaters;


