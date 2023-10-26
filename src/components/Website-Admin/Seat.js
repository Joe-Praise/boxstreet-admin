import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import WebNav from "./Navigation/WebNav";
import config from "../config";

const MODE = "PROD"; // You can change this value as needed.
const LOCAL = "http://localhost:5000";
const ONLINE = "https://boxstreet.onrender.com";
const BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function Seats() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [seatTable, setSeatTable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const seat_url = `${BASE_URL}/api/v1/seats?theater_id=${id}`;
        const response = await axios.get(seat_url);
        const seats = response.data.data;
        const data = seats?.map((seat) => ({
          id: seat._id,
          name: seat.seat_number,
          position: seat.position,
          row: seat.row,
          is_booked: seat.is_booked ? "YES" : "NO",
        }));
        setSeatTable(data);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchSeatData();
  }, [BASE_URL, id]);

  const handleNewSeatClick = () => {
    navigate("/theater/add-seat");
  };

  const handleViewButtonClick = (theaterId) => {
    navigate(`/theater/seat-layout/${theaterId}`);
  };

  const handleSearch = () => {
    // Filter seat data based on the searchQuery.
    const filteredSeats = seatTable.filter((seat) =>
      seat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSeatTable(filteredSeats);
  };

  return (
    <div>
      <WebNav />
      <div className="vtPage">
        <div className="vt-page">
          <div className="vt-page-top">
            <div className="vt-input">
              <input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="vt-input-btn" onClick={handleSearch}>
                Search
              </span>
            </div>
          </div>
          <div className="vt-select">
            {/* <button className="addtheaterbtn" onClick={handleNewSeatClick}>
              Add New Seat
            </button> */}
          </div>
          <div className="vt-table-container">
            <table className="vt-table">
              <thead>
                <tr className="vt-table-header">
                  <th>S/N</th>
                  <th>Seat </th>
                  <th>Position</th>
                  <th>Row</th>
                  <th>Booked</th>
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

export default Seats;



