import "./account.css";
import Topnav from "../Cinema_Admin/Cinema-Navigation/Topnav/Topnav";
function Account(){
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
                  <th>Amount</th>
                  <th>Booking Type</th>
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
        <td>20000</td>
        <td>Online</td>
        <td>All</td>
        <td>56</td>
        <td>21/10/23</td>

    </tr>
    <tr>
    <td>2</td>
        <td>Kubwa</td>
        <td>Gradi</td>
        <td>50000</td>
        <td>Onsite</td>
        <td>All</td>
        <td>56</td>
        <td>21/11/23</td>

    </tr>
    <tr>
    <td>3</td>
        <td>Dei-Dei</td>
        <td>Trail</td>
        <td>20000</td>
        <td>Online</td>
        <td>All</td>
        <td>56</td>
        <td>21/10/23</td>

    </tr>
    <tr>
    <td>4</td>
        <td>Jabi</td>
        <td>StreetBox</td>
        <td>20000</td>
        <td>Onsite</td>
        <td>All</td>
        <td>56</td>
        <td>21/10/23</td>

    </tr>
</tbody>
    </table>

</div>
        </div>
    )
}
export default Account