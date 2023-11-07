import React from 'react';
import './Modal.css'; 

const Modal = ({ item, onClose }) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">✕</button>

        {item.i && <img src={item.i.imageUrl} alt={item.l} className="poster" />}
        <p className="title">{item.qid}: {item.l}</p>
        <p>Actors: {item.s}</p>
        <p>{item.yr}</p>
        <p>rank: {item.rank}</p>

      </div>
    </div>
  );
}


export default Modal;