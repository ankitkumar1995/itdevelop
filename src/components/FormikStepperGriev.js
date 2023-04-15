import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { makeStyles } from '@material-ui/core/styles';
import { StepLabel } from '@material-ui/core';
import SuccessModal from './SuccessModal';
import { useSession } from 'next-auth/client';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Link from 'next/link';
import { checkBox } from './ElevateFormControls/CheckBox';
import { checkBoxData } from './SignUpForms/Startup/SelfCertification';

const useStyles = makeStyles((theme) => ({
  activeStepIcon: {
    color: '#f52b06',
    fontSize: '40px',
  },
  stepper: {
    [theme.breakpoints.up(1024)]: {
      padding: '0px 150px 19px',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    padding: '19px',
    width: '50%',
    // marginLeft: '20px',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
  buttonEle: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '259px',
    marginLeft: '0',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
  buttonBack: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '259px',
    marginLeft: '0',
    border: '2px solid #f52b06',
    color: '#f52b06',
    '&:hover': {
      border: '2px solid #ef6e56',
    },
  },
  buttonsEle: {
    textAlign: 'center',
    paddingBottom: '30px',
  },
  bgDark: {
    backgroundColor: 'black',
  },
  stepIcon: {
    '& .MuiStepIcon-completed': {
      color: '#F43513',
    },
    '& .MuiStepIcon-active': {
      color: '#F43513',
    },
  },
}));
export const formData = { val: {} };
export function FormikStep({ children }) {
  return <>{children}</>;
}

const FormikStepperGriev = ({ children, ...props }) => {
  const [session, loading] = useSession();
  const [sessionExpiresModal, setSessionExpiresModal] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const isUser = !!session?.user;

  useEffect(() => {}, [session]);
  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };
  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      {props.elevate && (
        <div className="elevate_header_text">
          {childrenArray.map((child, index) => (
            <div>
              {step === index ? (
                <div className="elevate_stepper_text">
                  <div>ELEVATE - UNNATI 2021 Application : </div>{' '}
                  <div className="elvt_step_label"> {child.props.label}</div>
                </div>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      )}
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        validateOnChange
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
          } else {
            setStep((s) => s + 1);
            helpers.setTouched({});
          }
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form autoComplete="off">
            <div style={{ padding: '20px 0px' }}>
              <Stepper
                alternativeLabel
                activeStep={step}
                className={classes.stepper}
              >
                {childrenArray.map((child, index) => (
                  <Step
                    key={child.props.label}
                    completed={step > index}
                    className={classes.stepIcon}
                  >
                    <StepLabel>
                      {props.elevate ? '' : <div>{child.props.label}</div>}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div>
              {currentChild}
              {isLastStep() ? (
                <div className={classes.buttons}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleBack}
                    className={classes.buttonBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                    onClick={
                      props.checkValue === false
                        ? () => setShow(true)
                        : () => setShow(false)
                    }
                    disabled={
                      props.captchaVerify === false ? true : props.btnDisable
                    }
                  >
                    Submit
                  </Button>
                  <SuccessModal
                    show={props.showModal}
                    onClose={() => props.setShowModal(false)}
                    successMsg={props.modalData && props.modalData.data.message}
                  />
                  <SuccessModal
                    terms
                    landingPageUrl={props.landingPageUrl}
                    show={show}
                    onClose={() => setShow(false)}
                  />
                </div>
              ) : (
                <div className={classes.buttons}>
                  {step !== 0 && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleBack}
                      className={classes.buttonBack}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              )}
              {props.errorData && props.errorData.status === 'error' && (
                <div className="user__exist">
                  Email ID already registered.Please Login with existing user id
                  and password.
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        centered
        toggle={() => setSessionExpiresModal(false)}
        isOpen={sessionExpiresModal}
      >
        <ModalHeader toggle={() => setSessionExpiresModal(false)}>
          Session Expires
        </ModalHeader>
        <ModalBody>
          Your Session has been expires. Log in again with your credentials to
          continue. You can also continue without login
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck() {}}>
            Login again
          </Button>{' '}
          <Button onClick={() => setSessionExpiresModal(false)}>
            Continue without login
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FormikStepperGriev;
