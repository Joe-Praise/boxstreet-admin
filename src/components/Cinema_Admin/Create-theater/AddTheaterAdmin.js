import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./theateradmin.css"
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import Loading from "../../Loading";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function AddTheaterAdmin() {
  const navigate = useNavigate();
  const cinema = localStorage.getItem("cinema")
  const[loading, setLoading]=useState(false)
  let cinema_id = localStorage.getItem("cinema_id")
  const generateCode = () => {
    return Math.random().toString("32").substring(2,10);
  };

  const [formData, setFormData] = useState({
    cinema_id,
    branch_id:"",
    fullname: "",
    role: "",
    email: "",
    phone: "",
    password: generateCode(),
  });
  const [cinemaData, setCinemaData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [role, setRole] = useState("");


  const validateForm = () => {
    const errors = {};

    // Basic validation checks, add more as needed
    if (!formData.branch_id.trim()) {
      errors.branch_id = "Please select a branch";
    }

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
setLoading(true)
    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        // console.log(formData);
        const response = await axios.post(
          config.MANAGEMENT_BASE_URL + "/register",
          formData
        );
        console.log(response);
        if(response?.data.data._id){
          alert("User Created")
          setLoading(false)
          setFormData({
            branch_id:"",
            fullname: "",
            role: "",
            email: "",
            phone: "",
            password: "",
          })
        }

        if (response?.data.status === "success") {
          setIsSignUpSuccess(true);
          setFormErrorMessage("");
        }
      } else {
        setFormErrorMessage(
          "Please fill in all required fields and correct any validation errors."
        );
      }
    } catch (error) {
      console.error("Error creating theater Admin:", error);
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
let branch_url = `${BASE_URL}/api/v1/branches?cinema_id=${cinema_id}`
    axios.get(branch_url).then((result) => {
      setBranchData(result.data);
      // console.log(result.data)
    });
  }, []);

  return (
    <div>
      <Topnav/>
      <div className="addcounterForm">
        <form onSubmit={handleSignUp} className="addtheaaterform">
          <h2 className="cinema-name">{"Welcome to " + cinema}</h2>
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
                <p className="error-message">{formErrors.fullname}</p>
              )}
            </div>
            <div className="addcounterform-group">
              <label htmlFor="">Role:</label>
              <span></span>
        
              <select name="role" 
              value={formData.role}
              onChange={handleChange}
              >
              <option ></option>
                <option value="COUNTER">COUNTER</option>
                <option value="THEATER">THEATER</option>
                <option value="ACCOUNT">ACCOUNT</option>
              </select>
              {formErrors.role && (
                <p className="error-message">{formErrors.role}</p>
              )}
            </div>
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
              <label htmlFor="">Branch:</label>
              <span></span>
              <select
                name="branch_id"
                value={formData.branch_id}
                onChange={handleChange}
              >
                <option value="">Select Branch</option>
                {branchData?.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.location_id.name}-{branch.name}
                  </option>
                ))}
              </select>
              {formErrors.branch_id && (
                <p className="error-message">{formErrors.branch_id}</p>
              )}
            </div>
          
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
          <div className="addcounterform-group">
            <button className="counterform-btn">{loading? <Loading/>:"Register User"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTheaterAdmin;
