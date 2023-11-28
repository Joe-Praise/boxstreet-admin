import "./transaction.css";
import CounterNav from "../../Counter/Navigation/CounterNav";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
import { useEffect, useState } from "react";
import axios from "axios";
import Config from "../../config";
function Transaction(){
  const cinema = localStorage.getItem("cinema")
    const [transaction, setTransaction]= useState([]);
    const getTransaction = async () => {
        try {
          const response = await axios.get(
            Config.TRANSACTION_BASE_URL + "/summary"
          );
          const data = response.data.summary;
          setTransaction(data);
        } catch (err) {
          console.log(err.message);
        }
      };
    
      useEffect(() => {
        getTransaction();
      }, []);
    return(
        <div className="account-main">
            <Topnav/>
<h2>Transaction</h2>
<div className="account-table-container">
<h2 className="cinema-welcome-msg">{"Welcome to" + "-" + cinema}</h2>
    <table className="account-table">
        <thead>
            <tr className="accoun-table-header">
            <th>S/N</th>
                  <th>Branch</th>
                  <th>Currency</th>
                  <th>total Amount</th>
                  <th>Average</th>
                  <th>Date</th>
                 
            </tr>
        </thead>
<tbody>
    {transaction.map((trans, i)=>{
        return(
            <tr key={trans._id}>
            <td>{i+1}</td>
                <td>{trans?._id.branch_id.name}</td>
                <td>NGN</td>
                <td>₦{trans?.amount?.toLocaleString()}</td>
                <td>{trans.avgAmount?.toLocaleString()}</td>
                <td>{trans?._id?.day}/{trans?._id?.month}/{trans?._id?.year}</td>
            </tr> 
        )
    })}
     
</tbody>
    </table>

</div>
        </div>
    )
}
export default Transaction