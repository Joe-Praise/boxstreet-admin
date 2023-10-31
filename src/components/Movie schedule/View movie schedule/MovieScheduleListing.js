import React, { useEffect, useState } from "react";
import "./styles/style.css";
import img from "../../uploads/promo3.jpg";
import TheaterNav from "../../Theater/Navigation/TheaterNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

const MovieScheduleListing = () => {
  const navigate = useNavigate();

  const branch_id = localStorage.getItem("branch_id");
  const cinema_id = localStorage.getItem("cinema_id");
  const [movieSchedule, setMovieSchedule] = useState([]);

  const handleEditButtonClick = (scheduleId, schedule) => {
    navigate(`/theater/update-schedule/${scheduleId}`, {
      state: { scheduleData: schedule },
    });
  };

  useEffect(() => {
    let schedule_url = `${BASE_URL}/api/v1/movieschedule?branch_id=${branch_id}`;

    axios
      .get(schedule_url)
      .then((res) => {
        let schedules = res.data.data;
        let data = schedules?.map((ms) => {
          const movieId = ms.movie_id?.id;
          const cinemaId = ms.branch_id?.cinema_id;
          return {
            id: ms._id,
            movie_id: movieId,
            cinema_id: cinema_id,
            image: ms?.movie_id?.image,
            name: ms?.movie_id?.name,
            show_time: ms?.show_time,
            price: ms?.price,
          };
        });
        setMovieSchedule([...data]);
        console.log(schedules);
      })
      .catch((error) => {
        console.error("Error fetching schedule data:", error);
      });
  }, [BASE_URL, branch_id]);

  const editHandler = () => {};

  const deleteHandler = (scheduleId) => {
    axios
    .delete(`${BASE_URL}/api/v1/movieschedule/${scheduleId}`)
    .then((response) => {
      alert("Schedule has been deleted");
    })
    .catch((error) => {
      console.error("Error deleting Schedule", error)
    })
  };
  return (
    <div>
      <TheaterNav />
      <div className="movielistingContainer">
        <h3>Movie Schedule Listing</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Movie</th>
              <th>Show time</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movieSchedule?.map((el, i, schedule) => {
              return (
                <tr key={i}>
                  <td>
                    <img src={el.image} alt="movie avi" className="tdImg" />
                  </td>
                  <td>{el.name}</td>
                  <td className="showtimeTd">
                    {el.show_time?.map((show, i) => {
                      return <p key={i}>{show}</p>;
                    })}
                  </td>
                  <td>{`₦${el.price.toLocaleString()}`}</td>
                  <td className="action">
                    {/* <button 
                      className="editBtn" 
                      onClick={() => handleEditButtonClick(el.id, schedule)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="deleteBtn"
                      onClick={() => deleteHandler(el.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieScheduleListing;

