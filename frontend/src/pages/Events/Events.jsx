import React, { useRef, useState , useContext} from "react";
import Backdrop from "../../components/Backdrop/Backdrop";
import Modal from "../../components/Model/Modal";
import "./Events.css";
import axios from "axios";
import AuthContext from "../../context/auth-context";

const Events = () => {
  const [creating, setCreating] = useState(false);
  const authContext = useContext(AuthContext);
  const titleInput = useRef();
  const descriptionInput = useRef();
  const priceInput = useRef();
  const dateInput = useRef();

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = async () => {
    setCreating(false);
    const title = titleInput.current.value;
    const description = descriptionInput.current.value;
    const price = +priceInput.current.value;
    const date = dateInput.current.value;

    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      date.trim().length === 0 ||
      price <= 0
    ) {
      return;
    }

    const event = { title, description, price, date };
    console.log(event);

    titleInput.current.value = "";
    descriptionInput.current.value = "";
    priceInput.current.value = "";
    dateInput.current.value = "";

    let requestBody = {
      query: `
        mutation {
          createEvent(eventInput:{title:"${title}", description:"${description}", price:${price}, date:"${date}"}){
            _id,
            title,
            description,
            price,
            date,
            creator{
              _id,
              email
            }
          }
        }
      `,
    };

    try {
      const { token } = authContext;
      const response = await axios.post(
        "http://localhost:5000/api",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = await response.data;
      if (resData.data.createEvent) {
        console.log(resData);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  return (
    <React.Fragment>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
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
      <div className="events-container">
        <div className="events-control">
          <p>Share your own Events!</p>
          <button className="btn" onClick={startCreateEventHandler}>
            Create Event
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Events;
