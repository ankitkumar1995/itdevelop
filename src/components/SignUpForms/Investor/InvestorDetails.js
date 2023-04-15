import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '../../FormControls/input';
import FormikSelect from '../../FormControls/Select';
import { investorType } from '../RegisterFormData';
export default function InvestorDetails() {
  var maxDate = new Date();

  function format1(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }
  function format2(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear() - 10;

    return year + '-' + month + '-' + day;
  }
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormikSelect
            items={investorType.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="investoryType"
            label="Investor Type"
            required={true}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Input
            required
            placeholder="Enter text here"
            name="inventoryType"
            label="Investor Type"
          />
        </Grid> */}
        <Grid item xs={12}>
          <Input
            type="date"
            placeholder="Enter date of incorporation"
            name="dateOfIncorporation"
            label="DATE OF INCORPORATION(As per Certificate)"
            InputProps={{
              inputProps: { min: format2(maxDate), max: format1(maxDate) },
            }}
            format="MM/dd/yyyy"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            required
            placeholder="Enter investor name here"
            name="companyName"
            label="Investor/ORG Name"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Enter website url here"
            name="url"
            label="Website Url"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Enter linkedin profile url here"
            name="linkedInProfile"
            label="Linkedin Profile"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
