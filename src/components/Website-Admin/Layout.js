import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WebNav from "./Navigation/WebNav";

function Layout() {
  const [colMatrix1, setColMatrix1] = useState([]);
  const [colMatrix2, setColMatrix2] = useState([]);
  const [capacity, setCapacity] = useState(0);

  const MODE = "PROD";
  const LOCAL = "http://localhost:5000";
  const ONLINE = "https://boxstreet.onrender.com";
  const BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

  const { id } = useParams();

  useEffect(() => {
    const fetchSeatingData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/theaters/${id}/seats-summary`);
        const data = response.data;

        const leftSeats = {};
        const rightSeats = {};

        data.col_matrix_1.forEach((d) => {
          capacity += 1;
          if (!leftSeats[d.row]) {
            leftSeats[d.row] = [d];
          } else {
            leftSeats[d.row].push(d);
          }
        });

        data.col_matrix_2.forEach((d) => {
          if (!rightSeats[d.row]) {
            rightSeats[d.row] = [d];
          } else {
            rightSeats[d.row].push(d);
          }
        });

        setCapacity(capacity);
        setColMatrix1(Object.values(leftSeats));
        setColMatrix2(Object.values(rightSeats));
      } catch (error) {
        console.error("Error fetching seating data:", error);
      }
    };

    fetchSeatingData();
  }, [id]);

  return (
    <div className="vs-layer">
      <WebNav />
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
                    {colMatrix1.map((arr, i1) => (
                      <div className="box1-col1" key={i1}>
                        {arr.map((c, i2) => (
                          <p
                            className={
                              c.is_booked
                                ? `${c.category_id.name} col1p booked`
                                : `${c.category_id.name} col1p`
                            }
                            key={i2}
                          >
                            <span></span>
                          </p>
                        ))}
                      </div>
))}
                  </div>
                  <div className="vs-box2">
                    {colMatrix2.map((arr, i1) => (
                      <div className="box1-col1" key={i1}>
                        {arr.map((c, i2) => (
                          <p
                            className={
                              c.is_booked
                                ? `${c.category_id.name} col1p booked`
                                : `${c.category_id.name} col1p`
                            }
                            key={i2}
                          >
                            <span></span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="vs-total">
                  <h3 className="vs-totalh">Theater Capacity : {capacity}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
