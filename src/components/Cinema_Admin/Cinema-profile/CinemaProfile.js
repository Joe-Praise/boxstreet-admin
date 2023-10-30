import "./cinemaprofile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import config from "../../config";
import { useParams } from "react-router-dom";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";
let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;
const user_id = localStorage.getItem("user_id")
function CinemaProfile() {
    const [updatemode, setUpdatemode] = useState(false);
    const [cinemaAdmin, setCinemaAdmin] = useState("");
    const [email, setEmail] = useState();
    const [fullname, setFullname] = useState();
    const [role, setRole] = useState();
    const [phone, setPhone] = useState();
    const { id } = useParams();
    useEffect(() => {
        const profile_url = config.MANAGEMENT_BASE_URL + "/" + user_id + "/user-info"
        axios.get(profile_url).then((resp) => {
            let data = resp?.data;
            setFullname(data?.fullname)
            setRole(data?.role)
            setEmail(data?.email)
            setPhone(data?.phone)
            setCinemaAdmin(data)
        })
    }, [user_id]);
    const handleUpdate = async () => {
        try {
            let manager_url = `${BASE_URL}/api/v1/managements/${user_id}`
            await axios.put(manager_url, {
                fullname,
                role,
                phone,
                email
            }).then((resp)=>{
                let data = resp?.data
                if (resp?.data._id) {
                    alert("User Updated")
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
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
                            <h3>Name</h3>
                            {updatemode ? <input
                                className="edit-input-box1-1"
                                type="text"
                                name="fullname"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span1-1">{cinemaAdmin.fullname}</span>
                            )

                            }

                        </div>

                        <div className="cinema-branch-text">
                            <h3>Role</h3>

                            {updatemode ? <input
                                className="edit-input-box2-1"
                                type="text"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span2-1">{cinemaAdmin.role}</span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <h3>Email</h3>
                            {updatemode ? <input
                                className="edit-input-box3-1"
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span3-1">{cinemaAdmin.email}</span>
                            )

                            }

                        </div>

                        <div className="cinema-branch-text">
                            <h3>Phone</h3>
                            {updatemode ? <input
                                className="edit-input-box4-1"
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span4-1">{cinemaAdmin.phone}</span>
                            )

                            }

                        </div>
                        {updatemode && (
                            <div className="cinema-branch-update-btn">
                                <button onClick={handleUpdate}>UPDATE USER</button>
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
