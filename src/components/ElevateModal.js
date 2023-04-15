import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Link from 'next/link';
import Loading from './CommonLoader/Loading';
const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModal = styled.div`
  position: absolute;
  top: 14%;
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

const ElevateModal = ({
  show,
  onClose,
  successMsg,
  terms,
  setShow,
  eventType,
  elevateId,
  event,
  landingPageUrl,
}) => {
  const [load, setLoad] = useState(false);
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
  useEffect(() => {
    if (load) {
      <Loading />;
    }
  }, [load]);
  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalBody>
          <div className="sucs_modal_cntnt">
            <div className="container">
              <div className="sucs_modal_wrap">
                <div className="sucs_icon">
                  <div className="check_icon">
                    <i className="fas fa-check"></i>
                  </div>
                </div>
                <div className="sucs_text">
                  {successMsg == 'Success'
                    ? 'Submission Successful'
                    : successMsg}
                  !
                </div>
                <div className="sucs_content_wrap">
                  <div className="sucs_content">
                    Your {eventType} Application form has been submitted.Your{' '}
                    <b style={{ color: '#f52a04' }}>
                      Application ID -<span> {elevateId}</span>
                    </b>
                    . An E-mail and SMS has also been sent to your registered
                    mail ID and registered number.
                  </div>
                  <hr className="line" />
                  <div className="sucs_ct">
                    * Please check your spam folder incase you’re not able to
                    find your email
                  </div>
                </div>
                <div className="rect_t">
                  <Link href={landingPageUrl}>
                    <a
                      href="#"
                      onClick={() => {
                        setLoad(true);
                        setShow(false);
                      }}
                    >
                      <div className="rect_button">Ok</div>
                    </a>
                  </Link>
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

export default ElevateModal;
