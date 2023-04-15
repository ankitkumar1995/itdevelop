import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FormLabel, Grid } from '@material-ui/core';
import { useFormikContext, useField, Formik } from 'formik';
import Input from './input';
import FormikSelect from './Select';
import { GOKData } from '../ElevateForms/ElevateFormData';
import FormikTextArea from './FormikTextArea';
import SCST from '../ElevateForms/ApplicationInformation/SCST';

const useStyles = makeStyles((theme) => ({
  tgBackground: {
    padding: '15px 20px',
    backgroundColor: '#f8f8fc',
    marginBottom: '21px',
  },
  tgLabel: {
    marginBottom: '20px',
    color: '#000',
    fontFamily: 'Manrope',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: '500',
    letterSpacing: '0.5px',
    lineHeight: '17px',
  },
  toggleButton: {
    marginRight: '30px',
    borderRadius: '25px !important',
    width: '85px',
    height: '30px',
    color: '#9896AE',
    fontFamily: 'Manrope',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    lineHeight: '19px',
    textAlign: 'center',
    border: '1px solid #9896AE !important',
  },
  toggleButtonGroup: {
    '& .MuiToggleButton-root': {
      backgroundColor: 'white',
      padding: '10px 35px',
    },
    '& .MuiToggleButton-root:hover': {
      backgroundColor: '#1f3c88',
    },
    '& .Mui-selected': {
      backgroundColor: '#1f3c88',
      color: 'white',
    },
  },
  dropdown: {
    top: '160px !important',
  },
}));
export const copyAddress = { val: false };
export const copyData = { val: false };
export const scStData = { val: false };
const CustomToggleCopy = (props) => {
  const { label, name, labelKN, placeHolder, required, className, ...others } =
    props;
  const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext();
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const classes = useStyles();
  const handleRoleChange = (event, value) => {
    if (value !== null) {
      setFieldValue(field.name, value);
    }
  };
  return (
    <>
      <div className={classes.tgBackground}>
        <FormLabel component="legend" className={classes.tgLabel}>
          <div>
            {label}
            {required && (
              <span className="important_sym" style={{ color: '#f4433' }}>
                &nbsp;*
              </span>
            )}
            <br />
            {labelKN}
          </div>
        </FormLabel>
        <ToggleButtonGroup
          value={field.value}
          exclusive
          helperText={ErrorText}
          error={!!ErrorText}
          onChange={handleRoleChange}
          className={classes.toggleButtonGroup}
          aria-label="text alignment"
        >
          <ToggleButton
            value={true}
            helperText={ErrorText}
            error={!!ErrorText}
            aria-label="left aligned"
            className={classes.toggleButton}
            onClick={(event) => {
              props.handler(setFieldValue, values);
            }}
          >
            Yes
          </ToggleButton>
          {'  '}
          <ToggleButton
            value={false}
            helperText={ErrorText}
            error={!!ErrorText}
            aria-label="centered"
            className={classes.toggleButton}
            onClick={(event) => {
              props.noHandler(setFieldValue, values);
            }}
          >
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="toggle_err">
        <p class="toggle_butn_err_text">{name && ErrorText}</p>
      </div>
      {field.value && props.name == 'selfCertification.womenStartup' && (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Input
              placeholder="Enter name here"
              name="selfCertification.details.nameOfWomenEntrepreneur"
              label="Name of women entrepreneur "
              labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಹೆಸರು"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              placeholder="Enter designation here"
              name="selfCertification.details.designationOfWomenEntrepreneur"
              label="Designation of women entrepreneur "
              labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಹುದ್ದೆ"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              placeholder="Enter mobile number here"
              name="selfCertification.details.mobileNumber"
              label="Mobile number of women entrepreneur "
              labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
              maxLength={10}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              type="email"
              placeholder="Enter email here"
              name="selfCertification.details.email"
              label="Email of women entrepreneur "
              labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಇ-ಮೇಲ್"
              required
            />
          </Grid>
        </Grid>
      )}
      {field.value &&
        props.name == 'companyDescription.receivedFinancialSupport' && (
          <Grid container spacing={3} style={{ marginBottom: '10px' }}>
            <Grid item xs={6}>
              <Input
                placeholder="Enter text here"
                name="companyDescription.nameOfAward"
                label="Name of Award"
                labelKN="ಪ್ರಶಸ್ತಿಯ ಹೆಸರು"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                placeholder="Enter text here"
                name="companyDescription.fundingAmount"
                label="Funding Amount(in rupees)"
                labelKN="ನಿಧಿಯ ಮೊತ್ತ(ರೂಪಾಯಿಯಲ್ಲಿ)"
                required
              />
            </Grid>
          </Grid>
        )}
      {field.value && props.name == 'companyDescription.awardWinnerGOK' && (
        <Grid container spacing={3} style={{ marginBottom: '10px' }}>
          <Grid item xs={6}>
            <Input
              placeholder="Enter text here"
              name="companyDescription.nameOfGOKAward"
              label="Name of Gok Award"
              labelKN="ಜಿಒಕೆ ಪ್ರಶಸ್ತಿಯ ಹೆಸರು"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              placeholder="Enter amount here (not to exceed 50 characters)"
              name="companyDescription.GOKfundingAmount"
              label="Funding Amount(in rupees)"
              labelKN="ನಿಧಿಯ ಮೊತ್ತ(ರೂಪಾಯಿಯಲ್ಲಿ)"
              required
            />
          </Grid>
        </Grid>
      )}
      {field.value && props.name == 'companyDescription.incubatedInGOK' && (
        <Formik
          initialValues={{
            nameOfIncubator: '',
          }}
        >
          <Grid item xs={12}>
            <FormikSelect
              items={GOKData.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
              name="companyDescription.incubatedInGOK"
              label={'GoK supported incubator you are affiliated with'}
              labelKN="ನೀವು ಸಂಯೋಜಿತವಾಗಿರುವ ಜಿಒಕೆ ಬೆಂಬಲಿತ ಇನ್ಕ್ಯುಬೇಟರ್"
              required={true}
              errorString="Please select one option"
              className={classes.dropdown}
            />
          </Grid>
        </Formik>
      )}
      {field.value && props.name == 'companyDescription.anyMentors' && (
        <Formik
          initialValues={{
            nameOfMentors: [],
          }}
        >
          <Grid item xs={12} style={{ marginBottom: '3.5rem' }}>
            <FormikTextArea
              placeholder="Enter the name of mentors (not to exceed 250 characters)"
              label="Please mention the name(s) of Mentors / Advisors on board (seperate each name with a comma or a semicolon)"
              labelKN="ದಯವಿಟ್ಟು ನಿಮ್ಮ ಮಂಡಳಿಯಲ್ಲಿ ಮಾರ್ಗದರ್ಶಕರು / ಸಲಹೆಗಾರರ ​​ಹೆಸರು (ಗಳನ್ನು) ನಮೂದಿಸಿ (ಪ್ರತಿ ಹೆಸರನ್ನು ಅಲ್ಪವಿರಾಮ ಅಥವಾ ಅರ್ಧವಿರಾಮ ಚಿಹ್ನೆಯಿಂದ ಬೇರ್ಪಡಿಸಿ)"
              name="companyDescription.anyMentors"
              rows={2}
              required
            />
          </Grid>
        </Formik>
      )}
      {name === 'companyInformation.correspondnceSame' && field.value === true
        ? (copyAddress.val = true)
        : (copyAddress.val = false)}
      {name === 'companyInformation.scPromotedStartup' &&
        field.value === true && (
          <SCST name={'companyInformation.scStDetails'} />
        )}
    </>
  );
};

export default CustomToggleCopy;
