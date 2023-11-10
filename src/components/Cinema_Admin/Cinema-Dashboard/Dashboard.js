import "./dashboard.css";
import CounterNav from "../../Counter/Navigation/CounterNav";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import axios from "axios";
import { useState, useEffect } from "react";
import config from "../../config";
import Loading from "../../Loading"
import DropDown from "../DropDown/DropDown";
let MODE = "PROD";
let LOCAL = "http://localhost:5000";
let ONLINE = "https://boxstreet.onrender.com";

let BASE_URL = MODE === "PROD" ? ONLINE : LOCAL;
function Dashboardc(){
    // let username = localStorage.getItem("username")
    // console.log(username)
    const branch_id = localStorage.getItem("branch_id");
    const cinema_id = localStorage.getItem("cinema_id");
    const cinema = localStorage.getItem("cinema");
    const [cinemas, setCinemas]= useState([]);
    const [theaters1, setTheaters1]= useState([]);
    const [theaters2, setTheaters2]= useState([]);
    const [branches, setBranches]= useState([]);
    const [movies, setMovies]= useState([]);
    const [summary, setSummary] =useState({});
    const [loading, setloading] = useState(true)
    useEffect(()=>{
        let branch_url =`${BASE_URL}/api/v1/branches`;
        let theater1_url =`${BASE_URL}/api/v1/theaters?cinema_id=${cinema_id}`;
        let theater2_url =`${BASE_URL}/api/v1/theaters?branch_id=${branch_id}`;
        let movie_url = `${BASE_URL}/api/v1/movies`;
        axios.get(branch_url)
        .then((res)=>{
            setloading(false)
           let data =res?.data;
          
           setBranches(data)
        })
    axios.get(theater1_url)
    .then((res)=>{
        let data =res?.data
        setloading(false)
        setTheaters1(data)
    });

    axios.get(theater2_url)
    .then((res)=>{
        let data =res?.data
        setloading(false)
        setTheaters2(data)
    });
    axios.get(movie_url)
    .then((res)=>{
        let data =res?.data
        setloading(false)
        setMovies(data)
    });
    axios.get(config.ADMIN_BASE_URL).then((result) => {
        setloading(false)
        setSummary(result.data);
      });
        },[])
    return(
        <div className="cinema-dash-container">
            
            <Topnav/>
           
           <div className="cinema-dash-main">
           {/* <div className="drop-down">
                <DropDown/>
            </div> */}
         <div className="cinema-dash-top-cont">
            <h2>{"Welcome to " + cinema}</h2>
         </div>

            <div className="cinema-dash-top">
            
                <div className="cinema-dash-col">
                    <h4>Branches</h4>
                    {loading === true?(<div className="cinema-loader"><p><Loading/></p></div>):
                    (<span>{branches.length}</span>)}
                    
                </div>
                <div className="cinema-dash-col">
                    <h4>Theater</h4>
                    {loading === true?(<div className="cinema-loader"><p><Loading/></p></div>):
                    (<span>{theaters1.length}</span>)}
                   
                </div>
                <div className="cinema-dash-col">
                    <h4>Movies</h4>
                    {loading === true?(<div className="cinema-loader"><p><Loading/></p></div>):
                    (<span>{movies.length}</span>)}
                 
                </div>
                <div className="cinema-dash-col">
                <h4>Counters</h4>
                {loading === true?(<div className="cinema-loader"><p><Loading/></p></div>):
                    (<span>{summary.counter_admin}</span>)}
            
            </div>
            <div className="cinema-dash-col">
                <h4>Screens</h4>
                {loading === true?(<div className="cinema-loader"><p><Loading/></p></div>):
                    (<span>{summary.screens}</span>)}
              
            </div>
            <div className="cinema-dash-col">
                <h4>Seats</h4>
                {loading === true?(<div className="cinema-loader"><p><Loading/></p></div>):
                    (<span>{summary.seat}</span>)}
            </div>
           
            
            </div>
            {/* <div className="cinema-dash-bottom">
            <table className="dash-table">
        <thead>
            <tr className="dash-table-header">
            <th>S/N</th>
                  <th>Branch</th>
                  <th>Theater</th>
                  <th>Movies Shown</th>
                  <th>Attendance</th>
                  <th>Type</th>
                  <th>Number of Seat</th>
                  <th>Date</th>
                 
            </tr>
        </thead>
<tbody>
    <tr>
    <td>1</td>
        <td>Wuse</td>
        <td>MandaBox</td>
        <td>2</td>
        <td>500</td>
        <td>All</td>
        <td>56</td>
        <td>21/10/23</td>

    </tr>
    <tr>
    <td>2</td>
        <td>Kubwa</td>
        <td>Gradi</td>
        <td>5</td>
        <td>200</td>
        <td>All</td>
        <td>56</td>
        <td>21/11/23</td>

    </tr>
    <tr>
    <td>3</td>
        <td>Dei-Dei</td>
        <td>Trail</td>
        <td>20</td>
        <td>1000</td>
        <td>All</td>
        <td>56</td>
        <td>21/10/23</td>

    </tr>
    <tr>
    <td>4</td>
        <td>Jabi</td>
        <td>StreetBox</td>
        <td>14</td>
        <td>59</td>
        <td>All</td>
        <td>56</td>
        <td>21/10/23</td>

    </tr>
</tbody>
    </table>
            </div> */}
            </div> 
        </div>
    )
}
export default Dashboardc
