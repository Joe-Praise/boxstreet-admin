import React, { useEffect, useState } from "react";
import "../stylesTheater/addMovie.css";
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";
import { FcAddDatabase, FcDeleteDatabase } from "react-icons/fc";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function AddMovie() {
  const [value, onChange] =  useState("");
  const [movieInfo, setMovieInfo] = useState({
    name: "",
    casts: [],
    coming_soon: false,
    languages: "",
    genre: [],
    movie_duration: "",
    production_studio: "",
    pg_rating: "",
    release_date: "",
    movie_director: "",
    trailer: "",
    image: "",
  });
  const [preview, setPreview] = useState({
    preview: [],
  });

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    let genre_url = `${BASE_URL}/api/v1/genres`;

    axios.get(genre_url).then((res) => {
      let data = res.data;
      let info = data?.map((e) => ({
        id: e._id,
        name: e?.name,
      }));
      setGenres([...info]);
    });
  }, []);

  // const genreSelect = (selectedGenreIds) => {
  //   const selectedGenres = selectedGenreIds.map((id) => genres.find((genre) => genre.id === id));
  //   setMovieInfo((prev) => {
  //     return {
  //       ...prev,
  //       genre: selectedGenres,
  //     };
  //   });
  // }; 

  const handleGenreClick = (e) => {
    const clickedGenreId = e.target.value;
    if (selectedGenres.includes(clickedGenreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== clickedGenreId));
    } else {
      setSelectedGenres([...selectedGenres, clickedGenreId]);
    }
    setMovieInfo((prev) => ({
      ...prev,
      genre: selectedGenres,
    }));
  };

  const handleCastChange = (index, field, value) => {
    const newCasts = [...movieInfo.casts];
    if (!newCasts[index]) {
      newCasts[index] = {};
    }
    newCasts[index][field] = value;
    setMovieInfo((prev) => ({
      ...prev,
      casts: newCasts,
    }));
  };

  const addNewCastField = () => {
    setMovieInfo((prev) => ({
      ...prev,
      casts: [...prev.casts, {}],
    }));
  };

  const removeCastField = (index) => {
    const newCasts = [...movieInfo.casts];
    newCasts.splice(index, 1);
    setMovieInfo((prev) => ({
      ...prev,
      casts: newCasts,
    }));
  };

  
  const [movieSubmit, setMovieSubmit] = useState(false);

  const handleSubmitMovie = (e) => {
    e.preventDefault();
    setMovieSubmit(true);
  }
  return (
    <div>
      <TheaterNav />
      <div className="addmovieForm">
        <form className="addmovieform">
          <h2>Add a New Movie</h2>
          <div class="addmovieform-group">
            <label for="">Movie Title:</label>
            <span></span>
            <input type="text" name="name" class="inputs" required />
          </div>

          {movieInfo.casts.map((cast, index) => (
            <div key={index} className="addmovieform-group">
              <label htmlFor="">Cast {index + 1}:</label>
              <span></span>
              <input
                type="text"
                placeholder="Name"
                value={""}
                onChange={(e) => handleCastChange(index, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Image Url"
                value={""}
                onChange={(e) => handleCastChange(index, "image_url", e.target.value)}
              />
              <button type="button" className="addcastBTN" onClick={() => removeCastField(index)}>
                <FcDeleteDatabase /> Remove
              </button>
            </div>
          ))}

          <div className="addmovieform-group">
            <button className="addcastBTN" type="button" onClick={addNewCastField}>
            <FcAddDatabase /> Add Cast 
            </button>
          </div>


          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Coming Soon:</label>
              <span></span>
              <select type="text" name="name" class="inputs" required>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div class="addmovieform-group">
              <label for="">Language(s):</label>
              <span></span>
              <input type="text" name="name" class="inputs" required />
            </div>
          </div>

          <div class="addmovieform-group">
            <label for="">Genre:</label>
            <span></span>
            <select
              name="genre"
              multiple
              value={selectedGenres}
              onClick={handleGenreClick}
            >
              {genres.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Movie Duration:</label>
              <span></span>
              <input type="text" name="category" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Production Studio:</label>
              <span></span>
              <input type="text" name="name" class="inputs" required />
            </div>
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">PG Rating:</label>
              <span></span>
              <input type="number" name="price" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Release Date:</label>
              <span></span>
              <input
                type="date"
                id="release_date"
                name="release_date"
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </div>
            <div class="addmovieform-group">
              <label for="">Movie Director:</label>
              <span></span>
              <input type="text" name="quantity" class="inputs" required />
            </div>
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Trailer Link:</label>
              <span></span>
              <input type="link" name="quantity" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Movie Poster:</label>
              <span></span>
              <input type="file" name="quantity" class="inputs" required />
            </div>
          </div>
          <div class="addmovieform-group">
            <button class="counterform-btn" onClick={handleSubmitMovie}>
              Upload Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
