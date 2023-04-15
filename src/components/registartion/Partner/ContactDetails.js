import React from 'react';
import { Grid } from '@material-ui/core';
import CheckBox from '../../ElevateFormControls/CheckBox';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import { stateData } from '../partnersFormData';
const ContactDetails = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter name of spoc"
            name="registration.partnerContactInfo.spocName"
            label="Name of Spoc (Single Point of Contact)"
            labelKN="ಏಕಬಿಂದು ಸಂಪರ್ಕ(ಏ.ಮು.ಸಂ.ವ್ಯ.)ದವರ ಹೆಸರು"
            disabled={true}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter spoc mobile number"
            name="registration.partnerContactInfo.spocNumber"
            label="Spoc Mobile Number"
            labelKN="ಏ.ಮು.ಸಂ.ವ್ಯ. ರವರ ಮೊಬೈಲ್‌ ಸಂಖ್ಯೆ"
            disabled={true}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter spoc email address"
            name="registration.partnerContactInfo.spocEmail"
            label="Spoc Email"
            labelKN="ಏ.ಮು.ಸಂ.ವ್ಯ. ರವರ ಇ-ಮೇಲ್‌ ವಿಳಾಸ"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter your designation"
            name="registration.partnerContactInfo.contactPersoneDesignation"
            label="Spoc Designation"
            labelKN="ಏ.ಮು.ಸಂ.ವ್ಯ. ರವರ ಹುದ್ದೆ"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 characters)'}
            name="registration.partnerContactInfo.registeredPartnerAddress"
            label={`Register Address of Partner Company`}
            labelKN={`ಪಾಲುದಾರ ಕಂಪನಿಯ ನೋಂದಾಯಿತ ವಿಳಾಸ`}
            rows={10}
            className="com__address space__text"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter city here"
            name="registration.partnerContactInfo.cityTown"
            label="Town/city"
            labelKN="ಪಟ್ಟಣ / ನಗರ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter pincode here"
            name="registration.partnerContactInfo.pinCode"
            label="Pincode"
            labelKN="ಅಂಚೆ ಪಿನ್ ಸಂಕೇತ"
            maxLength={6}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter your district"
            name="registration.partnerContactInfo.district"
            label={'District'}
            labelKN="ಜಿಲ್ಲೆ"
            required={true}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormikSelect
            items={stateData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registration.partnerContactInfo.state"
            label={'State'}
            labelKN="ರಾಜ್ಯ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="registration.partnerContactInfo.country"
            label={'Country'}
            labelKN="ದೇಶ"
            disabled
            required={true}
          />
        </Grid>

        <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ContactDetails;
