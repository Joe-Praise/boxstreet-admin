import "./viewusers.css";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;
function ViewUsers(){
    const branch_id = localStorage.getItem("branch_id");
    const cinema_id = localStorage.getItem("cinema_id");
    const cinema = localStorage.getItem("cinema")
    const [branch, setBranch] = useState([]);
    const [manager, setManager] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const handleEditButtonClick = (userId, branch) => {
      navigate(`/cinema/single-user/${userId}`, {
        state: { userData: branch },
      });
    };
    useEffect(()=>{
        let user_url = `${BASE_URL}/api/v1/managements?cinema_id=${cinema_id}`
        axios.get(user_url)
        .then((res)=>{
          
           let users =res?.data;
           let data = users?.map((user)=>{
                return{
                    id :user._id,
                    branchname:user.branch_id?.name,
                    locationname:user.branch_id?.location_id.name,
                    fullname:user.fullname,
                    role:user.role,
                    email:user.email,
                    phone:user.phone
                }
           })
           setManager([...data])
        })
        },[])

        const handleDeleteButtonClick = (managerId) => {
            axios
              .delete(`${BASE_URL}/api/v1/managements/${managerId}`)
              .then((response) => {
                console.log("Manager successfully deleted");
        
                setManager((prevMngTable) => {
                  const updatedMngTable = prevMngTable.filter(
                    (manager) => manager.id !== managerId
                  );
                  return updatedMngTable;
                });
              })
              .catch((error) => {
                console.error("Error Deleting Category", error);
              });
          };
    return(
        <div className="cinema-view-branch-container">
        <Topnav />
        <div className="cinema-view-branch-main">
          <h2 className="cinema-name">{"Welcome to "  + cinema}</h2>
          <div className="cinema-view-branch-bottom">
            <table className="view-branch-table">
              <thead>
                <tr className="view-branch-table-header">
                  <th>S/N</th>
                  <th>Branch Name</th>
                  <th>Location</th>
                  <th>full Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="view-branch-tbody">
                {manager.map((user, i) => {
                    if(user.role === "CINEMA") return ""
                    return <tr key={user.id}>
                     <td>{i }</td>
                     <td>{user.locationname}</td>
                     <td>{user.branchname}</td>
                     <td>{user.fullname}</td>
                     <td>{user.role}</td>
                     <td>{user.email}</td>
                     <td>{user.phone}</td>
                     <td className="view-branch-edit" onClick={() => handleEditButtonClick(user.id, manager)}>Edit</td>
                     <td className="view-branch-delete"
                       onClick={() => handleDeleteButtonClick(user.id)}
                     >Delete</td>
   
                   </tr>
                })}
  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}
export default ViewUsers