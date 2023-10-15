import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../stylesTheater/addcounter.css'
import TheaterNav from '../Navigation/TheaterNav';
import axios from "axios";
import config from "../../config";

function AddCounter() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    residentialAddress: '',
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const validateForm = () => {
    const errors = {};

    // Basic validation checks, add more as needed
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!formData.residentialAddress.trim()) {
      errors.residentialAddress = 'Phone Number is required';
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.residentialAddress.trim()) {
      errors.residentialAddress = 'Residential Address is required';
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Invalid Password";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        console.log(formData);
        const response = await axios.post(
          config.AUTH_REQUEST_URL + "/signup",
          formData
        );
        console.log(response);

        if (response?.data.status === "success") {
          navigate("/verify");
          setIsSignUpSuccess(true);
          setFormErrorMessage("");
        }
      } else {
        setFormErrorMessage(
          "Please fill in all required fields and correct any validation errors."
        );
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  return (
    <div>
    <TheaterNav />
    <div className="addcounterForm">
      <form onSubmit={handleSignUp} className="addtheaaterform">
        <h2>Register a Counter</h2>
        <div className="addcounterformnameflex">
          <div class="addtheaaterform-group">
            <label for="">First Name:</label>
            <span></span>
            <input
                type="text"
                name="firstName"
                className="inputs"
                value={formData.firstName}
                onChange={handleChange}
              />
              {formErrors.firstName && (
                <div className="error-message">{formErrors.firstName}</div>
              )}
              </div>
          <div class="addcounterform-group">
            <label for="">Last Name:</label>
            <span></span>
            <input
                type="text"
                name="lastName"
                className="inputs"
                value={formData.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && (
                <div className="error-message">{formErrors.lastName}</div>
              )}
              </div>
        </div>
        <div className="addcounterformnameflex">
          <div class="addtheaaterform-group">
            <label for="">Phone Number:</label>
            <span></span>
            <input type="text"  
              name="phoneNumber"
                className="inputs"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {formErrors.phoneNumber && (
                <div className="error-message">{formErrors.phoneNumber}</div>
              )}
              </div>
          <div class="addcounterform-group">
            <label for="">Email:</label>
            <span></span>
            <input  type="email"  
              name="email"
                className="inputs"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
              </div>
        </div>
        
          <div class="addcounterform-group">
            <label for="">Residential Address:</label>
            <span></span>
            <input type="text"  
             name="residentialAddress"
                className="inputs"
                value={formData.residentialAddress}
                onChange={handleChange}
              />
              {formErrors.residentialAddress && (
                <div className="error-message">{formErrors.residentialAddress}</div>
              )}
              </div>
        <div className="addcounterformnameflex">
          <div class="addtheaaterform-group">
            <label for="">Username:</label>
            <span></span>
            <input   type="text"  
              name="username"
                className="inputs"
                value={formData.username}
                onChange={handleChange}
              />
              {formErrors.username && (
                <div className="error-message">{formErrors.username}</div>
              )}
              </div>
          <div class="addcounterform-group">
            <label for="">Password:</label>
            <span></span>
            <input type="password"   name="password"
                className="inputs"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="error-message">{formErrors.password}</div>
              )}
              </div>
        </div>
        <div class="addcounterform-group">
          <button class="counterform-btn">Register Counter</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AddCounter