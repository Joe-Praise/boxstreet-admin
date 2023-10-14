import React from "react";
import TheaterNav from "../Navigation/TheaterNav";
import "../stylesTheater/viewTheaters.css";
import { useNavigate } from "react-router-dom";

function ViewTheaters() {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate("/newTheater");
  };
  const handleViewButtonClick = () => {
    navigate("/seat-layout");
  }; 

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
            <select>
              <option value="cinema">Cinema</option>
              <option value="Jabi">Jabi</option>
              <option value="Wuse">Wuse</option>
              <option value="Garki">Garki</option>
            </select>

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
                <tr>
                  <td>{+1}</td>
                  <td>CTO000</td>
                  <td>8</td>
                  <td>6</td>
                  <td>48</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>
                    {" "}
                    Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                
                <tr>
                  <td>{+2}</td>
                  <td>CTO001</td>
                  <td>9</td>
                  <td>6</td>
                  <td>54</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit"  onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+3}</td>
                  <td>CTO002</td>
                  <td>6</td>
                  <td>3</td>
                  <td>18</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+4}</td>
                  <td>CTO003</td>
                  <td>15</td>
                  <td>8</td>
                  <td>120</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+5}</td>
                  <td>CTO004</td>
                  <td>14</td>
                  <td>6</td>
                  <td>84</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+6}</td>
                  <td>CTO005</td>
                  <td>10</td>
                  <td>6</td>
                  <td>60</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+7}</td>
                  <td>CTO006</td>
                  <td>18</td>
                  <td>8</td>
                  <td>144</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+8}</td>
                  <td>CTO007</td>
                  <td>6</td>
                  <td>6</td>
                  <td>36</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTheaters;
