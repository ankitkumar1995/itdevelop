import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import FormikTextArea from '../ElevateFormControls/FormikTextArea';
import CustomToggleButton from '../ElevateFormControls/ToggleButton';

const useStyles = makeStyles((theme) => ({
  textAreaGrid: {
    marginTop: '20px',
  },
}));
const CompanyDescription = ({ value }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CustomToggleButton
        label="Have you received financial support/award for your present work?"
        labelKN="ಈಗಿನ ನಿಮ್ಮ ಕಾರ್ಯಕ್ಕಾಗಿ ನೀವು ಆರ್ಥಿಕ ಸಹಾಯ ಪಡೆದಿದ್ದೀರಾ?"
        name="companyDescription.receivedFinancialSupport"
        required
      />
      <CustomToggleButton
        label="Has your startup been a winner or received any grant from Government of Karnataka?"
        labelKN="ನಿಮ್ಮ ನವೋದ್ಯಮವು ಯಶಸ್ವಿಯಾಗಿದೆಯೇ ಅಥವಾ ಕರ್ನಾಟಕ ಸರ್ಕಾರದಿಂದ ಯಾವುದಾದರೂ ಅನುದಾನ ಪಡೆದಿದೆಯೇ?	"
        name="companyDescription.awardWinnerGOK"
        required
      />
      <CustomToggleButton
        label="Have you filed or received any patent under your startup?"
        labelKN="ನಿಮ್ಮ ನವೋದ್ಯಮದ ಹೆಸರಿನಲ್ಲಿ ಯಾವುದಾದರೂ ಪೇಟೆಂಟ್ ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿರುವಿರಾ ಅಥವಾ ಪೇಟೆಂಟ್ ಪಡೆದಿರುವಿರಾ?"
        name="companyDescription.startupPantents"
        required
      />
      <CustomToggleButton
        label="Do you have any mentors or advisors on board?"
        labelKN="ನಿಮ್ಮ ಮಂಡಳಿಯಲ್ಲಿ ಯಾವುದೇ ಮಾರ್ಗದರ್ಶಕರು ಅಥವಾ ಸಲಹೆಗಾರರನ್ನು ಹೊಂದಿದ್ದೀರಾ?"
        name="companyDescription.anyMentors"
        required
      />
      <CustomToggleButton
        label="Are you incubated in GoK Supported incubators"
        labelKN="ನೀವು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಪರಿಪೋಷಕಗಳಲ್ಲಿ ಪರಿಪೋಷಿತರಾಗಿರುವಿರಾ?"
        name="companyDescription.incubatedInGOK"
        required
      />
      <Grid item xs={12}>
        <Box pt={2} pb={1}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="companyDescription.competitors"
            label={`Who are your competitors in this space and what is your USP
              (Unique Selling Proposition), Please describe`}
            labelKN="ಈ ವಲಯದಲ್ಲಿ ನಿಮ್ಮೆದುರಿನ ಸ್ಪರ್ಧಾಳುಗಳು ಯಾರು ಹಾಗೂ ನಿಮ್ಮ ಯುಎಸ್ ಪಿ ಏನು (ಯುನಿಕ್ ಸೆಲ್ಲಿಂಗ್ ಪ್ರೊಪೊಸಿಷನ್- ಅನನ್ಯ ಮಾರಾಟ ಸಾಧ್ಯತೆ)? ದಯವಿಟ್ಟು ವಿವರಿಸಿ"
            rows={10}
            className="company__description"
            required={true}
          />
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.textAreaGrid}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 500 words)'}
          name="companyDescription.milestone"
          label={`Project milestones: What will be the proposed outcome at the end of the project and how much time is required (in terms of month)`}
          labelKN="ಕಾರ್ಯಯೋಜನೆಯ ಮೈಲುಗಲ್ಲುಗಳು: ಕಾರ್ಯಯೋಜನೆಯ ಕೊನೆಯಲ್ಲಿ ಪ್ರಸ್ತಾವಿತ ಫಲಶ್ರತಿ ಏನಾಗಿರುತ್ತದೆ? ಇದಕ್ಕೆ ಎಷ್ಟು ಅವಧಿ ಹಿಡಿಯುತ್ತದೆ (ತಿಂಗಳುಗಳಲ್ಲಿ)?"
          rows={10}
          className="company__description milestone"
          required={true}
        />
      </Grid>
    </React.Fragment>
  );
};
export default CompanyDescription;
