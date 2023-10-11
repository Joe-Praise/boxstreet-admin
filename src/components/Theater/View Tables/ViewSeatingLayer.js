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
      <div className="vs-main">
        <div className="vs-container">
          <div className="vs-container-seat">
            <p className="vs-choose-seat-text">Seats Available</p>
            <div className="vs-seat-side">
              <span className="vs-seat-vvip"></span>
              <p>VVIP</p>
            </div>
            <div className="vs-seat-side">
              <span className="vs-seat-vip"></span>
              <p>VIP</p>
            </div>
            <div className="vs-seat-side">
              <span className="vs-seat-regular"></span>
              <p>Regular</p>
            </div>
            <div>
              <div className="vs-total">
                <h3 className="vs-totalh">Theater Capacity</h3>:
                <p className="vs-totalp">50</p>
              </div>
            </div>
          </div>
          <div className="vs-container-col1">
            <div className="vs-col-flex">
              <div className="vs-box-line">
                <p className="vs-line"></p>
              </div>
              <div className="vs-box-container">
                <div className="vs-main-boxx">
                  <div className="vs-box1">
                    {col_matrix_1.map((r, i1) => {
                      let arr = new Array(r).fill(3);

                      return (
                        <div className="vs-box1-col1" key={i1}>
                          {arr.map((c, i2) => (
                            <p
                              className="vs-col1p"
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
                  <div className="vs-box2">
                    {col_matrix_2.map((r, i1) => {
                      let arr = new Array(r).fill(3);

                      return (
                        <div className="vs-box1-col1" key={i1}>
                          {arr.map((c, i2) => (
                            <p
                              className="vs-col1p"
                              key={i2}
                              onClick={(e) => setActive(e)}
                            >
                              <span></span>
                              <i className="vs-regular"></i>
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
