import React, { useEffect, useState } from "react";
import TheaterNav from "../Navigation/TheaterNav";
import "../stylesTheater/viewTheaters.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://lolcalhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function ViewTheaters() {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate("/newTheater");
  };
  const handleViewButtonClick = () => {
    navigate("/seat-layout");
  }; 

  const [theaterTable, setTheaterTable] = useState([]);
  console.log(theaterTable)

  useEffect(() => {
    let theater_table_url = `${BASE_URL}/api/v1/theaters`;

    axios
      .get(theater_table_url)
      .then((res) => {
        let theaters = res.data;
        let data = theaters?.map((theater) => {
          return {
            id: theater.id,
            name: theater.name,
            branch: theater.branch_id,
            row: theater.row,
            column: theater.column,
            seating_capacity: theater.seating_capacity,
            col_matrix_1: theater.col_matrix_1,
            col_matrix_2: theater.col_matrix_2,
          };
        });
        console.log(theaters)
        setTheaterTable([...data]);
      })
      .catch((error) => {
        console.error("Error fetching theater data:", error);
      });
  }, []);

  return (
    <div>
      <TheaterNav />
      <div className="vtPage">
        <div className="vt-page">
          <div className="vt-page-top">
            <div className="vt-input">
              <input placeholder="search" />
              <span className="vt-input-btn">Search</span>
            </div>
          </div>
          <div className="vt-select">
            <span>
              Blue Sea Cinemas
            </span>

            <button className="addtheaterbtn">
                Add New Theater
            </button>
          </div>
          <div className="vt-table-container">
            <table className="vt-table">
              <thead>
                <tr className="vt-table-header">
                  <th>S/N</th>
                  <th>Theater Name</th>
                  <th>Rows</th>
                  <th>Columns</th>
                  <th>Seating Capacity</th>
                  <th>Col-Matrix1</th>
                  <th>Col-Matrix2</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {theaterTable.map((theater) => (
                  <tr key={theater.id}>
                    <td>1</td>
                    <td>{theater.name}</td>
                    <td>{theater.row}</td>
                    <td>{theater.column}</td>
                    <td>{theater.seating_capacity}</td>
                    <td>{theater.col_matrix_1 ? theater.col_matrix_1.join(", ") : "N/A"}</td>
                    <td>{theater.col_matrix_2 ? theater.col_matrix_2.join(", ") : "N/A"}</td>
                    <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                    <td className="vt-table-edit" onClick={handleEditButtonClick}>
                      {" "}
                      Edit</td>
                    <td className="vt-table-delete">Delete</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTheaters;
