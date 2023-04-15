import React from 'react';
import { Grid } from '@material-ui/core';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import UploadFiles from '../../ElevateForms/UploadFiles';
import { stateData } from '../registrationFormData';
import SelectFormik from '../forms/selectformik';
const Introduction = () => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            placeholder="Enter full name"
            name="registeration.intro.name"
            label="Full Name"
            labelKN="ಪೂರ್ಣ ಹೆಸರು"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Example: Mentored 20+ startups. specializes in Bio-tech, sales"
            name="registeration.intro.tagline"
            label="Tagline/Slogan(Helps us to highlight your profile)"
            labelKN="ಟ್ಯಾಗ್‌ಲೈನ್/ಸ್ಲೋಗನ್(ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಹೈಲೈಟ್ ಮಾಡಲು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter contact number"
            name="registeration.intro.number"
            label="Contact number"
            labelKN="ಸಂಪರ್ಕ ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
            maxLength={11}
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter alternate number"
            name="registeration.intro.alternateNumber"
            label="Alternate contact number"
            labelKN="ಪರ್ಯಾಯ ದೂರವಾಣಿ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ"
            maxLength={11}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter your email"
            name="registeration.intro.email"
            label="Email Id"
            labelKN="ಇ-ಮೇಲ್ ವಿಳಾಸ"
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter website url"
            name="registeration.intro.website"
            label="website"
            labelKN="ಜಾಲತಾಣ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter linkedin profile url"
            name="registeration.intro.linkedInUrl"
            label="Linkedin profile"
            labelKN="ಲಿಂಕ್ಡ್ ಇನ್ ವಿಳಾಸದಲ್ಲಿನ ವಿವರಗಳು"
            disabled={true}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter facebook profile url"
            name="registeration.intro.facebookUrl"
            label="Facebook profile"
            labelKN="ಫೇಸ್ ಬುಕ್ ವಿಳಾಸದಲ್ಲಿನ ವಿವರಗಳು"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter twitter profile url"
            name="registeration.intro.twitterProfile"
            label="Twitter profile"
            labelKN="ಟ್ವಿಟ್ಟರ್ ವಿಳಾಸದಲ್ಲಿನ ವಿವರಗಳು"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter introduction youtube url"
            name="registeration.intro.inductionYoutubeVideo"
            label="60 seconds Introduction video (Youtube URL)"
            labelKN="60 ಸೆಕೆಂಡ್ ಗಳ ಪರಿಚಯಕಾರಿ ಚಲನಚಿತ್ರ (ಯು-ಟ್ಯೂಬ್ ಯು.ಅರ್.ಎಲ್. ವಿಳಾಸ)"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 characters)'}
            name="registeration.intro.address"
            label={`Address`}
            labelKN={`ವಿಳಾಸ`}
            rows={10}
            className="com__address space__text"
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
            name="registeration.intro.aboutMentor"
            label={`Brief about yourself`}
            labelKN={`ನಿಮ್ಮ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ`}
            rows={10}
            className="txt__area__single__line"
            required
          />
        </Grid>
        <Grid xs={12}>
          <UploadFiles
            imageTypeMsg
            label="Upload your profile photo"
            labelKN="ನಿಮ್ಮ ಭಾವಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"
            name={'registeration.intro.profilePhoto'}
            size="4"
            fileSize="4194304"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.png', '.jpg', '.jpeg']}
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Introduction;
