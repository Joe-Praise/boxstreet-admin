import React from "react";
import "../stylesTheater/addMovie.css";
import TheaterNav from "../Navigation/TheaterNav";

function AddMovie() {
  return (
    <div>
      <TheaterNav />
      <div className="addmovieForm">
        <form className="addmovieform">
          <h2>Add a New Movie</h2>
          <div class="addmovieform-group">
            <label for="">Movie Title:</label>
            <span></span>
            <input type="text" name="name" class="inputs" required />
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Casts:</label>
              <span></span>
              <input type="text" name="name" class="inputs" required />
            </div>
            <div className="addmovieformnameflex">
                <div class="addmovieform-group">
                <label for="">Language(s):</label>
                <span></span>
                <input type="text" name="name" class="inputs" required />
                </div>
                <div class="addmovieform-group">
                <label for="">Coming Soon:</label>
                <span></span>
                <select type="text" name="name" class="inputs" required>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                </div>
            </div>
          </div>

          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Genre:</label>
              <span></span>
              <input type="text" name="name" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Movie Duration:</label>
              <span></span>
              <input type="text" name="category" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Production Studio:</label>
              <span></span>
              <input type="text" name="name" class="inputs" required />
            </div>
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">PG Rating:</label>
              <span></span>
              <input type="number" name="price" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Release Date:</label>
              <span></span>
              <input type="number" name="quantity" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Movie Director:</label>
              <span></span>
              <input type="number" name="quantity" class="inputs" required />
            </div>
          </div>
          <div className="addmovieformnameflex">
            <div class="addmovieform-group">
              <label for="">Trailer Link:</label>
              <span></span>
              <input type="link" name="quantity" class="inputs" required />
            </div>
            <div class="addmovieform-group">
              <label for="">Movie Poster:</label>
              <span></span>
              <input type="file" name="quantity" class="inputs" required />
            </div>
          </div>
          <div class="addmovieform-group">
            <button class="counterform-btn">Upload Movie</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
