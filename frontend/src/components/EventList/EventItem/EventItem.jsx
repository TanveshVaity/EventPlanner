import React from "react";
import "./EventItem.css";

const EventItem = (props) => {
  const { title, price, date } = props.event;

  return (
    <li className="events-list-item">
      <div>
        <h1>{title}</h1>
        <h2>
          ${price} - {new Date(date).toLocaleDateString()}
        </h2>
      </div>
      <div>
      {props.userId === props.creatorId ? (
        <p>You're the owner of this event.</p>
      ) : (
        <button className="btn" onClick={() => props.onDetail(props.eventId)}>
          View Details
        </button>
      )}
      </div>
    </li>
  );
};

export default EventItem;
