import React from 'react';
import './Modal.css';

const Modal = (props) => (
  <div className="modal-container">
    <div className="modal">
      <header className="modal-header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal-content">{props.children}</section>
      <section className="modal-actions">
        {props.canCancel && (
          <button className="btn cancel-btn" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className="btn" onClick={props.onConfirm}>
            {props.confirmText}
          </button>
        )}
      </section>
    </div>
  </div>
);

export default Modal;