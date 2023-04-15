import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { makeStyles } from '@material-ui/core/styles';
import { StepLabel } from '@material-ui/core';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import CheckAndSuccessModal from './CheckAndSuccessModal';
import Loader from './loader/loader';
import Loading from './CommonLoader/Loading';
const useStyles = makeStyles((theme) => ({
  activeStepIcon: {
    color: 'red',
    fontSize: '40px',
  },
  stepper: {
    [theme.breakpoints.up(1024)]: {
      padding: '0px 300px 19px',
    },
    background: '#f8f8fc',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '100%',
    marginLeft: '0',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
  buttonEle: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '259px',
    marginLeft: '0',
    color: '#fff',
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
    '& .MuiStepLabel-root.Mui-disabled': {
      cursor: 'pointer',
    },
    background: '#f8f8fc',
    cursor: 'pointer',
  },
  // modalHeader: {
  //   '& .close': {
  //     display: 'none !important',
  //   },
  // },
  modalBtn: {
    backgroundImage:
      'linear-gradient(to right, rgb(239, 110, 86) 0%, rgb(245, 43, 6) 100%) !important',
    padding: '6px 10px !important',
    color: '#ffffff !important',
  },
}));
export const formData = { val: {} };
export function FormikStep({ children }) {
  return <>{children}</>;
}
const FormikStepperReg = ({ children, lastStep, ...props }) => {
  const router = useRouter();
  const [savingInfo, setSavingInfo] = useState(false);
  const [session, loading] = useSession();
  const [sessionExpiresModal, setSessionExpiresModal] = useState(false);

  const childrenArray = React.Children.toArray(children);

  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const [show, setShow] = useState(false);
  const [saveAndExit, setSaveAndExit] = useState(false);
  //const [exitDisable, setExitDisable] = useState(false);
  const classes = useStyles();

  const handleCloseBtn = () => {
    router.push('/');
  };
  useEffect(() => {
    if (session === null) setSessionExpiresModal(true);
  }, [session]);

  useEffect(() => {
    // setStep(lastStep);
    if (!isLastStep()) {
      if (lastStep) setStep(lastStep);
    }
  }, [lastStep]);

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };
  const handleBack = () => {
    setSaveAndExit(false);
    setStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepClick = (stepNo) => {
    if (stepNo <= lastStep - 1) {
      setStep(stepNo);
    } else {
      toast.error('You can not jump to a unfilled step', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const handleLogin = () => {
    setSessionExpiresModal(false);
    router.push('/login');
  };
  return (
    <>
      {<Loading />}
      {
        <>
          {props.elevate && (
            <div className="elevate_header_text">
              {childrenArray.map((child, index) => (
                <div>
                  {step === index ? (
                    <div className="elevate_stepper_text">
                      <div>{props.formTopText} : </div>{' '}
                      <div className="elvt_step_label">
                        {' '}
                        {child.props.label}
                      </div>
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
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              if (isLastStep()) {
                if (props.checkbox === true) {
                  const val = await props.onSubmit(values, helpers, step);
                  if (val) {
                    setCompleted(true);
                  }
                }
              } else {
                if (saveAndExit) {
                  //setSavingInfo(true);
                  setStep((s) => s);
                  helpers.setTouched({});
                  props.onSubmit(values, helpers, step, 'saveAndexit');
                } else {
                  setStep((s) => s + 1);
                  helpers.setTouched({});
                  props.onSubmit(values, helpers, step);
                }
              }
            }}
          >
            {({
              isSubmitting,
              values,
              handleChange,
              setFieldValue,
              errors,
            }) => (
              <>
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
                          onClick={() => handleStepClick(index)}
                        >
                          <StepLabel>
                            {props.elevate ? (
                              ''
                            ) : (
                              <div className="formik-step-label">
                                {child.props.label}
                              </div>
                            )}
                          </StepLabel>
                        </Step>
                      ))}
                      <ToastContainer />
                    </Stepper>
                  </div>
                  <div className="elevate_form_childs">
                    <div className="elevate_form_fields">{currentChild}</div>
                    <div>
                      {isLastStep() ? (
                        <div className="submit__form">
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
                            className={classes.buttonEle}
                            type="submit"
                            style={{ marginLeft: '20px' }}
                            onClick={
                              Object.keys(errors).length === 0 &&
                              props.checkbox === false
                                ? () => setShow(true)
                                : () => setShow(false)
                            }
                            disabled={props.submitDisable}
                          >
                            Submit
                          </Button>
                          {/* registraion success */}
                          {props.incentive ? (
                            <CheckAndSuccessModal
                              displaySuccess
                              incentive
                              incentiveName={props.incentiveName}
                              show={props.showSuccessModal}
                              setShow={props.setShowSuccessModal}
                              successMessage={
                                props.successModalData &&
                                props.successModalData.data &&
                                props.successModalData.data.message
                              }
                            />
                          ) : (
                            <CheckAndSuccessModal
                              displaySuccess
                              show={props.showSuccessModal}
                              successMessage={
                                props.successModalData &&
                                props.successModalData.data &&
                                props.successModalData.data.message
                              }
                            />
                          )}
                          <CheckAndSuccessModal
                            terms
                            show={show}
                            onClose={() => setShow(false)}
                          />
                          <div className="elevate_form_save"></div>
                        </div>
                      ) : (
                        <>
                          <div className={classes.buttonsEle}>
                            {step !== 0 ? (
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleBack}
                                className={classes.buttonBack}
                                disabled={
                                  props.exitDisable ? props.exitDisable : false
                                }
                              >
                                Back
                              </Button>
                            ) : (
                              ''
                            )}
                            <Button
                              variant="contained"
                              className={classes.buttonEle}
                              type="submit"
                              style={{ marginLeft: '20px' }}
                              disabled={
                                props.exitDisable ? props.exitDisable : false
                              }
                              onClick={() => {
                                setSaveAndExit(false);
                              }}
                              // onClick={
                              //   props.checkbox === false
                              //     ? () => setShow(true)
                              //     : () => setShow(false)
                              // }
                            >
                              Save & Continue
                            </Button>
                            {/* <CheckAndSuccessModal
                        terms
                        show={show}
                        onClose={() => setShow(false)}
                      /> */}
                          </div>
                          <div className="elevate_form_save">
                            <Button
                              className={classes.buttonEle}
                              type="submit"
                              className="save__ext"
                              onClick={() => {
                                Object.keys(errors).length === 0 &&
                                  setSaveAndExit(true);
                              }}
                              disabled={
                                props.exitDisable ? props.exitDisable : false
                              }
                            >
                              Save & exit
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </>
      }
      <Modal
        className="session"
        centered
        toggle={() => setSessionExpiresModal(false)}
        isOpen={sessionExpiresModal}
        keyboard={false}
        backdrop={'static'}
      >
        <ModalHeader
          close={
            <button className="close" onClick={handleCloseBtn}>
              x
            </button>
          }
          className={classes.modalHeader}
          toggle={() => setSessionExpiresModal(false)}
        >
          Session Expired
        </ModalHeader>
        <ModalBody>
          Your Session has been expired. Log in again with your credentials to
          continue.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className={classes.modalBtn}
            onClick={handleLogin}
          >
            Login again
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FormikStepperReg;
