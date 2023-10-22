import React, { useEffect, useState } from "react";
import "../stylesTheater/viewmovies.css";
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function ViewMovies() {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate("/theater/add-movie");
  };
  const handleViewButtonClick = (movieId) => {
    navigate(`/theater/single-movie/${movieId}`);
  };

  const [movieTable, setMovieTable] = useState([]);
  const branch_id = localStorage.getItem("branch_id");

  console.log(movieTable);

  useEffect(() => {
    let movie_table_url = `${BASE_URL}/api/v1/movies?branch_id=${branch_id}`;

    axios
      .get(movie_table_url)
      .then((res) => {
        let movies = res.data?.data;
        console.log(movies);
        let data = movies?.map((movie) => {
          return {
            id: movie._id,
            name: movie?.name,
            language: movie?.language,
            genre: movie?.genre_id?.name,
            duration: movie?.duration,
            pg_rating: movie?.pg_rating,
            production_studio: movie?.production_studio,
          };
        });
        setMovieTable([...data]);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  const handleDeleteButtonClick = (movieId) => {
    axios
      .delete(`${BASE_URL}/api/v1/movies/${movieId}`)
      .then((response) => {
        console.log("Movie deleted successfully");

        setMovieTable((prevMovieTable) => {
          const updatedMovieTable = prevMovieTable.filter(
            (movie) => movie.id !== movieId
          );
          return updatedMovieTable;
        });
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

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

            <button className="addmoviesbtn" onClick={handleEditButtonClick}>
              Add New Movie
            </button>
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
                {movieTable.map((movie, index) => (
                  <tr key={movie.id}>
                    <td>{index + 1}</td>
                    <td>{movie.name}</td>
                    <td>{movie.language}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.production_studio}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.pg_rating}</td>
                    <td
                      className="vm-table-view"
                      onClick={() => handleViewButtonClick(movie.id)}
                    >
                      View
                    </td>
                    <td
                      className="vm-table-edit"
                      onClick={handleEditButtonClick}
                    >
                      Edit
                    </td>
                    <td
                      className="vm-table-delete"
                      onClick={() => handleDeleteButtonClick(movie.id)}
                    >
                      Delete
                    </td>
                    ;
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
