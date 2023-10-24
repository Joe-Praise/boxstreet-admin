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

function Cinema1() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  let cinemaId = localStorage.getItem("cinema_id")
  // console.log(cinemaId)
  const [formData, setFormData] = useState({
    cinema_id: cinemaId,
    location_id:"",
    opening: "",
    closing: "",
    phones: ""
  });

  const [locations, setLocations] = useState([])
  // const validateForm =()=>{
  //   const errors={};
  //   if(!formData.opening.trim()){
  //     errors.opening ="Field Required";
  //   }
  //   if(!formData.closing.trim()){
  //     errors.closing ="Field Required"
  //   }
  //   if(!formData.phones.trim()){
  //     errors.phones = "Field Required"
  //   }
  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const isFormValid = validateForm();

      const response = await axios.post(
        config.BRANCH_BASE_URL,
        formData
      );
      console.log(response);

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
      // console.log(data)
      setLocations(data)
    })
  },[])

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
              {/* <input type="text" name="name" className="inputs"
            
            /> */}
              <select className="add-cinema-form-select">
                <option>

                </option>
                {locations.map((l) => (
                  <option key={l.id}
                  value={l._id}
                  name="location_id"
                  >
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="add-cinema-form-group">
              <label htmlFor="">Opening:</label>
              <span></span>
              <input type="text" name="opening" className="inputs"
                value={formData.opening}
                onChange={handleChange}
              />

              {/* {formErrors.opening &&(
              <div>{formErrors}</div>
            )} */}
            </div>
            <div className="add-cinema-form-group">
              <label htmlFor="">Closing:</label>
              <span></span>
              <input type="text" name="closing" className="inputs"
                value={formData.closing}
                onChange={handleChange}
              />
              {/* {formErrors.closing &&(
              <div>{formErrors}</div>
            )} */}
            </div>

            <div className="add-cinema-form-group">
              <label htmlFor="">Phone:</label>
              <span></span>
              <input type="text" name="phones" className="inputs"
                value={formData.phones}
                onChange={handleChange}
              />
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
export default Cinema1