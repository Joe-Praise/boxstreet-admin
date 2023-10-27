import React, { useState } from "react";
import "../stylesTheater/addtheater.css";
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function AddTheater() {
  const branch_id = localStorage.getItem('branch_id');
  const cinema_id = localStorage.getItem('cinema_id');
  const [theaterData, setTheaterData] = useState({
    name: "",
    screen: 1,
    branch_id,
    cinema_id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheaterData({
      ...theaterData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(theaterData)
    axios
    .post(`${BASE_URL}/api/v1/theaters`, theaterData)
    .then((response) => {
          alert("Theater created successfully")
      })
      .catch((error) => {
        console.error("Error creating theater:", error);
      });
  };

  return (
    <div>
      <TheaterNav />
      <div className="addtheaaterForm">
        <form className="addtheaaterform" onSubmit={handleSubmit}>
          <h2>Add a New Theater</h2>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Theater Name:</label>
            <input
              type="text"
              name="name"
              className="inputs"
              required
              onChange={handleChange}
              value={theaterData.name}
            />
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Number of Screens:</label>
            <input
              type="number"
              name="screen"
              className="inputs"
              required
              onChange={handleChange}
              value={theaterData.screen}
            />
          </div>
          <div className="addtheaaterform-group">
            <button type="submit" className="counterform-btn">
              Register Theater
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTheater;
