import React from "react";
import { useState, useEffect } from "react";
import CounterNav from "../Navigation/CounterNav";
import "../stylesCounter/bookedinfo.css";
import { useParams } from "react-router-dom";
import axios from "axios";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function BookedInfo() {
  const { id } = useParams();
  const [booked, setBooked] = useState({});
  useEffect(() => {
    let booking_url = `${BASE_URL}/api/v1/bookings/${id}`;

    axios.get(booking_url).then((res) => {
      let data = res.data;
      console.log(data);
      setBooked(data);
    });
  }, []);
  return (
    <div className="bookedinfo">
      <CounterNav />
      <div className="bookinginfopage">
        <h1 className="booked-h1">Receipt</h1>
        <div className="infosheet">
          <div className="sheetdetails">
            <h3>Customer Name:</h3>
            <span>{booked?.full_name}</span>
          </div>

          <div className="sheetdetails">
            <h3>Phone Number:</h3>
            <span>{booked?.phone}</span>
          </div>

          <div className="sheetdetails">
            <h3>Email:</h3>
            <span>{booked?.email}</span>
          </div>

          <div className="sheetdetails">
            <h3>Movie Title:</h3>
            <span>{booked?.movie_id?.name}</span>
          </div>
          
          <div className="sheetdetails">
            <h3>Cinema:</h3>
            <span>{booked?.cinema_id?.name}</span>
          </div>
           <div className="sheetdetails">
            <h3>Movie Time:</h3>
            <span>{booked?.show_time}</span>
          </div>
         {/* <div className="sheetdetails">
            <h3>Branch:</h3>
            <span>{booked?.branch_id}</span>
          </div> */}
           <div className="sheetdetails">
            <h3>Theater:</h3>
            <span>{booked?.theater_id?.name}</span>
          </div>
          <div className="sheetdetails">
            <h3>Movie Price:</h3>
            <span>{booked?.movie_price}</span>
          </div>
{/*
          <div className="sheetdetails">
            <h3>Attendant:</h3> 
            <span>{booked?.counter_id}</span>
          </div>
*/}
          <div className="sheetdetails">
            <h3>Booking Type:</h3>
            <span>{booked?.booking_type}</span>
          </div> 

    
          <div className="sheetdetails">
            <h3>Sub-total:</h3>
            <span>{booked?.sub_total}</span>
          </div>

          <div className="sheetdetails">
            <h3>Ticket No.:</h3>
            <span>{booked?.ticket_no}</span>
          </div>

          <div className="sheetdetails">
            <h3>Check-in Time:</h3>
            <span>{booked?.checked_in_at}</span>
          </div> 

          <div className="sheetdetails">
            <div></div>
            <button>Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedInfo;
