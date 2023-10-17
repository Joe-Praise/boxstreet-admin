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
  },
  {
    id: 2,
    title: "Frozen II",
    genre: "Animation, Adventure, Family",
    showingtime: "1:15pm - 2:45pm",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*",
    description:
      "Elsa, Anna, Kristoff, and Olaf embark on a journey into the enchanted forest to discover the truth about an ancient mystery of their kingdom.",
  },
  {
    id: 11,
    title: "The Matrix",
    genre: "Action, Sci-Fi",
    showingtime: "3:30pm - 4:45pm",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSu_HQf7Sgkij6NptUWlEKf6V9n5bC5cL1JfGFNylGC8VnfN_-N",
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines, and he joins a group of rebels to fight back.",
  },
  {
    id: 12,
    title: "The Shawshank Redemption",
    genre: "Drama",
    showingtime: "5:00pm - 6:50pm",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 13,
    title: "Inception",
    genre: "Horror, Action, Adventure, Comedy",
    showingtime: "11:30am - 1pm",
    imageUrl:
      "https://images.unsplash.com/photo-1613051884057-d9130a00a5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9ycm9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    description:
      "A thief who enters the dreams of others to steal their secrets is tasked with planting an idea into a CEO's mind. A thief who enters the dreams of others to steal their secrets is tasked with planting an idea into a CEO's mind",
  },
  {
    id: 14,
    title: "Jurassic Park",
    genre: "Adventure, Sci-Fi",
    showingtime: "5:00pm - 6:50pm",
    imageUrl:
      "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1",
    description:
      "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
  },
  {
    id: 15,
    title: "Interstellar",
    genre: "Adventure, Drama, Sci-Fi",
    showingtime: "11:30am - 1pm",
    imageUrl:
      "https://images.unsplash.com/photo-1611165946687-896e3845d3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzdCUyMGFuZCUyMGZ1cmlvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "A group of explorers travel through a wormhole near Saturn in search of a new habitable planet for humanity.",
  },
  {
    id: 16,
    title: "Toy Story",
    genre: "Animation, Adventure, Comedy",
    showingtime: "5:00pm - 6:50pm",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*",
    description:
      "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
  },
  {
    id: 17,
    title: "E.T. the Extra-Terrestrial",
    genre: "Family, Sci-Fi",
    showingtime: "11:30am - 1pm",
    imageUrl:
      "https://images.unsplash.com/photo-1611165946687-896e3845d3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzdCUyMGFuZCUyMGZ1cmlvdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "A young boy befriends a gentle alien and helps him return to his home planet while evading government agents.",
  },
  {
    id: 18,
    title: "The Godfather",
    genre: "Crime, Drama",
    showingtime: "3:30pm - 4:45pm",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 19,
    title: "Pulp Fiction",
    genre: "Crime, Drama",
    showingtime: "5:00pm - 6:50pm",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSu_HQf7Sgkij6NptUWlEKf6V9n5bC5cL1JfGFNylGC8VnfN_-N",
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 20,
    title: "The Dark Knight",
    genre: "Action, Crime, Drama",
    showingtime: "1:15pm - 2:45pm",
    imageUrl:
      "https://media.istockphoto.com/id/506678292/photo/amazing-spider-man-action-figure.webp?s=2048x2048&w=is&k=20&c=XEWBvWPGeRdOww-iZnMWcjd48ns5CnLpdTP-wLYHDn4=",
    description:
      "When the Joker wreaks havoc on Gotham City, Batman must confront his own demons while trying to stop the chaos.",
  },
]

let MODE = "PROD" 
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
