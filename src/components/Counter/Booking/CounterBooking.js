import React from "react";
import "../stylesCounter/counterBooking.css";
import img from "../../uploads/expendables.webp";
import CounterNav from "../Navigation/CounterNav";
import { Link } from "react-router-dom";

function CounterBooking() {
  return (
    <div className="counterBooking">
      <div>
        <CounterNav />
      </div>
      <div className="counterBookingFlex">
        <div className="counterBookingForm">
          <form className="counterform">
            <h2>Customer's Information</h2>
            <div className="counterformnameflex">
              <div class="counterform-group">
                <label for="">First name:</label>
                <span></span>
                <input type="text" name="name" class="inputs" required />
              </div>
              <div class="counterform-group">
                <label for="">Last name:</label>
                <span></span>
                <input type="text" name="category" class="inputs" required />
              </div>
            </div>
            <div class="counterform-group">
              <label for="">Email:</label>
              <span></span>
              <input type="email" name="price" class="inputs" required />
            </div>
            <div class="counterform-group">
              <label for="">Phone Number:</label>
              <span></span>
              <input type="text" name="quantity" class="inputs" required />
            </div>
            <div class="counterform-group">
              <label for="">Lorem ipsum dolor</label>
              <span></span>
              <input type="text" name="description" class="inputs" required />
            </div>
            {/* <div class="form-group"> */}
            <Link to="/seat">
              {" "}
              <button class="form-btn">Book Seat</button>
            </Link>
            <div class="counterform-group">
              <button class="counterform-btn">Book Seat</button>
            </div> 
          </form>
        </div>
        <div className="counterbookingRight">
          <img src={img} alt="" />
          <div className="counterMovieInfo">
            <p>11:30am - 1:15pm</p>
            <div>
              <h3>The Movie Title</h3>
              <span>The Movie Genre</span>
              <p class="movieDescription">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
                rem adipisci totam iusto dolores. Fuga odit, tempora debitis
                modi dolores dolorem beatae repudiandae? Blanditiis mollitia,
                ducimus eum obcaecati quae culpa. Porro, qui et accusamus esse
                officia labore animi ex iusto!
                <a href="#" class="read-more">
                  Read More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterBooking;
