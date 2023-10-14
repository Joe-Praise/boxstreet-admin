import React from "react";
import "../stylesTheater/changepass.css";
import TheaterNav from "../Navigation/TheaterNav";
import { Link } from "react-router-dom";
// import RiArrowGoBackFill from 'react-icons'

function ChangePass() {
  return (
    <div>
      <TheaterNav />
      <div className="cPassForm">
        <div className="bhBack">
            <Link to='/change-password'>
                {/* <RiArrowGoBackFill /> */}
                <p>Back to Profile</p>
            </Link>
        </div>
        <form className="cPassform">
          <h2>Change Password</h2>
          <div class="cPassform-group">
            <label for="">Email:</label>
            <span></span>
            <input type="email" name="name" class="inputs" required />
          </div>
          <div class="cPassform-group">
            <label for="">Current Password:</label>
            <span></span>
            <input type="password" name="name" class="inputs" required />
          </div>
          <div class="cPassform-group">
            <label for="">New Password:</label>
            <span></span>
            <input type="password" name="name" class="inputs" required />
          </div>
          <section>*NOTE: Password should be at least 8 characters</section>
          <div class="cPassform-group">
            <button class="cPassform-btn">Submit Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
