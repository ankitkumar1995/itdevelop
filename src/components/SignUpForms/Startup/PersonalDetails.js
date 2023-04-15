import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '../../FormControls/input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import RecaptchaAdd from '../../RecaptchaAdd';

export default function PersonalDetails(props) {
  const [agree, setAgree] = useState(false);
  const [passwordShown, setPasswordShown] = useState(true);
  const [cpasswordShown, setCPasswordShown] = useState(true);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown == true ? false : true);
  };
  const ctogglePasswordVisiblity = () => {
    setCPasswordShown(cpasswordShown == true ? false : true);
  };

  useEffect(() => {
    if (props.requireCheckBox) {
      props.getAgree(agree);
    }
  });

  const getAgree = () => {
    setAgree(!agree);
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            required
            placeholder="Enter full name"
            name="name"
            label="Full name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            placeholder="Enter phone number"
            id="phone"
            name="phone"
            label="Phone Number"
            maxLength={10}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            type="email"
            placeholder="Enter email"
            id="email"
            name="email"
            label="Email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            type={passwordShown ? 'password' : 'text'}
            placeholder="Enter password"
            id="password"
            name="password"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisiblity} edge="end">
                    {passwordShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            required
            type={cpasswordShown ? 'password' : 'text'}
            id="confirmPassword"
            placeholder="Re-type password"
            name="confirmPassword"
            label="Retype Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={ctogglePasswordVisiblity} edge="end">
                    {cpasswordShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {props.requireCheckBox && (
          <>
            <Grid item xs={12}>
              <RecaptchaAdd setCaptchaVerify={props.setCaptchaVerify} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="primary" name="accept" onChange={getAgree} />
                }
                label={
                  <div>
                    <span>I accept the </span>
                    <a
                      style={{ color: '#ee6f57' }}
                      href="/terms-and-conditions"
                      target="_blank"
                    >
                      Terms & Conditions.
                    </a>
                  </div>
                }
              />
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}
