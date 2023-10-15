import React, { useState, useEffect } from "react";
import "../stylesCounter/counterBooking.css";
import img from "../../uploads/expendables.webp";
import CounterNav from "../Navigation/CounterNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

let MODE = "PROD" 
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function CounterBooking() {
  const [theaterlisting, setTheaterListing]= useState([]);
  const [showtime, setShowTime] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [filter,setFilter] = useState("")
  const {id} = useParams();

  const filterTime = (e) =>{
    let index = 0;
    for(let i=0;i<e.length;i++){
      let d = new Date(e[i]).getTime();
      let today = Date.now();
      if(d > today){
        index = i;
        break;
      }
    }
    return e[index]
  }
  // const [movieListing,setMovieListing] =  useState();
  useEffect(()=>{
    let theater_url = `${BASE_URL}/api/v1/theaters?branch_id=652aa5086de9462d02533522`
    let movie_schedule_url = `${BASE_URL}/api/v1/movieschedule/${id}`

    // axios.get(theater_url)
    // .then(res=>{
    //   let theaters = res.data?.data;
    //   let data = theaters?.map(e =>({
    //     id: e._id,
    //     name: e?.cinema_id?.name,
    //     name: e?.location_id?.name,
    //     opening: e.opening,
    //     imageUrl:e?.movie_id?.image,
    //     description:e?.movie_id?.description
    //   }))
    //   // setTheaterListing([...data])
    // })
    // console.log(movie_schedule_url)
    axios.get(movie_schedule_url)
    .then(res=>{
      let data = res.data.data;
      let info = data.show_time?.map((e,i) =>({
       id:i+1,
       value:e
      }))
      setFilter(filterTime(data.show_time))
      setShowTime([...info])
    })

    axios.get(theater_url)
    .then(res=>{
      let data = res.data;
      let info = data?.map(t =>({
        id: t._id,
        name: t?.name,
      }))
      console.log(data)
      setTheaterListing([...info])
    })
    axios.get(movie_schedule_url)
    .then(res=>{
      let data = res.data?.data;
      let movie = data.cinema_id.name;
      // let showingtime= filterTime(data.show_time);
    //  console.log(movie)
      setSchedule(data)
    })
    
  },[])
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
              <div class="counterform-group">
                <label for="">First name:</label>
                <span></span>
                <input type="text" name="name" class="inputs" required />
              </div>
              <div class="counterform-group">
                <label for="">Last name:</label>
                <span></span>
                <input type="text" name="category" class="inputs" required />
              </div>
            </div>
            <div class="counterform-group">
              <label for="">Email:</label>
              <span></span>
              <input type="email" name="price" class="inputs" required />
            </div>
            <div class="counterform-group">
              <label for="">Phone Number:</label>
              <span></span>
              <input type="text" name="quantity" class="inputs" required />
            </div>
            <div className="counterformnameflex">
              <div class="counterform-group">
                <label for="">Theater:</label>
                {/* <span></span>
                <input type="text" name="name" class="inputs" required /> */}
                <select>
                <option value=""></option>
                  {theaterlisting.map(t=>  <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              </div>
            
              <div class="counterform-group">
                <label for="">Showtime:</label>
                {/* <span></span>
                <input type="text" name="category" class="inputs" required /> */}
                 <select>
                 <option value=""></option>
                  {showtime.map(e=>  <option key={e.id}>{e.value}</option>)}
              {/* <option value="Select Show Time">Show Time</option> */}
              </select>
              
              </div>
            </div>
            <Link to="/counter/seat">
              <div class="counterform-group">
                <button class="counterform-btn">Book Seat</button>
              </div>
            </Link>
          </form>
        </div>
        <div className="counterbookingRight">
          <img src={schedule?.movie_id?.image} alt="Movie Title" />
          <div className="counterMovieInfo">
                <ul>
                {schedule?.show_time?.map((e,i)=> <li key={i} style={{"color":e === filter ? "red":""}}>{e}</li> )}
                </ul>
            
            <div>
              <h3>{schedule?.movie_id?.name}</h3>
              <span>{schedule?.movie_id?.genre}</span>
              <p class="movieDescription">
              {schedule?.movie_id?.description}
                <a href="#" class="read-more">
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
