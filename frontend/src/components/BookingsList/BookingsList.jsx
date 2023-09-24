import React from "react";
import "./BookingsList.css";

const BookingsList = (props) => {
  return (
    <ul className="bookings-list">
      {props.bookings.map((booking) => (
        <li key={booking._id} className="bookings-item">
          <div className="bookings-item-data">
            <h1>{booking.event.title}</h1>
            <h2>
              {new Date(booking.createdAt).toLocaleDateString()}
            </h2>
          </div>
          <div className="bookings-items-actions">
            <button
              className="btn"
              onClick={() => props.onDelete(booking._id)} 
            >
              Cancel
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingsList;
