import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Input from '../ElevateFormControls/input';
import RecaptchaAdd from '../RecaptchaAdd';

const CaptchaWrapper = styled.div`
  div > div {
    display: flex;
    place-content: center;
  }
`;

export default function CommonPersonalDetails(props) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            required
            placeholder="Enter your full name"
            name="name"
            label="Full Name"
            labelKN="ಪೂರ್ಣ ಹೆಸರು"
            disabled={props?.session ? true : false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            placeholder="Enter phone number"
            name="phone"
            label="Phone Number"
            labelKN="ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
            maxLength={10}
            disabled={props?.session ? true : false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            type="email"
            placeholder="Enter your email"
            name="email"
            label="Email"
            labelKN="ಇಮೇಲ್"
            disabled={props?.session ? true : false}
          />
        </Grid>
        {props.showRecaptcha && (
          <Grid item xs={12}>
            <RecaptchaAdd setCaptchaVerify={props.setCaptchaVerify} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
