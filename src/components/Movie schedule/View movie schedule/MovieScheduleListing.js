import React from "react";
import CounterNav from "../../Counter/Navigation/CounterNav";
import "./styles/style.css";
import img from "../../uploads/promo3.jpg";
const MovieScheduleListing = () => {
  const obj = [
    {
      image: img,
      movie: "Avengers IV",
      show_time: [
        "10/11/2023, 7:05:00 PM",
        "10/12/2023, 7:05:00 PM",
        "10/13/2023, 7:05:00 PM",
        "10/27/2023, 11:05:00 PM",
        "10/12/2023, 7:05:00 PM",
      ],
      price: 7000,
      branch: "jabi",
      cinema: "Silverbird",
    },
    {
      image: img,
      movie: "Avengers IV",
      show_time: [
        "10/11/2023, 7:05:00 PM",
        "10/12/2023, 7:05:00 PM",
        "10/13/2023, 7:05:00 PM",
        "10/27/2023, 11:05:00 PM",
      ],
      price: 7000,
      branch: "jabi",
      cinema: "Silverbird",
    },
    {
      image: img,
      movie: "Avengers IV",
      show_time: [
        "10/11/2023, 7:05:00 PM",
        "10/12/2023, 7:05:00 PM",
        "10/13/2023, 7:05:00 PM",
        "10/27/2023, 11:05:00 PM",
        "10/12/2023, 7:05:00 PM",
      ],
      price: 7000,
      branch: "jabi",
      cinema: "Silverbird",
    },
    {
      image: img,
      movie: "Avengers IV",
      show_time: [
        "10/11/2023, 7:05:00 PM",
        "10/12/2023, 7:05:00 PM",
        "10/13/2023, 7:05:00 PM",
        "10/27/2023, 11:05:00 PM",
      ],
      price: 7000,
      branch: "jabi",
      cinema: "Silverbird",
    },
  ];

  const editHandler = () => {};
  const deleteHandler = () => {};
  return (
    <div>
      <CounterNav />
      <div className="movielistingContainer">
        <h3>Movie Schedule Listing</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Movie</th>
              <th>Show time</th>
              <th>Price</th>
              <th>Branch</th>
              <th>Cinema</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {obj?.map((el, i) => {
              return (
                <tr key={i}>
                  <td>
                    <img src={el.image} alt="movie avi" className="tdImg" />
                  </td>
                  <td>{el.movie}</td>
                  <td className="showtimeTd">
                    {el.show_time?.map((show, i) => {
                      return <p key={i}>{show}</p>;
                    })}
                  </td>
                  <td>{`₦${el.price.toLocaleString()}`}</td>
                  <td>{el.branch}</td>
                  <td>{el.cinema}</td>
                  <td className="action">
                    <button className="editBtn" onClick={() => editHandler(el)}>
                      Edit
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteHandler(el)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieScheduleListing;
