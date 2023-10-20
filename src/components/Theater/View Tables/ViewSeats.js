import React, { useEffect, useState } from "react";
import TheaterNav from "../Navigation/TheaterNav";
import "../stylesTheater/viewTheaters.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://lolcalhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function ViewSeats() {
    const navigate = useNavigate();

    const handleEditButtonClick = () => {
      navigate("/theater/new-theater");
    };
    const handleViewButtonClick = (theaterId) => {
      navigate(`/theater/seat-layout/${theaterId}`);
    };
  
    const [seatTable, setSeatTable] = useState([]);
    const theater_id = "652aa9066de9462d02533530"
  
    useEffect(() => {
      let seat_url = `${BASE_URL}/api/v1/seats?theater_id=${theater_id}`;
  
      axios
        .get(seat_url)
        .then((res) => {
          let seats = res.data.data;
          let data = seats?.map((seat) => {
            return {
              id: seat._id,
              name: seat.seat_number,
              position: seat.position,
              row: seat.row,
              is_booked: seat.is_booked ? "YES" :"NO",
            };
          });
          setSeatTable([...data]);
        })
        .catch((error) => {
          console.error("Error fetching theater data:", error);
        });
  
    }, []);
  
    const handleDeleteButtonClick = (theaterId) => {
      axios
        .delete(`${BASE_URL}/api/v1/theaters/${theaterId}`)
        .then((response) => {
          console.log("Theater successfully deleted");
  

        })
        .catch((error) => {
          console.error("Error Deleting Movie", error);
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
          {/* {theaterTable.map((theater) => (
            <span key={theater.id}>{theater.cinema_name}</span>
          ))} */}

          <button className="addtheaterbtn">Add New Seat</button>
        </div>
        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr className="vt-table-header">
                <th>S/N</th>
                <th>Seat Name</th>
                <th>Position</th>
                <th>Row</th>
                <th>Booked</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {seatTable.map((seat, index) => (
                <tr key={seat.id}>
                  <td>{index + 1}</td>
                  <td>{seat.name}</td>
                  <td>{seat.position}</td>
                  <td>{seat.row}</td>
                  <td>{seat.is_booked}</td>
                
                  <td
                    className="vt-table-edit"
                    onClick={handleEditButtonClick}
                  >
                    Edit
                  </td>
                  <td
                    className="vt-table-delete"
                    onClick={() => handleDeleteButtonClick(seat.id)}
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
  )
}

export default ViewSeats