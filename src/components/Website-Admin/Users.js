import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import WebNav from './Navigation/WebNav';
import './style/cinemas.css';
import config from "../config"

function Users() {
    const { id } = useParams();
  const [managers, setManagers] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFindAdmins = () => {
    const adminUrl = `${config.MGT_BASE_URL}/${id}`;
    if (adminUrl) {
      axios
        .get(adminUrl)
        .then((response) => {
          const adminData = response.data;
          const formattedAdmin = {
            id: adminData.admin_id,
            // cinema_id: adminData.admin?.cinema_id,
            name: adminData.admin?.fullname,
            role: adminData.admin?.role,
            email: adminData.admin?.email,
            phone: adminData.admin?.phone,
          };
          setManagers([formattedAdmin]);
        })
        .catch((error) => {
            setManagers([]);
        });
    }
  };

  useEffect(() => {
    async function getManagersByRole(role) {
        try {
          const response = await axios.get(config.MGT_BASE_URL + "/role", {
            params: {
              role: role,
            },
          });
      
          if (response.status === 200) {
            setManagers(response.data);
            // console.log('Response data:', response.data);

          } else {
            setError('Failed to retrieve managers');
          }
        } catch (error) {
          console.error('Axios error:', error); 
          setError('Axios error: ' + error.message);
        } finally {
          setLoading(false);
        }
      }
      

    getManagersByRole('CINEMA');
  }, []);

  return (
    <div className="counterBooking">
      <div>
        <WebNav />
      </div>

      <div className="web-cinema">
        <div className="web-cinema-page">
          <div className="web-cinema-page-top">
            <div className="web-cinema-input">
              <input
                placeholder="Search Admin by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="web-cinema-input-btn" onClick={handleFindAdmins}>
                Search
              </span>
              {/* <span className="web-cinema-input-btn">
                Reset
              </span> */}
            </div>
          </div>
          <div className="web-cinema-select">
            <div></div>

            <Link to="/web-admin/add-user" className="newBooking">
              Create New Admin
            </Link>
          </div>
          <div className="web-cinema-table-container">
          <table className="web-cinema-table">
  <thead>
    <tr className="web-cinema-table-header">
      <th>S/N</th>
      <th>Cinema</th>
      <th>Admin Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
  {managers
                  .filter((manager) =>
                  manager.fullname.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((user, index) => (
      <tr key={user._id}>
        <td>{index + 1}</td>
        <td>{user.cinema_id.name}</td>
        <td>{user.fullname}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td className="actions">
            
          <button className="web-cinema-table-check-success">View</button>
          <Link to={`/web-admin/edit-user/${user._id}`} className="web-cinema-table-view">
            Edit
          </Link>
          <button className="web-cinema-table-print">Archive</button>
        </td>
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

export default Users;


