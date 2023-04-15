import React, { useState } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import Link from 'next/link';

const CommonTermAndC = ({}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>togglae</button>
      <Modal
        modalClassName="modal-common t-and-c"
        isOpen={show}
        backdrop="static"
      >
        <div className="popup-text">
          <div className="container">
            <button
              className="close__btn"
              type="button"
              onClick={() => setShow(!show)}
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
                  <div className="rect_button" onClick={() => setShow(!show)}>
                    Ok
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default CommonTermAndC;
