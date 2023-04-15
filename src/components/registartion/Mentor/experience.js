import React from 'react';
import { Grid } from '@material-ui/core';
import Input from '../../ElevateFormControls/input';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import UploadFiles from '../../ElevateForms/UploadFiles';
import CommonMultiSelect from '../../ElevateFormControls/CommonMultiSelect';
import { TechData } from '../../ElevateForms/ElevateFormData';
import { industryData } from '../registrationFormData';
import CommonChipInput from '../../FormControls/ChipInput';
const Experience = () => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter your qualification"
            name="registeration.experience.qualification"
            label="Qualification"
            labelKN="ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter current associated company"
            name="registeration.experience.currentAssociatedCompany"
            label="Current associated company"
            labelKN="ಪ್ರಸ್ತುತ ಸಂಬಂಧ ಹೊಂದಿರುವ ಕಂಪನಿ"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomToggleButton
            label="Have you been a part of startup ecosystem?"
            labelKN="ನೀವೆಂದಾದರೂ ನವೋದ್ಯಮ ಪೂರಕ ವಾತಾವರಣದ ಭಾಗವಾಗಿರುವಿರೇ?"
            name="registeration.experience.startupEcoParticipatant"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomToggleButton
            label="Have you been a mentor before?"
            labelKN="ಈ ಹಿಂದೆ ನೀವು ಮಾರ್ಗದರ್ಶಿಯಾಗಿ ಕಾರ್ಯ ನಿರ್ವಹಿಸಿರುವಿರೇ"
            name="registeration.experience.mentorBefore"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter total work experience"
            name="registeration.experience.totalWorkExp"
            label="Total work experience"
            labelKN="ಒಟ್ಟು ಕಾರ್ಯಾನುಭವ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number of companies"
            name="registeration.experience.currentMentorComapny"
            label="No. of companies - Currently mentoring"
            labelKN="ಪ್ರಸ್ತುತ ನೀವು ಮಾರ್ಗದರ್ಶಿಯಾಗಿರುವ ಕಂಪನಿಗಳ ಸಂಖ್ಯೆ"
          />
        </Grid>
        <Grid item xs={12}>
          <CommonChipInput
            label="List of Companies Mentored"
            labelKN="ಮಾರ್ಗದರ್ಶಿಯಾಗಿದ್ದ ಕಂಪನಿಗಳ ಪಟ್ಟಿ"
            name="registeration.experience.companiesMentor"
            placeholder="Enter company name"
          />
        </Grid>
        <Grid item xs={12}>
          <CommonChipInput
            label="Skills"
            labelKN="ಕೌಶಲ್ಯಗಳು"
            name="registeration.experience.skills"
            placeholder="Enter your skills"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CommonMultiSelect
            //others={setOthersValue}
            //selectedValues={props.selectedValues}
            name="registeration.experience.industry"
            label="Industry"
            labelKN="ಉದ್ಯಮದ ಕ್ಷೇತ್ರ"
            options={industryData.map((i) => {
              return {
                id: i,
                label: i,
              };
            })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CommonMultiSelect
            //others={setOthersValue}
            //selectedValues={props.selectedValues}
            name="registeration.experience.vertical"
            label="Vertical"
            labelKN="ಉದ್ಯಮದ ವಲಯಗಳು"
            options={TechData.map((i) => {
              return {
                id: i,
                label: i,
              };
            })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CommonChipInput
            label="Specialization"
            labelKN="ವೈಶಿಷ್ಟ್ಯತೆ"
            name="registeration.experience.specialization"
            placeholder="Enter your specialization"
            required
          />
        </Grid>
        <Grid xs={12}>
          <UploadFiles
            label="Upload your complete profile (PDF format)"
            labelKN="ನಿಮ್ಮ ಸಂಪೂರ್ಣ ವ್ಯಕ್ತಿಗತ ವಿವರಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ (ಪಿಡಿಎಫ್ ಸ್ವರೂಪದಲ್ಲಿ)"
            name={'registeration.experience.companyProfile'}
            size="1"
            fileSize=" 1048576"
            filesLimit={1}
            notRequiredArray
            acceptedFiles={['.pdf']}
            typeMsg=".pdf allow with less than size"
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Experience;
