import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WebNav from "./Navigation/WebNav";
import axios from "axios";
import config from "../config";
import "./style/cinemas.css";

function Cinemas() {
  const { id } = useParams();
  const [cinemas, setCinemas] = useState([]);
  const [prev, setPrev] = useState([]);
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedCinema, setEditedCinema] = useState(null);
  const [archiving, setArchiving] = useState(false);
  const navigate = useNavigate();
  const [editedCinemaData, setEditedCinemaData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedCinemaBranches, setSelectedCinemaBranches] = useState([]);
  // console.log(branches);

  // Open the modal
  const openModal = (cinema) => {
    let url = config.BRANCH_BASE_URL + "?cinema=" + cinema._id;

    axios
      .get(url)
      .then((result) => {
        // console.log("Branch Data:", result.data); // Log the branch data
        setBranches(result.data);
      })
      .catch((error) => {
        console.error("Error fetching branch data:", error); // Log any errors
      });

    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fetch cinema data based on the ID parameter
  const handleFindCinemas = (e) => {

    let _cinemas = [...prev];
    let cinema = _cinemas.filter(x => x.name === e)
   
    if(cinema){
      setCinemas([...cinema])
    }
    else{
      setCinemas([...cinemas])
    }
  };

  // Set the edited cinema and its data for editing
  const handleEditCinema = (cinema) => {
    setEditedCinema(cinema);
    setEditedCinemaData({
      _id: cinema._id,
      name: cinema.name,
      email: cinema.email,
      phone: cinema.phone,
    });
  };

  // Handle input changes for editing cinema data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCinemaData({
      ...editedCinemaData,
      [name]: value,
    });
  };

  // Save changes to edited cinema data
  const handleSaveCinema = () => {
    const editUrl = `${config.CINEMA_BASE_URL}/${editedCinemaData._id}`;
    axios
      .put(editUrl, editedCinemaData)
      .then((response) => {
        let data = response.data?.data;
        let _cinemas = [...cinemas];

        let d = _cinemas.find((x) => x._id === data._id);
        d.name = data.name
        d.phone = data.phone;
        d.email = data.email;

        setCinemas([..._cinemas]);
        setPrev([..._cinemas])
        alert("Edit completed");
        //editedCinemaData
        setEditedCinemaData({
          _id: "",
          name: "",
          email: "",
          phone: "",
        });
      })
      .catch((error) => {
        console.error("Error updating cinema data:", error);
      });
  };

  // Archive a cinema
  const handleArchiveCinema = async (id) => {
    try {
      setArchiving(true);
      const response = await axios.put(
        config.CINEMA_BASE_URL + `/${id}/archived`
      );
      // console.log(response)
      // navigate("/web-cinemas");
      let _cinemas = [...cinemas];
      _cinemas = _cinemas.filter((x) => x._id !== id);
      setCinemas(_cinemas);
      setPrev(_cinemas);
    } catch (error) {
      // Handle error
    } finally {
      setArchiving(false);
    }
  };


  useEffect(() => {
    // Fetch cinemas and branches data when the component mounts
    axios.get(config.CINEMA_BASE_URL).then((result) => {
      setCinemas(result.data);
      setPrev(result.data);
    });
  }, []);

  // useEffect(() => {
  //   // Assuming this effect runs when showModal and editedCinema change
  //   if (showModal && branches) {
  //     axios
  //       .get(config.BRANCH_BASE_URL)
  //       .then((result) => {
  //         // console.log("Branch Data:", result.data);
  //         setBranches(result.data);
  //         // Filter branches for the selected cinema
  //         const cinemaBranches = result.data.filter(
  //           (branch) => branch.location_name === branches.name
  //         );
  //         setSelectedCinemaBranches(cinemaBranches);
  //         console.log(cinemaBranches);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching branch data:", error); // Log any errors
  //       });
  //   }
  // }, [showModal]);

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
                placeholder="Search Cinema by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span
                className="web-cinema-input-btn"
                onClick={()=>handleFindCinemas(searchTerm)}
              >
                Search
              </span>
            </div>
          </div>
          <div className="web-cinema-select">
            <div></div>
            <Link to="/web-admin/cinema" className="newBooking">
              Create Cinema
            </Link>
          </div>
          <div className="web-cinema-table-container">
            <table className="web-cinema-table">
              <thead>
                <tr className="web-cinema-table-header">
                  <th>S/N</th>
                  <th>Cinema Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cinemas
                  // .filter((cinema) =>
                  //   cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
                  // )
                  .map((cinema, index) => (
                    <tr key={cinema._id}>
                      <td>{index + 1}</td>
                      <td>{cinema.name}</td>
                      <td>{cinema.email}</td>
                      <td>{cinema.phone}</td>
                      <td className="actions">
                        <button
                          className="web-cinema-table-check-success"
                          onClick={() => openModal(cinema)}
                        >
                          Branches
                        </button>
                        <button
                          className="web-cinema-table-view"
                          onClick={() => handleEditCinema(cinema)}
                        >
                          Edit
                        </button>
                        <button
                          className="web-cinema-table-print"
                          onClick={() => handleArchiveCinema(cinema._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {showModal && branches && (
            <div className="modal">
              <div className="modal-content">
                {/* <h2>Branches for {branches[0]?.name}</h2> */}
                <div className="web-movies-table-container">
                  <table className="web-movies-table">
                    <thead>
                      <tr className="web-movies-table-header">
                        <th>S/N</th>
                        <th>Branch Name</th>
                        <th>Location Names</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.map((branch, index) => (
                        <tr key={branch._id}>
                          <td>{index + 1}</td>
                          <td>{branch.name}</td>
                          <td>{branch.location_id.name}</td>
                          <td>{branch.address}</td>
                          {/* <strong>Branch Name:</strong> {branch.name}
                      <br />
                      <strong>Location Name:</strong> {branch.location_id.name}
                      <br /> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <ul>
                  {branches.map((branch, index) => (
                    <li key={branch._id}>
                      <strong>Branch Name:</strong> {branch.name}
                      <br />
                      <strong>Location Name:</strong> {branch.location_id.name}
                      <br />
                    </li>
                  ))}
                </ul> */}
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {editedCinema && (
        <div className="edit-cinema-modal">
          <div className="edit-cinema-modal-content">
            <h2>Editing {editedCinema.name}</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Cinema Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedCinemaData.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedCinemaData.email}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedCinemaData.phone}
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

export default Cinemas;
