import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  position: relative;
  top: 10px;
  left: 570px;
`;

const StyledModal = styled.div`
  background: white;
  width: 640px;
  border-radius: 15px;
  padding: 10px 0;
  z-index: 100000;
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = ({ show, onClose, email, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    return () => setIsBrowser(false);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [show]);
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            <img src="/assets/img/delete_symbol.svg" />
          </a>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>
          <div className="startuo-modal">
            <div className="model-content">
              <div className="modal-body">
                <div className="start-modal-wrap">
                  <div className="product-title start-modal">
                    <h3>Connect with Mentor</h3>
                    <p></p>
                  </div>
                  <div className="modal-form">
                    <div className="single-form">
                      <label for="#">Company Name*</label>
                      <input
                        type="text"
                        placeholder="Enter text here"
                        required=""
                      />
                    </div>
                    <div className="single-form">
                      <label for="#">Full name *</label>
                      <input
                        type="text"
                        placeholder="Enter text here"
                        required=""
                      />
                    </div>
                    <div className="single-form">
                      <label for="#">Email *</label>
                      <input
                        type="Email"
                        placeholder="Enter text here"
                        required=""
                      />
                    </div>
                    <div className="single-form">
                      <label for="#">Mobile number *</label>
                      <input
                        type="text"
                        placeholder="Enter text here"
                        required=""
                      />
                    </div>
                    <div className="modal-contact-btn">
                      <button onClick={() => window.open(`mailto: ${email}`)}>
                        Submit Request
                        <i className="fas fa-arrow-right" />
                      </button>
                    </div>
                    <div className="privicy-text">
                      <p>
                        By clicking on submit request you agree to our{' '}
                        <a href="#">Terms &amp; Conditions</a>
                        and accordance with our <a href="#">Privacy Policy</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

export default Modal;
