import "./cinema1.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CounterNav from "../../Counter/Navigation/CounterNav";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import config from "../../config";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function CreateBranch() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [locationid, setLocationId] = useState()
  let cinemaId = localStorage.getItem("cinema_id")

  const [formData, setFormData] = useState({
    cinema_id: cinemaId,
    location_id: "",
    opening: "",
    closing: "",
    phones: "",
    name: "",
    address:""
  });

  const [locations, setLocations] = useState([])
  const validateForm = () => {
    const errors = {};
    if (!formData.location_id.trim()) {
      errors.opening = "Field Required";
    }
    if (!formData.name.trim()) {
      errors.name = "Field Required";
    }
    if (!formData.address.trim()) {
      errors.address = "Field Required";
    }
    if (!formData.opening.trim()) {
      errors.opening = "Field Required";
    }
    if (!formData.closing.trim()) {
      errors.closing = "Field Required"
    }
    if (!formData.phones.trim()) {
      errors.phones = "Field Required"
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = validateForm();
      if (isFormValid) {
        const response = await axios.post(
          config.BRANCH_BASE_URL,
          formData
        ).then((resp)=>{
          if(resp?.status === "success"){
            alert("Branch Created")
          }
        })
        console.log(response);

        if (response?.status === "success") {
         
          setIsSignUpSuccess(true);
          setFormErrorMessage("");
        }
      } else {
        setFormErrorMessage(
          "Please fill in all required fields."
        );
      }


    } catch (error) {
      console.log(error)
    }

  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,

    });
  };

  useEffect(() => {
    let location_url = `${BASE_URL}/api/v1/locations`;
    axios.get(location_url).then((res) => {
      let data = res.data;
      if(res.data.status ==="success"){
        alert("Branch Created")
      }
      setLocations(data)
    })
  }, [])

  return (
    <div className="cinema-admin-container">
      <Topnav />
      <div className="cinema-admin-main">
        <h2>Welcome To Boxstreet</h2>

        <div className="cinema-admin-form-container">
          <form className="cinema-admin-form" onSubmit={handleSubmit}>

            <div className="add-cinema-form-group">
              <label htmlFor="">Select Location:</label>
              <span></span>
              <select 
              name="location_id"
              className="add-cinema-form-select"
                value={formData.location_id}
                onChange={handleChange}
              >
                <option>

                </option>
                {locations.map((l) => (
                  <option key={l._id}
                  value={l._id}
                  >
                    {l.name}
                  </option>
                ))}

              </select>
              {formErrors.opening && (
                <div className="error-message">{formErrors.opening}</div>
              )}
            </div>

            <div className="add-cinema-form-group">
              <label htmlFor="">Branch Name:</label>
              <span></span>
              <input type="text" name="name" className="inputs"
                value={formData.name}
                onChange={handleChange}
              />

              {formErrors.name && (
                <div className="error-message">{formErrors.name}</div>
              )}
            </div>

            <div className="add-cinema-form-group">
              <label htmlFor="">Branch Address:</label>
              <span></span>
              <input type="text" name="address" className="inputs"
                value={formData.address}
                onChange={handleChange}
              />

              {formErrors.address && (
                <div className="error-message">{formErrors.address}</div>
              )}
            </div>
            <div className="add-cinema-form-group">
              <label htmlFor="">Opening:</label>
              <span></span>
              <input type="text" name="opening" className="inputs"
                value={formData.opening}
                onChange={handleChange}
              />

              {formErrors.opening && (
                <div className="error-message">{formErrors.opening}</div>
              )}
            </div>
            <div className="add-cinema-form-group">
              <label htmlFor="">Closing:</label>
              <span></span>
              <input type="text" name="closing" className="inputs"
                value={formData.closing}
                onChange={handleChange}
              />
              {formErrors.closing && (
                <div className="error-message">{formErrors.closing}</div>
              )}
            </div>

            <div className="add-cinema-form-group">
              <label htmlFor="">Phone:</label>
              <span></span>
              <input type="text" name="phones" className="inputs"
                value={formData.phones}
                onChange={handleChange}
              />
              {formErrors.phones && (
                <div className="error-message">{formErrors.phones}</div>
              )}
            </div>

            <div className="add-cinema-form-group">
              <button className="cinema-form-group-btn">
                Create Branch
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
export default CreateBranch