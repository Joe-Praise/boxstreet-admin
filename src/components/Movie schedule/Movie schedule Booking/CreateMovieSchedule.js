import "./styles/createmovieschedule.css";
import { useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import DisplayMovieScheduleInfo from "./DisplayMovieScheduleInfo";
import TheaterNav from "../../Theater/Navigation/TheaterNav";
function MovieScheduleBooking() {
  const [value, onChange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    show_time: [],
    image: "",
    price: 0,
    branch_id: "",
    movie_id: "",
    cinema_id: "",
  });
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
    const oldDate = formInfo.show_time;
    setFormInfo((prev) => {
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
    setFormInfo({ ...formInfo, [name]: value });
  };

  console.log(formInfo.show_time);
  const handleFormSubmittion = (e) => {
    e.preventDefault();
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
            <div className="movieScheduleFormInputContainer">
              <div className="formGroup">
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
              <div className="formGroup">
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
              <div className="formGroup">
                <label htmlFor="cinema_id">Cinema</label>
                <input
                  type="text"
                  id="cinema_id"
                  name="cinema_id"
                  value={"Genesis Cinema"}
                  disabled
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="branch_id">Branch</label>
                <input
                  type="text"
                  id="branch_id"
                  name="branch_id"
                  value={"Jabi"}
                  disabled
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="movie_id">Movie</label>
                {/* <input type="text" id="movie_id" name="movie_id" /> */}
                <select
                  name="movie_id"
                  id="movie_id"
                  onChange={inputChangeHandler}
                >
                  <option value="">movie1</option>
                  <option value="">movie2</option>
                  <option value="">movie3</option>
                  <option value="">movie4</option>
                  <option value="">movie5</option>
                </select>
              </div>
              <div className="formGroup">
                <label htmlFor="image" className="image">
                  {" "}
                  <FcAddImage className="uploadImg" />{" "}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  multiple
                  onChange={inputChangeHandler}
                />
              </div>
            </div>

            <div className="movieScheduleFormBtnContainer">
              <button onClick={handleFormSubmittion}>
                {!isLoading ? "Create Schedule" : "Creating..."}
              </button>
            </div>
            <div>
              <DisplayMovieScheduleInfo
                preview={preview}
                formInfo={formInfo}
                onSetFormInfo={setFormInfo}
              />
              {/* <img src={preview.preview} alt="" /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MovieScheduleBooking;
