import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '../../FormControls/input';
import { partnerType } from '../RegisterFormData';
import FormikSelect from '../../FormControls/Select';
import { useField } from 'formik';

export default function PartnerDetails(props) {
  const [field, meta] = useField(props.name);
  const toggle = field.value.partnerType;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormikSelect
            items={partnerType.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="partnerType"
            label="Partner Type"
            required={true}
          />
        </Grid>
        {toggle === 'Others' && (
          <Grid item xs={12}>
            <Input
              name="otherPartnerType"
              label="Other Partner Type"
              placeholder="Enter text here"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Input
            required
            name="fullName"
            label="Partner/Org Name"
            placeholder="Enter your/org name here"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            name="url"
            label="Website Url"
            placeholder="Enter website url here"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
