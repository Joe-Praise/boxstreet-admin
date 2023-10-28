import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import WebNav from "./Navigation/WebNav";
import Loading from "../Loading";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://boxstreet.onrender.com"
    : "http://localhost:5000";

function CreateCinema() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [cinemaData, setCinemaData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");

  const validateImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setImageError("Invalid file type. Please select a valid image file.");
      return false;
    }

    if (file.size > maxSize) {
      setImageError("Image file is too large. Please choose a smaller image.");
      return false;
    }
    // if (!file.image) {
    //   setImageError("Please choose an image.");
    //   return false;
    // }

    setImageError("");
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!validateImage(file)) {
        return;
      }

      setCinemaData({ ...cinemaData, image: file });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
   

    if (!cinemaData.name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (
      !cinemaData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cinemaData.email)
    ) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!cinemaData.phone) {
      errors.phone = "Phone is required";
      isValid = false;
    }

    // if (!cinemaData.image) {
    //   errors.file = "Image is required";
    //   isValid = false;
    // }
   
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (validateForm()) {
      try {
        let file = cinemaData.image;
        cinemaData.image = null;

        const formData = new FormData();
        formData.append("image", file);

        const apiEndpoint = `${BASE_URL}/api/v1/cinemas`;

        const response = await axios.post(apiEndpoint, cinemaData);

        console.log("Response:", response.data);

        if (response.data) {
          const cinemaId = response.data._id;
          const resourceEndpoint = `${BASE_URL}/api/v1/cinemas/${cinemaId}/resources`;

          console.log(response.data);
          axios.put(resourceEndpoint, formData).then(() => {
            toast.success("Cinema created successfully");
            navigate("/web-admin/add-user");
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error creating Cinema", error.response.data.error);
        toast.error("Error creating Cinema");
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="counterBooking">
      <div>
        <WebNav />
      </div>
      <div className="counterBookingFlex">
        <div className="counterBookingForm">
          <form className="counterform" onSubmit={handleSubmit}>
            <h1>Cinema Registration</h1>

            <div className="counterform-group">
              <label>Cinema Name</label>
              <input
                type="text"
                name="name"
                value={cinemaData.name}
                onChange={(e) => {
                  setCinemaData({ ...cinemaData, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="counterform-group">
              <label>Cinema Email</label>
              <input
                type="email"
                name="email"
                value={cinemaData.email}
                onChange={(e) => {
                  setCinemaData({ ...cinemaData, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="counterform-group">
              <label>Cinema Phone Number</label>
              <input
                type="text"
                name="phone"
                value={cinemaData.phone}
                onChange={(e) => {
                  setCinemaData({ ...cinemaData, phone: e.target.value });
                  setErrors({ ...errors, phone: "" });
                }}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            <div className="counterform-group">
              <label>Upload Image</label>
              <input type="file" name="image" onChange={handleImageChange} />
              {imageError && <p className="error-message">{imageError}</p>}
            </div>

            <div className="addcounterform-group">
              <button className="counterform-btn" type="submit">
              {loading ? <Loading/>: "Create Cinema"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCinema;
