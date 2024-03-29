import "./viewbranch.css"
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;
function ViewBranch() {
  const [branch, setBranch] = useState([]);

  const navigate = useNavigate();
const cinema = localStorage.getItem("cinema")
  const handleEditButtonClick = (branchId, branch) => {
    navigate(`/cinema/view-branch/${branchId}`, {
      state: { branchData: branch },
    });
  };
  useEffect(() => {
    let branch_url = `${BASE_URL}/api/v1/branches`
    axios.get(branch_url)
      .then((res) => {
        let data = res?.data;
        setBranch(data)
      })
  }, [])

  const handleDeleteButtonClick = (branchId) => {
    axios
      .delete(`${BASE_URL}/api/v1/branches/${branchId}`)
      .then((response) => {
        console.log("Branch successfully deleted");

        setBranch((prevBranchTable) => {
          const updatedBranchTable = prevBranchTable.filter(
            (branch) => branch._id !== branchId
          );
          return updatedBranchTable;
        });
      })
      .catch((error) => {
        console.error("Error Deleting Category", error);
      });
  };

  return (
    <div className="cinema-view-branch-container">
      <Topnav />
      <div className="cinema-view-branch-main">
      <div className="cinema-branch-cinemaname">
                    <h3>{"Welcome to " + cinema}</h3>
                </div>
        <div className="cinema-view-branch-bottom">
          <table className="view-branch-table">
            <thead>
              <tr className="view-branch-table-header">
                <th>S/N</th>

                <th>Location</th>
                <th>Branch Name</th>
                <th>Address</th>
                <th>Opening</th>
                <th>Closing</th>
                <th>Contact</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="view-branch-tbody">
              {branch.map((b, i) => (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>{b.location_id.name}</td>
                  <td>{b.name}</td>
                  <td>{b.address}</td>
                  <td>{b.opening}</td>
                  <td>{b.closing}</td>
                  <td>{b.phones}</td>
                  <td className="view-branch-edit" onClick={() => handleEditButtonClick(b._id, branch)}>Edit</td>
                  <td className="view-branch-delete"
                    onClick={() => handleDeleteButtonClick(b._id)}
                  >Delete</td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default ViewBranch