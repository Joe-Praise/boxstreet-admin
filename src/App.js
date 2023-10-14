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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/counter/booking/:id" element={<CounterBooking />} />
          <Route path="/theater-admin" element={<TheaterHome />} />
          <Route path="/new-theater" element={<AddTheater />} />
          <Route path="/view-theaters" element={<ViewTheaters />} />
          <Route path="/seat-layout" element={<ViewSeatingLayer />} />
          <Route path="/add-counter" element={<AddCounter />} />
          <Route path="/counter/seat" element={<BookSeat />} />
          <Route path="/counter/profile" element={<Profile />} />
          <Route path="/counter/change-password" element={<CounterPW />} />
          <Route path="/theater/profile" element={<TProfile />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/view-movies" element={<ViewMovies />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route
            path="/theater-admin/movieschedule"
            element={<CreateMovieSchedule />}
          />
          <Route
            path="/theater-admin/movieschedulelisting"
            element={<MovieScheduleListing />}
          />
          <Route path="/counter/history" element={<BookingHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
