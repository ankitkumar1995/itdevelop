import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import UploadFiles from '../UploadFiles';
import CorrespondenceAddress from './CorrespondenceAddress';
import RegisteredAddress from './RegisteredAddress';

const ElevateForm = (props) => {
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
    <React.Fragment style={{ margin: '-10px' }}>
      <Grid item xs={12}>
        <Input
          placeholder="Enter name of the company here"
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
            { label: 'Private limited Company', value: 'plc' },
            { label: 'One person company(OPC)', value: 'opc' },
            { label: 'LLP', value: 'llp' },
            { label: 'partnership firm', value: 'partnershipFirm' },
          ].map((item) => {
            return {
              value: item.value,
              label: item.label,
            };
          })}
          name="companyInformation.entityType"
          label={'Type of Entity '}
          labelKN={'ಸಂಸ್ಥೆಯ/ ಕಂಪನಿಯ ಮಾದರಿ'}
          required={true}
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          type="date"
          placeholder="Enter date of incorporation/registration here"
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
          placeholder="Enter incorporation/registration number here"
          name="companyInformation.registrationNumber"
          label="Incorporation/Registration Number as per incorporation (As per incorporation / registration certificate) "
          labelKN="ಸಂಯೋಜನೆ ಪ್ರಮಾಣಪತ್ರ / ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ"
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          type={panShown ? 'password' : 'text'}
          placeholder="Enter company pan number here"
          name="companyInformation.companyPan"
          label="Company pan number"
          labelKN="ಕಂಪನಿ ಪ್ಯಾನ್ (PAN) ಸಂಖ್ಯೆ"
          maxLength={10}
          inputClassName="comapny-pan"
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
          placeholder="Enter company website here"
          name="companyInformation.website"
          label="Company Website"
          labelKN="ಕಂಪನಿಯ ಅಂತರ್ಜಾಲ"
        />
      </Grid>

      <UploadFiles
        elevate
        label="UPLOAD REGISTRATION CERTIFICATE ( PVT/LLP/OPC/PARTNERSHIP FIRM )"
        labelKN="ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
        // name={'supportingDocs.pitchDeck'}
        name="companyInformation.registrationCertificate"
        size="1"
        fileSize="1048576"
        filesLimit={3}
        acceptedFiles={['.pdf']}
        initialValues={props.initialValues}
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
      <RegisteredAddress />
      <CorrespondenceAddress />
    </React.Fragment>
  );
};
export default ElevateForm;
