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
  const cinema_id = localStorage.getItem("cinema_id");
  const branch_id = localStorage.getItem("branch_id");

  const [value, onChange] = useState("");
  const [movieInfo, setMovieInfo] = useState({
    name: "",
    cast: [],
    coming_soon: false,
    language: "",
    genre_id: [],
    description: "",
    duration: "",
    production_studio: "",
    pg_rating: "",
    release_date: "",
    movie_director: "",
    trailer: "",
    image: "",
    cinema_id,
    branch_id,
  });

  const [genres, setGenres] = useState([]);
  const [file, setFile] = useState("");
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

    setMovieInfo((prev) => ({
      ...prev,
      cinema_id,
    }));

    setMovieInfo((prev) => ({
      ...prev,
      branch_id,
    }));
  }, []);

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
    const newCasts = [...movieInfo.cast];
    if (!newCasts[index]) {
      newCasts[index] = {};
    }
    newCasts[index][field] = value;

    if (!newCasts[index].image_url) {
      newCasts[index].image_url = "";
    }

    setMovieInfo((prev) => ({
      ...prev,
      cast: newCasts,
    }));
  };

  const addNewCastField = () => {
    setMovieInfo((prev) => ({
      ...prev,
      cast: [...prev.cast, {}],
    }));
  };

  const removeCastField = (index) => {
    const newCasts = [...movieInfo.cast];
    newCasts.splice(index, 1);
    setMovieInfo((prev) => ({
      ...prev,
      cast: newCasts,
    }));
  };

  const formValidation = () => {
    const errors = {};

    if (!movieInfo.name.trim()) {
      errors.name = "Please enter a movie name";
    }

    // if (movieInfo.cast.length === 0) {
    //   errors.cast = "Please enter at least one cast member";
    // } else {
    //   movieInfo.cast.forEach((cast, index) => {
    //     if (!cast.name) {
    //       errors[`castName${index}`] = "Please enter the cast member's name";
    //     }
    //     if (!cast.url) {
    //       errors[`castUrl${index}`] =
    //         "Please enter the cast member's image URL";
    //     }
    //   });
    // }

    if (selectedGenres.length === 0) {
      errors.genre = "Please select at least one genre";
    }

    if (!movieInfo.coming_soon) {
      errors.coming_soon =
        "Please select whether the movie is showing or coming soon";
    }

    if (!movieInfo.language.trim()) {
      errors.language = "Enter the movie's languages";
    }

    if (!movieInfo.duration.trim()) {
      errors.duration = "Enter the movie's duration";
    }

    if (!movieInfo.production_studio.trim()) {
      errors.production_studio = "Enter the production studio";
    }

    if (!movieInfo.pg_rating.trim()) {
      errors.pg_rating = "Enter the PG rating";
    }

    if (!movieInfo.release_date) {
      errors.release_date = "Enter the movie's release date";
    }

    if (!movieInfo.movie_director.trim()) {
      errors.movie_director = "Enter the movie's director";
    }

    if (!movieInfo.trailer.trim()) {
      errors.trailer = "Enter the movie's trailer link";
    }

    // if (!movieInfo.image) {
    //   errors.image = "Upload a movie poster image";
    // }

    return errors;
  };

  // const cinemaId = localStorage.getItem("cinema_id");

  // if (cinemaId) {
  //   console.log("Cinema ID:", cinemaId);
  // } else {
  //   console.log("Cinema ID not found in local storage.");
  // }

  // const branchId = localStorage.getItem("branch_id");

  // if (branchId) {
  //   console.log("Branch ID:", branchId);
  // } else {
  //   console.log("Branch ID not found in local storage.");
  // }

  const handleSubmitMovie = (e) => {
    e.preventDefault();

    const errors = formValidation();

    if (Object.keys(errors).length === 0) {
      movieInfo.genre_id = selectedGenres;

      if (!file) {
        errors.image = "Upload a movie poster image";
        return;
      }

      let formdata = new FormData();
      formdata.append("image", file);

    
      axios
          .post(`${BASE_URL}/api/v1/movies`, movieInfo)
          .then((response) => {

            if (response.data) {
              axios.put(`${BASE_URL}/api/v1/movies/${response.data.data._id}/resources`, formdata)
              .then((e) => {
                    alert("Movie created successfully")
              });
            }
          })
          .catch((error) => {
            console.error("Error creating movie", error);
          });
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div>
      <TheaterNav />
      <div className="addmovieForm">
        <form className="addmovieform">
          <h2>Add a New Movie</h2>
          <div class="addmovieform-group">
            <label for="">Movie Title:</label>
            <span></span>
            <input
              type="text"
              name="name"
              class="inputs"
              value={movieInfo.name}
              onChange={(e) =>
                setMovieInfo({ ...movieInfo, name: e.target.value })
              }
            />
          </div>

          {movieInfo.cast.map((cast, index) => (
            <div key={index} className="addmovieform-group">
              <label htmlFor={`castName${index}`}>Cast {index + 1}:</label>
              <span></span>
              <input
                type="text"
                placeholder="Name"
                name={`castName${index}`}
                onChange={(e) =>
                  handleCastChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Image Url"
                name={`castUrl${index}`}
                onChange={(e) =>
                  handleCastChange(index, "image_url", e.target.value)
                }
              />
              <button
                type="button"
                className="addcastBTN"
                onClick={() => removeCastField(index)}
              >
                <FcDeleteDatabase /> Remove
              </button>
            </div>
          ))}

          <div className="addmovieform-group">
            <button
              className="addcastBTN"
              type="button"
              onClick={addNewCastField}
            >
              <FcAddDatabase /> Add Cast
            </button>
          </div>

          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Coming Soon:</label>
              <span></span>
              <select
                type="text"
                name="coming_soon"
                class="inputs"
                value={movieInfo.coming_soon}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, coming_soon: e.target.value })
                }
              >
                <option value="true">True</option>
                <option selected value="false">
                  False
                </option>
              </select>
            </div>
            <div class="addmovieform-group">
              <label for="">Language(s):</label>
              <span></span>
              <input
                type="text"
                name="language"
                class="inputs"
                value={movieInfo.language}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, language: e.target.value })
                }
              />
            </div>
          </div>

          <div class="addmovieform-group">
            <label for="">Description:</label>
            <span></span>
            <textarea
              type="text"
              name="description"
              class="inputs"
              value={movieInfo.description}
              onChange={(e) =>
                setMovieInfo({ ...movieInfo, description: e.target.value })
              }
            />
          </div>

          <div class="addmovieform-group">
            <label for="">Genre:</label>
            <span></span>
            <select
              name="genre_id"
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
              <input
                type="text"
                name="duration"
                class="inputs"
                value={movieInfo.duration}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, duration: e.target.value })
                }
              />
            </div>
            <div class="addmovieform-group">
              <label for="">Production Studio:</label>
              <span></span>
              <input
                type="text"
                name="production_studio"
                class="inputs"
                value={movieInfo.production_studio}
                onChange={(e) =>
                  setMovieInfo({
                    ...movieInfo,
                    production_studio: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">PG Rating:</label>
              <span></span>
              <input
                type="text"
                name="pg_rating"
                class="inputs"
                value={movieInfo.pg_rating}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, pg_rating: e.target.value })
                }
              />
            </div>
            <div class="addmovieform-group">
              <label for="">Release Date:</label>
              <span></span>
              <input
                type="date"
                name="release_date"
                class="inputs"
                value={movieInfo.release_date}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, release_date: e.target.value })
                }
              />
            </div>
            <div class="addmovieform-group">
              <label for="">Movie Director:</label>
              <span></span>
              <input
                type="text"
                name="movie_director"
                class="inputs"
                value={movieInfo.movie_director}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, movie_director: e.target.value })
                }
              />
            </div>
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Trailer Link:</label>
              <span></span>
              <input
                type="text"
                name="trailer"
                class="inputs"
                value={movieInfo.trailer}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, trailer: e.target.value })
                }
              />
            </div>
            <div class="addmovieform-group">
              <label for="">Movie Poster:</label>
              <span></span>
              <input
                type="file"
                name="image"
                class="inputs"
                onChange={(e) => setFile((prev) => e.target.files[0])}
              />
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
