import { useEffect, useState } from  "react";
import { Link, useNavigate } from "react-router-dom";
import "../Theater/stylesTheater/addcounter.css";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../config";
import WebNav from "./Navigation/WebNav";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://boxstreet.onrender.com"
    : "http://localhost:5000";

function AddUser() {
  const navigate = useNavigate();

  const generateCode = () => {
    return Math.random().toString("32").substring(2,10);
  };

  const [formData, setFormData] = useState({
    branch_id: "",
    fullname: "",
    role: "CINEMA",
    email: "",
    phone: "",
    cinema_id: "",
    password: generateCode(),
  });

  const [cinemaData, setCinemaData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const validateForm = () => {
    const errors = {};  

    if (!formData.fullname.trim()) {
      errors.fullname = "Full Names are required";
    }

    if (!formData.role.trim()) {
      errors.role = "Role type is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone Number is required";
    }

    if (!formData.cinema_id) {
      errors.cinema_id = "Please select a cinema";
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
          config.MANAGEMENT_BASE_URL + "/register",
          formData
        );
        toast.success("Admin created successfully");
            navigate("/web-users");

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

  useEffect(() => {
    axios.get(config.CINEMA_BASE_URL).then((result) => {
      setCinemaData(result.data);
    });

    // axios.get(config.BRANCH_BASE_URL).then((result) => {
    //   setBranchData(result.data);
    // });
  }, []);

  return (
    <div>
      <WebNav/>
      <div className="addcounterForm">
        <form onSubmit={handleSignUp} className="addtheaaterform">
          <h2>Register an Admin</h2>
          <div className="addcounterformnameflex">
            <div className="addtheaaterform-group">
              <label htmlFor="">Full Name:</label>
              <span></span>
              <input
                type="text"
                name="fullname"
                className="inputs"
                value={formData.fullname}
                onChange={handleChange}
              />
              {formErrors.fullname && (
                <div className="error-message">{formErrors.fullname}</div>
              )}
            </div>
            {/* <div className="addcounterform-group">
              <label htmlFor="">Role:</label>
              <span></span>
              <input
                type="text"
                name="role"
                className="inputs"
                disabled
                value={formData.role}
                onChange={handleChange}
              />
              {formErrors.role && (
                <div className="error-message">{formErrors.role}</div>
              )}
            </div> */}
          </div>
          <div className="addcounterformnameflex">
            <div className="addtheaaterform-group">
              <label htmlFor="">Phone Number:</label>
              <span></span>
              <input
                type="text"
                name="phone"
                className="inputs"
                value={formData.phone}
                onChange={handleChange}
              />
              {formErrors.phone && (
                <div className="error-message">{formErrors.phone}</div>
              )}
            </div>
            <div className="addcounterform-group">
              <label htmlFor="">Email:</label>
              <span></span>
              <input
                type="email"
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

          <div className="addcounterformnameflex">
            <div className="addtheaaterform-group">
              <label htmlFor="">Cinema:</label>
              <span></span>
              <select
                name="cinema_id"
                value={formData.cinema_id}
                onChange={handleChange}
              >
                <option value="">Select Cinema</option>
                {cinemaData?.map((cinema) => (
                  <option key={cinema._id} value={cinema._id}>
                    {cinema.name}
                  </option>
                ))}
              </select>
              {formErrors.cinema_id && (
                <div className="error-message">{formErrors.cinema_id}</div>
              )}
            </div>
            <div className="addcounterform-group">
              <label htmlFor="">Password:</label>
              <span></span>
              <input
                type="text"
                name="password"
                
                className="inputs"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="error-message">{formErrors.password}</div>
              )}
            </div>
          </div>

          {/* <div className="addcounterform-group">
            <label htmlFor="">Password:</label>
            <span></span>
            <input type="password"  
             name="password"
                className="inputs"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="error-message">{formErrors.password}</div>
              )}
              </div> */}

          <div className="addcounterform-group">
            <button type="submit" className="counterform-btn">Register User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
