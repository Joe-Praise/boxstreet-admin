import React, { useEffect, useRef, useState } from "react";
import "../stylesTheater/theaterbookingseat.css";
import TheaterNav from "../Navigation/TheaterNav";
import img from "../../uploads/expendables.webp";
import { Link } from "react-router-dom";

function TheaterBookingSeat() {
  let [row, setRow] = useState(8);
  let [column, setColumn] = useState(2);
  let [col_matrix_1, setColMatrix1] = useState([2, 2, 4, 4, 4, 4, 4, 1]);
  let [col_matrix_2, setColMatrix2] = useState([3, 1, 4, 4, 2, 4, 4, 3]);
  let selected = useRef();

  let setActive = (e) => {
    e.target.children[0].classList.toggle("active");
  };

  useEffect(() => {}, []);

  return (
    <div className="theater-book-seat">
      <TheaterNav />
      <div className="theaterBookingFlex">
        <div className="theater-booking-container">
          <div className="theater-booking-container-seat">
            <div className="theater-booking-seat-side">
              <span className="theater-booking-seat-vvip"></span>
              <p>VVIP</p>
            </div>
            <div className="theater-booking-seat-side">
              <span className="booking-seat-vip"></span>
              <p>VIP</p>
            </div>
            <div className="theater-booking-seat-side">
              <span className="theater-booking-seat-regular"></span>
              <p>Regular</p>
            </div>
          </div>

          <div className="theater-booking-container-col1">
            <div>
              <div className="theater-booking-container-top">
                <p className="theater-booking-choose-seat-text">
                  Choose your Seat
                </p>
                <p className="theater-box-line">
                  <p className="theater-line"></p>
                </p>
              </div>
              <div className="theater-main-boxx">
                <div className="theater-box1">
                  {col_matrix_1.map((r, i1) => {
                    let arr = new Array(r).fill(3);

                    return (
                      <div className="theater-box1-col1" key={i1}>
                        {arr.map((c, i2) => (
                          <p
                            className="theater-col1p"
                            key={i2}
                            onClick={(e) => setActive(e)}
                          >
                            <span></span>
                          </p>
                        ))}
                      </div>
                    );
                  })}
                </div>

                <div className="theater-box2">
                  {col_matrix_2.map((r, i1) => {
                    let arr = new Array(r).fill(3);

                    return (
                      <div className="theater-box1-col1" key={i1}>
                        {arr.map((c, i2) => (
                          <p
                            className="theater-col1p"
                            key={i2}
                            onClick={(e) => setActive(e)}
                          >
                            <span></span>
                            <i className="theater-regular"></i>
                          </p>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="theater-booking-container-col1-inputs">
              <div className="">
                <input type="theater-radio" />
                <span className="theater-booking-container-col-text">
                  Selected
                </span>
              </div>
              <div className="">
                <input type="theater-radio" />
                <span className="theater-booking-container-col-text">
                  Reserved
                </span>
              </div>
              <div className="">
                <input type="theater-radio" />
                <span className="theater-booking-container-col-text">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="theater-bookingRight">
          <img src={img} alt="" />
          <div className="theater-MovieInfo">
            <p>11:30am - 1:15pm</p>
            <div className="movie-info-right">
              <h3>The Movie Title</h3>
              <span>The Movie Genre</span>
              <p class="theater-movieDescription">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
                rem adipisci totam iusto dolores. Fuga odit, tempora debitis
                modi dolores dolorem beatae repudiandae? Blanditiis mollitia,
                ducimus eum obcaecati quae culpa. Porro, qui et accusamus esse
                officia labore animi ex iusto!
                <a href="#" class="theater-read-more">
                  Read More
                </a>
              </p>
            </div>
            <div className="theater-seat-footer">
              <div className="theater-booking-total">
                <h3>Total :</h3> <p>N6000</p>
              </div>
              <div className="tpay-btn">
                <Link to="">
                  {" "}
                  <button class="theater-seat-btn">Pay Now!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheaterBookingSeat;
