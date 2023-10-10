import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Counter from './components/Counter/Home/Counter';
import CounterBooking from './components/Counter/Booking/CounterBooking';
import BookSeat from './components/Counter/Booking/BookSeat';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Counter />} />
          <Route path='/booking/:id' element={<CounterBooking/>} />
          <Route path='/seat' element={<BookSeat/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
