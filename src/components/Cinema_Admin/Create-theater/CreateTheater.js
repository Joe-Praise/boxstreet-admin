import React, { useState, useEffect } from "react";
// import "../../../stylesTheater/addtheater.css";
import "./theater.css"
import axios from "axios";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;


function CreateTheater() {
    const branchid = localStorage.getItem('branchId');
    console.log(branchid)
    const cinema_id = localStorage.getItem('cinema_id');
const cinema = localStorage.getItem("cinema")
    const [formErrors, setFormErrors] = useState({});
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");

    const [theaterData, setTheaterData] = useState({
      name: "",
      screen: 1,
      branch_id:branchid,
      cinema_id
    });
  
    const validateForm =()=>{
      const errors={};
      if(!theaterData.name.trim()){
        errors.name ="Field Required";
      }
      if(!theaterData.screen.trim()){
        errors.screen ="Field Required";
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
      const { name, screen, value } = e.target;
      setTheaterData({
        ...theaterData,
        [name]: value,
        [screen]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios
      .post(`${BASE_URL}/api/v1/theaters`, theaterData)
      .then((response) => {
          if(response.data._id){
            alert("Theater created");
  
          }
        })
        .catch((error) => {
          console.error("Error creating theater:", error);
        });
    };
  
    const [branches, setBranches]= useState([])
    useEffect(()=>{
        let branch_url =`${BASE_URL}/api/v1/branches`
        axios.get(branch_url)
        .then((res)=>{
           let data =res?.data;
          const newBranch = data.filter((newbranch)=>{
          return newbranch.cinema_id ===cinema_id
          })
           setBranches(newBranch)
           console.log(newBranch)
        })
        },[])

    return (
      <div>
        <Topnav/>
        <div className="addtheaaterForm">
          <form className="addtheaaterform" onSubmit={handleSubmit}>
            <h2>{"Welcome to" +"-" + cinema}</h2>
            <div className="addtheaaterform-group">
              <label htmlFor="name">Theater Name:</label>
              <input
                type="text"
                name="name"
                className="inputs"
                required
                onChange={handleChange}
                value={theaterData.name}
              />
            </div>
            <div className="addtheaaterform-group">
              <label htmlFor="name">Number of Screens:</label>
              <input
                type="number"
                name="screen"
                className="inputs"
                required
                onChange={handleChange}
                value={theaterData.screen}
              />
            </div>
            <div className="addtheaaterform-group">
              <button type="submit" className="counterform-btn">
                Register Theater
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default CreateTheater;
  