import React, { useState,useEffect } from "react";
import "../stylesCounter/counter.css";
import { Link } from "react-router-dom";
import CounterNav from "../Navigation/CounterNav";
import axios from "axios";

const shows =[
  {
    id: 1,
    title: "Spider-Man: Far From Home",
    genre: "Action, Adventure, Sci-Fi",
    showingtime: "11:30am - 1:00pm",
    imageUrl:
      "https://media.istockphoto.com/id/506678292/photo/amazing-spider-man-action-figure.webp?s=2048x2048&w=is&k=20&c=XEWBvWPGeRdOww-iZnMWcjd48ns5CnLpdTP-wLYHDn4=",
    description:
      "Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.",
  }
]

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;


function Counter() {

  const [movieListing,setMovieListing] =  useState(shows);
  const [genres,setGenre] = useState([])
  const branch_id = localStorage.getItem('branch_id');

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

  useEffect(()=>{
    
    let movie_schedule_url = `${BASE_URL}/api/v1/movieschedule?branch_id=${branch_id}`
    let genre_url = `${BASE_URL}/api/v1/genres`

    axios.get(movie_schedule_url)
    .then(res=>{
      let movies = res.data?.data;
      let data = movies?.map(e =>({
        id: e._id,
        title: e?.movie_id?.name,
        genre: e?.movie_id?.genre,
        showingtime: filterTime(e.show_time),
        imageUrl:e?.movie_id?.image,
        description:e?.movie_id?.description
      }))

      setMovieListing([...data])
    })

    axios.get(genre_url)
    .then(res=>{
      let data = res.data;
      let info = data?.map(e =>({
        id: e._id,
        name: e?.name,
      }))
      setGenre([...info])
    })

  },[branch_id])

  const [, setSelectedMovieTime] =
    useState("Select Movie Time");
  const [, setSelectedGenre] = useState("Genre");

  return (
    <div>
      <CounterNav />
      <div className="counter">
        <div className="counterHome-search">
          <input placeholder="search" />
          <span className="ch-search-btn">Search</span>
        </div>
        <div className="selectBtns">
          <select className="counterselect" name="movie time" onChange={(e) => setSelectedMovieTime(e.target.value)}>
            <option value="Select Movie Time">Date</option>
            <option value="11:30am - 1pm">Today</option>
            <option value="1:15pm - 2:45pm">15th Oct</option>
            <option value="3:30pm - 4:45pm">16th Oct</option>
            <option value="5:00pm - 6:50pm">17th Oct</option>
          </select>
          <select
            className="counterselect"
            name="genre"
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map(e =>  <option key={e.id} value={e.id}>{e.name}</option>)}
            
          </select>
        </div>
        <div className="counterMovies">
          {movieListing.map((movie) => (
            <Link
              className="movieBox"
              to={`/counter/booking/${movie.id}`}
              key={movie.id}
            >
              <img src={movie.imageUrl} alt={movie.title} />
              <div className="movieInfo">
                <p>{movie.showingtime}</p>
                <div>
                  <h3>{movie.title}</h3>
                  <span>{movie.genre}</span>
                  <p>{movie.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Counter;
