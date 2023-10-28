import React, { useState, useEffect } from "react";
// import "../../../stylesTheater/addtheater.css";
import "./category.css"
import axios from "axios";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;


function CreateCategory() {
    const branch_id = localStorage.getItem('mybranch_id');
    const cinema_id = localStorage.getItem('cinema_id');
const cinema = localStorage.getItem("cinema")
    const [formErrors, setFormErrors] = useState({});
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [catname, setCatname] = useState("");

    const [catData, setCatData] = useState({
      name: "",
      price: "",
      cinema_id
    });
  
    const validateForm =()=>{
      const errors={};
      if(!catData.name.trim()){
        errors.name ="Field Required";
      }
      if(!catData.price.trim()){
        errors.screen ="Field Required";
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
      const { name, price, value } = e.target;
      setCatData({
        ...catData,
        [name]: value,
        [price]: value,
      });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  try {
    const isFormValid = validateForm();
if(isFormValid){

  const response= await  axios.post(`${BASE_URL}/api/v1/categories`, catData)
    .then((response) => {
        if(response.data._id){
          alert("Category Added successfully");

        }
      })
      .catch((error) => {
        console.error("Error creating theater:", error);
      });
      if (response?.data.status === "success") {
        setIsSignUpSuccess(true);
        setFormErrorMessage("");
      }
}else {
    setFormErrorMessage(
      "Please fill in all required fields and correct any validation errors."
    );
  }


  } catch (error) {
    console.error("Error creating Category:", error);
  }
     
    };
  
    return (
      <div>
        <Topnav/>
        <div className="addtheaaterForm">
          <form className="addtheaaterform" onSubmit={handleSubmit}>
            <h2>{"Welcome to" +"-" + cinema}</h2>
            <div className="addtheaaterform-group">
              <label htmlFor="">Category Name:</label>
           
               <select name="name" 
              value={catData.name}
              onChange={handleChange}
              >
              <option ></option>
                <option value="VIP">VIP</option>
                <option value="VVIP">VVIP</option>
                <option value="REGULAR">REGULAR</option>
                <option value="BOSS">BOSS</option>
                <option value="CHAIRMAN">CHAIRMAN</option>
              </select>
              {formErrors.name && (
                <div className="error-message">{formErrors.name}</div>
              )}
            </div>
            <div className="addtheaaterform-group">
              <label htmlFor="">Price:</label>
              <input
                type="number"
                name="price"
                className=""
                onChange={handleChange}
                value={catData.price}
              />
             
            </div>
            {formErrors.price && (
                <div className="error-message">{formErrors.price}</div>
              )}
            <div className="addtheaaterform-group">
              <button type="submit" className="counterform-btn">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default CreateCategory;