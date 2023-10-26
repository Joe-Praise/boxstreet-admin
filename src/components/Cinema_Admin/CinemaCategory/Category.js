import React, { useEffect, useState } from "react";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import "./category.css";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function Category() {
  const [editCategory, setEditCategory] = useState(null);

  const handleEditButtonClick = (categoryId, category) => {
    setEditCategory(category);
  };

  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name,
        price: editCategory.price,
      });
    }
  }, [editCategory]);

  let cinema_id = localStorage.getItem("cinema_id");
  const [formData, setFormData] = useState({
    cinema_id,
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    let category_table = `${BASE_URL}/api/v1/categories?cinema_id=${cinema_id}`;
    axios
      .get(category_table)
      .then((res) => {
        let categories = res.data;
        let data = categories?.map((category) => {
          return {
            id: category._id,
            name: category.name,
            price: category.price,
          };
        });
        setCategory([...data]);
      })
      .catch((error) => {
        console.error("Error fetching theater data:", error);
      });
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (editCategory) {
      // If editCategory is not null, it means we are in edit mode
      axios
        .put(`${BASE_URL}/api/v1/categories/${editCategory.id}`, formData)
        .then((res) => {
          if (res.data.status === "success") {
            alert("Category Has been Edited");
            setEditCategory(null); // Clear the editCategory state after editing
          }
        })
        .catch((error) => {
          console.error("Error editing category:", error);
        });
    } else {
      // If editCategory is null, it means we are in create mode
      axios
        .post(`${BASE_URL}/api/v1/categories`, formData)
        .then((res) => {
          if (res.data.status === "success") {
            alert("Category Has been Created");
          }
        })
        .catch((error) => {
          console.error("Error creating category:", error);
        });
    }
  };

  const handleDeleteButtonClick = (categoryId) => {
    axios
      .delete(`${BASE_URL}/api/v1/categories/${categoryId}`)
      .then((response) => {
        console.log("Category successfully deleted");

        setCategory((prevCategoryTable) => {
          const updatedCategoryTable = prevCategoryTable.filter(
            (category) => category.id !== categoryId
          );
          return updatedCategoryTable;
        });
      })
      .catch((error) => {
        console.error("Error Deleting Category", error);
      });
  };

  return (
    <div>
      <Topnav />
      <div className="addcategoryForm">
        <form onSubmit={handleSignUp} className="addtheaaterform">
          <h2>{editCategory ? "Edit Category" : "Register a New Category"}</h2>
          <div className="addcounterform-group">
            <label htmlFor="">Category:</label>
            <span></span>
            <input
              type="text"
              name="name"
              className="inputs"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="addtheaaterform-group">
            <label htmlFor="">Price:</label>
            <span></span>
            <input
              type="text"
              name="price"
              className="inputs"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="addcounterform-group">
            <button className="counterform-btn">
              {editCategory ? "Edit Category" : "Create Category"}
            </button>
          </div>
        </form>
        <div>
          <div className="category-table-container">
            <table className="category-table">
              <thead>
                <tr className="category-table-header">
                  <th>S/N</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {category.map((tableCategory, index) => (
                  <tr key={tableCategory.id}>
                    <td>{index + 1}</td>
                    <td>{tableCategory.name}</td>
                    <td>{tableCategory.price}</td>
                    <td
                      className="vt-table-edit"
                      onClick={() =>
                        handleEditButtonClick(tableCategory.id, category)
                      }
                    >
                      Edit
                    </td>

                    <td
                      className="vt-table-delete"
                      onClick={() => handleDeleteButtonClick(tableCategory.id)}
                    >
                      Delete
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

export default Category;
