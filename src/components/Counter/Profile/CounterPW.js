import React from "react";
import '../stylesCounter/cchangePass.css'
import CounterNav from "../Navigation/CounterNav";

function CounterPW() {
  return (
    <div>
        <CounterNav />
        <div className="ccPassForm">
        <form className="ccPassform">
            <h2>Change Password</h2>
            <div class="ccPassform-group">
            <label for="">Email:</label>
            <span></span>
            <input type="email" name="name" class="inputs" required />
            </div>
            <div class="ccPassform-group">
            <label for="">Current Password:</label>
            <span></span>
            <input type="password" name="name" class="inputs" required />
            </div>
            <div class="ccPassform-group">
            <label for="">New Password:</label>
            <span></span>
            <input type="password" name="name" class="inputs" required />
            </div>
            <section>*NOTE: Password should be at least 8 characters</section>
            <div class="ccPassform-group">
            <button class="ccPassform-btn">Submit Password</button>
            </div>
        </form>
        </div>
    </div>
  );
}

export default CounterPW;
