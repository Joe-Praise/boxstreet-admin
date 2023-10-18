import React, { useEffect, useState } from "react";
import '../stylesTheater/viewmovies.css'
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let MODE = "PROD";
let LOCAL = "http://lolcalhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function ViewMovies() {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate("/theater-admin/add-movie");
  };
  const handleViewButtonClick = () => {
    navigate("/theater-admin/seat-layout");
  };

  const [movieTable, setMovieTable] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1);

  console.log(movieTable);

  useEffect(() => {
    let movie_table_url = `${BASE_URL}/api/v1/movies`;

    axios
      .get(movie_table_url)
      .then((res) => {
        let movies = res.data?.data;
        let data = movies?.map((movie) => {
          return {
            id: movie._id,
            name: movie.name,
            language: movie.language,
            genre: movie.genre.name,
            duration: movie.duration,
            pg_rating: movie.pg_rating,
            genre: movie.genre,
            production_studio: movie.production_studio,
          };
        });
        setMovieTable([...data]);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);
  // let serialNo = serialNumber++

  return (
    <div>
      <TheaterNav />
      <div className="vmPage">
        <div className="vm-page">
          <div className="vm-page-top">
            <div className="vm-input">
              <input placeholder="search" />
              <span className="mt-input-btn">Search</span>
            </div>
          </div>
          <div className="vm-select">
            <select>
              <option value="cinema">Cinema</option>
              <option value="Jabi">Jabi</option>
              <option value="Wuse">Wuse</option>
              <option value="Garki">Garki</option>
            </select>

            <button className="addmoviesbtn" onClick={handleEditButtonClick}>Add New Movie</button>
          </div>
          <div className="vm-table-container">
            <table className="vm-table">
              <thead>
                <tr className="vm-table-header">
                  <th>S/N</th>
                  <th>Movie Title</th>
                  <th>Language</th>
                  <th>Genre</th>
                  <th>Production Studio</th>
                  <th>Duration</th>
                  <th>PG Rating</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {movieTable.map((movie) => (
                  <tr key={movie.id}>
                    <td>{movie.serialNumber}</td>
                    <td>{movie.name}</td>
                    <td>{movie.language}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.production_studio}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.pg_rating}</td>
                    <td
                      className="vm-table-view"
                      onClick={handleViewButtonClick}
                    >
                      View
                    </td>
                    <td
                      className="vm-table-edit"
                      onClick={handleEditButtonClick}
                    >
                      Edit
                    </td>
                    <td className="vm-table-delete">Delete</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMovies;
