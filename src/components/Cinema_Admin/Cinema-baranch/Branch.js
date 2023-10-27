import "./branch.css";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;
function Branch() {
    const [updatemode, setUpdatemode] = useState(false);
    const [cinema, setCinema] = useState();
    const [branch, setBranch] = useState();
    let {id} = useParams();

    const [cinemaname, setCinemaname] =useState();
    const [branchname, setBranchname] =useState();
    const [opening, setOpening] =useState();
    const [closing, setClosing] =useState();
    const [phones, setPhones] =useState();

useEffect(()=>{
let branch_url =`${BASE_URL}/api/v1/branches/${id}`
axios.get(branch_url)
.then((res)=>{
   let data =res?.data;
   console.log(data._id)
   localStorage.setItem("mybranch_id", data._id)
   setBranch(data)
   setOpening(data.opening)
   setClosing(data.closing)
   setPhones(data.phones)
})
},[id])

const handleUpdate = async()=>{
    try {
    let branch_url =`${BASE_URL}/api/v1/branches/${id}` 
    await axios.put(branch_url,{
      opening,
      closing,
      phones  
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
                            <h3>Opening</h3>
                            {updatemode ? <input
                                className="edit-input-box3"
                                type="text"
                                name="opening"
                                value={opening}
                                onChange={(e)=>setOpening(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span3">{branch?.opening}</span>
                            )

                            }

                        </div>

                        <div className="cinema-branch-text">
                            <h3>Closing</h3>

                            {updatemode ? <input
                                className="edit-input-box4"
                                type="text"
                                name="closing"
                                value={closing}
                                onChange={(e)=>setClosing(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span4">{branch?.closing}</span>
                            )

                            }

                        </div>
                        <div className="cinema-branch-text">
                            <h3>Phone</h3>
                            {updatemode ? <input
                                className="edit-input-box5"
                                type="text"
                                name="phones"
                                value={phones}
                                onChange={(e)=>setPhones(e.target.value)}
                            /> : (
                                <span className="cinema-branch-text-span5">{branch?.phones}</span>
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
export default Branch