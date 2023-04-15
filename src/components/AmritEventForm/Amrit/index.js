import {
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import React, { useState } from 'react';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import { makeStyles } from '@material-ui/core/styles';
import CustomToggleButton, {
  scStData,
} from '../../ElevateFormControls/ToggleButton';
import RegisteredAddress from '../../ElevateForms/ApplicationInformation/RegisteredAddress';
import CorrespondenceAddress from '../../ElevateForms/ApplicationInformation/CorrespondenceAddress';
import UploadFiles from '../../ElevateForms/UploadFiles';
import moment from 'moment';
import { entityData } from '../AmritFormData';
import { Visibility, VisibilityOff } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  entityLabel: {
    color: '#1d293f',
  },
}));

const Amrit = (props) => {
  const classes = useStyles();
  const [panShown, setPanShown] = useState(true);
  const togglePanVisiblity = () => {
    setPanShown(panShown == true ? false : true);
  };

  var maxDate = new Date();

  function format1(date) {
    let _date = new Date(date);

    var day = ('0' + _date.getDate()).slice(-2);
    var month = ('0' + (_date.getMonth() + 1)).slice(-2);
    var year = _date.getFullYear();

    return year + '-' + month + '-' + day;
  }
  function format2(date) {
    var _date = new Date(date);

    var day = ('0' + _date.getDate()).slice(-2);
    var month = ('0' + (_date.getMonth() + 1)).slice(-2);
    var year = _date.getFullYear() - 10;

    return year + '-' + month + '-' + day;
  }
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Input
            placeholder="Enter text here"
            name="companyInformation.programName"
            label="Please enter the program /scheme you wish to apply?"
            labelKN="ದಯವಿಟ್ಟು ನೀವು ಅನ್ವಯಿಸಲು ಬಯಸುವ ಪ್ರೋಗ್ರಾಂ / ಸ್ಕೀಮ್ ಅನ್ನು ನಮೂದಿಸಿ?"
            disabled
            required
          />
        </Grid> */}
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
            label={`Date of Incorporation/ Registration of Entity (Should not have exceeded more than 10 years as on ${moment(
              '10-01-2021'
            ).format('D MMM YYYY')} )`}
            labelKN={`ಸಂಯೋಜನೆ ಅಸ್ತಿತ್ವಕ್ಕೆ ಬಂದ/ ಸಂಸ್ಥೆ ನೋಂದಣಿಯಾದ ದಿನಾಂಕ (ನಿಗದಿಗೊಳಿಸಲಾದ ದಿನಾಂಕಕ್ಕೆ ಅನ್ವಯವಾಗುವಂತೆ ಸಂಯೋಜನೆ/ನೋಂದಣಿಯಾದ ದಿನಾಂಕದವರೆಗಿನ ಅವಧಿಯು 10 ವರ್ಷದೊಳಗೆ ಇರಬೇಕು ಮತ್ತು ${moment(
              '10-01-2021'
            ).format('D MMM YYYY')})`}
            defaultValue="yyyy-mm-dd"
            inputTypeClass="date_of_incorp"
            InputProps={{
              inputProps: {
                min: format2('10/01/2021'),
                max: format1(new Date()),
              },
            }}
            className="event__incopo__date"
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
        <UploadFiles
          elevate
          label="UPLOAD REGISTRATION CERTIFICATE ( PVT/LLP/OPC/PARTNERSHIP FIRM ) "
          labelKN="ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
          name={'companyInformation.registrationCertificate'}
          size="1"
          fileSize="1048576"
          filesLimit={3}
          acceptedFiles={['.pdf']}
          required
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
            <b>OBC/Minorities Entreprenuer(s) details</b>
          </Typography>
        </div>
        <br />
        <Grid item xs={12}>
          <CustomToggleButton
            amrit={true}
            label={
              'IS YOUR STARTUP PROMOTED BY OBC/MINORITY ENTREPRENEUR(S) (ONE OR MORE DIRECTOR(S)/PARTNER(S) SHOULD BE FROM - <br/>1. OBC COMMUNITY HOLDING A MINIMUM OF 51% SHARE IN THE COMPANY / FIRM OR <br />2. MINORITY COMMUNITY HOLDING A MINIMUM OF 51% SHARE IN THE COMPANY / FIRM'
            }
            labelKN="ನಿಮ್ಮ ಸ್ಟಾರ್ಟ್ಅಪ್ OBC/ಅಲ್ಪಸಂಖ್ಯಾತ ಉದ್ಯಮದಿಂದ ಪ್ರಚಾರವಾಗಿದೆಯೇ?
(ಒಬ್ಬರು ಅಥವಾ ಹೆಚ್ಚಿನ ನಿರ್ದೇಶಕರು /ಪಾಲುದಾರ ಅವರಿಂದ ಇರಬೇಕು -<br /> 
1. ಒಬಿಸಿ ಸಮುದಾಯವು ಕಂಪನಿಯಲ್ಲಿ / ಸಂಸ್ಥೆಯಲ್ಲಿ 51% ಷೇರಿನ ಕನಿಷ್ಠ ಮೊತ್ತವನ್ನು ಹೊಂದಿದೆ ಅಥವಾ <br />
2. ಅಲ್ಪಸಂಖ್ಯಾತ ಸಮುದಾಯವು ಕಂಪನಿಯಲ್ಲಿ / ಸಂಸ್ಥೆಯಲ್ಲಿ 51% ಷೇರಿನ ಕನಿಷ್ಠ ಮೊತ್ತವನ್ನು ಹೊಂದಿದೆ)
 "
            name="companyInformation.scPromotedStartup"
            required
            images={props.images}
            disabled={true}
            scst={true}
          />
        </Grid>

        <RegisteredAddress />
        <CorrespondenceAddress />
      </Grid>
    </React.Fragment>
  );
};
export default Amrit;
