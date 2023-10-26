import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import WebNav from "./Navigation/WebNav";
import "./style/movies.css";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function Movies() {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate("/theater/add-movie");
  };
  const handleViewButtonClick = (movieId) => {
    navigate(`/web-movies/single-movie/${movieId}`);
  };

  const { id } = useParams();
  const [movieTable, setMovieTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const branch_id = localStorage.getItem("branch_id");

  console.log(movieTable);

  useEffect(() => {
    let movie_table_url = `${BASE_URL}/api/v1/movies`;

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

  const handleFindMovies = () => {
    const moviesUrl = `${BASE_URL}/api/v1/movies/${id}`;
    if (moviesUrl) {
      axios
        .get(moviesUrl)
        .then((response) => {
          const movieData = response.data;
          const formattedMovie = {
            id: movieData._id,
            name: movieData.name,
            language: movieData.language,
            genre: movieData.genre_id?.name,
            duration: movieData.duration,
            pg_rating: movieData.pg_rating,
            production_studio: movieData.production_studio,
          };
          setMovieTable([formattedMovie]);
        })
        .catch((error) => {
          setMovieTable([]);
        });
    }
  };

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

  useEffect(() => {
    if (id) {
      handleFindMovies();
    }
  }, [id]);

  return (
    <div>
      <WebNav />
      <div className="web-moviesPage">
        <div className="web-movies-page">
          <div className="web-cinema-page-top">
            <div className="web-cinema-input">
              <input
                placeholder="Search Movie by Title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="web-cinema-input-btn" onClick={handleFindMovies}>
                Search
              </span>
              {/* <span className="web-cinema-input-btn"
            //    onClick={handleReset}
              >
                Reset
              </span> */}
            </div>
          </div>
          {/* <div className="web-movies-select">
              <select>
                <option value="cinema">Cinema</option>
                <option value="Jabi">Jabi</option>
                <option value="Wuse">Wuse</option>
                <option value="Garki">Garki</option>
              </select>
  
              <button className="addmoviesbtn" onClick={handleEditButtonClick}>
                Add New Movie
              </button>
            </div> */}
          <div className="web-movies-table-container">
            <table className="web-movies-table">
              <thead>
                <tr className="web-movies-table-header">
                  <th>S/N</th>
                  <th>Title</th>
                  <th>Language</th>
                  <th>Genre</th>
                  <th> Studio</th>
                  <th>Duration</th>
                  <th> Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movieTable
                  .filter((movie) =>
                    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((movie, index) => (
                    <tr key={movie.id}>
                      <td>{index + 1}</td>
                      <td>{movie.name}</td>
                      <td>{movie.language}</td>
                      <td>{movie.genre_id}</td>
                      <td>{movie.production_studio}</td>
                      <td>{movie.duration}</td>
                      <td>{movie.pg_rating}</td>
                      <td className="actions">
                        <button
                          className="web-cinema-table-check-success"
                          onClick={() => handleViewButtonClick(movie.id)}
                        >
                          View
                        </button>
                        <button
                          className="web-cinema-table-view"
                          onClick={handleEditButtonClick}
                        >
                          Edit
                        </button>
                        <button
                          className="web-cinema-table-print"
                          onClick={() => handleDeleteButtonClick(movie.id)}
                        >
                          Archive
                        </button>
                      </td>
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

export default Movies;
