import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import UploadFiles from '../../ElevateForms/UploadFiles';
import Amenities from './Amenities';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import CheckBox from '../../ElevateFormControls/CheckBox';
import CommonMultiSelect from '../../ElevateFormControls/CommonMultiSelect';
import { industryData } from '../registrationFormData';
const AmenitiesOrEvents = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalSeats"
            label="Total no. of seats in incubator"
            labelKN="ಪರಿಪೋಷಕರಲ್ಲಿರುವ ಒಟ್ಟು ಸೀಟುಗಳ ಸಂಖ್ಯೆ"
            required
            maxLength={5}
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalIncuatorStaffSeats"
            label="seats allotted for incubator staff"
            labelKN="ಪರಿಪೋಷಕ ಸಿಬ್ಬಂದಿಗೆ ನಿಗದಿಪಡಿಸಿರುವ ಸೀಟುಗಳು"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalPhysicalIncubationSeats"
            label="Seats allotted for physical incubation"
            labelKN="ಭೌತಿಕ ಪರಿಪೋಷಣೆಗಾಗಿ ನಿಗದಿಪಡಿಸಿರುವ ಸೀಟುಗಳು"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalVirtualIncubationSeats"
            label="Seats allotted for virtual incubation"
            labelKN="ವರ್ಚುವಲ್ (ಪರೋಕ್ಷ ಸ್ವರೂಪದ) ಪರಿಪೋಷಣೆಗಾಗಿ ನಿಗದಿಪಡಿಸಿರುವ ಸೀಟುಗಳು"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalOccupiedSeats"
            label="No. of Occupied seats"
            labelKN="ಭರ್ತಿಯಾಗಿರುವ ಸೀಟುಗಳ ಸಂಖ್ಯೆ"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalAvailableSeats"
            label="No. of Available seats"
            labelKN="ಲಭ್ಯವಿರುವ ಸೀಟುಗಳ ಸಂಖ್ಯೆ"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalMeetingRooms"
            label="No. of Meeting room(s)"
            labelKN="ಸಭಾಕೊಠಡಿಗಳ ಸಂಖ್ಯೆ"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalConferenceRooms"
            label="No. of Conference room(s)"
            labelKN="ಸಮ್ಮೇಳನ ಕೊಠಡಿಗಳ ಸಂಖ್ಯೆ"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.amenitiesOrEvents.totalEventsConducted"
            label="Total No. of events conducted"
            labelKN="ನಡೆಸಲಾಗಿರುವ ಒಟ್ಟು ಸಮಾರಂಭಗಳ ಸಂಖ್ಯೆ"
            required
            maxLength={5}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomToggleButton
            label="Was there any Cohort event conducted?"
            labelKN="ಯಾವುದಾದರೂ ಗುಂಪಿನ ಸಮಾರಂಭವನ್ನು ನಡೆಸಲಾಗಿದೆಯೇ"
            name="registeration.amenitiesOrEvents.anyCohortEvent"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CommonMultiSelect
            //others={setOthersValue}
            //selectedValues={props.selectedValues}
            name="registeration.amenitiesOrEvents.industriesOrSector"
            label="Industries / Sectors"
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

        <div className="address__title">
          <Typography component="h1" variant="h6" align="center">
            List of amenities
          </Typography>
        </div>
        <br />
        <Amenities name={'registeration.amenitiesOrEvents.amenities'} />
        <Grid xs={12}>
          <UploadFiles
            typeMsg={'Pdf smaller than'}
            label="upload MOM of steering Committee meeting"
            labelKN="ಸಂಚಾಲನಾ ಸಮಿತಿ ಸಭೆಯ ನಡವಳಿಯನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"
            name={
              'registeration.amenitiesOrEvents.momCommitteeMeetingAttachments'
            }
            size="1"
            fileSize="1048576"
            filesLimit={1}
            notRequiredArray={true}
            acceptedFiles={['.pdf']}
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
export default AmenitiesOrEvents;
