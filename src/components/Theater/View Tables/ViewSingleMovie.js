import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TheaterNav from "../Navigation/TheaterNav";
import '../stylesTheater/viewsinglemovie.css'
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function ViewSingleMovie() {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState("");

  useEffect(() => {
    let singleMovie_url = `${BASE_URL}/api/v1/movies/${id}`;
    axios.get(singleMovie_url).then((res) => {
      let data = res.data;
      console.log(data);
      setSingleMovie(data);
    });
  }, []);

  return (
    <div className="singlemov">
      <TheaterNav />
      <div className="moviedetailspage">
        <h1>Movie Details</h1>
        <div className="">
          <div className="movsheetdetails">
            <h3>Movie Name:</h3>
            <span>{singleMovie.name}</span>
          </div>

          {singleMovie.cast && singleMovie.cast.length > 0 && (
            <div className="movsheetdetails">

              <h3>Casts:</h3>
              <ul>
                {singleMovie.cast.map((actor, index) => (
                  <li key={index}>
                    <span>{actor.name}</span>
                    <img src={actor.image_url} alt={actor.text} />,
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="movsheetdetails">
            <h3>Trailer:</h3>
            <span>{singleMovie.trailer}</span>
          </div>

          <div className="movsheetdetails">
            <h3>Description:</h3>
            <span>{singleMovie.description}</span>
          </div>
          <div className="movsheetdetails">
            <h3>Movie Director:</h3>
            <span>{singleMovie.movie_director}</span>
          </div>
          <div className="movsheetdetails">
            <h3>Production Studio:</h3>
            <span>{singleMovie.production_studio}</span>
          </div>
          <div className="movsheetdetails">
            <h3>Language(s):</h3>
            <span>{singleMovie.language}</span>
          </div>
          <div className="movsheetdetails">
            <h3>Release Date:</h3>
            <span>{singleMovie.release_date}</span>
          </div>
          <div className="movsheetdetails">
            <h3>Movie Duration:</h3>
            <span>{singleMovie.duration}</span>
          </div>

          {/* <div className="movsheetdetails">
            <h3>Genres:</h3>
            <span>{singleMovie.genre_id?.name}</span>
          </div> */}

          <div className="movsheetdetails">
            <h3>PG Rating:</h3>
            <span>{singleMovie.pg_rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleMovie;
