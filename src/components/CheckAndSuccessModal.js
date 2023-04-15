import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from './CommonLoader/Loading';
const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModal = styled.div`
  position: absolute;
  top: 15%;
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

const CheckAndSuccessModal = ({
  show,
  onClose,
  setShow,
  terms,
  incentive,
  customMessage,
  incentiveName,
  successMessage,
  displaySuccess,
}) => {
  const [load, setLoad] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsBrowser(true);
    }
  }, []);

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [show]);
  const router = useRouter();
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
    // router.push('/login');
  };
  useEffect(() => {
    if (load && incentive) {
      <Loading />;
    }
  }, [load]);
  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalBody>
          <div className="sucs_modal_cntnt">
            <div className="container">
              {displaySuccess ? (
                <div className="sucs_modal_wrap">
                  <div className="sucs_icon">
                    <div className="check_icon">
                      <i className="fas fa-check"></i>
                    </div>
                  </div>
                  {incentive ? (
                    <>
                      <div className="sucs_text">{successMessage}!!!</div>
                      <div className="sucs_content_wrap">
                        <div className="sucs_content">
                          Your {incentiveName} has been Successfully Submitted
                          for review.
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sucs_text">{successMessage}!!!</div>
                      <div className="sucs_content_wrap">
                        <div className="sucs_content">
                          {customMessage
                            ? customMessage
                            : 'Your registration form has been successfully submitted. We’ll get back to you shortly.'}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="rect_t">
                    <Link href="/">
                      <a>
                        <div
                          className="rect_button"
                          onClick={() => {
                            setLoad(true);
                            incentive && setShow(false);
                          }}
                        >
                          Ok
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ) : null}
              {terms ? (
                <>
                  <button
                    className="close__btn"
                    type="button"
                    onClick={handleCloseClick}
                  >
                    {/* X */}
                    <i class="fas fa-times"></i>
                  </button>
                  <div className="terms_text">
                    Accept Terms and Condition to continue
                  </div>
                  <div className="rect_t">
                    <Link href="#">
                      <a>
                        <div className="rect_button" onClick={handleCloseClick}>
                          Ok
                        </div>
                      </a>
                    </Link>
                  </div>
                </>
              ) : null}
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

export default CheckAndSuccessModal;
