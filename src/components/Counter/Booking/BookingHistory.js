import React, { useState, useEffect } from "react";
import '../stylesCounter/bookingHistory.css'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CounterNav from "../Navigation/CounterNav";
import axios from "axios";
let MODE = "PROD"
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function BookingHistory() {
  const navigate = useNavigate();
  const [booked, setBooked] = useState([]);
  const handleViewButtonClick = () => {
    navigate("/counter/receipt");
  };

  useEffect(() => {
    let booked_history_url = `${BASE_URL}/api/v1/bookings?branch_id=652aa4576de9462d0253351c`
    axios.get(booked_history_url)
      .then(res => {
        let data = res.data;
        let booked = data?.map(e => ({
          id: e._id,
          title: e?.movie_id?.name,
          showingtime: e?.schedule_id?.show_time,
          customer_name: e?.fullname,
          category: e?.ticket_type,
          tickect_no: e?.ticket_no,
          seat_number: e?.seat_number,

        }))
        console.log(booked)
        setBooked([...booked])
      })
  }, [])


  return (
    <div>
      <CounterNav />
      <div className="chPage">
        <div className="ch-page">
          <div className="bh-page-top">
            <div className="bh-input">
              <input placeholder="search" />
              <span className="bh-input-btn">Search</span>
            </div>
          </div>
          <div className="ch-select">
            <select>
              <option value="cinema">Cinema</option>
              <option value="Jabi">Jabi</option>
              <option value="Wuse">Wuse</option>
              <option value="Garki">Garki</option>
            </select>

            <button className="newBooking">Create New Booking</button>
          </div>
          <div className="ch-table-container">
            <table className="ch-table">
              <thead>
                <tr className="ch-table-header">
                  <th>S/N</th>
                  <th>Ticket No</th>
                  <th>Customer Name</th>
                  <th>Movie Title</th>
                  <th>Movie Time</th>
                  <th>Category</th>
                  <th>Seat</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {booked.map((b, id) => (

                  <tr key={b.id}>
                    <td>{id+1}</td>
                    <td>{b.tickect_no}</td>
                    <td>{b.customer_name}</td>
                    <td>{b.title}</td>
                    <td>2:15pm</td>
                    <td>{b.category}</td>
                    <td>{b.seat_number}</td>
                    <td>22-01-2023 1:59pm</td>
                    <td className="actions">
                      <Link to={`/counter/receipt/${b.id}`}>
                      <button className="ch-table-view">View</button>
                      </Link>
                      <button className="ch-table-print">Print</button>
                      <button className="ch-table-check">Check-In</button>
                    </td>
                  </tr>
                ))}

{/* 
                <tr>
                  <td>{+2}</td>
                  <td>MOV6745</td>
                  <td>Oluwafemi Noel</td>
                  <td>Tom and Jerry</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+3}</td>
                  <td>MOV6745</td>
                  <td>Precious Aboki</td>
                  <td>Tom and Jerry</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>

                <tr>
                  <td>{+4}</td>
                  <td>MOV6745</td>
                  <td>Austin Igwe</td>
                  <td>Spider Spider Spider Man!</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+5}</td>
                  <td>MOV6745</td>
                  <td>Jon Jerry</td>
                  <td>Teenage Mutant Ninja Turles 5: The Return</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+6}</td>
                  <td>MOV6745</td>
                  <td>Paul Czech</td>
                  <td>Garfield</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+7}</td>
                  <td>MOV6745</td>
                  <td>Boluwa Ijoko</td>
                  <td>Garfield</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+8}</td>
                  <td>MOV6745</td>
                  <td>Ogoji Caro</td>
                  <td>Garfield</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
