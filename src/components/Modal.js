import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  position: absolute;
  top: 13%;
  background: white;
  width: 530px;
  border-radius: 20px;
  padding: 10px 0;
  z-index: 11111111111;
  @media (max-width: 550px) {
    width: 380px;
  }
  @media (max-width: 400px) {
    width: 350px;
  }
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 111111111111111111111111;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = ({ show, onClose, children, title, closeBtn }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
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
          {closeBtn && (
            <a
              style={{
                textDecoration: 'none',
                marginTop: '-10px',
                marginRight: '10px',
              }}
              href="#"
              onClick={handleCloseClick}
            >
              x
            </a>
          )}
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>{children}</StyledModalBody>
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
