import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Input from '../../ElevateFormControls/input';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import { useField } from 'formik';
import FounderDetails from './FounderDetails';
import { districtData } from '../startupRegistrationFormData';
import FormikSelect from '../../ElevateFormControls/Select';
export default function CompanyFounder(props) {
  const [field, meta] = useField(props.name);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <div className="address__title">
          <Typography component="h1" variant="h6" align="center">
            Address (ವಿಳಾಸ)
          </Typography>
        </div>
        <br />
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 characters)'}
            name="registeration.companyFounderDetail.registeredIncorporationAddress"
            label="Registered address as per Incorporation Certificate"
            labelKN="ನಿಗಮಗೊಂಡಿರುವ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ ನೋಂದಾಯಿತ ವಿಳಾಸ"
            className="com__address space__text"
            rows={10}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter your city/town"
            name="registeration.companyFounderDetail.city"
            label="City/Town"
            labelKN="ನಗರ ಅಥವಾ ಪಟ್ಟಣ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="stpr-district">
            <FormikSelect
              items={districtData.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
              name="registeration.companyFounderDetail.district"
              label="District"
              labelKN="ಜಿಲ್ಲೆ"
              required={true}
            />
          </div>
          {/* <Input
            placeholder="Enter your district"
            name="registeration.companyFounderDetail.district"
            label="district"
            labelKN="ನಗರ ಅಥವಾ ಪಟ್ಟಣ"
            required
          /> */}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter pincode here"
            name="registeration.companyFounderDetail.pinCode"
            label="pincode"
            labelKN="ಜಿಲ್ಲೆ"
            required
            maxLength={6}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter state here"
            name="registeration.companyFounderDetail.state"
            label="State"
            labelKN="ರಾಜ್ಯ"
            required
            disabled
          />
          {/* <FormikSelect
            items={stateData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.companyFounderDetail.state"
            label="State"
            labelKN="ರಾಜ್ಯ"
            required={true}
          /> */}
        </Grid>
        <div className="address__title">
          <Typography component="h1" variant="h6" align="center">
            Company / Organization Contact Details
          </Typography>
        </div>
        <br />
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter mobile number"
            name="registeration.companyFounderDetail.mobile"
            label="mobile number"
            labelKN="ಮೊಬೈಲ್ ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
            disabled
            required
            maxLength={10}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter your email"
            name="registeration.companyFounderDetail.companyEmail"
            type="email"
            label="email"
            labelKN="ಇ-ಮೇಲ್ (ಮಿಂಚಂಚೆ)"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter landline number"
            name="registeration.companyFounderDetail.landLine"
            label="landline number"
            labelKN="ಸ್ಥಿರ ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
            maxLength={15}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter fax number"
            name="registeration.companyFounderDetail.fax"
            label="fax number"
            labelKN="ಫ್ಯಾಕ್ಸ್ ಸಂಖ್ಯೆ"
            maxLength={15}
          />
        </Grid>
      </Grid>

      <div className="address__title">
        <Typography component="h1" variant="h6" align="center">
          Founder / CEO / Advisor details
        </Typography>
      </div>
      <br />
      <FounderDetails
        name={'registeration.companyFounderDetail.founderDetails'}
      />
    </React.Fragment>
  );
}
