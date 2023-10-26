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
import ViewSingleMovie from "./components/Theater/View Tables/ViewSingleMovie";
import AddSeat from "./components/Theater/Add Forms/AddSeat";
import ViewSeats from "./components/Theater/View Tables/ViewSeats";
import UpdateTheater from "./components/Theater/Add Forms/UpdateTheater";
import Cinema1 from "./components/Cinema_Admin/Cinema/Cinema1";
import Transaction from "./components/Cinema_Admin/Transaction/Transaction";
import Dashboardc from "./components/Cinema_Admin/Cinema-Dashboard/Dashboard";
import Branch from "./components/Cinema_Admin/Cinema-baranch/Branch";
import CreateCinema from "./components/Website-Admin/CreateCinema";
import AddUser from "./components/Website-Admin/AddUser";
import Home from "./components/Website-Admin/Home";
import Cinemas from "./components/Website-Admin/Cinemas";
import Movies from "./components/Website-Admin/Movies";
import SingleMovie from "./components/Website-Admin/SingleMovie";
import Users from "./components/Website-Admin/Users";
import Archives from "./components/Website-Admin/Archives";
import Theaters from "./components/Website-Admin/Theaters";
import Seats from "./components/Website-Admin/Seat";
import Layout from "./components/Website-Admin/Layout";
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
          <Route path="/cinema/account" element={<Transaction />} />
          <Route path="/cinema" element={< Dashboardc />} />
          <Route path="/cinema/create-branch" element={<Cinema1 />} />
          <Route path="/cinema/view-branch" element={<Branch/>} />

          <Route path="/theater" element={<TheaterHome />} />
          <Route path="/theater/booking/:id" element={<TheaterBooking />} />
          <Route path="/theater/seat" element={<TheaterBookingSeat />} />
          <Route path="/theater/new-theater" element={<AddTheater />} />
          <Route path="/theater/update-theater/:id" element={<UpdateTheater />} />
          <Route path="/theater/view-theaters" element={<ViewTheaters />} />
          <Route path="/theater/seat-layout/:id" element={<ViewSeatingLayer />} />
          <Route path="/theater/view-seats/:id" element={<ViewSeats />} />
          <Route path="/theater/add-counter" element={<AddCounter />} />
          <Route path="/theater/add-counter" element={<AddCounter />} />
          <Route path="/theater/profile" element={<TProfile />} />
          <Route path="/theater/add-movie" element={<AddMovie />} />
          <Route path="/theater/view-movies" element={<ViewMovies />} />
          <Route path="/theater/single-movie/:id" element={<ViewSingleMovie />} />
          <Route path="/theater/change-password" element={<ChangePass />} />
          <Route path="/theater/movieschedule" element={<CreateMovieSchedule />} />
          <Route path="/theater/movieschedulelisting" element={<MovieScheduleListing />} />
          <Route path="/theater/add-seat" element={<AddSeat />}/>
          <Route path="/web-admin/cinema" element={<CreateCinema/>}/>
          <Route path="/web-admin/add-user" element={<AddUser/>}/>
          <Route path="/web-admin" element={<Home/>}/>
          <Route path="/web-cinemas" element={<Cinemas/>}/>
          <Route path="/web-movies" element={<Movies/>}/>
          <Route path="/web-movies/single-movie/:id" element={<SingleMovie />} />
          <Route path="/web-users" element={<Users/>}/>
          <Route path="/web-archives" element={<Archives/>}/>
          <Route path="/web-theaters" element={<Theaters/>}/>
          <Route path="/web-seat/:id" element={<Seats/>}/>
          <Route path="/web-layout/:id" element={<Layout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
