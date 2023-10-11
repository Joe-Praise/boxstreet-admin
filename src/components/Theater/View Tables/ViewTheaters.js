import React from "react";
import TheaterNav from "../Navigation/TheaterNav";
import "../stylesTheater/viewTheaters.css";
import { useNavigate } from "react-router-dom";

function ViewTheaters() {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate("/newTheater");
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
          </div>
          <div className="vt-table-container">
            <table className="vt-table">
              <thead>
                <tr className="vt-table-header">
                  <th>S/N</th>
                  <th>Cinemas</th>
                  <th>Branch</th>
                  <th>Seating Capacity</th>
                  <th>Rows</th>
                  <th>Columns</th>
                  <th>Col-Matrix1</th>
                  <th>Col-Matrix2</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{+1}</td>
                  <td>UdeNna Uwaluekw Ibe</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>
                    {" "}
                    Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                
                <tr>
                  <td>{+2}</td>
                  <td>Ude Nna</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-edit"  onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+1}</td>
                  <td>UdeNna Uwaluekw Ibe</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+2}</td>
                  <td>Ude Nna</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+1}</td>
                  <td>UdeNna Uwaluekw Ibe</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+2}</td>
                  <td>Ude Nna</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+1}</td>
                  <td>UdeNna Uwaluekw Ibe</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+2}</td>
                  <td>Ude Nna</td>
                  <td>Regular</td>
                  <td>Jabi</td>
                  <td>Boxstreet</td>
                  <td>Ocean's 11</td>
                  <td>1234567</td>
                  <td>1234567</td>
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
