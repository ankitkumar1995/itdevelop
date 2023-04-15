import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'reactstrap';
import ReactPlayer from 'react-player';

const MediaModal = (props) => {
  // const [showModal, setShowModal] = useState(false);
  function closeModal() {
    props.playerModalClose();
  }

  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: '#000000ba',
      zIndex: '999',
    },
  };
  return (
    <div className="modal_inner__player">
      <Modal
        size="lg"
        className="modal_player"
        onRequestClose={closeModal}
        isOpen={props.show}
        style={customStyles}
      >
        <ReactPlayer
          url={'https://www.youtube.com/watch?v=oHfStaQjitQ'}
          className="react-player"
          playing
          height="600px"
        />
        <img
          className="cancel_arrow"
          onClick={closeModal}
          src="/assets/img/download-cross.png"
        />
      </Modal>
    </div>
  );
};
export default MediaModal;
