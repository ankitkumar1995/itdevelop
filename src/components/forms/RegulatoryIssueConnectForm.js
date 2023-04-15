import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import Input from '../ElevateFormControls/input';
import FormikTextArea from '../ElevateFormControls/FormikTextArea';
import CustomToggleButton from '../ElevateFormControls/ToggleButton';
import { BASE_URL } from '../../pages/api/url';
import axios from 'axios';
import CheckAndSuccessModal from '../CheckAndSuccessModal';
import RecaptchaAdd from '../RecaptchaAdd';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    marginLeft: '0',
    color: 'white',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
    width: '265px',
    textAlign: 'center',
  },
  lineSeperater: {
    backgroundColor: '#f52e0a',
    height: '2px',
    width: '78%',
    margin: 'auto',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    textTransform: 'uppercase',
  },
  toggleLabel: {
    fontSize: '12.5px',
    color: '#333',
    textTransform: 'uppercase',
  },
}));

const RegulatoryIssueConnectForm = (props) => {
  const classes = useStyles();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const htmlBodyData = (
    startupCompanyName,
    founderCoFounderName,
    email,
    mobileNumber,
    productDescription,
    emergingTechUsed,
    degreeImpact,
    emailBody,
    pleaseSpecify,
    briefAbout
  ) => {
    return `<div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Startup company name: </b>${startupCompanyName}</p>
      </div>
       <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Founder / Co-founder name: </b>${founderCoFounderName}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Email:</b> ${email}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Phone:</b> ${mobileNumber}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Product description</b> ${productDescription}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Emerging technologies used</b> ${emergingTechUsed}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Degree of disruption / social imapact</b> ${degreeImpact}</p>
      </div>
      <div style={{ display: 'flex' }}>
       <p className="px-1"><b>Support required from government</b> ${emailBody}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Department</b> ${pleaseSpecify}</p>
      </div>
      <div style={{ display: 'flex' }}>
         <p className="px-1"><b>Issue:</b> ${briefAbout}</p>
      </div>
    </div>`;
  };
  return (
    <>
      <Formik
        initialValues={{
          startupCompanyName: '',
          founderCoFounderName: '',
          email: '',
          mobileNumber: '',
          productDescription: '',
          emergingTechUsed: '',
          degreeImpact: '',
          emailBody: '',
          pleaseSpecify: '',
          briefAbout: '',
        }}
        validationSchema={Yup.object({
          startupCompanyName: Yup.string().required(
            'Please enter company name'
          ),
          founderCoFounderName: Yup.string().required(
            'Please enter founder/co-founder Name'
          ),
          email: Yup.string().required('Please enter email '),
          mobileNumber: Yup.string().required('Please enter mobile number'),
          productDescription: Yup.string()
            .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
            .required('This is required field'),
          emergingTechUsed: Yup.string()
            .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
            .required('This is required field'),
          degreeImpact: Yup.string()
            .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
            .required('This is required field'),
          emailBody: Yup.string().required('Please select yes or no '),
          pleaseSpecify: Yup.string()
            .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
            .required('This is required field'),
          briefAbout: Yup.string()
            .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
            .required('This is required field'),
        })}
        validateOnBlur
        onSubmit={async (values, helpers) => {
          setDisableSubmit(true);
          const res = await axios
            .post(`${BASE_URL}/api/v1/email/`, {
              addresses: ['startupcell@karnataka.gov.in'],
              ccAddresses: ['gm3kbits@gmail.com'],
              body: htmlBodyData(
                values.startupCompanyName,
                values.founderCoFounderName,
                values.email,
                values.mobileNumber,
                values.productDescription,
                values.emergingTechUsed,
                values.degreeImpact,
                values.emailBody,
                values.pleaseSpecify,
                values.briefAbout
              ),
              subject: 'Regulatory Connect',
            })
            .then(async (res) => {
              if (res) {
                setDisableSubmit(false);
                setShowModal(true);
              }
            })
            .catch((err) => {
              setDisableSubmit(false);
              setShowModal(false);
            });
        }}
      >
        {({ values }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  name="startupCompanyName"
                  label="Startup Company name"
                  labelKN="ನವೋದ್ಯಮ ಕಂಪನಿಯ ಹೆಸರು"
                  placeholder="Enter text here"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  name="founderCoFounderName"
                  label="Founder / Co-Founder Name"
                  labelKN="ಸಂಸ್ಥಾಪಕರು /ಸಹಸಂಸ್ಥಾಪಕರ ಹೆಸರು"
                  placeholder="Enter text here"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  name="email"
                  label="Email"
                  labelKN="ಇ-ಮೇಲ್‌ ವಿಳಾಸ"
                  placeholder="Enter text here"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                  name="mobileNumber"
                  label="Mobile Number"
                  labelKN="ಮೊಬೈಲ್‌ ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
                  placeholder="Enter number here"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextArea
                  required
                  name="productDescription"
                  label="Product Description"
                  labelKN="ಉತ್ಪನ್ನ ಲಕ್ಷಣವಿವರ"
                  className="regulatory"
                  placeholder="Enter text here (not to exceed 250 words)"
                  rows={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextArea
                  required
                  name="emergingTechUsed"
                  label="Emerging Tech Used"
                  labelKN="ಬಳಕೆ ಮಾಡಲಾಗುತ್ತಿರುವ ಉದಯೋನ್ಮುಖ ತಂತ್ರಜ್ಞಾನ"
                  className="regulatory"
                  placeholder="Enter text here (not to exceed 250 words)"
                  rows={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextArea
                  required
                  name="degreeImpact"
                  label="Degree of Disruption / Social Impact"
                  labelKN="ಕ್ರಾಂತಿಕಾರಕ ಮಟ್ಟ / ಸಾಮಾಜಿಕ ಪರಿಣಾಮ"
                  className="regulatory"
                  placeholder="Enter text here (not to exceed 250 words)"
                  rows={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomToggleButton
                  required
                  label="Support Required from Government?"
                  labelKN="ಸರ್ಕಾರದಿಂದ ಬೆಂಬಲವನ್ನು ಬಯಸುವಿರೇ?"
                  name="emailBody"
                  handleClick={props.handleClick}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextArea
                  required
                  name="pleaseSpecify"
                  label="Please Specify the department"
                  labelKN="ನೀವು ಎದುರಿಸುತ್ತಿರುವ ನಿಯಾಮಾತ್ಮಕ ಸಮಸ್ಯೆಗಳನ್ನು ದಯವಿಟ್ಟು
                          ನಿರ್ದಿಷ್ಟಪಡಿಸಿ.?"
                  className="regulatory"
                  placeholder="Enter text here (not to exceed 250 words)"
                  rows={8}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextArea
                  required
                  name="briefAbout"
                  label="Brief About the issue"
                  labelKN="ಎದುರಿಸುತ್ತಿರುವ ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ"
                  className="regulatory"
                  placeholder="Enter text here (not to exceed 250 words)"
                  rows={8}
                />
              </Grid>
              <Grid item xs={12}>
                <RecaptchaAdd setCaptchaVerify={setCaptchaVerify} />
              </Grid>
              <Grid item xs={12}>
                <div style={{ textAlign: 'center' }}>
                  <ButtonWrapper className={classes.btnWrap}>
                    <Button
                      type="submit"
                      className={classes.button}
                      disabled={captchaVerify === false ? true : disableSubmit}
                    >
                      Submit
                    </Button>
                  </ButtonWrapper>
                </div>
              </Grid>
            </Grid>
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
    </>
  );
};

export default RegulatoryIssueConnectForm;
