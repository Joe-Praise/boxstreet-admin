import React from "react";
import CounterNav from "../Navigation/CounterNav";
import "../stylesCounter/bookedinfo.css";

function BookedInfo() {
  return (
    <div className="bookedinfo">
      <CounterNav />
      <div className="bookinginfopage">
        <h1>Receipt</h1>
          <div className="infosheet">
            <div className="sheetdetails">
              <h3>Customer Name:</h3>
              <span>Precious Joe Austin</span>
            </div>

            <div className="sheetdetails">
              <h3>Phone Number:</h3>
              <span>08147451236</span>
            </div>

            <div className="sheetdetails">
              <h3>Email:</h3>
              <span>preshjoeaustin@yahoo.com</span>
            </div>

            <div className="sheetdetails">
              <h3>Movie Title:</h3>
              <span>Tom & Jerry</span>
            </div>
            <div className="sheetdetails">
              <h3>Cinema:</h3>
              <span>Mount Zion Ministry Cinema</span>
            </div>
            <div className="sheetdetails">
              <h3>Movie Time:</h3> {/* schedule */}
              <span>9:00am</span>
            </div>
            <div className="sheetdetails">
              <h3>Branch:</h3>
              <span>Mararaba</span>
            </div>
            <div className="sheetdetails">
              <h3>Theater:</h3>
              <span>Zion Theater</span>
            </div>
            <div className="sheetdetails">
              <h3>Movie Price:</h3>
              <span>3,500</span>
            </div>

            <div className="sheetdetails">
              <h3>Attendant:</h3> {/* counter that register or checked in*/}
              <span>CounterSL001</span>
            </div>

            <div className="sheetdetails">
              <h3>Booking Type:</h3>
              <span>Regular</span>
            </div>

            <div className="sheetdetails">
              <h3>Seat Price:</h3>
              <span>3,500</span>
            </div>

            <div className="sheetdetails">
              <h3>Sub-total:</h3>
              <span>3,500</span>
            </div>

            <div className="sheetdetails">
              <h3>Seat Number:</h3>
              <span>F9</span>
            </div>

            <div className="sheetdetails">
              <h3>Ticket Type:</h3>
              <span>Regular</span>
            </div>

            <div className="sheetdetails">
              <h3>Ticket No.:</h3>
              <span>2332H4J58</span>
            </div>

            <div className="sheetdetails">
              <h3>Check-in Time:</h3>
              <span>8:45am</span>
            </div>

            <div className="sheetdetails">
                <div></div>
              <button>
                Print
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default BookedInfo;
