import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Counter from './components/Counter/Home/Counter';
import CounterBooking from './components/Counter/Booking/CounterBooking';
import TheaterHome from './components/Theater/Landing/TheaterHome';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/counter' element={<Counter />} />
          <Route path='/booking/:id' element={<CounterBooking />} />
          <Route path='/theaterAdmin' element={<TheaterHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
