import React, { useEffect, useState } from "react";
import TheaterNav from "../Navigation/TheaterNav";
import "../stylesTheater/addseat.css";
import axios from "axios";

function AddSeat() {

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

  const branch_id = localStorage.getItem('branch_id');
  const cinema_id = localStorage.getItem('cinema_id');

  const [formData, setFormData] = useState({
    branch_id,
    cinema_id,
    category_id: "",
    theater_id: "",
    position: "",
    row: "",
    seat_number: "",
  });

  const [theaters,setTheater] = useState([])
  const [categories,setCategory] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e)=>{
        e.preventDefault();
  
        let seat_url = `${BASE_URL}/api/v1/seats`;
        axios
        .post(seat_url,formData)
        .then((res) => {
                alert("Seat added to theater.");
                setFormData({
                  category_id: "",
                  theater_id: "",
                  position: "",
                  row: "",
                  seat_number: "",
                })
        })
        .catch((error) => {
          console.error("Error fetching theater data:", error);
        });

  }

  useEffect(()=>{
    let theater_url = `${BASE_URL}/api/v1/theaters?cinema_id=${cinema_id}&branch_id=${branch_id}`;
    let category_url = `${BASE_URL}/api/v1/categories?cinema_id=${cinema_id}`;

    axios
    .get(theater_url)
    .then((res) => {
      let theaters = res.data;
      let data = theaters?.map((theater) => {
        return {
          id: theater._id,
          name: theater.name
        };
      });
      setTheater([...data]);
    })
    .catch((error) => {
      console.error("Error fetching theater data:", error);
    });

    axios
    .get(category_url)
    .then((res) => {
      let categories = res.data;
      let data = categories?.map((category) => {
        return {
          id: category._id,
          name: category.name
        };
      });
      setCategory([...data]);
    })
    .catch((error) => {
      console.error("Error fetching theater data:", error);
    });

  },[])

  return (
    <div>
      <TheaterNav />
      <div className="addtheaaterForm">
        <form className="addtheaaterform" onSubmit={handleSubmit}>
          <h2>Add a seat</h2>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Theater name:</label>
            <select
              className="inputs"
              name="theater_id"
              onChange={handleChange}
              value={formData.theater_id}
            >
              <option value=""></option>
              {
                theaters.map(e=> <option key={e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Category:</label>
            <select
              className="inputs"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            >
                 <option value=""></option>
              {
                categories.map(e=> <option key={e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Seat position:</label>
            <select
              className="inputs"
              value={formData.position}
              name="position"
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="LEFT">LEFT</option>
              <option value="RIGHT">RIGHT</option>
            </select>
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Seat row:</label>
            <input
              type="text"
              name="row"
              className="inputs"
              required
              onChange={handleChange}
              value={formData.row}
            />
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Seat number:</label>
            <input
              type="text"
              name="seat_number"
              className="inputs"
              required
              onChange={handleChange}
              value={formData.seat_number}
            />
          </div>
          <div className="addtheaaterform-group">
            <button type="submit" className="counterform-btn">
              Add seat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSeat;
