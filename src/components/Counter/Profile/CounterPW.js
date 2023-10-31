import React, { useState } from "react";
import "../stylesCounter/cchangePass.css";
import CounterNav from "../Navigation/CounterNav";
import config from "../../config";
import axios from "axios";
import Loading from "../../Loading"


const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://boxstreet.onrender.com/api/v1"
    : "http://localhost:5000/api/v1";

function CounterPW() {
  const email = localStorage.getItem("email");
  

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email,
    password: "",
    newPassword: "",
  });


  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "old password is required";
    }

    if (!formData.newPassword.trim()) {
      errors.newPassword = "New Password is required";
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password is not strong";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        const response = await axios.put(
          BASE_URL + "/auth/update-password-management",
          formData
        );

        if (response.data.status) {
          setLoading(false);
          alert("Password Reset is Successfully");
          setFormData({
            password: "",
            newPassword: "",
          });
        } else {
          alert(response.data.message);
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
      <CounterNav />
      <div className="ccPassForm">
        <form onSubmit={handlePassword} className="ccPassform">
          <h2>Change Password</h2>
          <div className="ccPassform-group">
            <label htmlFor="">Email:</label>
            <span></span>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="inputs"
              disabled
            />
          </div>
          <div className="ccPassform-group">
            <label htmlFor="">Current Password:</label>
            <span></span>
            <input
              type="password"
              name="password"
              className="inputs"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <div className="error-message">{formErrors.password}</div>
            )}
          </div>
          <div className="ccPassform-group">
            <label htmlFor="">New Password:</label>
            <span></span>
            <input
              type="password"
              name="newPassword"
              className="inputs"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {formErrors.newPassword && (
              <div className="error-message">{formErrors.newPassword}</div>
            )}
          </div>
          <section>*NOTE: Password should be at least 8 characters</section>
          <div className="ccPassform-group">
            <button className="ccPassform-btn">{loading ? <Loading/>: "submit Password"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CounterPW;
