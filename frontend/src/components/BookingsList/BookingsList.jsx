import React from "react";
import "./BookingsList.css";

const BookingsList = (props) => {
  return (
    <ul className="bookings-list">
      {props.bookings.map((booking) => (
        <li key={booking._id} className="booking-item">
          <div className="booking-details">
            <span className="booking-title">{booking.event.title}</span>
            <span className="booking-date">
              {new Date(booking.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="booking-actions">
            <button
              className="cancel-button"
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
