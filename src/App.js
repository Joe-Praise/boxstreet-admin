import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Counter from "./components/Counter/Home/Counter";
import CounterBooking from "./components/Counter/Booking/CounterBooking";
import TheaterHome from "./components/Theater/Landing/TheaterHome";
import AddTheater from "./components/Theater/Add Forms/AddTheater";
import ViewTheaters from "./components/Theater/View Tables/ViewTheaters";
import ViewSeatingLayer from "./components/Theater/View Tables/ViewSeatingLayer";
import AddCounter from "./components/Theater/Add Forms/AddCounter";
import BookSeat from "./components/Counter/Booking/BookSeat";
import CreateMovieSchedule from "./components/Movie schedule/Movie schedule Booking/CreateMovieSchedule";
import MovieScheduleListing from "./components/Movie schedule/View movie schedule/MovieScheduleListing";
import Profile from "./components/Counter/Profile/Profile";
import BookingHistory from "./components/Counter/Booking/BookingHistory";
import TProfile from "./components/Theater/Profile/Profile";
import AddMovie from "./components/Theater/Add Forms/AddMovie";
import ViewMovies from "./components/Theater/View Tables/ViewMovies";
import ChangePass from "./components/Theater/Add Forms/ChangePass";
import CounterPW from "./components/Counter/Profile/CounterPW";
import TheaterBooking from "./components/Theater/TheaterBooking/TheaterBooking";
import TheaterBookingSeat from "./components/Theater/TheaterBooking/TheaterBookingSeat";
import BookedInfo from "./components/Counter/Booking/BookedInfo";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>} />

          <Route path="/counter" element={<Counter />} />
          <Route path="/counter/booking/:id" element={<CounterBooking />} />
          <Route path="/counter/seat/:id/:movie_id" element={<BookSeat />} />
          <Route path="/counter/profile" element={<Profile />} />
          <Route path="/counter/change-password" element={<CounterPW />} />
          <Route path="/counter/seat-layout" element={<ViewSeatingLayer />} />
          <Route path="/counter/history" element={<BookingHistory />} />
          <Route path="/counter/receipt/:id" element={<BookedInfo />} />

          <Route path="/theater" element={<TheaterHome />} />
          <Route path="/theater/booking/:id" element={<TheaterBooking />} />
          <Route path="/theater/seat" element={<TheaterBookingSeat />} />
          <Route path="/theater/new-theater" element={<AddTheater />} />
          <Route path="/theater/view-theaters" element={<ViewTheaters />} />
          <Route path="/theater/seat-layout" element={<ViewSeatingLayer />} />
          <Route path="/theater/add-counter" element={<AddCounter />} />
          <Route path="/theater/profile" element={<TProfile />} />
          <Route path="/theater/add-movie" element={<AddMovie />} />
          <Route path="/theater/view-movies" element={<ViewMovies />} />
          <Route path="/theater/change-password" element={<ChangePass />} />
          <Route path="/theater/movieschedule" element={<CreateMovieSchedule />} />
          <Route path="/theater/movieschedulelisting" element={<MovieScheduleListing />} />
      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
