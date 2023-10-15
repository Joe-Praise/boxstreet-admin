import React from 'react'
import '../stylesTheater/theaterbooking.css'
import TheaterNav from '../Navigation/TheaterNav'
import { Link } from 'react-router-dom'
import img from "../../uploads/expendables.webp";

function TheaterBooking() {
  return (
    <div className="theaterBooking">
      <div>
        <TheaterNav />
      </div>
      <div className="theaterBookingFlex">
        <div className="theaterBookingForm">
          <form className="theaterform">
            <h2>Customer's Information</h2>
            <div className="theaterformnameflex">
              <div class="theaterform-group">
                <label for="">First name:</label>
                <span></span>
                <input type="text" name="name" class="inputs" required />
              </div>
              <div class="theaterform-group">
                <label for="">Last name:</label>
                <span></span>
                <input type="text" name="category" class="inputs" required />
              </div>
            </div>
            <div class="theaterform-group">
              <label for="">Email:</label>
              <span></span>
              <input type="email" name="price" class="inputs" required />
            </div>
            <div class="theaterform-group">
              <label for="">Phone Number:</label>
              <span></span>
              <input type="text" name="quantity" class="inputs" required />
            </div>
            <div className="theaterformnameflex">
              <div class="theaterform-group">
                <label for="">Theater:</label>
                <span></span>
                <select className="" name="theater-name">
                    <option value="Olive Theater">Olive Theater</option>
                    <option value="Saturn Theater">Saturn Theater</option>
                    <option value="Trojan Theater">Trojan Theater</option>
                </select>
              </div>
              <div class="theaterform-group">
                <label for="">Showtime:</label>
                <span></span>
                <select className="" name="movie time">
                    <option value="11:30am - 1pm">11:30am - 1:00pm</option>
                    <option value="1:15pm - 2:45pm">1:15pm - 2:45pm</option>
                    <option value="3:30pm - 4:45pm">3:30pm - 4:45pm</option>
                    <option value="5:00pm - 6:50pm">5:00pm - 6:50pm</option>
                </select>
              </div>
            </div>
            <Link to="/theater-admin/seat">
              <div class="theaterform-group">
                <button class="theaterform-btn">Book Seat</button>
              </div>
            </Link>
          </form>
        </div>
        <div className="theaterbookingRight">
          <img src={img} alt="" />
          <div className="theaterMovieInfo">
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
  )
}

export default TheaterBooking