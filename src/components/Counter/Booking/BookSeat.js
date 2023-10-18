import React from "react";
import axios from "axios";
import config from "../../config";

import { useState, useEffect } from "react";
import "../stylesCounter/bookSeat.css";
import CounterNav from "../Navigation/CounterNav";
import { useParams } from "react-router-dom";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function BookSeat() {
  const { id, movie_id } = useParams();
  const theater_id = id;

  const [, setFormErrorMessage] = useState("");
  const [schedule, setSchedule] = useState("");
  const [filter, setFilter] = useState("");
  const [seats, setSeat] = useState([]);
  let [amount, setAmount] = useState(0);

  let booking = JSON.parse(localStorage.getItem("booking"))
  

  const [col_matrix_1, setColMatrix1] = useState([
    [{}],
    [{}, {}, {}],
    [{}, {}, {}],
  ]);
  const [col_matrix_2, setColMatrix2] = useState([
    [{}, {}, {}],
    [{}, {}],
  ]);

  const setActive = (row, col, pos) => {
    let d;
    let _seats = [...seats];

    if (pos === "left") {
      let col_1_new = [...col_matrix_1];
      d = col_1_new[row][col];

      if (d.is_active) {
        d.is_booked = !d.is_booked;

        if (d.is_booked) {
          amount += d.category_id.price;

          _seats.push({
            no: d.seat_number,
            type: d.category_id.name,
            price: d.category_id.price,
          });

        } else {
          amount -= d.category_id.price;
          _seats = _seats.filter(x=>x.no !== d.seat_number)
        }

        setColMatrix1(col_1_new);
      }
    }

    if (pos === "right") {
      let col_2_new = [...col_matrix_2];
      d = col_2_new[row][col];
      if (d.is_active) {
        d.is_booked = !d.is_booked;

        if (d.is_booked) {
          amount += d.category_id.price;

          _seats.push({
            no: d.seat_number,
            type: d.category_id.name,
            price: d.category_id.price,
          });

        } else {
          amount -= d.category_id.price;
          _seats = _seats.filter(x=>x.no !== d.seat_number)
        }

        setColMatrix2(col_2_new);
      }
    }

    setSeat(_seats);
    setAmount(amount);

  };

  const handlePayment = async (e) => {
    e.preventDefault();

    let email = booking.email;

    try {
      
        const payment_url = BASE_URL + "/api/v1/payments/initiate-payment";
        const booking_url = BASE_URL + "/api/v1/bookings";
        const data = { email, amount };
        const response = await axios.post(payment_url, data);

        booking.seats = seats;

        if(response?.data.data.paymentLink){
         
          await axios.post(booking_url, booking);
          
          window.open(
            response?.data.data.paymentLink.data.authorization_url,
            "_blank"
          );

        }
      

    } catch (error) {
      setFormErrorMessage("An error occurred in payment transaction.");
    }
  };

  useEffect(() => {

    let left_seats = {};
    let right_seats = {};

    let seat_url = `${BASE_URL}/api/v1/theaters/${theater_id}/seats-summary`;
    let movie_schedule_url = `${BASE_URL}/api/v1/movieschedule/${movie_id}`;

    axios.get(movie_schedule_url).then((res) => {
      let data = res.data?.data;
      setSchedule(data);
      setAmount(data.price);
    });

    axios.get(seat_url).then((res) => {
      let data = res.data;

      for (let i = 0; i < data.col_matrix_1.length; i++) {
        let d = data.col_matrix_1[i];
        if (!left_seats[d.row]) {
          left_seats[d.row] = [d];
        } else {
          left_seats[d.row].push(d);
        }
      }

      for (let i = 0; i < data.col_matrix_2.length; i++) {
        let d = data.col_matrix_2[i];
        if (!right_seats[d.row]) {
          right_seats[d.row] = [d];
        } else {
          right_seats[d.row].push(d);
        }
      }

      setColMatrix1(Object.values(left_seats));
      setColMatrix2(Object.values(right_seats));
    });

  }, [theater_id, id]);

  return (
    <div className="book-seat">
      <div>
        <CounterNav />
      </div>
   
      <div className="counterBookingFlex">
        <div className="counterBookingForm">
          <div className="booking-page">
            <div className="booking-main">
              <div className="booking-container">
                <div className="booking-container-seat">
                  <div className="booking-seat-side">
                    <span className="booking-seat-vvip"></span>
                    <p>VVIP</p>
                  </div>
                  <div className="booking-seat-side">
                    <span className="booking-seat-vip"></span>
                    <p>VIP </p>
                  </div>
                  <div className="booking-seat-side">
                    <span className="booking-seat-regular"></span>
                    <p>Regular</p>
                  </div>
                  <div className="booking-seat-side">
                    <span className="booking-seat-number"></span>
                    <p className="booking-seat-select">Seat count <>{seats.length}</></p>
                  </div>
                </div>
                <div className="booking-container-col1">
                  <div className="booking-container-top">
                    <p className="booking-choose-seat-text">Choose your Seat</p>
                    <div className="box-line">
                      <div className="line"></div>
                    </div>
                  </div>
                  <div className="box-container">
                    <div className="main-boxx">
                      <div className="box1">
                        {col_matrix_1.map((arr, i1) => {
                          return (
                            <div className="box1-col1" key={i1}>
                              {arr.map((c, i2) => {
                                return (
                                  <p
                                    className={
                                      c.is_booked
                                        ? `${c?.category_id?.name} col1p booked`
                                        : `${c?.category_id?.name} col1p`
                                    }
                                    key={i2}
                                    onClick={(e) => setActive(i1, i2, "left")}
                                  >
                                    <span></span>
                                  </p>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>

                      <div className="box2">
                        {col_matrix_2.map((arr, i1) => {
                          return (
                            <div className="box1-col1" key={i1}>
                              {arr.map((c, i2) => {
                                return (
                                  <p
                                    className={
                                      c.is_booked
                                        ? `${c?.category_id?.name} col1p booked`
                                        : `${c?.category_id?.name} col1p`
                                    }
                                    key={i2}
                                    onClick={(e) => setActive(i1, i2, "right")}
                                  >
                                    <span></span>
                                  </p>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="booking-container-col1-inputs">
                    <div className="booking-container-col1-input">
                      <input type="radio" />
                      <span className="booking-container-col-text">
                        Selected
                      </span>
                    </div>
                    <div className="booking-container-col1-input">
                      <input type="radio" />
                      <span className="booking-container-col-text">
                        Reserved
                      </span>
                    </div>
                    <div className="booking-container-col1-input">
                      <input type="radio" />
                      <span className="booking-container-col-text">
                        Available
                      </span>
                    </div>
                  </div>
                  <div className="seat-footer">
                    <div className="booking-total">
                      <h3 className="booking-totalh">Total :</h3>
                      <p className="booking-totalp">N{amount}</p>
                    </div>
                    <div>
                      <div>
                        <button className="seat-btn" onClick={handlePayment}>
                          Pay Now!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="counterbookingRight">
          <img src={schedule?.movie_id?.image} alt="Movie Title" />
          <div className="counterMovieInfo">
            <ul>
              {schedule?.show_time?.map((e, i) => (
                <li key={i} style={{ color: e === filter ? "red" : "" }}>
                  {e}
                </li>
              ))}
            </ul>

            <div>
              <h3>{schedule?.movie_id?.name}</h3>
              <span>{schedule?.movie_id?.genre}</span>
              <p className="movieDescription">
                {schedule?.movie_id?.description}
                <a href="#" className="read-more">
                  Read More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSeat;
