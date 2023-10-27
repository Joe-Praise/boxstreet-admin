import React, { useEffect, useState } from "react";
import TheaterNav from "../Navigation/TheaterNav";
import "../stylesTheater/viewTheaters.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://lolcalhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function ViewSeats() {
    const navigate = useNavigate();

    const handleNewSeatClick = () => {
        navigate("/theater/add-seat");
      };

    const handleEditButtonClick = () => {
      navigate("/theater/new-theater");
    };
    const handleViewButtonClick = (theaterId) => {
      navigate(`/theater/seat-layout/${theaterId}`);
    };
  
    const [seatTable, setSeatTable] = useState([]);
    const { id } = useParams();

    console.log(seatTable)
  
    useEffect(() => {
      let seat_url = `${BASE_URL}/api/v1/seats?theater_id=${id}`;
  
      axios
        .get(seat_url)
        .then((res) => {
          let seats = res.data.data;
          let data = seats?.map((seat) => {
            return {
              id: seat._id,
              category_id: seat.category_id.name,
              price: seat.category_id.price,
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
          console.log(theaters)
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
            <span key={theater.id}>{theater.name}</span>
          ))} */}

          <button className="addtheaterbtn" onClick={handleNewSeatClick}>Add New Seat</button>
        </div>
        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr className="vt-table-header">
                <th>S/N</th>
                <th>Seat Name</th>
                <th>Category</th>
                <th>Price</th>
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
                  <td>{seat.category_id}</td>
                  <td>{seat.price}</td>
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