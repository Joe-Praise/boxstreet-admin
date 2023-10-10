import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Counter from "./components/Counter/Home/Counter";
import CounterBooking from "./components/Counter/Booking/CounterBooking";
import BookSeat from "./components/Counter/Booking/BookSeat";
import TheaterHome from "./components/Theater/Landing/TheaterHome";
import CreateMovieSchedule from "./components/Movie schedule/Movie schedule Booking/CreateMovieSchedule";
import MovieScheduleListing from "./components/Movie schedule/View movie schedule/MovieScheduleListing";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/seat" element={<BookSeat />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/booking/:id" element={<CounterBooking />} />
          <Route path="/theaterAdmin" element={<TheaterHome />} />
          <Route
            path="/theaterAdmin/movieschedule"
            element={<CreateMovieSchedule />}
          />
          <Route
            path="/theaterAdmin/movieschedulelisting"
            element={<MovieScheduleListing />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
