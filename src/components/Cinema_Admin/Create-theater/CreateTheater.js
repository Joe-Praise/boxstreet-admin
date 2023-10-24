import React, { useState } from "react";
// import "../../../stylesTheater/addtheater.css";
import "./theater.css"
import axios from "axios";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;


function CreateTheater() {
    const branch_id = localStorage.getItem('branch_id');
    const cinema_id = localStorage.getItem('cinema_id');
    const [theaterData, setTheaterData] = useState({
      name: "",
      screen: 1,
      branch_id,
      cinema_id
    });
  
    const handleChange = (e) => {
      const { name, screen, value } = e.target;
      setTheaterData({
        ...theaterData,
        [name]: value,
        [screen]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios
      .post(`${BASE_URL}/api/v1/theaters`, theaterData)
      .then((response) => {
          if(response.data._id){
            alert("Theater created successfully");
  
          }
        })
        .catch((error) => {
          console.error("Error creating theater:", error);
        });
    };
  
    return (
      <div>
        <Topnav/>
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
  
  export default CreateTheater;
  