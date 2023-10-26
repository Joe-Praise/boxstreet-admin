import "./transaction.css";
import CounterNav from "../../Counter/Navigation/CounterNav";
import Topnav from "../Cinema-Navigation/Topnav/Topnav";
function Transaction(){
    return(
        <div className="account-main">
            <Topnav/>
<h2>Transaction</h2>
<div className="account-table-container">
    <table className="account-table">
        <thead>
            <tr className="accoun-table-header">
            <th>S/N</th>
                  <th>Branch</th>
                  <th>Theater</th>
                  <th>total Amount</th>
                  <th>Booking Type</th>
                  <th>Currency</th>
                  <th>Date</th>
                 
            </tr>
        </thead>
<tbody>
    <tr>
    <td>1</td>
        <td>Wuse</td>
        <td>MandaBox</td>
        <td>20000</td>
        <td>Online</td>
        <td>NIGN</td>
        <td>21/10/23</td>

    </tr>   
</tbody>
    </table>

</div>
        </div>
    )
}
export default Transaction