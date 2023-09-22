import React, { useRef, useState, useContext, useEffect } from "react";
import Backdrop from "../../components/Backdrop/Backdrop";
import Modal from "../../components/Modal/Modal";
import "./Events.css";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import EventList from "../../components/EventList/EventList";
import Loader from "../../components/Loader/Loader";

const Events = (props) => {
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const authContext = useContext(AuthContext);
  const titleInput = useRef();
  const descriptionInput = useRef();
  const priceInput = useRef();
  const dateInput = useRef();
  const { token, userId } = authContext;

  useEffect(() => {
    fetchEvents();
  }, []);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = async () => {
    setCreating(false);
    const title = titleInput.current.value;
    const description = descriptionInput.current.value;
    const price = +priceInput.current.value;
    const date = dateInput.current.value;

    if (!title || !description || !date || price <= 0) {
      return;
    }

    const event = { title, description, price, date };

    titleInput.current.value = "";
    descriptionInput.current.value = "";
    priceInput.current.value = "";
    dateInput.current.value = "";

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
          createEvent(eventInput: {
            title: $title,
            description: $description,
            price: $price,
            date: $date
          }) {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `,
      variables: {
        title,
        description,
        price,
        date,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = await response.data;
      if (resData.data.createEvent) {
        fetchEvents();
        const createdEvent = resData.data.createEvent;
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            ...createdEvent,
            creator: { _id: userId },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.data;
      if (resData.data.events) {
        setEvents(resData.data.events);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  const showDetailHandler = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    setSelectedEvent(event);
  };

  const bookEventHandler = () => {};

  return (
    <React.Fragment>
      {creating || (selectedEvent && <Backdrop />)}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleInput} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceInput} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateInput} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="4" ref={descriptionInput} />
            </div>
          </form>
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={() => setSelectedEvent(null)}
          onConfirm={bookEventHandler}
          confirmText="Book"
        >
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{" "}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}

      <div className="events-container">
        {token && (
          <div className="events-control">
            <p>Share your own Events!</p>
            <button className="btn" onClick={startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <EventList
            events={events}
            authUserId={userId}
            onViewDetail={showDetailHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Events;
