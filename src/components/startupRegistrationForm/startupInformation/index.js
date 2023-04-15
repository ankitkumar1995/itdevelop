import { Box, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import FormikSelect from '../../ElevateFormControls/Select';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import { StartupStage } from '../startupRegistrationFormData';
import CheckBox from '../../ElevateFormControls/CheckBox';
const StartupInformation = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormikSelect
            items={StartupStage.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.startupInfo.startupStage"
            label="Select your Startup Stage "
            labelKN="ನಿಮ್ಮ ನವೋದ್ಯಮ ಪುಟವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ"
            required={true}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomToggleButton
            label="Is the startup creating an innovative product / service or improving an existing product / service"
            name="registeration.startupInfo.isNewProductService"
            labelKN="ಸದರಿ ನವೋದ್ಯಮವು ನಾವೀನ್ಯತೆಯುಳ್ಳ ಉತ್ಪನ್ನ / ಸೇವೆಯನ್ನು ಸೃಜನೆ ಮಾಡುತ್ತಿದೆಯೋ  / ಅಥವಾ ಪ್ರಸ್ತುತವಿರುವ ಉತ್ಪನ್ನ/ಸೇವೆಯನ್ನು ಉತ್ತಮ ಪಡಿಸುತ್ತಿದೆಯೋ"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box mt={-4}>
            <UploadFiles
              label="Upload supporting documents for Innovation, Incorporation & Scalability"
              name="registeration.startupInfo.supportingDocs"
              labelKN="ನಾವೀನ್ಯತೆ ಬಗ್ಗೆ, ನಿಗಮಗೊಂಡ ಬಗ್ಗೆ ಹಾಗೂ ಗಾತ್ರ ಹೆಚ್ಚಳ ಸಾಧ್ಯತೆ ಕುರಿತು ಬೆಂಬಲವಿರುವ ದಾಖಲಾತಿಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"
              size="2"
              fileSize="2097152"
              filesLimit={3}
              acceptedFiles={['.pdf', '.ppt', '.pptx']}
              typeMsg=".pdf or .ppt/.pptx ,Multiple uploads are allowed with each file size maximum"
            />
          </Box>
        </Grid>
        {/* <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};
export default StartupInformation;
