import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '../../FormControls/input';

const CompanyDetails = (props) => {
  var maxDate = new Date();

  function format1(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return day + '-' + month + '-' + year;
  }
  function format2(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear() - 10;

    return day + '-' + month + '-' + year;
  }

  //const {companyName,dateofIncorporation,incorporationNumber,websiteUrl} = props.value
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            placeholder="Enter company name"
            name="companyName"
            label="COMPANY NAME(As per Incorporation/Registration certificate)"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="date"
            placeholder="Enter date of incorporation(yyyy-mm-dd)"
            name="dateOfIncorporation"
            label="DATE OF INCORPORATION(As per Certificate)"
            InputProps={{
              inputProps: { min: format2(maxDate), max: format1(maxDate) },
            }}
            format="dd/mm/yyyy"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Enter incorporation number"
            name="incorporationNumber"
            label="INCORPORATION/REGISTRATION NUMBER(As per Certificate)"
            required
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Enter company website url"
            name="url"
            label="WEBSITE URL"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CompanyDetails;
