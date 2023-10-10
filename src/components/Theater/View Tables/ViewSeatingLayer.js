import React, { useEffect, useRef, useState } from "react";
import "../stylesTheater/seatLayout.css";
import TheaterNav from "../Navigation/TheaterNav";

function ViewSeatingLayer() {
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
    <div className="vs-layer">
      <TheaterNav />
      <div className="booking-main">
        <div className="booking-container">
          <div className="booking-container-seat">
            <p className="booking-choose-seat-text">Seats Available</p>
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
            <div>
                <div className="booking-total">
                    <h3 className="booking-totalh">Theater Capacity</h3>
                    :
                    <p className="booking-totalp">50</p>
                </div>
            </div>
          </div>
          <div className="booking-container-col1">
            <div className="seat-col-flex"> 
                <div className="box-line">
                <p className="line"></p>
                </div>
                <div className="box-container">
                <div className="main-boxx">
                    <div className="box1">
                    {col_matrix_1.map((r, i1) => {
                        let arr = new Array(r).fill(3);

                        return (
                        <div className="box1-col1" key={i1}>
                            {arr.map((c, i2) => (
                            <p
                                className="col1p"
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
                    <div className="box2">
                    {col_matrix_2.map((r, i1) => {
                        let arr = new Array(r).fill(3);

                        return (
                        <div className="box1-col1" key={i1}>
                            {arr.map((c, i2) => (
                            <p
                                className="col1p"
                                key={i2}
                                onClick={(e) => setActive(e)}
                            >
                                <span></span>
                                <i className="regular"></i>
                            </p>
                            ))}
                        </div>
                        );
                    })}
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSeatingLayer;
