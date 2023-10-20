import React, { useEffect, useState } from "react";
import "../stylesTheater/seatLayout.css";
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewSeatingLayer() {
 
  const [col_matrix_1, setColMatrix1] = useState([
    [{}]
  ]);
  const [col_matrix_2, setColMatrix2] = useState([
    [{}],
  ]);

  let MODE = "PROD";
  let LOCAL = "http://localhost:5000";
  let ONLINE = "https://boxstreet.onrender.com";
  
  let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;
  let {id} = useParams()
  let theater_id = id
  let [capacity,setCapacity] = useState(0)

  useEffect(() => {
    let left_seats = {};
    let right_seats = {};

    let seat_url = `${BASE_URL}/api/v1/theaters/${theater_id}/seats-summary`;
    axios.get(seat_url).then((res) => {
      let data = res.data;

      for (let i = 0; i < data.col_matrix_1.length; i++) {
        let d = data.col_matrix_1[i];
        capacity += 1
        if (!left_seats[d.row]) {
          left_seats[d.row] = [d];
        } else {
          left_seats[d.row].push(d);
        }
      }

      for (let i = 0; i < data.col_matrix_2.length; i++) {
        let d = data.col_matrix_2[i];
        // capacity += 1
        if (!right_seats[d.row]) {
          right_seats[d.row] = [d];
        } else {
          right_seats[d.row].push(d);
        }
      }

      setCapacity(capacity)
      setColMatrix1(Object.values(left_seats));
      setColMatrix2(Object.values(right_seats));
    });
  }, []);

  return (
    <div className="vs-layer">
      <TheaterNav />
      <div className="vs-main">
        <div className="vs-container">
          <div className="vs-container-seat">
            <p className="vs-choose-seat-text">Seat Type</p>
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
           
          </div>
          <div className="vs-container-col1">
            <div className="vs-col-flex">
              <div className="vs-box-line">
                <p className="vs-line"></p>
              </div>
              <div className="vs-box-container">
                <div className="vs-main-boxx">
                  <div className="vs-box1">
                   
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
                                  >
                                    <span></span>
                                  </p>
                                );
                              })}
                            </div>
                          );
                        })}
                  </div>
                  <div className="vs-box2">
                    
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
                <div>
              <div className="vs-total">
                <h3 className="vs-totalh">Theater Capacity : {capacity}</h3>
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
