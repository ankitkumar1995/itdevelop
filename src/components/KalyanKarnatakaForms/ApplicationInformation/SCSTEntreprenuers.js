import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import { categoryData } from '../ElevateFormData';
import UploadFiles from '../UploadFiles';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import { copyData } from '../../ElevateFormControls/ToggleButton';
const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '12px',
    color: '#9896ae',
    textDecoration: 'uppercase',
  },
  circlePlus: {
    display: 'flex',
    marginLeft: '20px',
    marginTop: '30px',
    alignItems: 'center',
    gap: '20px',
    color: '#1f3c88',
    letterSpacing: '0.5px',
    fontWeight: '600',
    width: '1100px',
  },
  addButton: {
    border: 'none',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    color: '#1f3c88',
  },
  closeBtn: {
    // border: '1px solid #ccc',
    background: 'none',
    border: 'none',
    color: '#ee6f57',
  },
  flexBtn: {
    width: '1280px',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));

const SCSTEntreprenuers = () => {
  const [fields, setFields] = useState([]);

  const classes = useStyles();

  const handleAdd = () => {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  };

  const handleRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  return (
    <>
      <div className="address__title">
        <Typography component="h1" variant="h6" align="center">
          SC/ST Entreprenuer(s) details
        </Typography>
      </div>
      <br />
      <Grid item xs={12}>
        <CustomToggleButton
          label="Is your startup promoted by SC/ST Entrepreneur(s)? (One or more Director(s)/ Partner(s) should be from Scheduled Caste/ Scheduled Tribe community holding a minimum of 70% Share in the Company/Firm)"
          labelKN="ಪರಿಶಿಷ್ಟ ಜಾತಿ/ ಪರಿಶಿಷ್ಟ ಪಂಗಡದ ಉದ್ಯಮಿಗಳು ನಿಮ್ಮ ನವೋದ್ಯಮದ ಪ್ರವರ್ತಕರಾಗಿದ್ದಾರೆಯೇ? (ಒಬ್ಬರು ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ನಿರ್ದೇಶಕ (ರು)/ ಪಾಲುದಾರ (ರು) ಪರಿಶಿಷ್ಟ ಜಾತಿ/ ಪರಿಶಿಷ್ಟ ಪಂಗಡ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿದವರಾಗಿದ್ದು, ಅವರು ಕಂಪನಿ/ಸಂಸ್ಥೆಯಲ್ಲಿ ಕನಿಷ್ಠ ಶೇ 70ರಷ್ಟು ಷೇರುಗಳನ್ನು ಹೊಂದಿರಬೇಕು) "
          name="companyInformation.scPromotedStartup"
          required
        />
      </Grid>
      {
        <>
          <Grid item xs={12}>
            <Input
              placeholder="Enter name of the stakeholder here"
              name="companyInformation.stakeHolderName"
              label="Name of the Stakeholder"
              labelKN="ಮಧ್ಯಸ್ಥಗಾರರ ಹೆಸರು"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              placeholder="Enter RD number of the stakeholder here"
              name="companyInformation.rdNumber"
              label="RD number of the stakeholder"
              labelKN="ಸ್ಟೇಕ್‌ಹೋಲ್ಡರ್‌ನ ಆರ್ಡಿ ಸಂಖ್ಯೆ"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              placeholder="Enter amount here"
              name="companyInformation.sharePercentage"
              label="Amount of share held (in percentage)"
              labelKN="ಶೇಕಡಾವಾರು ಹೊಂದಿರುವ ಪಾಲಿನ ಮೊತ್ತ"
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormikSelect
              items={categoryData.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
              name="companyInformation.category"
              label="Category (SC/ST/Others)"
              labelKN="ವರ್ಗ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಇತರೆ)"
              required={true}
            />
          </Grid>
          <UploadFiles
            elevate
            className={classes.text}
            label="Please upload the Digital Caste Certificates of the Stakeholder issued from Revenue Department (Nadakacheri) Government of Karnataka"
            labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಕಂದಾಯ ಇಲಾಖೆ (ನಾಡಕಛೇರಿ)ಯಿಂದ ನೀಡಿರುವ ಹಿತಾಸಕ್ತರುಗಳ ಡಿಜಿಟಲ್‌ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ದಯವಿಟ್ಟು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
            name={'companyInformation.scStDetails.digitalCasteCerti'}
            size="1"
            fileSize="1048576"
          />
          <UploadFiles
            elevate
            className={classes.text}
            label="Upload the MoA"
            labelKN="ಒಪ್ಪಂದದ ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
            name={'companyInformation.scStDetails.moa'}
            size="1"
            fileSize="1048576"
          />
        </>
      }
      <Grid item xs={6}>
        <FormikSelect
          items={categoryData.map((item) => {
            return {
              value: item.value,
              label: item.label,
            };
          })}
          name="companyInformation.category"
          label="Category (SC/ST/Others)"
          labelKN="ವರ್ಗ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಇತರೆ)"
          required={true}
        />
      </Grid>
      <UploadFiles
        elevate
        className={classes.text}
        label="Please upload the Digital Caste Certificates of the Stakeholder issued from Revenue Department (Nadakacheri) Government of Karnataka"
        labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಕಂದಾಯ ಇಲಾಖೆ (ನಾಡಕಛೇರಿ)ಯಿಂದ ನೀಡಿರುವ ಹಿತಾಸಕ್ತರುಗಳ ಡಿಜಿಟಲ್‌ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ದಯವಿಟ್ಟು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
        name={'companyInformation.scStDetails.digitalCasteCerti'}
        size="1"
        fileSize="1048576"
        acceptedFiles={['.pdf']}
      />
      <UploadFiles
        elevate
        className={classes.text}
        label="Upload the MoA"
        labelKN="ಒಪ್ಪಂದದ ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
        name={'companyInformation.scStDetails.moa'}
        size="1"
        fileSize="1048576"
        acceptedFiles={['.pdf']}
      />
      <div className={classes.circlePlus}>
        <button
          type="button"
          className={classes.addButton}
          onClick={() => handleAdd()}
        >
          <i className="fas fa-plus-circle fa-3x"></i>
          <Typography component="h1" variant="h6" style={{ color: '#1D293F' }}>
            Add more SC/ST Entrepreneurs
          </Typography>
          <Typography component="h5" variant="h6" style={{ color: '#1D293F' }}>
            (ಹೆಚ್ಚು ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಉದ್ಯಮಿಗಳನ್ನು ಸೇರಿಸಿ)
          </Typography>
        </button>
      </div>
      {fields.map((field, idx) => {
        return (
          <>
            <div className={classes.flexBtn}>
              <button
                className={classes.closeBtn}
                type="button"
                onClick={() => handleRemove(idx)}
                key={`${field}-${idx}`}
              >
                <i class="fas fa-times-circle fa-2x"></i>
              </button>
            </div>
            <Grid item xs={12}>
              <Input
                placeholder="Enter name of the stakeholder here"
                name="companyInformation.stakeHolderName"
                label="Name of the Stakeholder"
                labelKN="ಮಧ್ಯಸ್ಥಗಾರರ ಹೆಸರು"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                placeholder="Enter RD number of the stakeholder here"
                name="companyInformation.rdNumber"
                label="RD number of the stakeholder"
                labelKN="ಸ್ಟೇಕ್‌ಹೋಲ್ಡರ್‌ನ ಆರ್ಡಿ ಸಂಖ್ಯೆ"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                placeholder="Enter amount here"
                name="companyInformation.sharePercentage"
                label="Amount of share held (in percentage)"
                labelKN="ಶೇಕಡಾವಾರು ಹೊಂದಿರುವ ಪಾಲಿನ ಮೊತ್ತ"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormikSelect
                items={categoryData.map((item) => {
                  return {
                    value: item.value,
                    label: item.label,
                  };
                })}
                name="companyInformation.category"
                label="Category (SC/ST/Others)"
                labelKN="ವರ್ಗ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಇತರೆ)"
                required={true}
              />
            </Grid>
            <UploadFiles
              elevate
              className={classes.text}
              label="Please upload the Digital Caste Certificates of the Stakeholder issued from Revenue Department (Nadakacheri) Government of Karnataka"
              labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಕಂದಾಯ ಇಲಾಖೆ (ನಾಡಕಛೇರಿ)ಯಿಂದ ನೀಡಿರುವ ಹಿತಾಸಕ್ತರುಗಳ ಡಿಜಿಟಲ್‌ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ದಯವಿಟ್ಟು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
              name={'companyInformation.scStDetails.digitalCasteCerti'}
              size="1"
              fileSize="1048576"
              acceptedFiles={['.pdf']}
            />
            <UploadFiles
              elevate
              className={classes.text}
              label="Upload the MoA"
              labelKN="ಒಪ್ಪಂದದ ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
              name={'companyInformation.scStDetails.moa'}
              size="1"
              fileSize="1048576"
              acceptedFiles={['.pdf']}
            />
          </>
        );
      })}
    </>
  );
};
export default SCSTEntreprenuers;
