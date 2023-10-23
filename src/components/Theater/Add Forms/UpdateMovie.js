import React, { useEffect, useState } from "react";
import "../stylesTheater/addMovie.css";
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";
import { FcAddDatabase, FcDeleteDatabase } from "react-icons/fc";
import { useParams } from "react-router-dom";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function UpdateMovie() {
  const { id } = useParams();

  const branch_id = localStorage.getItem("branch_id");
  const cinema_id = localStorage.getItem("cinema_id");

  const [updatedMovieInfo, setUpdatedMovieInfo] = useState({
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
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/movies/${id}`)
      .then((response) => {
        const {
          name,
          cast,
          coming_soon,
          language,
          genre_id,
          description,
          duration,
          production_studio,
          pg_rating,
          release_date,
          movie_director,
          trailer,
        } = response.data;
        setUpdatedMovieInfo({
          name,
          cast,
          coming_soon,
          language,
          genre_id,
          description,
          duration,
          production_studio,
          pg_rating,
          release_date,
          movie_director,
          trailer,
        });
      })
      .catch((error) => {
        console.error("error fetching movies data:", error);
      });
  }, [id]);

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

    setUpdatedMovieInfo((prev) => ({
      ...prev,
      id,
    }));

    // setUpdatedMovieInfo((prev) => ({
    //   ...prev,
    //   branch_id,
    // }));
  }, []);

  const handleGenreClick = (e) => {
    const clickedGenreId = e.target.value;
    if (selectedGenres.includes(clickedGenreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== clickedGenreId));
    } else {
      setSelectedGenres([...selectedGenres, clickedGenreId]);
    }
    setUpdatedMovieInfo((prev) => ({
      ...prev,
      genre: selectedGenres,
    }));
  };

  const handleCastChange = (index, field, value) => {
    const newCasts = [...updatedMovieInfo.cast];
    if (!newCasts[index]) {
      newCasts[index] = {};
    }
    newCasts[index][field] = value;

    if (!newCasts[index].image_url) {
      newCasts[index].image_url = "";
    }

    setUpdatedMovieInfo((prev) => ({
      ...prev,
      cast: newCasts,
    }));
  };

  const addNewCastField = () => {
    setUpdatedMovieInfo((prev) => ({
      ...prev,
      cast: [...prev.cast, {}],
    }));
  };

  const removeCastField = (index) => {
    const newCasts = [...updatedMovieInfo.cast];
    newCasts.splice(index, 1);
    setUpdatedMovieInfo((prev) => ({
      ...prev,
      cast: newCasts,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovieInfo({
      ...updatedMovieInfo,
      [name]: value,
    });
  };

  const formValidation = () => {
    const errors = {};

    if (!updatedMovieInfo.name.trim()) {
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

    if (!updatedMovieInfo.coming_soon) {
      errors.coming_soon =
        "Please select whether the movie is showing or coming soon";
    }

    if (!updatedMovieInfo.language.trim()) {
      errors.language = "Enter the movie's languages";
    }

    if (!updatedMovieInfo.duration.trim()) {
      errors.duration = "Enter the movie's duration";
    }

    if (!updatedMovieInfo.production_studio.trim()) {
      errors.production_studio = "Enter the production studio";
    }

    if (!updatedMovieInfo.pg_rating.trim()) {
      errors.pg_rating = "Enter the PG rating";
    }

    if (!updatedMovieInfo.release_date) {
      errors.release_date = "Enter the movie's release date";
    }

    if (!updatedMovieInfo.movie_director.trim()) {
      errors.movie_director = "Enter the movie's director";
    }

    if (!updatedMovieInfo.trailer.trim()) {
      errors.trailer = "Enter the movie's trailer link";
    }

    // if (!movieInfo.image) {
    //   errors.image = "Upload a movie poster image";
    // }

    return errors;
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const errors = formValidation();

    if (Object.keys(errors).length === 0) {
      updatedMovieInfo.genre_id = selectedGenres;

      let movie_update_url = `${BASE_URL}/api/v1/movies/${id}`;

      axios
        .put(movie_update_url, updatedMovieInfo)
        .then((response) => {
          alert("Movie Details updated successfully", response.data);
        })
        .catch((error) => {
          console.error("Error updating movie", error);
        });
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div>
      <TheaterNav />
      <div className="addmovieForm">
        <form className="addmovieform" onSubmit={handleSubmitUpdate}>
          <h2>Add a New Movie</h2>
          <div class="addmovieform-group">
            <label for="">Movie Title:</label>
            <span></span>
            <input
              type="text"
              name="name"
              class="inputs"
              value={updatedMovieInfo.name}
              onChange={(e) =>
                setUpdatedMovieInfo({
                  ...updatedMovieInfo,
                  name: e.target.value,
                })
              }
            />
          </div>

          {updatedMovieInfo.cast.map((cast, index) => (
            <div key={index} className="addmovieform-group">
              <label htmlFor={`castName${index}`}>Cast {index + 1}:</label>
              <span></span>
              <input
                type="text"
                placeholder="Name"
                name={`castName${index}`}
                value={cast.name}
                onChange={(e) =>
                  handleCastChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Image Url"
                name={`castUrl${index}`}
                value={cast.image_url}
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
                value={updatedMovieInfo.coming_soon}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
                    coming_soon: e.target.value,
                  })
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
                value={updatedMovieInfo.language}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
                    language: e.target.value,
                  })
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
              value={updatedMovieInfo.description}
              onChange={(e) =>
                setUpdatedMovieInfo({
                  ...updatedMovieInfo,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="addmovieform-group">
            <label htmlFor="genre_id">Genre:</label>
            <span></span>
            <select
              name="genre_id"
              multiple
              value={updatedMovieInfo.genre_id}
              onChange={handleGenreClick}
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
                value={updatedMovieInfo.duration}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
                    duration: e.target.value,
                  })
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
                value={updatedMovieInfo.production_studio}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
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
                value={updatedMovieInfo.pg_rating}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
                    pg_rating: e.target.value,
                  })
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
                value={updatedMovieInfo.release_date}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
                    release_date: e.target.value,
                  })
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
                value={updatedMovieInfo.movie_director}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
                    movie_director: e.target.value,
                  })
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
                value={updatedMovieInfo.trailer}
                onChange={(e) =>
                  setUpdatedMovieInfo({
                    ...updatedMovieInfo,
                    trailer: e.target.value,
                  })
                }
              />
            </div>
            {/* <div class="addmovieform-group">
              <label for="">Movie Poster:</label>
              <span></span>
              <input
                type="file"
                name="image"
                class="inputs"
                // value={updatedMovieInfo.image}
                onChange={(e) => setFile((prev) => e.target.files[0])}
              />
            </div> */}
          </div>
          <div class="addmovieform-group">
            <button type="submit" class="counterform-btn">
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateMovie;
