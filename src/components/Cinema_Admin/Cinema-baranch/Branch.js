import "./branch.css";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import { useState } from "react";
function Branch() {
    const [updatemode, setUpdatemode] = useState(false);
    const [cinema, setCinema] = useState();
    const [branch, setBranch] = useState();
    return (
        <div className="cinema-branch-container">
            <Topnav />
            <div className="cinema-branch-main">

                <div className="cinema-branch-card">
                    <div className="cinema-branch-texts">
                        <div className="cinema-branch-text">
                            <p>Cinema</p>
                            {updatemode ? <input
                                className="edit-input-box1"
                                type="text"
                            /> : (
                                <span className="cinema-branch-text-span1">Brooklyn</span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <p>Branch</p>

                            {updatemode ? <input
                                className="edit-input-box2"
                                type="text"
                            /> : (
                                <span className="cinema-branch-text-span2">Apocalyps</span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <p>Opening</p>
                            {updatemode ? <input
                                className="edit-input-box3"
                                type="text"
                            /> : (
                                <span className="cinema-branch-text-span3">12:00am</span>
                            )

                            }

                        </div>

                        <div className="cinema-branch-text">
                            <p>Closing</p>

                            {updatemode ? <input
                                className="edit-input-box4"
                                type="text"
                            /> : (
                                <span className="cinema-branch-text-span4">12:00pm</span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <p>Phone</p>
                            {updatemode ? <input
                                className="edit-input-box5"
                                type="text"
                            /> : (
                                <span className="cinema-branch-text-span5">12345678910</span>
                            )

                            }

                        </div>
                        {updatemode && (
                            <div className="cinema-branch-update-btn">
                                <button>UPDATE BRANCH</button>
                            </div>
                        )

                        }

                        <div className="cinema-branch-btn">
                            {updatemode ? ("") : <div className="cinema-branch-edtbtn">
                                <button onClick={() => setUpdatemode(true)}>Edit</button>
                            </div>

                            }
                            {updatemode ? ("") : <div className="cinema-branch-deletebtn">
                                <button>Delete</button>
                            </div>}

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Branch