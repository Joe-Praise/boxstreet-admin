import React from "react";
import { useState, useEffect } from "react";
import CounterNav from "../Navigation/CounterNav";
import "../stylesCounter/bookedinfo.css";
import { useParams } from "react-router-dom";
import axios from "axios";
let MODE = "PROD" 
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function BookedInfo() {
  const {id} = useParams();
 const[booked, setBooked] = useState("")
  useEffect(()=>{
    let booking_url = `${BASE_URL}/api/v1/bookings/${id}`

    axios.get(booking_url)
    .then(res=>{
      let data = res.data;
     console.log(data)
     setBooked(data)
    })
  },[])
  return (
    <div className="bookedinfo">
      <CounterNav />
      <div className="bookinginfopage">
        <h1>Receipt</h1>
          <div className="infosheet">
            <div className="sheetdetails">
              <h3>Customer Name:</h3>
              <span>{booked.fullname}</span>
            </div>

            <div className="sheetdetails">
              <h3>Phone Number:</h3>
              <span>{booked.phone}</span>
            </div>

            <div className="sheetdetails">
              <h3>Email:</h3>
              <span>{booked.email}</span>
            </div>

            <div className="sheetdetails">
              <h3>Movie Title:</h3>
              <span>Tom & Jerry</span>
            </div>
            <div className="sheetdetails">
              <h3>Cinema:</h3>
              <span>Mount Zion Ministry Cinema</span>
            </div>
            <div className="sheetdetails">
              <h3>Movie Time:</h3> {/* schedule */}
              <span>9:00am</span>
            </div>
            <div className="sheetdetails">
              <h3>Branch:</h3>
              <span>Mararaba</span>
            </div>
            <div className="sheetdetails">
              <h3>Theater:</h3>
              <span>Zion Theater</span>
            </div>
            <div className="sheetdetails">
              <h3>Movie Price:</h3>
              <span>{booked.seat_price}</span>
            </div>

            <div className="sheetdetails">
              <h3>Attendant:</h3> {/* counter that register or checked in*/}
              <span>CounterSL001</span>
            </div>

            <div className="sheetdetails">
              <h3>Booking Type:</h3>
              <span>{booked.booking_type}</span>
            </div>

            <div className="sheetdetails">
              <h3>Seat Price:</h3>
              <span>{booked.seat_price}</span>
            </div>

            <div className="sheetdetails">
              <h3>Sub-total:</h3>
              <span>{booked.sub_total}</span>
            </div>

            <div className="sheetdetails">
              <h3>Seat Number:</h3>
              <span>{booked.seat_number}</span>
            </div>

            <div className="sheetdetails">
              <h3>Ticket Type:</h3>
              <span>{booked.ticket_type}</span>
            </div>

            <div className="sheetdetails">
              <h3>Ticket No.:</h3>
              <span>{booked.ticket_no}</span>
            </div>

            <div className="sheetdetails">
              <h3>Check-in Time:</h3>
              <span>8:45am</span>
            </div>

            <div className="sheetdetails">
                <div></div>
              <button>
                Print
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default BookedInfo;
