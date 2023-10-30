import "./viewusers.css"
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;
function SingleUser() {
    const [updatemode, setUpdatemode] = useState(false);
    const [cinema, setCinema] = useState();
    const [branch, setBranch] = useState();
    let {id} = useParams();
    const user_id = localStorage.getItem("user_id")
    const [cinemaname, setCinemaname] =useState();
    const [username, setUsername] =useState();
    const [email, setEmail] =useState();
    const [phones, setPhones] =useState();
    const[fullname, setFullname]=useState();
    const[role, setRole]=useState();
    const[phone, setPhone]=useState();
useEffect(()=>{
// let user_url =`${BASE_URL}/api/v1/managements/${user_id}`/+"user-info"
const user_url =config.MANAGEMENT_BASE_URL+"/"+ id+"/user-info"
axios.get(user_url)
.then((res)=>{
   let data =res?.data;
   console.log(data)
   setUsername(data)
   setFullname(data?.fullname)
   setRole(data?.role)
   setEmail(data?.email)
   setPhone(data?.phone)
})
},[id])

const handleUpdate = async()=>{
    try {
    let manager_url =`${BASE_URL}/api/v1/managements/${id}` 
    await axios.put(manager_url,{
      fullname,
      role,
      phone,
      email  
    })

    } catch (error) {
       console.log(error) 
    }
}
    return (
        <div className="cinema-branch-container">
            <Topnav />
            <div className="cinema-branch-main">

                <div className="cinema-branch-card">
                    <div className="cinema-branch-texts">
                      
                        <div className="cinema-branch-text">
                            <h3>Full Name</h3>
                            {updatemode ? <input
                                className="edit-input-box3"
                                type="text"
                                name="fullname"
                                value={fullname}
                                onChange={(e)=>setFullname(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span3">{username?.fullname}</span>
                            )

                            }

                        </div>

                        <div className="cinema-branch-text">
                            <h3>Role</h3>

                            {updatemode ? <input
                                className="edit-input-box4"
                                type="text"
                                name="role"
                                value={role}
                                onChange={(e)=>setRole(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span4">{username?.role+" Admin" }</span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <h3>email</h3>
                            {updatemode ? <input
                                className="edit-input-box5"
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span5">{username?.email}</span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <h3>Phone</h3>
                            {updatemode ? <input
                                className="edit-input-box5"
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span5">{username?.phone}</span>
                            )

                            }

                        </div>
                        {updatemode && (
                            <div className="cinema-branch-update-btn">
                                <button onClick={handleUpdate}>UPDATE BRANCH</button>
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
export default SingleUser