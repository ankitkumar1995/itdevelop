import { Grid } from '@material-ui/core';
import React from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import Input from '../../ElevateFormControls/input';
import CheckBox from '../../ElevateFormControls/CheckBox';
const NameAndIntro = () => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter company name"
            name="registeration.nameAndIntro.incorporatedCompanyName"
            label="company name as per incorporation certificate"
            labelKN="ನಿಗಮಿತ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ ಇರುವ ಕಂಪನಿಯ ಹೆಸರು "
            required
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter company tagline"
            name="registeration.nameAndIntro.companyTagLine"
            label="company tagline(Vision)"
            labelKN="ಕಂಪನಿಯ ಘೋಷವಾಕ್ಯ"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Enter youtube url"
            name="registeration.nameAndIntro.youtubeUrl"
            label="60 seconds elevator pitch (youtube url)"
            labelKN="60 ಸೆಕೆಂಡ್ ಗಳ ಎಲಿವೇಟರ್ ಸ್ಪರ್ಧಾ ಪ್ರದರ್ಶನ (youtube url ವಿಳಾಸ)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter linkedin url"
            name="registeration.nameAndIntro.linkedInUrl"
            label="company linkedin url"
            labelKN="ಕಂಪನಿಯ ಲಿಂಕ್ಡ್ಇನ್ ಯು.ಆರ್.ಎಲ್. ವಿಳಾಸ"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter company website"
            name="registeration.nameAndIntro.companyWebsiteUrl"
            label="COMPANY WEBSITE "
            labelKN="ಕಂಪನಿಯ ಜಾಲತಾಣ"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <UploadFiles
            imageTypeMsg
            label="upload company logo "
            labelKN="ಕಂಪನಿಯ ಲಾಂಛನವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"
            name="registeration.nameAndIntro.companyLogo"
            size="1"
            notRequiredArray={true}
            fileSize="1048576"
            filesLimit={1}
            acceptedFiles={['.jpg', '.jpeg', '.png']}
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default NameAndIntro;
