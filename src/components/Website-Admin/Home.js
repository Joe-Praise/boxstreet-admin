import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebNav from "./Navigation/WebNav";
import "./style/home.css";
import axios from "axios";
import config from "../config";
import "./style/cinemas.css";
import Ad from "../uploads/Admin-Profile-Vector-PNG-Picture.png";
import Nema from "../uploads/cinema-building-ENA2OEF-600.jpg";
import Mov from "../uploads/pngwing.com.png";
import theater from "../uploads/teath.png";
import counter from "../uploads/—Pngtree—vector bank counter_631940.png"
import book from "../uploads/bookings.jpg";
import scree from "../uploads/screen.jpg";
import seat from "../uploads/theater.jpg";
import user from "../uploads/users.png";
import branch from "../uploads/branch.png";
import movie from "../uploads/movie-time-hey-im-with-the-band-blog.png"

function Home() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    axios.get(config.ADMIN_BASE_URL).then((result) => {
      setSummary(result.data);
    });

  }, []);

  return (
    <div>
      <div>
        <WebNav />
      </div>
      <div className="web-cinema">
        <div className="web-cinema-page">
          <div className="dash-intro">
            <h3>DASHBOARD SUMMARY</h3>
          </div>
          <div className="web-archive-top">
            <div className="box effect7">
              <img className="image" src={Nema} alt="" />
              <h3>CINEMAS</h3>
              <p>{summary.cinemas}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={Ad} alt="" />
              <h3>ADMINS</h3>
              <p>{summary.cinema_admin}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={Mov} alt="" />
              <h3>MOVIES</h3>
              <p>{summary.movie}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={theater} alt="" />
              <h3>THEATERS</h3>
              <p>{summary.theaters}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={counter} alt="" />
              <h3>COUNTERS</h3>
              <p>{summary.counter_admin}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={book} alt="" />
              <h3>BOOKINGS</h3>
              <p>{summary.bookings}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={scree} alt="" />
              <h3>SCREENS</h3>
              <p>{summary.screens}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={seat} alt="" />
              <h3>SEATS</h3>
              <p>{summary.seat}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={user} alt="" />
              <h3>SUBSCRIBERS</h3>
              <p>{summary.users}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={branch} alt="" />
              <h3>BRANCHES</h3>
              <p>{summary.branch}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={movie} alt="" />
              <h3>MOVIE_SCHEDULE</h3>
              <p>{summary.movie_schedule}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={Mov} alt="" />
              <h3>DAILY BOOKINGS</h3>
              <p>{}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={Mov} alt="" />
              <h3>WEEKLY BOOKINGS</h3>
              <p>{}</p>
            </div>
            <div className="box effect7">
              <img className="image" src={Mov} alt="" />
              <h3>MONTHLY BOOKINGS</h3>
              <p>{}</p>
            </div>
          </div>

          {/* <div className="web-cinema-table-container">
            <table className="web-cinema-table">
              <thead>
                <tr className="web-cinema-table-header">
                  <th>S/N</th>
                  <th>Cinema</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {cinema.map((cinemaItem, id) => (
                  <tr key={cinemaItem._id}>
                    <td>{id + 1}</td>
                    <td>{cinemaItem.name}</td>
                    <td>{cinemaItem.email}</td>
                    <td>{cinemaItem.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
