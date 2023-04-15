import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '../../FormControls/input';

export default function MentorDetails() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            required
            placeholder="Enter text here"
            name="mentorName"
            label="Mentor Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="experience"
            label="Experience (IN YEARS)"
            maxLength={5}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            placeholder="Enter text here"
            name="linkedinProfile"
            label="Linkedin Profile"
          />
        </Grid>

        <Grid item xs={12}>
          <Input placeholder="Enter text here" name="url" label="Website Url" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
