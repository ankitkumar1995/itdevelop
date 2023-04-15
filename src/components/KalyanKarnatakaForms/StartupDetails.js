import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Input from '../ElevateFormControls/input';

const StartupDetails = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter founder name here"
            name="startUpDetails.founderName"
            label="Name of the Founder/ Co-Founder/ Director/Partner "
            labelKN="ಸ್ಥಾಪಕರ/ ಸಹ-ಸ್ಥಾಪಕರ/ ನಿರ್ದೇಶಕರ/ ಪಾಲುದಾರರ ಹೆಸರು"
            required
            className="startup__details"
            error={props.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter designation here"
            name="startUpDetails.designation"
            label="Designation"
            labelKN="ಹುದ್ದೆ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            type="email"
            placeholder="Enter primary email here"
            name="startUpDetails.emailPrimary"
            label="email 1 (primary)"
            labelKN="ಇ-ಮೇಲ್ 1 (ಮೊದಲನೆಯದು)"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            type="email"
            placeholder="Enter secondary email here"
            name="startUpDetails.emailSecondary"
            label="email 2 (secondary)"
            labelKN="ಇ-ಮೇಲ್ 2 (ಎರಡನೆಯದು)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter mobile number here"
            name="startUpDetails.mobileNumber"
            label="Mobile number"
            labelKN="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
            required
            maxLength={10}
            type="tel"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default StartupDetails;
