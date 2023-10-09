import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Counter from "./components/Counter/Home/Counter";
import CounterBooking from "./components/Counter/Booking/CounterBooking";
import MovieScheduleBooking from "./components/Movie schedule/Movie schedule Booking/MovieScheduleBooking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/booking/:id" element={<CounterBooking />} />
          <Route
            path="/movieschedulebooking"
            element={<MovieScheduleBooking />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
