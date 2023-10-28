import React, { useState, useEffect } from "react";
import "../stylesCounter/bookingHistory.css";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import CounterNav from "../Navigation/CounterNav";
import axios from "axios";
import config from "../../config";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function BookingHistory() {
  const branch_id = localStorage.getItem("branch_id");

  const [booked, setBooked] = useState([]);
  const [prev, setPrev] = useState([]);
  const [ticket, setTicket] = useState("");
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [booking, setBookings] = useState([]);

  const handleFindTicket = () => {
    let ticket_url = `${BASE_URL}/api/v1/bookings/${ticket}/ticket-no`;
    if (ticket) {
      axios
        .get(ticket_url)
        .then((res) => {
          let data = [res.data];
          let booked = data?.map((e) => ({
            id: e._id,
            title: e?.movie_id?.name,
            showingtime: e?.schedule_id?.show_time,
            customer_name: e?.fullname,
            amount: e?.sub_total,
            ticket_no: e?.ticket_no,
            type: e.booking_type,
            seat_booked: e?.seats.length,
            booked_date: e?.created_at.toLocaleString("en-US"),
          }));

          setBooked([...booked]);
        })
        .catch((err) => {
          setBooked([]);
        });
    }
  };

  // Fetch cinema data based on the ID parameter
  const handleFindCinemas = () => {
    const cinemasUrl = `${config.BOOKING_BASE_URL}/${id}`;
    if (cinemasUrl) {
      axios
        .get(cinemasUrl)
        .then((response) => {
          const cinemaData = response.data;
          const formattedCinema = {
            _id: cinemaData._id,
            name: cinemaData.cinema?.name,
            email: cinemaData.cinema?.email,
            phone: cinemaData.cinema?.phone,
          };
          setBooked([formattedCinema]);
        })
        .catch((error) => {
          setBooked([]);
        });
    }
  };

  const handleCheckIn = (b) => {
    let check_in_url = `${BASE_URL}/api/v1/bookings/check-in`;
    let data = {
      ticket_no: b.ticket_no,
      status: true,
    };

    axios
      .put(check_in_url, data)
      .then((res) => {

        alert("Checked in successfully");

        let old_booking = [...booked];
        let book = old_booking.find((x) => x.id === b.id);
        book.is_checked = true;

        setBooked(old_booking);
        setPrev(old_booking);
      })
      .catch((err) => alert("Invalid ticket number"));
  };

  const handleReset = () => {
    setTicket("");
    setBooked(prev);
  };

  useEffect(() => {
    
    let booked_history_url = `${BASE_URL}/api/v1/bookings?branch_id=${branch_id}`;
    axios.get(booked_history_url).then((res) => {

      let data = res.data;

      let booked = data?.map((e) => ({
        id: e._id,
        title: e?.movie_id?.name,
        showingtime: e?.schedule_id?.show_time,
        customer_name: e?.full_name,
        amount: e?.sub_total,
        ticket_no: e?.ticket_no,
        type: e.booking_type,
        seat_booked: e?.seats.length,
        is_checked: e?.is_checked,
        booked_date: e?.created_at.toLocaleString("en-US"),
      }));

      setBooked([...booked]);
      setPrev([...booked]);

    });
  }, []);

  useEffect(() => {
    // Fetch cinema data when the ID parameter changes
    if (id) {
      handleFindCinemas();
    }
  }, [id]);

  return (
    <div>
      <CounterNav />
      <div className="chPage">
        <div className="ch-page">
          <div className="bh-page-top">
            <div className="bh-input">
              <input
                  placeholder="Search booking by client's Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span
                  className="web-cinema-input-btn"
                  onClick={handleFindCinemas}
                >
                  Search
                </span>
              {/* <span className="bh-input-btn" onClick={handleReset}>
                Reset
              </span> */}
            </div>
          </div>
          <div className="ch-select">
            <div></div>

            <Link to="/counter" className="newBooking">
              Create New Booking
            </Link>
          </div>
          <div className="ch-table-container">
            <table className="ch-table">
              <thead>
                <tr className="ch-table-header">
                  <th>S/N</th>
                  <th>Ticket No</th>
                  <th>Customer Name</th>
                  <th>Movie Title</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Seat</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {booked.filter((b) =>
                    b.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((b, id) => (
                  <tr key={b.id}>
                    <td>{id + 1}</td>
                    <td>{b.ticket_no}</td>
                    <td>{b.customer_name}</td>
                    <td>{b.title}</td>
                    <td>N{b.amount}</td>
                    <td>{b.type}</td>
                    <td>+{b.seat_booked}</td>
                    <td>{b.booked_date}</td>
                    <td className="actions">
                      <Link to={`/counter/receipt/${b.id}`}>
                        <button className="ch-table-view">View</button>
                      </Link>
                      <button className="ch-table-print">Print</button>
                      <button
                        className={
                          b.is_checked
                            ? "ch-table-check-success"
                            : "ch-table-check"
                        }
                        onClick={() => handleCheckIn(b)}
                      >
                        {b.is_checked ? "Checked" : "Check-In"}
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

export default BookingHistory;
