import FormikStepper, { FormikStep } from '../../FormikStepper';
import GrievanceDetails from './GrievanceDetails';
import Modal from '../../Modal';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CommonPersonalDetails from '../../PersonalDetails/PersonalDetail';
import { createGrievance } from '../../../pages/api/grievance';
import FormikStepperGriev from '../../FormikStepperGriev';
import axios from 'axios';
import { BASE_URL } from '../../../pages/api/url';
// import checkMark from '../../../public/assets/check-mark.svg';

const GrievanceReportWrapper = styled.ul`
  p {
    margin-top: 40px;
  }
`;

const RaiseGrievanceModalWrapper = styled.div`
  padding: 10%;
  display: flex;
  justify-content: center;
  text-align: center;

  img {
    margin-bottom: 20px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const RaiseGrievanceForm = (props) => {
  const [spdata, setSPData] = useState({});
  const [btnDisable, setBtnDisable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const [reseting, setReseting] = useState('');

  const classes = useStyles();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [initialValues, setInitialValues] = useState({
    userType: props?.user ? props.user : '',
    gType: '',
    gSubType: '',
    describeGriveance: '',
    name: '',
    phone: '',
    email: '',
    message: {
      text: '',
    },
    registered: false,
    workForce: true,
    revenue: true,
  });
  const htmlBodyData = (
    userType,
    gType,
    gSubType,
    describeGriveance,
    name,
    phone,
    email,
    ticketNumber
  ) => {
    return `<div>
    <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Ticket Number: </b>${ticketNumber}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Name: </b>${name}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Email:</b> ${email}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Phone:</b> ${phone}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>User Type:</b> ${userType}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Grievance Type:</b> ${gType}</p>
      </div>
      <div style={{ display: 'flex' }}>
       <p className="px-1"><b>Grievance Sub Type:</b> ${gSubType}</p>
      </div>
       <div style={{ display: 'flex' }}>
       <p className="px-1"><b>Grievance Description:</b> ${describeGriveance}</p>
      </div>
    </div>`;
  };
  useEffect(() => {
    setInitialValues({
      userType: props.loginType || '',
      gType: '',
      gSubType: '',
      describeGriveance: '',
      name:
        (props.registerData &&
          props.registerData.data &&
          props.registerData.data.name) ||
        '',
      phone:
        (props.registerData &&
          props.registerData.data &&
          props.registerData.data.phone) ||
        '',
      email:
        (props.registerData &&
          props.registerData.data &&
          props.registerData.data.email) ||
        '',
      message: {
        text: '',
      },
      registered: false,
      workForce: true,
      revenue: true,
    });
  }, [props.user]);
  useEffect(() => {
    if (ticketNumber !== '') {
      axios.post(`${BASE_URL}/api/v1/email/`, {
        addresses: [
          'associate1ir.startupkar@gmail.com',
          'mgrmarketing.startupkar@gmail.com',
          'mgrfunding.startupkar@gmail.com',
          'fdastartupcell@gmail.com',
        ],
        ccAddresses: ['gm3.kbits@gmail.com', 'mdkbits@gmail.com'],
        body: htmlBodyData(
          spdata.userType,
          spdata.gType,
          spdata.gSubType,
          spdata.message.text,
          spdata.name,
          spdata.phone,
          spdata.email,
          ticketNumber
        ),
        subject: 'Raise Grievance',
      });
    }
  }, [ticketNumber]);
  return (
    <>
      <FormikStepperGriev
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnChange
        captchaVerify={captchaVerify}
        onSubmit={async (values, { resetForm }) => {
          setBtnDisable(true);
          const { ...data } = values;
          setSPData(data);
          await createGrievance(data)
            .then(async (res) => {
              if (res) {
                await setShowModal(true);
                await setTicketNumber(res.data.data.ticketNumber);
                await setBtnDisable(false);
                setReseting(resetForm());
              }
            })
            .catch(async (err) => {
              setShowModal(false);
              await setBtnDisable(true);
            });
        }}
        btnDisable={btnDisable}
      >
        <FormikStep
          label={'Grievance Details'}
          validationSchema={yup.object({
            userType: yup.string().required('Please select user type'),
            gType: yup.string().required('Please select grievance type'),
            gSubType: yup.string().required('Please select grievance sub type'),
            message: yup.object({
              text: yup
                .string()
                .max(750, 'Max. 750 characters are allowed')
                .required('Please describe your grievance'),
            }),
          })}
        >
          <GrievanceDetails
            handlePress={props.handleClick}
            user={props?.user}
            session={props?.session}
          />
        </FormikStep>
        <FormikStep
          label={'Personal Details'}
          validationSchema={yup.object({
            name: yup
              .string()
              .matches(/^[a-zA-Z ]*$/, 'Full name can contain only alphabets')
              .min(2, 'Name atleast 2 characters')
              .max(100, 'Name not be more than 100 characters')
              .required('Please enter your full name'),
            phone: yup
              .string()
              .matches(phoneRegExp, 'Phone number is not valid')
              .length(10, 'Phone number must be exactly 10 digits')
              .required('Please Enter your phone number'),
            email: yup
              .string()
              .email('Invalid email')
              .required('Please enter your email'),
          })}
        >
          <CommonPersonalDetails
            showRecaptcha
            setCaptchaVerify={setCaptchaVerify}
            session={props?.session}
          />
          {/* <button onClick={() => resetform()}></button> */}
        </FormikStep>
      </FormikStepperGriev>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <RaiseGrievanceModalWrapper>
          <Grid container>
            <Grid item xs={12}>
              <div className="sucs_icon">
                <div className="check_icon">
                  <i className="fas fa-check"></i>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" align="center">
                Success!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div>
                <GrievanceReportWrapper>
                  <p>
                    Your Ticket Number is-{' '}
                    <b style={{ color: '#ee6f58' }}>{ticketNumber}</b>.
                    <br /> Your Ticket Number also been sent to
                    <br />
                    your email and phone number.
                  </p>
                </GrievanceReportWrapper>
              </div>
            </Grid>
            <ButtonWrapper>
              <a href="/">
                <button
                  style={{ padding: '10px 50px' }}
                  onClick={() => {
                    reseting;
                    setShowModal(false);
                  }}
                  className="theme-btn"
                >
                  OK
                </button>
              </a>
            </ButtonWrapper>
          </Grid>
        </RaiseGrievanceModalWrapper>
      </Modal>
    </>
  );
};

export default RaiseGrievanceForm;
