import "./account.css";
import Topbar from "./Navigation/Acct-Topnav";
function BranchAcct() {
    return (
        <div className="account-main">
            <Topbar />
            <h2>Transaction</h2>
            <div className="account-table-container">
                <table className="account-table">
                    <thead>
                        <tr className="accoun-table-header">
                            <th>S/N</th>
                            <th>Branch</th>
                            <th>Theater</th>
                            <th>Total Amount</th>
                            <th>Currency</th>
                            <th>Booking Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Wuse</td>
                            <td>theater</td>
                            <td>20000</td>
                            <td>NIGN</td>
                            <td>onsite</td>
                            <td>21/10/23</td>

                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default BranchAcct