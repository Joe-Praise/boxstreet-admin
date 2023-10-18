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
  const [searchTicket, setSearchTicket] = useState("");

  function handleSearch() {
    if (searchTicket = "") {
      setBooked(booked);
      return;
    }
    const filterByTicket = booked.filter((ticket) => {
      if(ticket.includes(searchTicket)){
        return ticket
      }
    })
    setBooked(filterByTicket)
  }

  const handleNewMovie = () => {
    navigate("/counter")
  }

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

  // useEffect(() => {
  //   let ticket_search_url = `${BASE_URL}/api/v1/bookings/U100lnsypwys/ticket-no`
  //   axios.get(ticket_search_url)
  //   .then(res => {
  //     let data = res.data;
  //     let ticket = data?.map(e => ({
  //       id: e._id,
  //       title: e?.movie_id?.name,
  //       showingtime: e?.schedule_id?.show_time,
  //       customer_name: e?.fullname,
  //       category: e?.ticket_type,
  //       tickect_no: e?.ticket_no,
  //       seat_number: e?.seat_number,
  //     }))
  //     setSearchTicket([...ticket])
  //     console.log(ticket)
  //   })
  // })


  return (
    <div>
      <CounterNav />
      <div className="chPage">
        <div className="ch-page">
          <div className="bh-page-top">
            <div className="bh-input">
              <input placeholder="search" onChange={e => setSearchTicket(e.target.value)}/>
              <span className="bh-input-btn" onClick={handleSearch}>Search</span>
            </div>
          </div>
          <div className="ch-select">

            <button className="newBooking" onClick={handleNewMovie}>Create New Booking</button>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
