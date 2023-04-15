import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { makeStyles } from '@material-ui/core/styles';
import { StepLabel } from '@material-ui/core';
import SuccessModal from './SuccessModal';
import Link from 'next/link';
import { checkBox } from './ElevateFormControls/CheckBox';
import ElevateModal from './ElevateModal';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
    background: '#f8f8fc',
  },
}));
export const formData = { val: {} };
export function FormikStep({ children }) {
  return <>{children}</>;
}

const FormikStepperEl = ({ setProgramName, children, lastStep, ...props }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [sessionExpiresModal, setSessionExpiresModal] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const [saveAndExit, setSaveAndExit] = useState(false);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleCloseBtn = () => {
    router.push('/');
  };
  useEffect(() => {
    if (session === null) setSessionExpiresModal(true);
  }, [session]);

  useEffect(() => {
    if (!isLastStep()) {
      if (lastStep) setStep(lastStep);
    }
  }, [lastStep]);
  useEffect(() => {}, [session]);

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };
  const handleBack = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
  // const handleClickCheck = () => {
  //   if (checkBox.val === false) {
  //     setShowCheckModal(true);
  //     props.setShow(false);
  //   } else {
  //     setShowCheckModal();
  //     props.setShow(true);
  //   }
  // };
  const handleLogin = () => {
    setSessionExpiresModal(false);
    router.push('/login');
  };
  return (
    <>
      {<Loading />}
      {props.elevate && (
        <div className="elevate_header_text">
          {childrenArray.map((child, index) => (
            <div>
              {step === index ? (
                <div className="elevate_stepper_text">
                  <div>
                    <b>{props.formEventHeading} :</b>{' '}
                  </div>{' '}
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
              setStep((s) => s);
              helpers.setTouched({});
              props.onSubmit(values, helpers, step, 'saveAndexit');
              //router.push(props.saveExitUrl);
            } else {
              setStep((s) => s + 1);
              helpers.setTouched({});
              await props.onSubmit(values, helpers, step);
            }
          }
        }}
      >
        {({ isSubmitting, values, handleChange, setFieldValue, errors }) => (
          <>
            {setProgramName(values.companyInformation.programName)}
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
                        disabled={props.loading}
                        className={classes.buttonEle}
                        type="submit"
                        style={{ marginLeft: '20px' }}
                        onClick={
                          Object.keys(errors).length === 0 &&
                          props.checkbox === false
                            ? () => setShow(true)
                            : () => setShow(false)
                        }
                      >
                        Submit
                      </Button>
                      <ElevateModal
                        show={props.showModal}
                        onClose={() => props.setShowModal(false)}
                        successMsg={
                          props.modalData &&
                          props.modalData.data &&
                          props.modalData.data.message
                        }
                        setShow={props.setShowModal}
                        eventType={
                          props.idType === 'gck'
                            ? props.modalData &&
                              props.modalData.data &&
                              props.modalData.data.data &&
                              props.modalData.data.data.technologyDetails &&
                              props.modalData.data.data.technologyDetails
                                .challengeName
                            : props.modalData &&
                              props.modalData.data &&
                              props.modalData.data.data &&
                              props.modalData.data.data.companyInformation &&
                              props.modalData.data.data.companyInformation
                                .programName
                        }
                        elevateId={
                          props.idType === 'gck'
                            ? props.modalData &&
                              props.modalData.data &&
                              props.modalData.data.data &&
                              props.modalData.data.data.gckID
                            : props.modalData &&
                              props.modalData.data.data.elevateID
                        }
                        event={props.event}
                        landingPageUrl={props.landingPageUrl}
                        // successMsg={
                        //   props.successMsgData &&
                        //   props.successMsgData.data &&
                        //   props.successMsgData.data.message
                        // }
                      />
                      <SuccessModal
                        terms
                        landingPageUrl={props.landingPageUrl}
                        show={show}
                        onClose={() => setShow(false)}
                      />
                      {/* <SuccessModal
                        show={show}
                        onClose={() => setShow(false)}
                        successMsg={
                          props.data.message ? props.data.message : 'error'
                        } 
                      /> */}
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
                          // onClick={
                          //   props.value != false
                          //     ? () => setShow(true)
                          //     : () => setShow(false)
                          // }
                        >
                          Save & Continue
                        </Button>
                        {/* {show && (
                          <SuccessModal
                            terms
                            show={show}
                            onClose={() => setShow(false)}
                            successMsg={
                              'Please accept declaration before completing the application'
                            }
                          />
                        )} */}
                      </div>
                      <div className="elevate_form_save">
                        <Button
                          className={classes.buttonEle}
                          className="save__ext"
                          type="submit"
                          onClick={() => setSaveAndExit(true)}
                        >
                          Save & exit
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </Form>
          </>
        )}
      </Formik>
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

export default FormikStepperEl;
