import React, { useState } from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Model/Modal';
import './Events.css';

const Events = () => {
  const [creating, setCreating] = useState(false);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = () => {
    setCreating(false);
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
          <p>Modal Content</p>
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
