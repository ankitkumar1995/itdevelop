import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import CustomToggleButton from '../../FormControls/ToggleButton';
import RecaptchaAdd from '../../RecaptchaAdd';

export default function SelfCertification(props) {
  const [agree, setAgree] = useState(false);
  useEffect(() => {
    props.getAgree(agree);
  });
  const getAgree = () => {
    setAgree(!agree);
  };
  return (
    <React.Fragment>
      <CustomToggleButton
        label="ARE YOU REGISTERED IN KARNATAKA?"
        name="karnatakaRegistered"
        required
      />
      <CustomToggleButton
        label="IS 50% OF YOUR QUALIFIED WORKFORCE ENGAGED IN KARNATAKA?"
        name="halfWrokforceKarnataka"
        required
      />
      <CustomToggleButton
        label="IS YOUR REVENUE UNDER 100 CR?"
        name="revenueUnder100Cr"
        required
      />
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
    </React.Fragment>
  );
}
