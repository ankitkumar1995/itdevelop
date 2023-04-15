import {
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import CorrespondenceAddress from './CorrespondenceAddress';
import RegisteredAddress from './RegisteredAddress';
import UploadFiles from '../UploadFiles';
import { makeStyles } from '@material-ui/core/styles';
import SCST from './SCST';
import CustomToggleButton, {
  scStData,
} from '../../ElevateFormControls/ToggleButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  entityLabel: {
    color: '#1d293f',
  },
}));

const ElevateUnnatiForm = (props) => {
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
          items={[
            { label: 'Select', value: '' },
            { label: 'Private limited Company', value: 'pvtltd' },
            { label: 'One Person Company(OPC)', value: 'opc' },
            { label: 'LLP', value: 'llp' },
            { label: 'Partnership Firm', value: 'firm' },
          ].map((item) => {
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
          label="Date of Incorporation/ Registration of Entity (Should not have exceeded more than 10 years from Announcement date)"
          labelKN="ಸಂಯೋಜನೆ ಅಸ್ತಿತ್ವಕ್ಕೆ ಬಂದ/ ಸಂಸ್ಥೆ ನೋಂದಣಿಯಾದ ದಿನಾಂಕ (ಪ್ರಕಟಣೆಯ ದಿನಾಂಕದಿಂದ 10 ವರ್ಷಗಳಿಗಿಂತ ಹೆಚ್ಚು ಮೀರಬಾರದು)"
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
      <UploadFiles
        elevate
        label="UPLOAD REGISTRATION CERTIFICATE ( PVT/LLP/OPC/PARTNERSHIP FIRM ) "
        labelKN="ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
        name={'companyInformation.registrationCertificate'}
        size="1"
        fileSize="1048576"
        filesLimit={3}
        acceptedFiles={['.pdf']}
      />
      {/* <div className="previews">
      {
        props.images.length > 0&&
        props.images.map(im=>{
          return (<span style={{"marginLeft":"6px"}}><img src="/assets/img/pdf.png" style={{"width":"23px","marginRight":"5px"}}/>{`${im.split('_').pop().slice(0,10)}.pdf`}</span>)
        })
      }
    </div> */}

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
          images={props.images}
        />
      </Grid>

      <RegisteredAddress />
      <CorrespondenceAddress />
    </React.Fragment>
  );
};
export default ElevateUnnatiForm;
