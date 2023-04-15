import * as React from 'react';
import { Modal } from 'reactstrap';
import Link from 'next/link';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
const ContactDetailReportWrapper = styled.ul`
  li {
    display: flex;
    justify-content: center;
    padding: 12px;
    div {
      margin: 0 10px;
      width: 50%;
      text-align: center;
    }
    &:nth-child(odd) {
      background: #f8f8fc;
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '100%',
    marginLeft: '0',
    color: 'white',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
  lineSeperater: {
    backgroundColor: '#f52e0a',
    height: '2px',
    width: '78%',
    margin: 'auto',
  },
}));
const CommonModalStrap = ({
  registrationSuccess,
  show,
  title,
  modalClass,
  servicePartner,
  message,
  successMessage,
  redirect,
  onClose,
  ...props
}) => {
  const classes = useStyles();
  const signupClass = 'signup-class';
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Modal
        modalClassName={`modal-common signup-class ${modalClass}`}
        isOpen={show}
        backdrop="static"
      >
        <div className="sucs_modal_cntnt">
          <div className="container">
            <div>
              {props.startupLogo && (
                <div
                  style={{
                    marginBottom: '16px',
                    marginLeft: '-20px',
                  }}
                >
                  <Image
                    src={'/assets/img/site-logo-sticky.png'}
                    width={190}
                    height={30}
                  />
                </div>
              )}
              {successMessage && (
                <div className="sucs_modal_wrap">
                  <div className="sucs_icon">
                    <div className="check_icon">
                      <i className="fas fa-check"></i>
                    </div>
                  </div>
                  <div className="sucs_text">Success !!!</div>
                  <div className="sucs_content_wrap">
                    <div className="sucs_content">{successMessage}</div>
                  </div>
                </div>
              )}
              <button
                className="close__btn"
                type="button"
                onClick={handleClose}
              >
                <i class="fas fa-times"></i>
              </button>
              <div style={{ textAlign: 'center' }}>
                <h2 className="modal-heading">{title ? title : ''}</h2>
              </div>
{successMessage?"'":
              <div>
                <hr className={classes.lineSeperater} />
              </div>
}
              {props.internationalPartnership && (
                <div className="modal-text-interp py-4">
                  <div className="department">
                    <b>Departments- </b>
                    <div
                      dangerouslySetInnerHTML={{ __html: message.department }}
                    />
                  </div>
                  <div className="interp-email py-3">
                    <b>Emails -</b>
                    <div dangerouslySetInnerHTML={{ __html: message.emails }} />
                  </div>
                </div>
              )}
              {servicePartner && (
                <div>
                  <p>{message}</p>
                </div>
              )}
              <div className="rect_t">
                <Link href={redirect ? redirect : '#'}>
                  <a onClick={handleClose}>
                    <div className="rect_button">Ok</div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommonModalStrap;
