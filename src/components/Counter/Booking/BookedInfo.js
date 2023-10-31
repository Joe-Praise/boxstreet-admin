import React from "react";
import { useState, useEffect, useRef } from "react";
import CounterNav from "../Navigation/CounterNav";
import "../stylesCounter/bookedinfo.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function BookedInfo() {
  const { id } = useParams();
  const [booked, setBooked] = useState({});
  const [prev, setPrev] = useState([]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    let booking_url = `${BASE_URL}/api/v1/bookings/${id}`;

    axios.get(booking_url).then((res) => {
      let data = res.data;
      console.log(data);
      setBooked(data);
      setPrev(data);
    });
  }, []);

  return (
    <div className="bookedinfo">
      <CounterNav />
      <div className="bookinginfopage" ref={componentRef}>
        <h1 className="booked-h1">Receipt</h1>
        <div className="infosheet">
        <div className="sheetdetails">
            <h3>Ticket No.:</h3>
            <span>{booked?.ticket_no}</span>
          </div>

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
            <span>{moment(booked?.show_time).format("LLLL")}</span>
          </div>
          {/* <div className="sheetdetails">
            <h3>Branch:</h3>
            <span>{booked?.branch_id}</span>
          </div> */}
          <div className="sheetdetails">
            <h3>Theater:</h3>
            <span>{booked?.theater_id?.name}</span>
          </div>

          {/*
          <div className="sheetdetails">
            <h3>Attendant:</h3> 
            <span>{booked?.counter_id}</span>
          </div>
*/}
          {/* <div className="sheetdetails">
            <h3>Ticket No.:</h3>
            <span>{booked?.ticket_no}</span>
          </div> */}
          <div className="sheetdetails">
            <h3>Booking Type:</h3>
            <span>{booked?.booking_type}</span>
          </div>
          <div className="sheetdetails">
            <h3>Payment Method:</h3>
            <span>{booked?.payment_method}</span>
          </div>

          <div className="sheetdetails">
            <h3>Movie Price:</h3>
            <span>{booked?.movie_price}</span>
          </div>

          

          <div className="sheetdetails">
            <h3>Seat Details:</h3>
            <span></span>
          </div>
          <div className="book-ch-table-container">
            {/* <h3>Seat:</h3> */}
            <span>
              <table className="book-ch-table">
                <thead>
                  <tr className="book-ch-table-header">
                    <th>Seat No</th>
                    <th>Seat Type</th>
                    <th>Seat Price</th>
                  </tr>
                </thead>

                <tbody>
                  {booked.seats?.map((seat) => (
                    <tr key={seat.no}>
                      <td>{seat.no}</td>
                      <td>{seat.type}</td>
                      <td>{seat.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </span>
          </div>

          <div className="sheetdetails">
            {/* <h3>Sub-total:</h3>
            <span>{booked?.sub_total}</span> */}
          </div>

          <div className="sheetdetails">
            <h3>Sub-total:</h3>
            <span>{booked?.sub_total}</span>
          </div>
        </div>
      </div>
      <div className="bookinginfopage no-fix">
        <div className="sheetdetails">
          <div></div>
          <button onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
}

export default BookedInfo;
