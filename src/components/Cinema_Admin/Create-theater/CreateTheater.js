import React, { useState, useEffect } from "react";
// import "../../../stylesTheater/addtheater.css";
import "./theater.css"
import axios from "axios";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;


function CreateTheater() {
  const branchid = localStorage.getItem('branchId');
  const cinema_id = localStorage.getItem('cinema_id');
  const cinema = localStorage.getItem("cinema")
  const [formErrors, setFormErrors] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [is_edited, setEdited] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [theater, setTheater] = useState([])
  const [branch, setBranch] = useState("");
  const [screen, setScreen] = useState("");
  const [name, setName] = useState("");
  const [theaterData, setTheaterData] = useState({
    name: "",
    screen: "",
    branch_id: branchid,
    cinema_id
  });

  const validateForm = () => {
    const errors = {};
    if (!theaterData.name.trim()) {
      errors.name = "Field Required";
    }
    if (!theaterData.screen.trim()) {
      errors.screen = "Field Required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, screen, value } = e.target;
    setTheaterData({
      ...theaterData,
      [name]: value,
      [screen]: value,
    });
  };

  useEffect(() => {
    let theater_url = `${BASE_URL}/api/v1/theaters`
    axios.get(theater_url)
      .then((res) => {
        let data = res?.data;
        setTheater(data)
      })
  }, [])

  const handleEditButtonClick = (theater) => {
    setTheaterData(theater)
    setEdited(true);
  };

  const handleCreateTheater = async (e) => {
    e.preventDefault();

    if (is_edited) {
      // If edited is not null, it means we are in edit mode
      axios
        .put(`${BASE_URL}/api/v1/theaters/${theaterData._id}`, theaterData)
        .then((res) => {
          if (res.data) {
            alert("Theater Has been Edited");
            setEdited(false); // Clear the edited state after editing
          

          }
        })
        .catch((error) => {
          console.error("Error editing category:", error);
        });
    } else {
      let data = {...theaterData}
      delete data.id
   
      // If edited is null, it means we are in create mode
      axios
        .post(`${BASE_URL}/api/v1/theaters`, data)
        .then((res) => {
          if (res.data._id) {
            alert("Theater Has been Created");
        
          }
        })
        .catch((error) => {
          console.error("Error creating category:", error);
        });
    }
  };
  const handleDeleteButtonClick = (theaterId) => {
    axios
      .delete(`${BASE_URL}/api/v1/theaters/${theaterId}`)
      .then((response) => {
        console.log("theater successfully deleted");

        setTheater((prevtheaterTable) => {
          const updatedtheaterTable = prevtheaterTable.filter(
            (theater) => theater._id !== theaterId
          );
          return updatedtheaterTable;
        });
      })
      .catch((error) => {
        console.error("Error Deleting theater", error);
      });
  };
 
  return (
    <div>
      <Topnav />
      <div className="addtheaaterForm3">
   <div className="theater-top-container">     
        <form className="addtheaaterform31" onSubmit={handleCreateTheater}>
          <h2>{"Welcome to" + "-" + cinema}</h2>
          <div className="addtheaaterform-group3">
            <label htmlFor="name">Theater Name:</label>
            <input
              type="text"
              name="name"
              className="inputs"
              required
              onChange={handleChange}
              value={theaterData.name}
            />

            {formErrors.name && (
              <div className="error-message">{formErrors.name}</div>
            )}
          </div>
          <div className="addtheaaterform-group3">
            <label htmlFor="name">Number of Screens:</label>
            <input
              type="number"
              name="screen"
              className="inputs"
              required
              onChange={handleChange}
              value={theaterData.screen}
            />
            {formErrors.screen && (
              <div className="error-message">{formErrors.screen}</div>
            )}
          </div>
          <div className="addtheaaterform-group3">
            <button type="submit" className="counterform-btn">
             
              {is_edited ? "Edit Theater" : " Register Theater"}
            </button>
          </div>
        </form>

        </div>
        <div className="theater-bottom-table">
          <div className="category-table-containerT">
            <table className="category-table">
              <thead>
                <tr className="category-table-header">
                  <th>S/N</th>
                  <th>Branch</th>
                  <th>Theater</th>
                  <th>Screen</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {theater.map((t, i) => (
                  <tr key={t._id}>
                    <td>{i + 1}</td>
                    <td>{t.branch_id.name}</td>
                    <td>{t.name}</td>
                    <td>{t.screen}</td>
                    <td
                      className="vt-table-edit"
                      onClick={() =>
                        handleEditButtonClick(t)
                      }
                    >
                      Edit
                    </td>

                    <td
                      className="vt-table-delete"
                      onClick={() => handleDeleteButtonClick(t._id)}
                    >
                      Delete
                    </td>
                  </tr>
                ))

                }


              </tbody>
            </table>
          </div>
          
        </div>
      </div>

    </div>
  );
}

export default CreateTheater;
