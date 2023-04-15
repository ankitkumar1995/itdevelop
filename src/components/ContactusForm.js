import { Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { entityData } from './AmritEventForm/AmritFormData';
import SelectFormik from './registartion/forms/selectformik';

import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { BASE_URL } from '../pages/api/url';
import Input from './ElevateFormControls/input';
import FormikTextArea from './ElevateFormControls/FormikTextArea';
import { useState } from 'react';
import CommonModalStrap from './CommonModalStrap';
import RecaptchaAdd from './RecaptchaAdd';
import CheckAndSuccessModal from './CheckAndSuccessModal';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    padding: '19px',
    width: '50%',
    // marginLeft: '20px',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
}));
function ContactusForm() {
  const [showModal, setShowModal] = useState(false);
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const htmlBodyData = (name, email, phone, companyName, companyType, msg) => {
    return `<div>
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
         <p className="px-1"><b>Company Name:</b> ${companyName}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Company type:</b> ${companyType}</p>
      </div>
      <div style={{ display: 'flex' }}>
       <p className="px-1"><b>Message:</b> ${msg}</p>
      </div>
    </div>`;
  };
  const classes = useStyles();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          companyName: '',
          companyType: '',
          msg: '',
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .matches(/^[a-zA-Z ]*$/, 'Full name contain only alphabets')
            .required('Please enter your name'),
          phone: yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Please enter phone number'),
          email: yup
            .string()
            .email('Invalid email')
            .required('Please enter email'),
          companyName: yup
            .string()
            .min(2, 'Enter atleast 2 character')
            .max(100, 'max 100 character are allowed')
            .required('Please enter company name'),
          companyType: yup.string().required('Please select company type'),
          msg: yup.string().max(499, 'Max. 500 characters are allowed'),
        })}
        validateOnChange
        onSubmit={async (values) => {
          const res = await axios
            .post(`${BASE_URL}/api/v1/email/`, {
              addresses: ['startupcell@karnataka.gov.in'],
              ccAddresses: ['gm3kbits@gmail.com'],
              body: htmlBodyData(
                values.name,
                values.email,
                values.phone,
                values.companyName,
                values.companyType,
                values.msg
              ),
              subject: 'Contact Us',
            })
            .then(async (res) => {
              if (res) {
                setShowModal(true);
              }
            })
            .catch((err) => {
              setShowModal(false);
            });
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input
                  name="name"
                  placeholder="Enter your name"
                  label="FULL NAME"
                  labelKN="ಸಂಪೂರ್ಣ ಹೆಸರು"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="phone"
                  placeholder="Enter your phone number"
                  label="Phone Number"
                  labelKN="ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
                  maxLength={10}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="email"
                  placeholder="Enter your email"
                  label="Email"
                  labelKN="ಇ-ಮೇಲ್"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="companyName"
                  placeholder="Enter company name"
                  label="COMPANY NAME"
                  labelKN="ಕಂಪನಿಯ ಹೆಸರು"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectFormik
                  items={[
                    {
                      label: 'Private Limited Company (PVT)',
                      value: 'Private Limited Company (PVT)',
                    },
                    {
                      label: 'Limited Liability Partnership (LLP)',
                      value: 'Limited Liability Partnership (LLP)',
                    },
                    {
                      label: 'One Person Company (OPC)',
                      value: 'One Person Company (OPC)',
                    },
                    {
                      label: 'Partnership Firm',
                      value: 'Partnership Firm',
                    },
                  ].map((item) => {
                    return {
                      value: item.value,
                      label: item.label,
                    };
                  })}
                  name="companyType"
                  label="Comapny Type"
                  labelKN="ಕಂಪನಿಯ ವಿಧ"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextArea
                  placeholder={'Enter text here (not to exceed 500 characters)'}
                  name="msg"
                  label={`Your Message`}
                  labelKN="ನಿಮ್ಮ ಸಂದೇಶ"
                  rows={10}
                  className="small__label contact"
                />
              </Grid>
              <Grid item xs={12}>
                <RecaptchaAdd setCaptchaVerify={setCaptchaVerify} />
              </Grid>
            </Grid>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                disabled={captchaVerify === false ? true : false}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <CheckAndSuccessModal
        displaySuccess
        successMessage={'Success'}
        show={showModal}
        customMessage={
          'Thank You, Your Request has been sent to Startup Karnataka'
        }
      />
      {/* <CommonModalStrap
        show={show}
        successMessage={
          'Thank You, Your Request has been sent to Startup Karnataka,'
        }
        onClose={() => setShow()}
        redirect="/"
      /> */}
    </>
  );
}

export default ContactusForm;
