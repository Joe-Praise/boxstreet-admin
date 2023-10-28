import { useEffect, useState } from "react";
import "./account.css";
import Topbar from "./Navigation/Acct-Topnav";
import axios from "axios";
import Config from "../config";
function Account() {
  const [summary, setSummary] = useState([]);

  const getSummsry = async () => {
    try {
      const response = await axios.get(
        Config.TRANSACTION_BASE_URL + "/summary"
      );
      const data = response.data.summary;
      setSummary(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSummsry();
  }, []);

  console.log(summary);
  return (
    <div className="account-main">
      <Topbar />
      <h2>Transaction</h2>
      <div className="account-table-container">
        <table className="account-table">
          <thead>
            <tr className="accoun-table-header">
              <th>S/N</th>
              <th>Cinema</th>
              <th>Branch</th>
              <th>Currency</th>
              <th>Total Amount</th>
              <th>Average Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {summary?.map((el, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{el?._id?.cinema_id?.name}</td>
                  <td>{el?._id?.branch_id?.name}</td>
                  <td>NGN</td>
                  <td>₦{el?.amount?.toLocaleString()}</td>
                  <td>₦{el?.avgAmount?.toLocaleString()}</td>
                  <td>
                    {el?._id?.day}/{el?._id?.month}/{el?._id?.year}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Account;
