import { Link } from 'react-router-dom';
import WebNav from './Navigation/WebNav';
import './style/cinemas.css';
import axios from 'axios';
import config from '../config';
import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(config.MGT_BASE_URL).then((result) => {
      setUsers(result.data);
      console.log(users)
    })
    .catch((error) => {
        console.error('API request error:', error);
      });
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
                // value={searchText}
                // onChange={(e) => setSearchText(e.target.value)}
              />
              <span className="web-cinema-input-btn">
                Search
              </span>
              <span className="web-cinema-input-btn">
                Reset
              </span>
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
                  <th>Cinema ID</th>
                  <th>Admin Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              {users.length === 0 ? (

  <p>No users found</p>
) : (
    <div>
    <p>Number of users: {users.length}</p>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.cinema_id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="actions">
                      <Link to={`/web-admin/edit-user/${user._id}`} className="web-cinema-table-view">
                        Edit
                      </Link>
                      <button className="web-cinema-table-print">Archive</button>
                      {/* 
                      <button
                        className={user.is_checked ? "web-cinema-table-check-success" : "web-cinema-table-check"}
                        onClick={() => handleCheckIn(user)}
                      >
                        {user.is_checked ? "Checked" : "Check-In"}
                      </button>
                      */}
                    </td>
                  </tr>
                ))}
              </tbody>
              </div>
    )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
