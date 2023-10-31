import React, { useEffect, useState } from "react";
import WebNav from "./Navigation/WebNav";
import "./style/archives.css";
import axios from "axios";
import config from "../config";

// function Archives() {
//   const [cinemas, setCinemas] = useState([]);

//   useEffect(() => {
//     // Fetch cinemas and branches data when the component mounts
//     axios.get(config.CINEMA_BASE_URL + "/archived").then((result) => {
//       setCinemas(result.data);
//     });
//   }, []);

//   return (
//     <div className="counterBooking">
//        <div>
//        <WebNav/>
//        </div>
//         <div className="web-cinema">
//         <div className="web-cinema-page">
//           <div className="web-cinema-page-top">
//         <div className="web-cinema-table-container">
//             <table className="web-cinema-table">
//               <thead>
//                 <tr className="web-cinema-table-header">
//                   <th>S/N</th>
//                   <th>Cinema Name</th>
//                   <th>Email</th>
//                   <th>Phone Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cinemas.map((cinema, index) => (
//                     <tr key={cinema._id}>
//                       <td>{index + 1}</td>
//                       <td>{cinema.name}</td>
//                       <td>{cinema.email}</td>
//                       <td>{cinema.phone}</td>

//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         </div>
//         </div>
//     </div>
//   )
// }

function Archives() {
  return <></>;
}
export default Archives;
