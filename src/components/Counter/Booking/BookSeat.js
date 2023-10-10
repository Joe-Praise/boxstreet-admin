import React, { useRef } from "react";
import { IoStar, IoTimerOutline, IoLocationOutline, IoCalendarOutline, IoArrowForwardOutline } from "react-icons/io5";
import { MdLockClock } from "react-icons/md";
import { useState, useEffect } from 'react';
// import '../stylesCounter/counterBooking.css'
import img1 from "../uploads/booking-movie6.jpg";
import img from "../uploads/expendables.webp";
import '../stylesCounter/bookSeat.css'
import CounterNav from "../Navigation/CounterNav";
import {Link} from "react-router-dom";

function BookSeat() {

    let [row, setRow] = useState(8)
    let [column, setColumn] = useState(2)
    let [col_matrix_1, setColMatrix1] = useState([2, 2, 4, 4, 4, 4, 4, 1])
    let [col_matrix_2, setColMatrix2] = useState([3, 1, 4, 4, 2, 4, 4, 3])
    let selected = useRef()

    let setActive = (e) =>{
        e.target.children[0].classList.toggle('active')
    }

    useEffect(() => {

    }, [])

  return (
    <div className='book-seat'>
      <div>
        <CounterNav/>
      </div> 
      <div className="counterBookingFlex">
        <div className="counterBookingForm">
        <div className="booking-page">
            <div className="booking-main">
                    <div className="booking-container">
                        <div className="booking-container-seat">
                        {/* <p className="booking-choose-seat-text">Choose Seats</p> */}
                        <div className="booking-seat-side">
                        <span className="booking-seat-vvip"></span>
                         <p>VVIP</p>
                        </div>
                        <div className="booking-seat-side">
                        <span className="booking-seat-vip"></span>
                         <p>VIP</p>
                        </div>
                        <div className="booking-seat-side">
                        <span className="booking-seat-regular"></span>
                         <p>Regular</p>
                        </div>
                        </div>
                        <div className="booking-container-col1">
                            <div className="booking-container-top">
                            <p className="booking-choose-seat-text">Choose your Seat</p>
                                <div className="box-line">
                                    <div className="line"></div>
                                </div>
                            </div>
                            <div className="box-container">
                                <div className="main-boxx">
                                    <div className="box1">

                                        {
                                            col_matrix_1.map((r, i1) => {
                                                let arr = new Array(r).fill(3)

                                                return <div className="box1-col1" key={i1}>
                                                    {
                                                        arr.map((c, i2) => (
                                                            <p className="col1p" key={i2} onClick={(e)=>setActive(e)}>
                                                                <span></span>
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            })

                                        }

                                    </div>

                                    <div className="box2">

                                        {
                                            col_matrix_2.map((r, i1) => {
                                                let arr = new Array(r).fill(3)

                                                return <div className="box1-col1" key={i1}>
                                                    {
                                                        arr.map((c, i2) => (
                                                            <p className="col1p"  key={i2} onClick={(e)=>setActive(e)}>
                                                                <span></span>
                                                                <i className="regular"></i>
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            })

                                        }

                                    </div>


                                </div>
                            </div>

                            <div className="booking-container-col1-inputs">
                                <div className="booking-container-col1-input">
                                    <input
                                        type="radio"
                                    />
                                    <span className="booking-container-col-text">Selected</span>
                                </div>
                                <div className="booking-container-col1-input">
                                    <input
                                        type="radio"
                                    />
                                    <span className="booking-container-col-text">Reserved</span>
                                </div>
                                <div className="booking-container-col1-input">
                                    <input
                                        type="radio"
                                    />
                                    <span className="booking-container-col-text">Available</span>
                                </div>
                            </div>
                            <div className="booking-total">
                                <h3 className="booking-totalh">Total :</h3>
                                <p className="booking-totalp">N600</p>
                            </div>
                            <div className="booking-container-col-bottom">
                                <div className="booking-container-col-bottom-row1">
                                <Link to="/seat"> <button class="seat-btn">Pay Now!</button></Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className="booking-container-col2">
                            <div className="box-container-top-items">
                                <h2 className="booking-header-text">Date & Time</h2>
                                <div className="box-container-top-item1">
                                    <span className="item1-date">Choose Date</span>
                                    <p className="item1-text">16 Dec</p>
                                </div>
                                <div className="box-container-top-item2">
                                    <span className="item2-date">Choose Time</span>
                                    <p className="item2-text">20:15</p>
                                </div>
                            </div>
                            <div className="booking-container-top">
                                <div className="booking-container-top-col">
                                    <img src={img1} className="booking-img1" />
                                    <p className="booking-container-top-text">Boxstreet</p>
                                    <div className="booking-rating">
                               
                                    <span className="bookint-star"><IoStar /></span>
                                    <span className="booking-rate">3.9</span>
                                </div>
                                </div>
                            </div>
                            <div className="booking-container-bottom">
                                <div className="booking-con"></div>

                            </div>
                        </div> */}

                    </div>

                </div>
            </div>
        </div>
        <div className="counterbookingRight">
          <img src={img} alt="" />
          <div className="counterMovieInfo">
            <p>11:30am - 1:15pm</p>
            <div>
              <h3>The Movie Title</h3>
              <span>The Movie Genre</span>
              <p class="movieDescription">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla rem adipisci totam iusto dolores. Fuga odit, tempora debitis modi dolores dolorem beatae repudiandae? Blanditiis mollitia, ducimus eum obcaecati quae culpa. Porro, qui et accusamus esse officia labore animi ex iusto!
            <a href="#" class="read-more">Read More</a>
        </p>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default BookSeat