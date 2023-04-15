import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import React, { useState } from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import { CompanyType } from '../startupRegistrationFormData';
import { DatePicker } from '@material-ui/pickers';
import { Visibility, VisibilityOff } from '@material-ui/icons';
const CompanyInformation = (props) => {
  var maxDate = new Date();
  const [panShown, setPanShown] = useState(true);
  const togglePanVisiblity = () => {
    setPanShown(panShown == true ? false : true);
  };
  function format1(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return day + '-' + month + '-' + year;
  }
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormikSelect
            items={CompanyType.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.companyInfo.statusOfCompanyUnitUndertaking"
            label="Type of entity"
            labelKN="ಅಸ್ತಿತ್ವದ ಪ್ರಕಾರ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.companyInfo.noOfEstablishmentOrBranches"
            label="No. of Establishments/ Branches / Offices"
            labelKN="ಸ್ಥಾಪಿಸಿರುವ ಘಟಕಗಳು  / ಶಾಖೆಗಳು  / ಕಛೇರಿಗಳ ಸಂಖ್ಯೆ"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            type="date"
            placeholder="Enter commencement date (yyyy-mm-dd)"
            name="registeration.companyInfo.dateOfCommercialOperations"
            label="Commencement of Commercial Operations"
            labelKN="ವಾಣಿಜ್ಯ ಕಾರ್ಯಾಚರಣೆಗಳ ಪ್ರಾರಂಭ"
            InputProps={{
              inputProps: { max: format1(maxDate) },
            }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            type="date"
            placeholder="Enter incorporation date (yyyy-mm-dd)"
            name="registeration.companyInfo.dateOfIncorporationEstablishment"
            label="Date of Incorporation / Year of Establishment "
            labelKN="ನಿಗಮಗೊಂಡ ದಿನಾಂಕ / ಸ್ಥಾಪಿಸಿದ ವರ್ಷ"
            InputProps={{
              inputProps: { max: format1(maxDate) },
            }}
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter incorporation number"
            name="registeration.companyInfo.incorporationNumber"
            label="Company Incorporation Number"
            labelKN="ಕಂಪನಿ ನಿಗಮಿತಗೊಂಡ ಸಂಖ್ಯೆ"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            className="input__upper"
            placeholder="Enter company pan number"
            name="registeration.companyInfo.companyPanNumber"
            label="company PAN Number"
            labelKN="ಕಂಪನಿಯ ಪ್ಯಾನ್ ಸಂಖ್ಯೆ"
            maxLength={10}
            required
            shouldUppercase={true}
          />
        </Grid>
        <Grid item xs={12}>
          <UploadFiles
            elevate
            label="Upload Incorporation Certificate/partnership deed / statutory registrations"
            labelKN="ಇನ್ಕಾರ್ಪೊರೇಶನ್ ಪ್ರಮಾಣಪತ್ರ / ಪಾಲುದಾರಿಕೆ ಪತ್ರ / ಶಾಸನಬದ್ಧ ನೋಂದಣಿಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"
            name="registeration.companyInfo.licenseCertificate"
            size="1"
            fileSize="1048576"
            filesLimit={3}
            acceptedFiles={['.pdf']}
            initialValues={props.initialValues}
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default CompanyInformation;
