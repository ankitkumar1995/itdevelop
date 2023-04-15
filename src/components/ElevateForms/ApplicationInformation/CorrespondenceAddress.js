import { Grid, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import { copyAddress } from '../../ElevateFormControls/ToggleButton';
import CustomToggleCopy from '../../ElevateFormControls/ToggleCopy';
import { cityData } from '../ElevateFormData';

const CorrespondenceAddress = () => {
  return (
    <>
      <div className="address__title">
        <Typography component="h1" variant="h6" align="center">
          Correspondence Address
        </Typography>
      </div>
      <br />
      <Grid item xs={6}>
        <CustomToggleCopy
          label="Is the Correspondence Address same as Registered Address ?"
          labelKN="ಸಂಪರ್ಕ ವಿಳಾಸ ಹಾಗೂ ನೋಂದಣಿ ವಿಳಾಸ ಒಂದೇ ಆಗಿದೆಯಾ?"
          name={'companyInformation.correspondnceSame'}
          handler={async (setFieldValue, values) => {
            await setFieldValue(
              'companyInformation.correspondenceAddress.registeredAddress',
              values.companyInformation.registeredAddress.registeredAddress
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.district',
              values.companyInformation.registeredAddress.district
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.city',
              values.companyInformation.registeredAddress.city
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.pincode',
              values.companyInformation.registeredAddress.pincode
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.state',
              'Karnataka'
            );
          }}
          noHandler={async (setFieldValue, values) => {
            await setFieldValue(
              'companyInformation.correspondenceAddress.registeredAddress',
              ''
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.district',
              ''
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.city',
              ''
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.pincode',
              ''
            );
            await setFieldValue(
              'companyInformation.correspondenceAddress.state',
              'Karnataka'
            );
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: '-20px' }}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 300 characters)'}
          name={'companyInformation.correspondenceAddress.registeredAddress'}
          label={`Correspondence Address of the Entity(As per incorporation/registration certificate)`}
          labelKN={'ಸಂಸ್ಥೆಯ ಸಂಪರ್ಕ ವಿಳಾಸ(ಸಂಯೋಜನೆ/ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ)'}
          rows={4}
          className="register__text__address"
          handler={async (setFieldValue, values) => {
            await setFieldValue(
              'companyInformation.correspondenceAddress.registeredAddress',
              values.companyInformation.registeredAddress.registeredAddress
            );
          }}
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
          name={'companyInformation.correspondenceAddress.district'}
          label={'District'}
          labelKN="ಜಿಲ್ಲೆ"
          required={true}
        />
      </Grid>
      <Grid item xs={6} style={{ marginTop: '20px' }}>
        <Input
          placeholder="Enter city here"
          name={'companyInformation.correspondenceAddress.city'}
          label="City/Village/Taluk"
          labelKN="ನಗರ/ಗ್ರಾಮ/ತಾಲ್ಲೂಕು"
          handler={async (setFieldValue, values) => {
            await setFieldValue(
              'companyInformation.correspondenceAddress.city',
              values.companyInformation.registeredAddress.registeredAddress
            );
          }}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          placeholder="Enter state here"
          name="companyInformation.correspondenceAddress.state"
          label="State"
          labelKN="ರಾಜ್ಯ"
          required
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          placeholder="Enter pincode here"
          name={'companyInformation.correspondenceAddress.pincode'}
          label="Pincode"
          labelKN="ಪಿನ್ ಸಂಖ್ಯೆ"
          required
          maxLength={6}
        />
      </Grid>
    </>
  );
};
export default CorrespondenceAddress;
