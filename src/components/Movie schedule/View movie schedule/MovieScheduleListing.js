import React, { useEffect, useState } from "react";
import "./styles/style.css";
import img from "../../uploads/promo3.jpg";
import TheaterNav from "../../Theater/Navigation/TheaterNav";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

const MovieScheduleListing = () => {
  // const obj = [
  //   {
  //     image: img,
  //     movie: "Avengers IV",
  //     show_time: [
  //       "10/11/2023, 7:05:00 PM",
  //       "10/12/2023, 7:05:00 PM",
  //       "10/13/2023, 7:05:00 PM",
  //       "10/27/2023, 11:05:00 PM",
  //       "10/12/2023, 7:05:00 PM",
  //     ],
  //     price: 7000,
  //     branch: "jabi",
  //     cinema: "Silverbird",
  //   },
  //   {
  //     image: img,
  //     movie: "Avengers IV",
  //     show_time: [
  //       "10/11/2023, 7:05:00 PM",
  //       "10/12/2023, 7:05:00 PM",
  //       "10/13/2023, 7:05:00 PM",
  //       "10/27/2023, 11:05:00 PM",
  //     ],
  //     price: 7000,
  //     branch: "jabi",
  //     cinema: "Silverbird",
  //   },
  //   {
  //     image: img,
  //     movie: "Avengers IV",
  //     show_time: [
  //       "10/11/2023, 7:05:00 PM",
  //       "10/12/2023, 7:05:00 PM",
  //       "10/13/2023, 7:05:00 PM",
  //       "10/27/2023, 11:05:00 PM",
  //       "10/12/2023, 7:05:00 PM",
  //     ],
  //     price: 7000,
  //     branch: "jabi",
  //     cinema: "Silverbird",
  //   },
  //   {
  //     image: img,
  //     movie: "Avengers IV",
  //     show_time: [
  //       "10/11/2023, 7:05:00 PM",
  //       "10/12/2023, 7:05:00 PM",
  //       "10/13/2023, 7:05:00 PM",
  //       "10/27/2023, 11:05:00 PM",
  //     ],
  //     price: 7000,
  //     branch: "jabi",
  //     cinema: "Silverbird",
  //   },
  // ];

  const branch_id = localStorage.getItem("branch_id");
  const cinema_id = localStorage.getItem("cinema_id");
  const [movieSchedule, setMovieSchedule] = useState([]);
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
  const deleteHandler = () => {};
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
              <th>Branch</th>
              <th>Cinema</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movieSchedule?.map((el, i) => {
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
                  <td>{el.branch}</td>
                  <td>{el.cinema}</td>
                  <td className="action">
                    <button className="editBtn" onClick={() => editHandler(el)}>
                      Edit
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteHandler(el)}
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
