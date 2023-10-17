import React from "react";
import axios from "axios";
import config from "../../config";

import { useState, useEffect } from "react";
// import '../stylesCounter/counterBooking.css'
// import img1 from "../uploads/booking-movie6.jpg";
import img from "../../uploads/expendables.webp";
import "../stylesCounter/bookSeat.css";
import CounterNav from "../Navigation/CounterNav";
import { Link, useParams } from "react-router-dom";


let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function BookSeat() {

  const [formErrorMessage, setFormErrorMessage] = useState("");

  let { id } = useParams();

  let theater_id = id;

  let [col_matrix_1, setColMatrix1] = useState([
    [{}],
    [{}, {}, {}],
    [{}, {}, {}],
  ]);
  let [col_matrix_2, setColMatrix2] = useState([
    [{}, {}, {}],
    [{}, {}],
  ]);

  let email = "";
  let [amount, setAmount] = useState(100);

  let setActive = (row, col, pos) => {
    let d;
    if (pos === "left") {
      let col_1_new = [...col_matrix_1];
      d = col_1_new[row][col];
      d.is_booked = !d.is_booked;
      setColMatrix1(col_1_new);
    }

    if (pos === "right") {
      let col_2_new = [...col_matrix_2];
      d = col_2_new[row][col];
      d.is_booked = !d.is_booked;
      setColMatrix2(col_2_new);
    }
  };

  let handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        config.PAYMENT_BASE_URL + "/initiate-payment",
        email, amount
      );
      if (response?.data.status === "success") {
        console.log(response);
      } else {
        setFormErrorMessage("Payment transaction Unsuccessful");
      }
    } catch (error) {
      setFormErrorMessage("An error occurred in payment transaction.");
    }
  };

  useEffect(() => {
    let left_seats = {};
    let right_seats = {};
    let seat_url = `${BASE_URL}/api/v1/theaters/${theater_id}/seats-summary`;

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
                    <p>VIP</p>
                  </div>
                  <div className="booking-seat-side">
                    <span className="booking-seat-regular"></span>
                    <p>Regular</p>
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
                      <p className="booking-totalp">N600</p>
                    </div>
                    <div>
                      <div>
                        <button class="seat-btn" onClick={handlePayment}>
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
          <img src={img} alt="" />
          <div className="counterMovieInfo">
            <p>11:30am - 1:15pm</p>
            <div>
              <h3>The Movie Title</h3>
              <span>The Movie Genre</span>
              <p class="movieDescription">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
                rem adipisci totam iusto dolores. Fuga odit, tempora debitis
                modi dolores dolorem beatae repudiandae? Blanditiis mollitia,
                ducimus eum obcaecati quae culpa. Porro, qui et accusamus esse
                officia labore animi ex iusto!
                <a href="#" class="read-more">
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
