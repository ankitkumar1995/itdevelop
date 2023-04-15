import React from 'react';
import { Grid } from '@material-ui/core';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import UploadFiles from '../../ElevateForms/UploadFiles';
import { incubatorType, stateData } from '../registrationFormData';
import SelectFormik from '../forms/selectformik';
const Introduction = () => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter incubator name"
            name="name"
            label="Incubator Name"
            labelKN="ಪರಿಪೋಷಕರ ಹೆಸರು"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="single__line__select">
            <FormikSelect
              items={incubatorType.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
              name="incubatorType"
              label={'incubator type'}
              labelKN="ವಲಯ/ ಉದ್ದಿಮೆ"
              disabled={true}
              required={true}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Example: Mentored 20+ startups. specializes in Bio-tech, sales"
            name="registeration.intro.tagline"
            label="tagline / slogan (helps us to highlight your profile)"
            labelKN="ಟ್ಯಾಗ್‌ಲೈನ್/ಸ್ಲೋಗನ್(ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಹೈಲೈಟ್ ಮಾಡಲು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter full name"
            name="registeration.intro.communityManager"
            label="Community manager (full name)"
            labelKN="ಸಮುದಾಯದ ವ್ಯವಸ್ಥಾಪಕರು (ಪೂರ್ಣ ಹೆಸರು)"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter contact number"
            name="registeration.intro.number"
            label="Contact number"
            labelKN="ಸಂಪರ್ಕ ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
            maxLength={11}
            required
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter alternate number"
            name="registeration.intro.alternateNumber"
            label="Alternate Contact number"
            labelKN="ಪರ್ಯಾಯ ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
            maxLength={11}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter website url"
            name="registeration.intro.website"
            label="Incubator website"
            labelKN="ಪರಿಪೋಷಕರ ಜಾಲತಾಣ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter email here"
            name="registeration.intro.email"
            label="Email ID"
            labelKN="ಇ-ಮೇಲ್ ವಿಳಾಸ"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter linkedin profile url"
            name="registeration.intro.linkedInUrl"
            label="Linkedin profile"
            labelKN="ಲಿಂಕ್ಡ್ ಇನ್ ನಲ್ಲಿ ಸ್ವ-ವಿವರಗಳು"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter facebook profile url"
            name="registeration.intro.facebookUrl"
            label="Facebook profile"
            labelKN="ಫೇಸ್ ಬುಕ್ ನಲ್ಲಿ ಸ್ವ-ವಿವರಗಳು"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter twitter profile url"
            name="registeration.intro.twitterProfile"
            label="Twitter Profile"
            labelKN="ಟ್ವಿಟ್ಟರ್ ನಲ್ಲಿ ಸ್ವ-ವಿವರಗಳು"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Enter google map url"
            name="registeration.intro.location"
            label="Incubator location (Google map url)"
            labelKN="ಪರಿಪೋಕರಿರುವ ಸ್ಥಳ (ಗೂಗಲ್ ಮ್ಯಾಪ್ ತಾಣದ ಯು.ಅರ್.ಎಲ್. ವಿಳಾಸ)"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="registeration.intro.address"
            label={`Address`}
            labelKN={`ವಿಳಾಸ`}
            rows={10}
            className="com__address space__text"
            //className="tech_text_area"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter landmark here"
            name="registeration.intro.landmark"
            label="Landmark"
            labelKN="ವಿಳಾಸ ಸ್ಥಳ ಸಮೀಪದ ಗುರುತು"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter city here"
            name="registeration.intro.city"
            label="Town/city"
            labelKN="ಪಟ್ಟಣ / ನಗರ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter pincode here"
            name="registeration.intro.pinCode"
            label="Pincode"
            labelKN="ಅಂಚೆ ಪಿನ್ ಸಂಕೇತ"
            maxLength={6}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter your district"
            name="registeration.intro.district"
            label={'District'}
            labelKN="ಜಿಲ್ಲೆ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectFormik
            items={stateData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.intro.state"
            label={'State'}
            labelKN="ರಾಜ್ಯ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="registeration.intro.country"
            label={'Country'}
            labelKN="ದೇಶ"
            disabled
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="registeration.intro.aboutIncubator"
            label={`Brief introduction about your incubator`}
            labelKN={`ನಿಮ್ಮ ಪರಿಪೋಷಕರ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತ ಪರಿಚಯ`}
            rows={10}
            className="txt__area__single__line"
            required
          />
        </Grid>
        <Grid xs={12}>
          <UploadFiles
            typeMsg={`Only upto 10 .jpg/.jpeg and .png files are allowed of size`}
            label="upload your incubator photo(s)"
            labelKN="ಪಿಚ್ ಡೆಕ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
            name={'registeration.intro.photos'}
            size="1"
            uploadClass={'incubtor-upload'}
            introClass={'incubator-preview'}
            fileSize="1048576"
            filesLimit={10}
            acceptedFiles={['.png', '.jpg', '.jpeg']}
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Introduction;
