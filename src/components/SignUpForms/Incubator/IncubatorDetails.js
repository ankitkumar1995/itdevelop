import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '../../FormControls/input';
import FormikSelect from '../../FormControls/Select';
import { incubatorType } from '../RegisterFormData';

export default function IncubatorDetails() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormikSelect
            items={incubatorType.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="incubatorType"
            label="Incubator Type"
            required={true}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Input required name="incubatorType" label="Incubator Type" />
        </Grid> */}
        <Grid item xs={12}>
          <Input
            placeholder="Enter incubator or org name here"
            required
            name="fullName"
            label="Incubator/org name"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            placeholder="Enter website url here"
            name="websiteUrl"
            label="Website Url"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
