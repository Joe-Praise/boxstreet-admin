import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WebNav from "./Navigation/WebNav";
import axios from "axios";
import config from "../config";
import "./style/cinemas.css";

function ViewLocation() {
  const { id } = useParams();
  const [Location, setLocation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedLocation, setEditedCinema] = useState(null);
  const [archiving, setArchiving] = useState(false);
  const navigate = useNavigate();
  const [editedLocationData, setEditedLocationData] = useState({
    name: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fetch cinema data based on the ID parameter
  const handleFindCinemas = () => {
    const locationUrl = `${config.LOCATION_BASE_URL}`;
    // console.log(locationUrl);
    if (locationUrl) {
      axios
        .get(locationUrl)
        .then((response) => {
          const locationData = response.data;
         
          setLocation([...locationData]);
        })
        .catch((error) => {
          setLocation([]);
          console.error("Error fetching location data:", error);
        });
    }
  };

  // Set the edited cinema and its data for editing
  const handleEditCinema = (location) => {
    setEditedCinema(location);
    setEditedLocationData({
      _id: location._id,
      name: location.name,
    });
  };

  // Handle input changes for editing cinema data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedLocationData({
      ...editedLocationData,
      [name]: value,
    });
  };

  // Save changes to edited cinema data
  const handleSaveCinema = () => {
    const locationUrl = `${config.LOCATION_BASE_URL}/${editedLocationData._id}`;
    axios
      .put(locationUrl, editedLocationData)
      .then((response) => {
        console.log("Cinema data updated:", response.data);
        let data = response.data;
        let _cinemas = [...Location];
        let d = _cinemas.find((x) => x._id === data._id);
        d = { ...d, ...data };

        setLocation(_cinemas);
        setEditedLocationData({
          _id: "",
          name: "",
        });
      })
      .catch((error) => {
        console.error("Error updating location data:", error);
      });
  };

  // Archive a cinema
  const handleDeleteCinema = (adminId) => {
    axios
      .delete(`${config.LOCATION_BASE_URL}/${adminId}`)
      .then((response) => {
        alert("Location deleted successfully");


      })
      .catch((error) => {
        console.error("Error Deleting Admin", error);
      });
  };

  useEffect(() => {
    // Fetch cinema data when the ID parameter changes
    handleFindCinemas();
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
                placeholder="Search Location by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span
                className="web-cinema-input-btn"
                onClick={handleFindCinemas}
              >
                Search
              </span>
            </div>
          </div>
          <div className="web-cinema-select">
            <div></div>
            <Link to="/web-create-location" className="newBooking">
              Create Location
            </Link>
          </div>
          <div className="web-cinema-table-container">
            <table className="web-cinema-table">
              <thead>
                <tr className="web-cinema-table-header">
                  <th>S/N</th>
                  <th>Location Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Location.map((location, index) => (
                  <tr key={location._id}>
                    <td>{index + 1}</td>
                    <td>{location.name}</td>
                    <td className="actions">
                      <button
                        className="web-cinema-table-view"
                        onClick={() => handleEditCinema(location)}
                      >
                        Edit
                      </button>
                      <button
                        className="web-cinema-table-print"
                        onClick={() => handleDeleteCinema(location._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editedLocation && (
        <div className="edit-cinema-modal">
          <div className="edit-cinema-modal-content">
            <h2>Editing {editedLocation.name}</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Location Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedLocationData.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <button onClick={() => setEditedCinema(null)}>Close</button>
              <button type="button" onClick={handleSaveCinema}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewLocation;
