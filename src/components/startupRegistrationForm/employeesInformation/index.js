import { Grid } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';
import Input from '../../ElevateFormControls/input';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
const EmployeesInformation = (props) => {
  const [field, meta] = useField(props.name);
  const toggleValue = field.value.registeration.employeeInfo;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter no. workforce in karnataka"
            name="registeration.employeeInfo.permanantWorkersInKarnataka"
            label="No. of permanent qualified workforce in Karnataka"
            labelKN="ಕರ್ನಾಟಕದಲ್ಲಿರುವ ಖಾಯಂ ಅರ್ಹ ಕಾರ್ಯಬಲದ ಸಂಖ್ಯೆ"
            maxLength={6}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter no. women workforce in karnataka"
            name="registeration.employeeInfo.womenWorkersinKarnataka"
            label="No. of Women out of the total workforce in Karnataka"
            labelKN="ಒಟ್ಟು ಅರ್ಹ ಕಾರ್ಯಬಲದಲ್ಲಿರುವ ಮಹಿಳೆಯರ ಸಂಖ್ಯೆ"
            maxLength={6}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter total no.of workforce"
            name="registeration.employeeInfo.permanantWorkers"
            label="No. of permanent qualified workforce(Total)"
            labelKN="ಖಾಯಂ ಅರ್ಹ ಕಾರ್ಯಬಲದ ಸಂಖ್ಯೆ"
            maxLength={6}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter total no.of women workforce"
            name="registeration.employeeInfo.womenWorkers"
            label="No. of Women out of total qualified workforce"
            labelKN="ಒಟ್ಟು ಅರ್ಹ ಕಾರ್ಯಬಲದಲ್ಲಿರುವ ಮಹಿಳೆಯರ ಸಂಖ್ಯೆ"
            maxLength={6}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CustomToggleButton
            label="Is your entity a Women Entrepreneur/s based Startup? (Director(s)/Partner(s) should hold substantial Share)"
            labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯು ನಿಮ್ಮ ನವೋದ್ಯಮದ ಪ್ರವರ್ತಕರಾಗಿದ್ದಾರೆಯೇ?(ನಿರ್ದೇಶಕ (ರು)/ ಪಾಲುದಾರ (ರು) ಗಣನೀಯ ಪ್ರಮಾಣದ ಷೇರುಗಳನ್ನು ಹೊಂದಿರಬೇಕು)"
            name="registeration.employeeInfo.womenStartup"
            required
          />
        </Grid>
        {toggleValue.womenStartup === true && (
          <>
            <Grid item xs={6}>
              <Input
                placeholder="Enter name here"
                name="registeration.employeeInfo.details.nameOfWomenEntrepreneur"
                label="Name of women entrepreneur "
                labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಹೆಸರು"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                placeholder="Enter designation here"
                name="registeration.employeeInfo.details.designationOfWomenEntrepreneur"
                label="Designation of women entrepreneur "
                labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಹುದ್ದೆ"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                placeholder="Enter mobile number here"
                name="registeration.employeeInfo.details.mobileNumber"
                label="Mobile number of women entrepreneur "
                labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
                maxLength={10}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                type="email"
                placeholder="Enter email here"
                name="registeration.employeeInfo.details.email"
                label="Email of women entrepreneur "
                labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯ ಇ-ಮೇಲ್"
                required
              />
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
};
export default EmployeesInformation;
