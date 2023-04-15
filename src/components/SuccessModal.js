import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
const StyledModalBody = styled.div`
  padding-top: 10px;
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

const SuccessModal = ({
  show,
  onClose,
  successMsg,
  terms,
  successAll,
  successMessage,
  reset,
  landingPageUrl,
}) => {
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
  const router = useRouter();
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
    // router.push('/login');
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalBody>
          <div className="sucs_modal_cntnt">
            <div className="container">
              <div className="sucs_modal_wrap">
                {successAll ? (
                  <>
                    <button
                      className="close__btn"
                      type="button"
                      onClick={handleCloseClick}
                    >
                      {/* X */}
                      <i class="fas fa-times"></i>
                    </button>
                    <div className="terms_text">{successMessage}</div>
                    <div className="rect_t">
                      {reset ? (
                        <Link href={'/login'}>
                          <a>
                            <div
                              className="rect_button"
                              onClick={handleCloseClick}
                            >
                              Ok
                            </div>
                          </a>
                        </Link>
                      ) : (
                        <Link href={'#'}>
                          <a>
                            <div
                              className="rect_button"
                              onClick={handleCloseClick}
                            >
                              Ok
                            </div>
                          </a>
                        </Link>
                      )}
                    </div>
                  </>
                ) : terms ? (
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
                      Accept Terms and Conditions to continue
                    </div>
                    <div className="rect_t">
                      <Link href={'#'}>
                        <a>
                          <div
                            className="rect_button"
                            onClick={handleCloseClick}
                          >
                            Ok
                          </div>
                        </a>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sucs_icon">
                      <div className="check_icon">
                        <i className="fas fa-check"></i>
                      </div>
                    </div>
                    <div className="sucs_text">{successMsg}!!!</div>
                    <div className="sucs_content_wrap">
                      <div className="sucs_content">
                        Account activation link has been sent to your email
                        address. Please check your inbox and
                        <span>
                          <Link href="#">
                            <a style={{ color: '#ee6f57' }}>
                              &nbsp; verify your account
                            </a>
                          </Link>
                        </span>
                      </div>
                      <hr className="line" />
                      <div className="sucs_ct">
                        * Please check your spam folder incase you’re not able
                        to find your email
                      </div>
                    </div>
                    <div className="rect_t">
                      <Link href="login">
                        <a>
                          <div className="rect_button">Ok</div>
                        </a>
                      </Link>
                    </div>
                  </>
                )}
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

export default SuccessModal;
