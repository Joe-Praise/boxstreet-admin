import React from "react";
import '../stylesCounter/bookingHistory.css'
import { useNavigate } from "react-router";
import CounterNav from "../Navigation/CounterNav";

function BookingHistory() {
  const navigate = useNavigate();

  const handleViewButtonClick = () => {
    navigate("/counter/receipt");
  };

  return (
    <div>
      <CounterNav />
      <div className="chPage">
        <div className="ch-page">
          <div className="bh-page-top">
            <div className="bh-input">
              <input placeholder="search" />
              <span className="bh-input-btn">Search</span>
            </div>
          </div>
          <div className="ch-select">
            <select>
              <option value="cinema">Cinema</option>
              <option value="Jabi">Jabi</option>
              <option value="Wuse">Wuse</option>
              <option value="Garki">Garki</option>
            </select>

            <button className="newBooking">Create New Booking</button>
          </div>
          <div className="ch-table-container">
            <table className="ch-table">
              <thead>
                <tr className="ch-table-header">
                  <th>S/N</th>
                  <th>Ticket No</th>
                  <th>Customer Name</th>
                  <th>Movie Title</th>
                  <th>Movie Time</th>
                  <th>Category</th>
                  <th>Seat</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{+1}</td>
                  <td>MOV6745</td>
                  <td>Daniel Joe</td>
                  <td>Garfield</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>

                <tr>
                  <td>{+2}</td>
                  <td>MOV6745</td>
                  <td>Oluwafemi Noel</td>
                  <td>Tom and Jerry</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+3}</td>
                  <td>MOV6745</td>
                  <td>Precious Aboki</td>
                  <td>Tom and Jerry</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>

                <tr>
                  <td>{+4}</td>
                  <td>MOV6745</td>
                  <td>Austin Igwe</td>
                  <td>Spider Spider Spider Man!</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+5}</td>
                  <td>MOV6745</td>
                  <td>Jon Jerry</td>
                  <td>Teenage Mutant Ninja Turles 5: The Return</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                  </tr>
                <tr>
                  <td>{+6}</td>
                  <td>MOV6745</td>
                  <td>Paul Czech</td>
                  <td>Garfield</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+7}</td>
                  <td>MOV6745</td>
                  <td>Boluwa Ijoko</td>
                  <td>Garfield</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
                <tr>
                  <td>{+8}</td>
                  <td>MOV6745</td>
                  <td>Ogoji Caro</td>
                  <td>Garfield</td>
                  <td>2:15pm</td>
                  <td>VVIP</td>
                  <td>B4</td>
                  <td>22-01-2023 1:59pm</td>
                  <td className="actions">
                    <button onClick={handleViewButtonClick} className="ch-table-view">View</button>
                    <button className="ch-table-print">Print</button>
                    <button className="ch-table-check">Check-In</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
