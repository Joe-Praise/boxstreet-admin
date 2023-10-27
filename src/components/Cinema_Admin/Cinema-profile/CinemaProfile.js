import "./cinemaprofile.css";
import {useState, useEffect } from "react";
import axios from "axios";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;

function CinemaProfile(){
    const [updatemode, setUpdatemode] = useState(false);
    
    return(
        <div className="cinema-branch-container">
            <Topnav />
            <div className="cinema-branch-main-p">
              <div className="cinema-branch-img-cont">
                <div className="cinema-branch-img">

                </div>
                </div>
                <div className="cinema-branch-card-p">
                    <div className="cinema-branch-texts">
                      
                        <div className="cinema-branch-text">
                            <p>Opening</p>
                            {updatemode ? <input
                                className="edit-input-box3"
                                type="text"
                                name="opening"
                                // value={opening}
                                // onChange={(e)=>setOpening(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span3"></span>
                            )

                            }

                        </div>

                        <div className="cinema-branch-text">
                            <p>Closing</p>

                            {updatemode ? <input
                                className="edit-input-box4"
                                type="text"
                                name="closing"
                                // value={closing}
                                // onChange={(e)=>setClosing(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span4"></span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <p>Phone</p>
                            {updatemode ? <input
                                className="edit-input-box5"
                                type="text"
                                name="phones"
                                // value={phones}
                                // onChange={(e)=>setPhones(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span5">Name</span>
                            )

                            }

                        </div>
                        {updatemode && (
                            <div className="cinema-branch-update-btn">
                                {/* <button onClick={handleUpdate}>UPDATE BRANCH</button> */}
                            </div>
                        )

                        }

                        <div className="cinema-branch-btn">
                            {updatemode ? ("") : <div className="cinema-branch-edtbtn">
                                <button onClick={() => setUpdatemode(true)}>Edit</button>
                            </div>

                            }
                           
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default CinemaProfile
