import React from 'react'
import { useNavigate } from 'react-router';
import TheaterNav from '../Navigation/TheaterNav';

function ViewMovies() {
    const navigate = useNavigate();

    const handleEditButtonClick = () => {
      navigate("/theater-admin/add-movie");
    };
    const handleViewButtonClick = () => {
      navigate("/theater-admin/seat-layout");
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
                  <th>Movie Title</th>
                  <th>Language</th>
                  <th>Casts</th>
                  <th>Production Studio</th>
                  <th>Duration</th>
                  <th>PG Rating</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{+1}</td>
                  <td>The Endgame</td>
                  <td>Spanish, Latin</td>
                  <td>6</td>
                  <td>48</td>
                  <td>1234567</td>
                  <td>7</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>
                    {" "}
                    Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                
                <tr>
                  <td>{+2}</td>
                  <td>The Endgame</td>
                  <td>Spanish, Latin</td>
                  <td>6</td>
                  <td>54</td>
                  <td>1234567</td>
                  <td>12</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit"  onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+3}</td>
                  <td>The Endgame</td>
                  <td>Spanish, Latin</td>
                  <td>3</td>
                  <td>18</td>
                  <td>1234567</td>
                  <td>12</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+4}</td>
                  <td>The Endgame</td>
                  <td>15</td>
                  <td>8</td>
                  <td>120</td>
                  <td>1234567</td>
                  <td>21</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+5}</td>
                  <td>The Endgame</td>
                  <td>14</td>
                  <td>6</td>
                  <td>84</td>
                  <td>1234567</td>
                  <td>18</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+6}</td>
                  <td>The Endgame</td>
                  <td>Spanish, Latin</td>
                  <td>6</td>
                  <td>60</td>
                  <td>1234567</td>
                  <td>Family</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>
                <tr>
                  <td>{+7}</td>
                  <td>The Endgame</td>
                  <td>Spanish, Latin</td>
                  <td>8</td>
                  <td>144</td>
                  <td>1234567</td>
                  <td>12+</td>
                  <td className="vt-table-view" onClick={handleViewButtonClick}>View</td>
                  <td className="vt-table-edit" onClick={handleEditButtonClick}>Edit</td>
                  <td className="vt-table-delete">Delete</td>
                </tr>

                <tr>
                  <td>{+8}</td>
                  <td>The Endgame</td>
                  <td>6</td>
                  <td>6</td>
                  <td>36</td>
                  <td>1234567</td>
                  <td>13+</td>
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
  )
}

export default ViewMovies