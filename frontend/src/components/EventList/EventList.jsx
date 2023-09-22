import React from "react";
import "./EventList.css";
import EventItem from "./EventItem/EventItem";

const EventList = (props) => {
  const events = props.events.map((event) => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        event={event}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="event-list">{events}</ul>;
};

export default EventList;
