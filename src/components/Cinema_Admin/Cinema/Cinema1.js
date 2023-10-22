import "./cinema1.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CounterNav from "../../Counter/Navigation/CounterNav";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import config from "../../config";
function Cinema1(){
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    cinema_id:"6533ef3901befc4ebbdbf506",
    location_id:"651819ac8d78a5855cfe867b",
    opening:"",
    closing:"",
    phones:""
  });

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

const handleSubmit = async(e)=>{
e.preventDefault();
try{
  // const isFormValid = validateForm();
  
    const response = await axios.post(
      config. BRANCH_BASE_URL,
      formData
    );
    console.log(response);
  
}catch(error){
console.log(error)
}

};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

    return(
        <div className="cinema-admin-container">
            <Topnav/>
            <div className="cinema-admin-main">
                <h2>Welcome To Boxstreet</h2>
               
                <div className="cinema-admin-form-container">
            <form className="cinema-admin-form" onSubmit={handleSubmit}>
                
            {/* <div className="add-cinema-form-group">
            <label htmlFor="">Branch Name:</label>
            <span></span>
            <input type="text" name="name" className="inputs"
            
            />
          </div> */}

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