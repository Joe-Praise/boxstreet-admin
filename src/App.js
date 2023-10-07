import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Counter from './components/Counter/Home/Counter';
import CounterBooking from './components/Counter/Booking/CounterBooking';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Counter />} />
          <Route path='/booking/:id' element={<CounterBooking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
