import React, { useEffect, useState } from "react";
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";
import { useParams } from "react-router";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function UpdateSeat() {
  const { id } = useParams();

  const [updatedSeatData, setUpdatedSeatData] = useState({
    theater_id: "",
    category_id: "",
    position: "",
    row: 0,
    seat_number: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/seats/${id}`)
      .then((response) => {
        const { category_id, position, row, seat_number } = response.data;
        setUpdatedSeatData({ category_id, position, row, seat_number });
      })
      .catch((error) => {
        console.error("Error fetching theater data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSeatData({
      ...updatedSeatData,
      [name]: value,
    });
  };

  const branch_id = localStorage.getItem('branch_id');
  const cinema_id = localStorage.getItem('cinema_id');

  const [theaters,setTheater] = useState([])
  const [categories,setCategory] = useState([])

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


  const handleSubmit = (e) => {
    e.preventDefault();

    let update_seat_url = `${BASE_URL}/api/v1/seats/${id}`;
    axios
      .put(update_seat_url, updatedSeatData)
      .then((response) => {
        alert("Seat updated successfully", response.data);
      })
      .catch((error) => {
        console.error("Error updating seat:", error);
      });
  };

  return (
    <div>
      <TheaterNav />
      <div className="addtheaaterForm">
        <form className="addtheaaterform" onSubmit={handleSubmit}>
          <h2>Update Seat</h2>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Theater name:</label>
            <select
              className="inputs"
              name="theater_id"
              onChange={handleChange}
              value={updatedSeatData.theater_id}
            >
              <option value=""></option>
              {theaters.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Category:</label>
            <select
              className="inputs"
              name="category_id"
              value={updatedSeatData.category_id}
              onChange={handleChange}
            >
              <option value=""></option>
              {categories.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="name">Seat position:</label>
            <select
              className="inputs"
              value={updatedSeatData.position}
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
              value={updatedSeatData.row}
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
              value={updatedSeatData.seat_number}
            />
          </div>
          <div className="addtheaaterform-group">
            <button type="submit" className="counterform-btn">
              Update seat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSeat;
