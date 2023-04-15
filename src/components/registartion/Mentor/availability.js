import React from 'react';
import { Grid } from '@material-ui/core';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import CommonMultiSelect from '../../ElevateFormControls/CommonMultiSelect';
import { mentorAvailability } from '../registrationFormData';
import CheckBox from '../../ElevateFormControls/CheckBox';
const Availability = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CommonMultiSelect
            //others={setOthersValue}
            //selectedValues={props.selectedValues}
            name="registeration.availability.daysInWeek"
            label="Your availability in a week (Days)"
            labelKN="ಸಪ್ತಾಹದಲ್ಲಿ ನಿಮ್ಮ ಲಭ್ಯತೆ (ದಿನಗಳು)"
            options={mentorAvailability.map((i) => {
              return {
                id: i,
                label: i,
              };
            })}
            limit={7}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter text here"
            name="registeration.availability.hoursInWeek"
            label={'Your availability in a week (Hours)'}
            labelKN="ಸಪ್ತಾಹದಲ್ಲಿ ನೀವು ಲಭ್ಯವಾಗುವುದು (ಘಂಟೆಗಳು)"
            required={true}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter text here"
            name="registeration.availability.preferredWorkMode"
            label={'Preferred work mode'}
            labelKN="ನಿಮ್ಮ ಆಯ್ಕೆಯ ಕಾರ್ಯ ವೈಖರಿ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter text here"
            name="registeration.availability.preferedMentorStage"
            label={'At what stage do you prefer to mentor?'}
            labelKN="ನೀವು ಯಾವ ಹಂತದಲ್ಲಿ ಮಾರ್ಗದರ್ಶಿಯಾಗಲು ಬಯಸುವಿರಿ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter text here"
            name="registeration.availability.preferMentorDuration"
            label={'Preferred mentor duration'}
            labelKN="ಮಾರ್ಗದರ್ಶಿಯಾಗಿರುವ ನಿಮ್ಮ ಆಯ್ಕೆಯ ಸಮಯಾವಧಿ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter fee structure here"
            name="registeration.availability.feeStructure"
            label="What is the fee structure?"
            labelKN="ಶುಲ್ಕದ ರೂಪುರೇಷೆ ಏನು?"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter text here"
            name="registeration.availability.preferedContactMode"
            label={'Preferred mode of contact'}
            labelKN="ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕ ಮಾಡಲು ಬಯಸುವ ರೀತಿ"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="registeration.availability.mentorReason"
            label={`why do you like to be a mentor?`}
            labelKN={`ನೀವು ಮಾರ್ಗದರ್ಶಿಯಾಗಲು ಏಕೆ ಬಯಸುತ್ತೀರಿ?`}
            rows={10}
            className="txt__area__single__line"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Availability;
