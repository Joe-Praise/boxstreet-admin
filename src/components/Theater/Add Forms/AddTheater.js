import React from "react";
import "../stylesTheater/addtheater.css";
import TheaterNav from "../Navigation/TheaterNav";

function AddTheater() {
  return (
    <div>
      <TheaterNav />
      <div className="addtheaaterForm">
        <form className="addtheaaterform">
          <h2>Add a New Theater</h2>
          <div className="addtheaaterformnameflex">
            <div class="addtheaaterform-group">
              <label for="">Cinema Name:</label>
              <span></span>
              <input type="text" name="name" class="inputs" required />
            </div>
            <div class="addtheaaterform-group">
              <label for="">Theater:</label>
              <span></span>
              <input type="text" name="category" class="inputs" required />
            </div>
          </div>
          <div className="addtheaaterformnameflex">
            <div class="addtheaaterform-group">
              <label for="">Seating Capacity:</label>
              <span></span>
              <input type="number" name="price" class="inputs" required />
            </div>
            <div class="addtheaaterform-group">
              <label for="">Rows:</label>
              <span></span>
              <input type="number" name="quantity" class="inputs" required />
            </div>
            <div class="addtheaaterform-group">
              <label for="">Columns:</label>
              <span></span>
              <input type="number" name="quantity" class="inputs" required />
            </div>
          </div>
          <div className="addtheaaterformnameflex">
            <div class="addtheaaterform-group">
              <label for="">Col-matrix 1:</label>
              <span></span>
              <input type="number" name="quantity" class="inputs" required />
            </div>
            <div class="addtheaaterform-group">
              <label for="">Col-matrix 2:</label>
              <span></span>
              <input type="number" name="quantity" class="inputs" required />
            </div>
          </div>
          <div class="addtheaaterform-group">
            <button class="counterform-btn">Register Theater</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTheater;
