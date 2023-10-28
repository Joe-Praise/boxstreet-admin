import React, { useEffect, useState } from 'react';
import WebNav from './Navigation/WebNav';
import { Link, useNavigate } from 'react-router-dom';
import '../Theater/stylesTheater/addcounter.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import config from '../config';
import Loading from '../Loading';

function CreateLocation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
  });

  const [location, setLocation] = useState({});

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Location Name is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        console.log(formData);
        const response = await axios.post(
          `${config.LOCATION_BASE_URL}`,
          formData
        );
        setLoading(false);
        toast.success('Location created successfully');
        navigate('/web-view-location');
      } else {
        toast.error(
          'Please fill in all required fields and correct any validation errors.'
        );
      }
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
 
    axios.get(config.LOCATION_BASE_URL).then((result) => {
        setLocation(result.data);
    });

  }, []);

  return (
    <div>
      <WebNav />
      <div className="addcounterForm">
        <form onSubmit={handleSignUp} className="addtheaaterform">
          <h2>Create Location</h2>
          <div className="addcounterformnameflex">
            <div className="addtheaaterform-group">
              <label htmlFor="name">Name:</label>
              <span></span>
              <input
                type="text"
                name="name"
                className="inputs"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className="error-message">{formErrors.name}</div>
              )}
            </div>
          </div>
          <div className="addcounterform-group">
            <button type="submit" className="counterform-btn">
            {loading ? <Loading/> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLocation;
