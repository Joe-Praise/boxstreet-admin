import React from 'react'
import '../stylesTheater/addcounter.css'
import TheaterNav from '../Navigation/TheaterNav'

function AddCounter() {
  return (
    <div>
    <TheaterNav />
    <div className="addcounterForm">
      <form className="addtheaaterform">
        <h2>Register a Counter</h2>
        <div className="addcounterformnameflex">
          <div class="addtheaaterform-group">
            <label for="">First Name:</label>
            <span></span>
            <input type="text" name="name" class="inputs" required />
          </div>
          <div class="addcounterform-group">
            <label for="">Last Name:</label>
            <span></span>
            <input type="text" name="category" class="inputs" required />
          </div>
        </div>
        <div className="addcounterformnameflex">
          <div class="addtheaaterform-group">
            <label for="">Phone Number:</label>
            <span></span>
            <input type="text" name="price" class="inputs" required />
          </div>
          <div class="addcounterform-group">
            <label for="">Email:</label>
            <span></span>
            <input type="text" name="quantity" class="inputs" required />
          </div>
        </div>
          <div class="addcounterform-group">
            <label for="">Residential Address:</label>
            <span></span>
            <input type="number" name="quantity" class="inputs" required />
          </div>
        <div className="addcounterformnameflex">
          <div class="addtheaaterform-group">
            <label for="">Username:</label>
            <span></span>
            <input type="number" name="quantity" class="inputs" required />
          </div>
          <div class="addcounterform-group">
            <label for="">Password:</label>
            <span></span>
            <input type="number" name="quantity" class="inputs" required />
          </div>
        </div>
        <div class="addcounterform-group">
          <button class="counterform-btn">Register Counter</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AddCounter