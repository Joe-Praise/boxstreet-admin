import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { FaFacebook, FaGooglePlus, FaInvision } from "react-icons/fa";
import axios from "axios";
import config from "../config";
import Loading from "../Loading";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("registration");
  }, []);

  return (
    <div className={`container`}>
      <div className="form-container sign-up-container"></div>
      <div className="form-container sign-in-container">
        <SignInForm
          formData={formData}
          setFormData={setFormData}
          formErrorMessage={formErrorMessage}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <h3 className="reg-action">Boxstreet</h3>
          <div className="overlay-panel overlay-left">
            <h1 className="reg-text">Welcome Back!</h1>
            <p className="reg-sub-text">
              To keep connected with us, please login with your personal info
            </p>
            <Link to="/signin" className="reg-button ghost">
              Sign In
            </Link>{" "}
            {/* Use Link instead of button for navigation */}
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="reg-text">Management Login</h1>
            <p className="reg-sub-text">
              Welcome to Boxstreet Team........ We're happy to have you here!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm({ formData, setFormData, formErrors }) {
  const navigate = useNavigate();
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);

    const admin = {
      email: "web@gmail.com",
      password: "admin123",
    };

    if (
      formData.email === admin.email &&
      formData.password === admin.password
    ) {
      navigate("/web-admin");
    } else {
      try {
        const response = await axios.post(
          config.AUTH_REQUEST_URL + "/management-login",
          formData
        );

        setLoading(false);
        if (response?.data.status === "success") {
          let info = response.data?.data;

          localStorage.setItem("branch_id", info.branch_id?._id);
          localStorage.setItem("branch", info.branch_id?.location_id?.name);
          localStorage.setItem("cinema_id", info.cinema_id?._id);
          localStorage.setItem("cinema", info.cinema_id?.name);
          localStorage.setItem("user_id", info._id);
          localStorage.setItem("fullname", info.fullname);
          localStorage.setItem("email", info.email);

          if (info.role === "COUNTER") {
            navigate("/counter");
          } else if (info.role === "THEATER") {
            navigate("/theater");
          } else if (info.role === "CINEMA") {
            navigate("/cinema");
          } else if (info.role === "ACCOUNT") {
            navigate("/account");
          } else {
            setFormErrorMessage("Sign-in failed. Please try again.");
          }
        }
      } catch (error) {
        setLoading(false);
        setFormErrorMessage(error.response.data.msg);
      }
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <h1 className="reg-text">SignIn BoxStreet</h1>
      <div className="social-container">
        <Link className="social">
          <i className="fb">
            <FaFacebook />
          </i>
        </Link>
        <Link className="social">
          <i className="gmail">
            <FaGooglePlus />
          </i>
        </Link>
        <Link className="social">
          <i className="linked">
            <FaInvision />
          </i>
        </Link>
      </div>
      <span className="reg-title">Or use your email account:</span>
      <label>Your Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="johndoe@gmail.com"
      />
      {formErrors.email && <p className="error-message">{formErrors.email}</p>}

      <div className="pswd">
        <label>Password</label>
        {/* <Link to="/forgot" className="forget">
          Forgot your password?
        </Link> */}
      </div>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="****"
      />
      {formErrors.password && (
        <p className="error-message">{formErrors.password}</p>
      )}

      {formErrorMessage && <p className="error-message">{formErrorMessage}</p>}
      <div>
        <button type="submit" className="reg-button">
          {loading ? <Loading /> : "Sign In"}
        </button>
      </div>
    </form>
  );
}

export default SignUp;
