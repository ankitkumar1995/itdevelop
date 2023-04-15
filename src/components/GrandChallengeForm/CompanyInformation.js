import {
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Input from '../ElevateFormControls/input';
import FormikSelect from '../ElevateFormControls/Select';
import { makeStyles } from '@material-ui/core/styles';
import CustomToggleButton from '../ElevateFormControls/ToggleButton';
import RegisteredAddress from '../ElevateForms/ApplicationInformation/RegisteredAddress';
import CorrespondenceAddress from '../ElevateForms/ApplicationInformation/CorrespondenceAddress';
import { entityData } from '../AmritEventForm/AmritFormData';
import UploadFiles from '../ElevateForms/UploadFiles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  entityLabel: {
    color: '#1d293f',
  },
}));

const CompanyInformation = (props) => {
  const classes = useStyles();
  const [panShown, setPanShown] = useState(true);
  const togglePanVisiblity = () => {
    setPanShown(panShown == true ? false : true);
  };
  var maxDate = new Date();

  function format1(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }
  function format2(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear() - 10;

    return year + '-' + month + '-' + day;
  }
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            placeholder="Enter text here"
            name="companyInformation.nameOfCompany"
            label="Name of the Company / Firm (As per incorporation / registration certificate)"
            labelKN="ಕಂಪನಿ/ ಸಂಸ್ಥೆಯ ಹೆಸರು (ನೋಂದಣಿ ಪ್ರಕಾರ)"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormikSelect
            items={entityData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="companyInformation.entityType"
            label={'Type of entity '}
            labelKN="ಸಂಸ್ಥೆಯ/ ಕಂಪನಿಯ ಮಾದರಿ"
            required={true}
            className={classes.entityLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="date"
            placeholder="Enter text here"
            name="companyInformation.incorporationDate"
            label="Date of Incorporation/ Registration of Entity (Should not have exceeded more than 10 years)"
            labelKN="ಸಂಯೋಜನೆ ಅಸ್ತಿತ್ವಕ್ಕೆ ಬಂದ/ ಸಂಸ್ಥೆ ನೋಂದಣಿಯಾದ ದಿನಾಂಕ (ನಿಗದಿಗೊಳಿಸಲಾದ ದಿನಾಂಕಕ್ಕೆ ಅನ್ವಯವಾಗುವಂತೆ ಸಂಯೋಜನೆ/ನೋಂದಣಿಯಾದ ದಿನಾಂಕದವರೆಗಿನ ಅವಧಿಯು 10 ವರ್ಷದೊಳಗೆ ಇರಬೇಕು)"
            defaultValue="yyyy-mm-dd"
            inputTypeClass="date_of_incorp"
            InputProps={{
              inputProps: { min: format2(maxDate), max: format1(maxDate) },
            }}
            format="MM/dd/yyyy"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Enter incorporation/registration number"
            name="companyInformation.registrationNumber"
            label="Incorporation/Registration Number as per incorporation (As per incorporation / registration certificate) "
            labelKN="ಸಂಯೋಜನೆಯ ಪ್ರಕಾರ ಸಂಯೋಜನೆ / ನೋಂದಣಿ ಸಂಖ್ಯೆ (ಸಂಯೋಜನೆ / ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ) "
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            type={panShown ? 'password' : 'text'}
            className="input__upper"
            placeholder="Enter company pan number"
            name="companyInformation.companyPan"
            label="Company pan number"
            labelKN="ಕಂಪನಿ ಪ್ಯಾನ್ (PAN) ಸಂಖ್ಯೆ"
            maxLength={10}
            required
            shouldUppercase={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePanVisiblity} edge="end">
                    {panShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            placeholder="Enter company website"
            name="companyInformation.website"
            label="Company Website"
            labelKN="ಕಂಪನಿಯ ಅಂತರ್ಜಾಲ"
          />
        </Grid>
        {/* <div className="cust__toggle">
          <CustomToggleButton
            label="Is your startup registered under Karnataka Startup Cell ?"
            labelKN="ನಿಮ್ಮ ನವೋದ್ಯಮವು ಕರ್ನಾಟಕ ನವೋದ್ಯಮ ಕೋಶದಡಿ ನೋಂದಣಿಯಾಗಿದೆಯೇ?"
            name="companyInformation.regUnderKarnatakaCell"
            required
          />
        </div> */}
        <UploadFiles
          elevate
          label="UPLOAD INCORPORATION/REGISTRATION CERTIFICATE ( PVT/LLP/OPC/PARTNERSHIP FIRM ) "
          labelKN="ಸಂಯೋಜನೆ / ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"
          name={'companyInformation.registrationCertificate'}
          size="1"
          fileSize="1048576"
          filesLimit={3}
          acceptedFiles={['.pdf']}
          required
        />
        <RegisteredAddress />
        <CorrespondenceAddress />
      </Grid>
    </React.Fragment>
  );
};
export default CompanyInformation;
