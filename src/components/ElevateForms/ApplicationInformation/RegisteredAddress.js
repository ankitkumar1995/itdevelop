import { Grid, Typography } from '@material-ui/core';
import { Formik, yupToFormErrors } from 'formik';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import { cityData } from '../ElevateFormData';
import * as yup from 'yup';
import { copyAddress } from '../../ElevateFormControls/ToggleButton';
const RegisteredAddress = () => {
  return (
    <>
      <div className="address__title">
        <Typography component="h1" variant="h6" align="center">
          Registered Address (Mandatory)
        </Typography>
      </div>
      <br />

      <Grid item xs={12}>
        <FormikTextArea
          placeholder={
            'Enter registered address here (not to exceed 300 characters)'
          }
          name="companyInformation.registeredAddress.registeredAddress"
          label={`Registered Address of the Entity(As per incorporation/registration certificate )`}
          labelKN="ಸಂಸ್ಥೆಯ ನೋಂದಾಯಿತ ವಿಳಾಸ(ಸಂಯೋಜನೆ/ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ)"
          rows={4}
          className="register__text__address"
          required
        />
      </Grid>
      <Grid item xs={6} style={{ marginTop: '20px' }}>
        <FormikSelect
          items={cityData.map((item) => {
            return {
              value: item.value,
              label: item.label,
            };
          })}
          name="companyInformation.registeredAddress.district"
          label={'District'}
          labelKN="ಜಿಲ್ಲೆ"
          required={true}
          placeholder="Select"
        />
      </Grid>
      <Grid item xs={6} style={{ marginTop: '20px' }}>
        <Input
          placeholder="Enter your city/village/taluk here (not to exceed 50 characters)"
          name="companyInformation.registeredAddress.city"
          label="City/Village/Taluk"
          labelKN="ನಗರ/ಗ್ರಾಮ/ತಾಲ್ಲೂಕು"
          handler={(setFieldValue, values) => {
            setFieldValue(
              'companyInformation.registeredAddress.pincode',
              values.companyInformation.registeredAddress.city
            );
          }}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          placeholder="Enter state here"
          name="companyInformation.registeredAddress.state"
          label="State"
          labelKN="ರಾಜ್ಯ"
          required
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          placeholder="Enter pincode here"
          name="companyInformation.registeredAddress.pincode"
          label="Pincode"
          labelKN="ಪಿನ್ ಸಂಖ್ಯೆ"
          required
          maxLength={6}
        />
      </Grid>
      {/* </Formik> */}
    </>
  );
};
export default RegisteredAddress;
