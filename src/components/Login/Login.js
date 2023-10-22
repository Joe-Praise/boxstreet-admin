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
          //   isSignUpSuccess={isSignUpSuccess}
          formErrorMessage={formErrorMessage}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          //   setIsSignUpSuccess={setIsSignUpSuccess}
          setFormErrorMessage={setFormErrorMessage}
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
            <button className="reg-button ghost">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="reg-text">Hello, Friend!</h1>
            <p className="reg-sub-text">
              Enter your personal details and start your journey with us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm({
  formData,
  setFormData,
  formErrorMessage,
  formErrors,
  setFormErrorMessage,
}) {
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        config.AUTH_REQUEST_URL + "/management-login",
        formData
      );

      setLoading(false);
      if (response?.data.status === "success") {
      
        setLoading(false)
        let info = response.data?.data
       
        localStorage.setItem('branch_id',info.user.branch_id);
        localStorage.setItem('cinema_id',info.user.cinema_id);
        localStorage.setItem('user_id',info.user._id);

        if(info.user.role === "COUNTER"){
            navigate("/counter");
        }

        if(info.user.role === "THEATER"){
            navigate("/theater");
        }

        if(info.user.role === "CINEMA"){
          navigate("/cinema");
      }

      } else {
        setFormErrorMessage("Sign-in failed. Please try again.");
      }
    } catch (error) {
      setFormErrorMessage("An error occurred while signing in.");
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <h1 className="reg-text">Sign In to Boxstreet</h1>
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
        <Link to="/forgot" className="forget">
          Forgot your password?
        </Link>
      </div>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
      />
      {formErrors.password && (
        <p className="error-message">{formErrors.password}</p>
      )}

      {formErrorMessage && <p className="error-message">{formErrorMessage}</p>}
      <div>
        <button type="submit" className="reg-button">
          {loading? <Loading/> : "Sign In" }
        </button>
      </div>
    </form>
  );
}

export default SignUp;
