import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#000',
  },
};

function Modals(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <span className="videos-icon" onClick={openModal}>
        <img src={props.image} alt="..." onClick={openModal} />
        &nbsp;Watch Video{' '}
      </span>
      {props.openPlayer && (
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <i className="fas fa-times icon-t" onClick={closeModal}></i>
          <ReactPlayer
            className="video-player"
            autoplay
            playing={true}
            controls="true"
            style={{ margin: '-20px', overflow: 'hidden' }}
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          />
        </Modal>
      )}
    </div>
  );
}
export default Modals;
