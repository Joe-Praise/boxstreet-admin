import "./styles/createmovieschedule.css";
import { useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import DisplayMovieScheduleInfo from "./DisplayMovieScheduleInfo";
import TheaterNav from "../../Theater/Navigation/TheaterNav";
import axios from "axios";
import { useParams } from "react-router";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function UpdateSchedule() {
  const { id } = useParams();
  const [value, onChange] = useState("");

  let branch_id = localStorage.getItem("branch_id");
  let cinema_id = localStorage.getItem("cinema_id");

  const [updatedSchedule, setUpdatedSchedule] = useState({
    movie: "",
    show_time: [""],
    price: "",
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let movie_url = `${BASE_URL}/api/v1/movies?branch_id=${branch_id}`;

    axios.get(movie_url).then((res) => {
      let info = res.data.data;
      let movieinfo = info?.map((e) => ({
        id: e._id,
        name: e.name,
      }));
      console.log(info);
      setMovies([...movieinfo]);
    });
  }, []);

  const [preview, setPreview] = useState({
    preview: [],
    previewFile: [],
    image: "",
  });

  useEffect(() => {
    if (!preview.previewFile) return;
    let tmp = [];

    for (let i = 0; i < preview.previewFile.length; i++) {
      tmp.push(URL.createObjectURL(preview.previewFile[i]));
    }
    const objecturls = tmp;

    setPreview((prevState) => {
      return {
        ...prevState,
        preview: objecturls,
      };
    });

    for (let i = 0; i < objecturls.length; i++) {
      return () => {
        URL.revokeObjectURL(objecturls[i]);
      };
    }
  }, [preview.image, preview.previewFile]);

  const handleMultiDates = (date) => {
    // const newDate = new Date(date).toISOString();
    const newDate = new Date(date).toLocaleString();
    const oldDate = updatedSchedule.show_time;
    setUpdatedSchedule((prev) => {
      return {
        ...prev,
        show_time: [...oldDate, newDate],
      };
    });
  };

  const inputChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "image") {
      setPreview((prev) => {
        return {
          ...prev,
          previewFile: e.target.files,
        };
      });
      let file = e.target.files[0];
      setPreview((prev) => {
        return {
          ...prev,
          image: file,
        };
      });
    }
    setUpdatedSchedule({ ...updatedSchedule, [name]: value });
  };

  // console.log(formInfo.show_time);

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmittion = (e) => {
    e.preventDefault();

    //   console.log(updatedSchedule)

    axios
      .put(`${BASE_URL}/api/v1/movieschedule`, updatedSchedule)
      .then((res) => {
        if (res.data) {
          alert("Movie scheduled has been updated");
        }
      })
      .catch((err) => {
        console.error("Error in updatine movie schedule:", err);
      });

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="movieschedule-Booking ">
      <TheaterNav />
      <div className="mainContent">
        <div>
          <form className="movieScheduleForm">
            <legend className="movieScheduleLegend">
              Create Movie Schedule
              <p>Double click on the date picker container to choose a date</p>
            </legend>
            <div className="addtheaaterform-group">
              <label htmlFor="movie_id">Movie</label>
              {/* <input type="text" id="movie_id" name="movie_id" /> */}
              <select
                name="movie_id"
                id="movie_id"
                onChange={inputChangeHandler}
              >
                <option value="">Select a movie</option>
                {movies.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="movieScheduleFormInputContainer">
              <div className="addtheaaterform-group">
                <label htmlFor="show_time">Show time</label>
                <input
                  type="datetime-local"
                  id="show_time"
                  name="show_time"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                  onDoubleClick={() => handleMultiDates(value)}
                />
              </div>
              <div className="addtheaaterform-group">
                <label htmlFor="price" name="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div>
              <DisplayMovieScheduleInfo
                preview={preview}
                updatedSchedule={updatedSchedule}
                onSetFormInfo={setUpdatedSchedule}
              />
            </div>

            <div className="movieScheduleFormBtnContainer">
              <button onClick={handleFormSubmittion}>
                {!isLoading ? "Create Schedule" : "Creating..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSchedule;
