import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import ServiceOffering from './ServiceOffering';
import UploadFiles from '../../ElevateForms/UploadFiles';
import SelectFormik from '../forms/selectformik';
import { partnerType } from '../registrationFormData';
import { useField } from 'formik';

const PartnerDetails = (props) => {
  const [field, meta] = useField(props.name);
  const toggleValue = field.value.registration.partnerInfo.partneringType;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter company name"
            name="registration.partnerInfo.companyName"
            label="Partner/Org Name"
            labelKN="ಪಾಲುದಾರ/ಸಂಸ್ಥೆಯ ಹೆಸರು"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter website url"
            name="registration.partnerInfo.companyWebsite"
            label="Partner/Org Website"
            labelKN="ಪಾಲುದಾರ/ಸಂಸ್ಥೆಯ ಜಾಲತಾಣ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter linkedin url"
            name="registration.partnerInfo.comapnyLinkedInUrl"
            label="Company Linkedin Url"
            labelKN="ಕಂಪನಿಯ ಲಿಂಕ್ಡ್‌ಇನ್ ವಿಳಾಸ"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter facebook url"
            name="registration.partnerInfo.companyFacebookUrl"
            label="Company facebook Url"
            labelKN="ಕಂಪನಿಯ ಫೇಸ್‌ಬುಕ್‌ ವಿಳಾಸ"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter twitter url"
            name="registration.partnerInfo.comapnyTwitterUrl"
            label="Company Twitter Url"
            labelKN="ಕಂಪನಿಯ ಟ್ವಿಟರ್‌ ವಿಳಾಸ"
          />
        </Grid>
        <Grid xs={12}>
          <UploadFiles
            imageTypeMsg
            label="Upload Partner/Company Logo"
            labelKN="ಪಾಲುದಾರ/ಕಂಪನಿ ಲಾಂಛನವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
            name={'registration.partnerInfo.comapnyLogo'}
            size="4"
            fileSize="4194304"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.png', '.jpg', '.jpeg']}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="registration.partnerInfo.aboutCompany"
            label={`Brief about your Company profile`}
            labelKN={`ನಿಮ್ಮ ಕಂಪನಿ ಚರಿತ್ರೆ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತ ವಿವರ ನೀಡಿ`}
            rows={10}
            className="small__label"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectFormik
            items={partnerType.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registration.partnerInfo.partneringType"
            label={'Partnering Type'}
            labelKN="ಪಾಲುದಾರಿಕೆಯ ಪ್ರಕಾರ"
            disabled={true}
            required={true}
          />
        </Grid>
        {toggleValue === 'Others' && (
          <Grid item xs={12}>
            <Input
              placeholder="Enter company name"
              name="registration.partnerInfo.otherPartnerType"
              label="Other Partnering Type"
              labelKN="ಇತರ ಪಾಲುದಾರಿಕೆಯ ಪ್ರಕಾರ"
              disabled
              required
            />
          </Grid>
        )}
        <div className="address__title">
          <Typography component="h1" variant="h6" align="center">
            Please list your service offerings to the startup ecosystem
            <br />
            ನವೋದ್ಯಮಪರ ವಾತಾವರಣಕ್ಕೆ ನೀವು ಒದಗಿಸುವ ಸೇವೆಯನ್ನು ದಯವಿಟ್ಟು ಪಟ್ಟಿ ಮಾಡಿ
          </Typography>
        </div>
        <br />
        <ServiceOffering name={'registration.partnerInfo.serviceOffers'} />
        <Grid xs={12}>
          <UploadFiles
            typeMsg={'Pdf smaller than'}
            label="Upload company profile with offerings in detail"
            labelKN="ಕಲ್ಪಿಸುವ ಸೇವೆಗಳ ವಿವರಗಳೊಂದಿಗೆ ಕಂಪನಿ ಚರಿತ್ರೆಯನ್ನು ಅಪ್‌ಲೋಡ್‌ ಮಾಡಿ"
            name={'registration.partnerInfo.servingOfferingsAttachment'}
            size="1"
            fileSize="1048576"
            filesLimit={1}
            notRequiredArray={true}
            acceptedFiles={['.pdf']}
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default PartnerDetails;
