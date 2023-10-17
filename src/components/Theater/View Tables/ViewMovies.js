import React, { useEffect, useState } from "react";
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
  const [serialNumber, setSerialNumber] = useState(1)

  console.log(movieTable)
  
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
          casts: movie.cast,
          duration: movie.duration,
          pg_rating: movie.pg_rating,
            genre: movie.genre,
            production_studio: movie.production_studio,
          };
        });
        setMovieTable([...data])
      })
      .catch((error) => {
        console.error("Error fetching theater data:", error);
      });
    }, []);
    // let serialNo = serialNumber++
    
  return (
    <div>
      <TheaterNav />
      <div className="vtPage">
        <div className="vt-page">
          <div className="vt-page-top">
            <div className="vt-input">
              <input placeholder="search" />
              <span className="vt-input-btn">Search</span>
            </div>
          </div>
          <div className="vt-select">
            <select>
              <option value="cinema">Cinema</option>
              <option value="Jabi">Jabi</option>
              <option value="Wuse">Wuse</option>
              <option value="Garki">Garki</option>
            </select>

            <button className="addtheaterbtn">Add New Theater</button>
          </div>
          <div className="vt-table-container">
            <table className="vt-table">
              <thead>
                <tr className="vt-table-header">
                  <th>S/N</th>
                  <th>Movie Title</th>
                  <th>Language</th>
                  <th>Casts</th>
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
                    <td>{movie.cast ? movie.cast.join(', ') : 'N/A'}</td>
                    <td>{movie.production_studio}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.pg_rating}</td>
                    <td className="vt-table-view" onClick={handleViewButtonClick}>
                      View
                    </td>
                    <td className="vt-table-edit" onClick={handleEditButtonClick}>
                      {" "}
                      Edit
                    </td>
                    <td className="vt-table-delete">Delete</td>
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
