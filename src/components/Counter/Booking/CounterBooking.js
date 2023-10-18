import React, { useState, useEffect } from "react";
import "../stylesCounter/counterBooking.css";
import CounterNav from "../Navigation/CounterNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function CounterBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const branch_id = localStorage.getItem("branch_id");

  const [theaterlisting, setTheaterListing] = useState([]);
  const [showtime, setShowTime] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [filter, setFilter] = useState("");

  const [record, setRecord] = useState({
    first_name: "",
    full_name:"",
    booking_type:"ONSITE",
    last_name: "",
    email: "",
    phone: "",
    show_time: "",
    theater_id: "",
    cinema_id:"",
    branch_id:"",
    counter_id:"",
    movie_id:"",
    movie_price:"",
    schedule_id:"",
    seats:[]

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

    record.full_name = record.first_name +" "+record.last_name;
    record.cinema_id = localStorage.getItem('cinema_id')
    record.branch_id = localStorage.getItem('branch_id')
    record.counter_id = localStorage.getItem('user_id')
    record.schedule_id = schedule?._id
    record.movie_id = schedule?.movie_id._id
    record.movie_price = schedule?.price

    localStorage.setItem("booking",JSON.stringify(record))
    navigate(`/counter/seat/${record.theater_id}/${id}`);
  
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
                <label htmlFor="">First name:</label>
                <span></span>
                <input
                  type="text"
                  name="first_name"
                  value={record.first_name}
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                  className="inputs"
                  required
                />
              </div>
              <div className="counterform-group">
                <label htmlFor="">Last name:</label>
                <span></span>
                <input
                  type="text"
                  name="last_name"
                  value={record.last_name}
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                  className="inputs"
                  required
                />
              </div>
            </div>
            <div className="counterform-group">
              <label htmlFor="">Email:</label>
              <span></span>
              <input
                type="email"
                name="email"
                value={record.email}
                onChange={(e) =>
                  setRecord({ ...record, [e.target.name]: e.target.value })
                }
                className="inputs"
                required
              />
            </div>
            <div className="counterform-group">
              <label htmlFor="">Phone Number:</label>
              <span></span>
              <input
                type="text"
                name="phone"
                value={record.phone}
                onChange={(e) =>
                  setRecord({ ...record, [e.target.name]: e.target.value })
                }
                className="inputs"
                required
              />
            </div>
            <div className="counterformnameflex">
              <div className="counterform-group">
                <label htmlFor="">Theater:</label>

                <select
                  value={record.theater_id}
                  name="theater_id"
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                >
                  <option value=""></option>
                  {theaterlisting.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="counterform-group">
                <label htmlFor="">Showtime:</label>

                <select
                  name="show_time"
                  value={record.show_time}
                  onChange={(e) =>
                    setRecord({ ...record, [e.target.name]: e.target.value })
                  }
                >
                  <option value=""></option>
                  {showtime.map((e) => (
                    <option key={e.id}>{e.value}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="counterform-group">
              <button className="counterform-btn" onClick={handleBookSeat} type="button">
                Book Seat
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
