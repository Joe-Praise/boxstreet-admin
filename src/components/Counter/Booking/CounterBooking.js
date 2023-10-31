import React, { useState, useEffect } from "react";
import "../stylesCounter/counterBooking.css";
import CounterNav from "../Navigation/CounterNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";

let MODE = "PROD";

let BASE_URL =
  MODE === "PROD" ? "https://boxstreet.onrender.com" : "http://localhost:5000";

function CounterBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const branch_id = localStorage.getItem("branch_id");
  const [loading, setLoading] = useState(false);

  const [theaterlisting, setTheaterListing] = useState([]);
  const [showtime, setShowTime] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [filter, setFilter] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [validationMessages, setValidationMessages] = useState({});

  const [record, setRecord] = useState({
    first_name: "",
    full_name: "",
    booking_type: "ONSITE",
    last_name: "",
    email: "",
    phone: "",
    show_time: "",
    theater_id: "",
    cinema_id: "",
    branch_id: "",
    counter_id: "",
    movie_id: "",
    movie_price: "",
    schedule_id: "",
    seats: [],
    payment_method: "",
  });

  const filterTime = (e) => {
    let index = 0;
    for (let i = 0; i < e.length; i++) {
      let d = new Date(e[i]).getTime();
      let today = Date.now();
      if (d > today) {
        index = i;
        break;
      }
    }
    return e[index];
  };

  const handleBookSeat = () => {
    ;

    if (!validateForm()) {
      return;
    }
    setLoading(true)

    record.full_name = record.first_name + " " + record.last_name;
    record.cinema_id = localStorage.getItem("cinema_id");
    record.branch_id = localStorage.getItem("branch_id");
    record.counter_id = localStorage.getItem("user_id");
    record.schedule_id = schedule?._id;
    record.movie_id = schedule?.movie_id._id;
    record.movie_price = schedule?.price;

    localStorage.setItem("booking", JSON.stringify(record));
    setLoading(false);
    setRecord({
      first_name: "",
      full_name: "",
      booking_type: "",
      last_name: "",
      email: "",
      phone: "",
      show_time: "",
      theater_id: "",
      cinema_id: "",
      branch_id: "",
      counter_id: "",
      movie_id: "",
      movie_price: "",
      schedule_id: "",
      seats: [],
      payment_method: "",
    });
    alert("Booking is successful");
    // navigate(`/counter/seat/${record.theater_id}/${id}`);
  };

  const validateForm = () => {
    const errors = {};
    const messages = {};

    if (!record.first_name.trim()) {
      errors.first_name = "First name is required.";
    }

    if (!record.last_name.trim()) {
      errors.last_name = "Last name is required.";
    }

    if (!record.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(record.email)) {
      errors.email = "Invalid email format.";
    }

    if (!record.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^[0-9+]{1,15}$/.test(record.phone)) {
      errors.phone = "Invalid phone number format.";
    }
    

    if (!record.theater_id) {
      errors.theater_id = "Theater is required.";
    }

    if (!record.show_time) {
      errors.show_time = "Showtime is required.";
    }

    if (!record.payment_method) {
      errors.payment_method = "Payment method is required.";
    }

    setFormErrors(errors);
    setValidationMessages(messages);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    let theater_url = `${BASE_URL}/api/v1/theaters?branch_id=${branch_id}`;
    let movie_schedule_url = `${BASE_URL}/api/v1/movieschedule/${id}`;

    axios.get(movie_schedule_url).then((res) => {
      let data = res.data.data;

      let info = data.show_time?.map((e, i) => ({
        id: i + 1,
        value: e,
      }));

      setFilter(filterTime(data.show_time));
      setShowTime([...info]);
      setSchedule(data);
    });

    axios.get(theater_url).then((res) => {
      let data = res.data;
      let info = data?.map((t) => ({
        id: t._id,
        name: t?.name,
      }));

      setTheaterListing([...info]);
    });
  }, []);

  const paymentMethodOptions = [
    {
      id: "1e",
      value: "Card",
    },
    {
      id: "2e",
      value: "Cash",
    },
  ];

  return (
    <div className="counterBooking">
      <div>
        <CounterNav />
      </div>
      <div className="counterBookingFlex">
        <div className="counterBookingForm">
          <form className="counterform">
            <h2>Customer's Information</h2>
            <div className="counterformnameflex">
              <div className="counterform-group">
                <label htmlFor="first_name">First name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={record.first_name}
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                  className={`inputs ${formErrors.first_name ? "error" : ""}`}
                />
                <span>{formErrors.first_name}</span>
                <span className="validation-message">
                  {validationMessages.first_name}
                </span>
              </div>

              <div className="counterform-group">
                <label htmlFor="last_name">Last name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={record.last_name}
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                  className={`inputs ${formErrors.last_name ? "error" : ""}`}
                />
                <span>{formErrors.last_name}</span>
                <span className="validation-message">
                  {validationMessages.last_name}
                </span>
              </div>
            </div>
            <div className="counterform-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={record.email}
                onChange={(e) =>
                  setRecord({ ...record, [e.target.name]: e.target.value })
                }
                className={`inputs ${formErrors.email ? "error" : ""}`}
              />
              <span>{formErrors.email}</span>
              <span className="validation-message">
                {validationMessages.email}
              </span>
            </div>
            <div className="counterform-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={record.phone}
                onChange={(e) =>
                  setRecord({ ...record, [e.target.name]: e.target.value })
                }
                className={`inputs ${formErrors.phone ? "error" : ""}`}
              />
              <span>{formErrors.phone}</span>
              <span className="validation-message">
                {validationMessages.phone}
              </span>
            </div>
            <div className="counterformnameflex">
              <div className="counterform-group">
                <label htmlFor="theater_id">Theater:</label>
                <select
                  value={record.theater_id}
                  name="theater_id"
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                  className={`inputs ${formErrors.theater_id ? "error" : ""}`}
                >
                  <option value=""></option>
                  {theaterlisting.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <span>{formErrors.theater_id}</span>
                <span className="validation-message">
                  {validationMessages.theater_id}
                </span>
              </div>

              <div className="counterform-group">
                <label htmlFor="show_time">Showtime:</label>
                <select
                  name="show_time"
                  value={record.show_time}
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                  className={`inputs ${formErrors.show_time ? "error" : ""}`}
                >
                  <option value=""></option>
                  {showtime.map((e) => (
                    <option key={e.id}>{e.value}</option>
                  ))}
                </select>
                <span>{formErrors.show_time}</span>
                <span className="validation-message">
                  {validationMessages.show_time}
                </span>
              </div>

              <div className="counterform-group">
                <label htmlFor="payment_method">Payment method:</label>
                <select
                  name="payment_method"
                  value={record.payment_method}
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                  className={`inputs ${
                    formErrors.payment_method ? "error" : ""
                  }`}
                >
                  <option value=""></option>
                  {paymentMethodOptions.map((e) => (
                    <option key={e.id}>{e.value}</option>
                  ))}
                </select>
                <span>{formErrors.payment_method}</span>
                <span className="validation-message">
                  {validationMessages.payment_method}
                </span>
              </div>
            </div>
            <div className="counterform-group">
              <button
                className="counterform-btn"
                onClick={handleBookSeat}
                type="button"
              >
                {loading ? <Loading/>: "Book Seat"}
              </button>
            </div>
          </form>
        </div>
        <div className="counterbookingRight">
          <img src={schedule?.movie_id?.image} alt="Movie Title" />
          <div className="counterMovieInfo">
            <ul>
              {schedule?.show_time?.map((e, i) => (
                <li key={i} style={{ color: e === filter ? "red" : "" }}>
                  {e}
                </li>
              ))}
            </ul>
            <div>
              <h3>{schedule?.movie_id?.name}</h3>
              <span>{schedule?.movie_id?.genre}</span>
              <p className="movieDescription">
                {schedule?.movie_id?.description}
                <a href="#" className="read-more">
                  Read More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterBooking;
