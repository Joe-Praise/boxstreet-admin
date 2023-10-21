import React, { useEffect, useState } from "react";
import TheaterNav from "../Navigation/TheaterNav";
import "../stylesTheater/viewTheaters.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function ViewTheaters() {
  const navigate = useNavigate();

  const handleEditButtonClick = (theaterId, theater) => {
    navigate(`/theater/update-theater/${theaterId}`, {
      state: { theaterData: theater },
    });
  };

  const handleViewButtonClick = (theaterId) => {
    navigate(`/theater/seat-layout/${theaterId}`);
  };

  const handleSeatTableButtonClick = (theaterId) => {
    navigate(`/theater/view-seats/${theaterId}`);
  };

  const [theaterTable, setTheaterTable] = useState([]);
  const branch_id = localStorage.getItem("branch_id");

  useEffect(() => {
    let theater_table_url = `${BASE_URL}/api/v1/theaters?branch_id=${branch_id}`;

    axios
      .get(theater_table_url)
      .then((res) => {
        let theaters = res.data;
        let data = theaters?.map((theater) => {
          return {
            id: theater._id,
            name: theater.name,
            screen: theater.screen,
            seat_capacity: theater.seat_capacity,
            available_seat: theater.available_seat,
            unavailable_seat: theater.unavailable_seat,
          };
        });
        setTheaterTable([...data]);
      })
      .catch((error) => {
        console.error("Error fetching theater data:", error);
      });
  }, [BASE_URL, branch_id]);

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

  return (
    <div>
      <TheaterNav />
      <div className="vtPage">
        <div className="vt-page">
          <div className="vt-page-top">
            <div className="vt-input">
              <input placeholder="search" />
              <span className="vt-input-btn">Search</span>
            </div>
          </div>
          <div className="vt-select">
            {theaterTable.map((theater) => (
              <span key={theater.id}>{theater.cinema_name}</span>
            ))}

            <button className="addtheaterbtn">Add New Theater</button>
          </div>
          <div className="vt-table-container">
            <table className="vt-table">
              <thead>
                <tr className="vt-table-header">
                  <th>S/N</th>
                  <th>Theater Name</th>
                  <th>Screen</th>
                  <th>Seating Capacity</th>
                  <th>Available</th>
                  <th>Unavailable</th>
                  <th>View Seat</th>
                  <th>View Layout</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {theaterTable.map((theater, index) => (
                  <tr key={theater.id}>
                    <td>{index + 1}</td>
                    <td>{theater.name}</td>
                    <td>{theater.screen}</td>
                    <td>{theater.seat_capacity}</td>
                    <td>{theater.available_seat}</td>
                    <td>{theater.unavailable_seat}</td>

                    <td
                      className="vt-table-viewseat"
                      onClick={() => handleSeatTableButtonClick(theater.id)}
                    >
                      Seat Table
                    </td>
                    <td
                      className="vt-table-view"
                      onClick={() => handleViewButtonClick(theater.id)}
                    >
                      Layout
                    </td>
                    <td
                      className="vt-table-edit"
                      onClick={() => handleEditButtonClick(theater.id, theater)}
                    >
                      Edit
                    </td>
                    <td
                      className="vt-table-delete"
                      onClick={() => handleDeleteButtonClick(theater.id)}
                    >
                      Delete
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

export default ViewTheaters;
