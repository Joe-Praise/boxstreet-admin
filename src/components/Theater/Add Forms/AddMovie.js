import "../stylesTheater/addMovie.css";
import TheaterNav from "../Navigation/TheaterNav";
import axios from "axios";
import { FcAddDatabase, FcDeleteDatabase } from "react-icons/fc";
import { useEffect, useState } from "react";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function AddMovie() {
  const [value, onChange] = useState("");
  const [movieInfo, setMovieInfo] = useState({
    name: "",
    casts: [],
    coming_soon: false,
    language: "",
    genre: [],
    description: "",
    movie_duration: "",
    production_studio: "",
    pg_rating: "",
    release_date: "",
    movie_director: "",
    trailer: "",
    image: "",
    cinema_id: "",
    branch_id: "",
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
  
    const cinemaId = localStorage.getItem("cinema_id");
    const branchId = localStorage.getItem("branch_id");

    console.log(cinemaId , branchId)
  
    if (cinemaId) {
      setMovieInfo((prev) => ({
        ...prev,
        cinema_id: cinemaId,
      }));
    }
  
    if (branchId) {
      setMovieInfo((prev) => ({
        ...prev,
        branch_id: branchId,
      }));
    }
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
    const newCasts = [...movieInfo.casts];
    if (!newCasts[index]) {
      newCasts[index] = {};
    }
    newCasts[index][field] = value;

    if (!newCasts[index].image_url) {
      newCasts[index].image_url = "";
    }

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

  const formValidation = () => {
    const errors = {};

    if (!movieInfo.name.trim()) {
      errors.name = "Please enter a movie name";
    }

    // if (movieInfo.casts.length === 0) {
    //   errors.casts = "Please enter at least one cast member";
    // } else {
    //   movieInfo.casts.forEach((cast, index) => {
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

    if (!movieInfo.movie_duration.trim()) {
      errors.movie_duration = "Enter the movie's duration";
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

    if (!movieInfo.image) {
      errors.image = "Upload a movie poster image";
    }

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
      const updatedMovieInfo = {
        ...movieInfo,
        release_date: movieInfo.release_date || "",
        pg_rating: movieInfo.pg_rating || "",
        language: movieInfo.language || "",
        movie_duration: movieInfo.movie_duration || "", // Change to movie_duration
        production_studio: movieInfo.production_studio || "",
        movie_director: movieInfo.movie_director || "",
        times_showed: movieInfo.times_showed || 0,
        description: movieInfo.description || "",
        trailer: movieInfo.trailer || "",
        name: movieInfo.name || "",
        branch_id: movieInfo.branch_id || "",
        cinema_id: movieInfo.cinema_id || "",
      };
      
    
      const errors = formValidation();
    
      axios
      .post(`${BASE_URL}/api/v1/movies`, updatedMovieInfo)
      .then((response) => {
        console.log("Movie created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating a movie:", error);
        if (error.response) {
          console.log(
            "Server returned an error with status code:",
            error.response.status
          );
          console.log("Error data:", error.response.data);
          // Display the error message from the server to the user if available.
          // For example: alert(error.response.data.errorMessage);
        } else if (error.request) {
          console.log("No response received from the server.");
        } else {
          console.log("Request failed before it was sent. Message:", error.message);
        }
      });
    
    };
    

  return (
    <div>
      <TheaterNav />
      <div className="addmovieForm">
        <form className="addmovieform">
          <h2>Add a New Movie</h2>
          <div class="addmovieform-group">
          <label htmlFor="name">Movie Title:</label>
<input
  type="text"
  id="name"
  name="name"
  className="inputs"
  value={movieInfo.name}
  onChange={(e) =>
    setMovieInfo({ ...movieInfo, name: e.target.value })
  }
/>

          </div>

          {movieInfo.casts.map((cast, index) => (
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
                  handleCastChange(index, "url", e.target.value)
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
                <option value="false">False</option>
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
  name="genre"
  multiple
  value={selectedGenres}
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
                name="movie_duration"
                class="inputs"
                value={movieInfo.movie_duration}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, movie_duration: e.target.value })
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
                value={movieInfo.image}
                onChange={(e) =>
                  setMovieInfo({ ...movieInfo, image: e.target.value })
                }
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
