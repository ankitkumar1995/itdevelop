import { Grid, Typography } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import CheckBox from '../../ElevateFormControls/CheckBox';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import {
  IncubatorAffiliatedwith,
  IncubatorSupport,
} from '../startupRegistrationFormData';
const IncubatorInformation = (props) => {
  const [field, meta] = useField(props.name);
  //const [field, meta] = useFormik(props.name);
  const { setFieldValue } = useFormikContext();
  const toggleValue = field.value.registeration.incubatorInfo;

  useEffect(() => {
    if (toggleValue.isCurrentIncubator === false) {
      setFieldValue('registeration.incubatorInfo.gok_supported', '');
    }
  }, [toggleValue]);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomToggleButton
            label="Are you currently incubated?"
            labelKN="ಪ್ರಸ್ತುತ ಪರಿಪೋಷಣೆಗೊಂಡಿರುವಿರೇ"
            name="registeration.incubatorInfo.isCurrentIncubator"
            required
          />
        </Grid>
        {toggleValue.isCurrentIncubator === true && (
          <>
            <Grid item xs={12}>
              <CustomToggleButton
                label="Are you incubated in GoK supported Incubators?"
                labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪರಿಪೋಷಕರಿಂದ"
                name="registeration.incubatorInfo.gok_supported"
                required
              />
            </Grid>
            {toggleValue.gok_supported === true && (
              <Grid item xs={12} sm={6}>
                <div className="incubator__info">
                  <FormikSelect
                    items={IncubatorAffiliatedwith.map((item) => {
                      return {
                        value: item.value,
                        label: item.label,
                      };
                    })}
                    name="registeration.incubatorInfo.gok_incubator_details"
                    label="GoK supported incubator you are affiliated with"
                    labelKN="ನೀವು ಸಂಯೋಜನೆಗೊಂಡ ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪೂರ್ವಪಾಲನಾ ಪರಿಪೋಷಕವ್ಯಾವುದು?"
                    required={true}
                  />
                </div>
              </Grid>
            )}
            {toggleValue.gok_supported !== '' &&
              toggleValue.gok_supported === false && (
                <>
                  <div className="address__title">
                    <Typography component="h1" variant="h6" align="center">
                      Incubator details
                    </Typography>
                  </div>
                  <br />
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter incubator name"
                      name="registeration.incubatorInfo.incubatorName"
                      label="Incubator Name"
                      labelKN="ಪರಿಪೋಷಕದ ಹೆಸರು"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter incubator website url"
                      name="registeration.incubatorInfo.incubatorWebsite"
                      label="Website URL of Incubator"
                      labelKN="ಪರಿಪೋಷಕದ ಜಾಲತಾಣದ ಯು.ಆರ್.ಎಲ್. ವಿಳಾಸ"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter name here"
                      name="registeration.incubatorInfo.cheifPromoterName"
                      label="Name of Chief Promoter/MD"
                      labelKN="ಮುಖ್ಯ ಪ್ರಾಯೋಜಕ ಪ್ರವರ್ತಕರು / ವ್ಯವಸ್ಥಾಪಕ ನಿರ್ದೇಶಕರನ್ನು ಹೆಸರಿಸಿ"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter email here"
                      name="registeration.incubatorInfo.cheifPromoterEmail"
                      label="Email of chief promoter/md"
                      labelKN="ಮುಖ್ಯ ಪ್ರಾಯೋಜಕ ಪ್ರವರ್ತಕರ / ವ್ಯವಸ್ಥಾಪಕ ನಿರ್ದೇಶಕರ ಇ-ಮೇಲ್ ವಿಳಾಸ"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter mobile number"
                      name="registeration.incubatorInfo.cheifPromoterNumber"
                      label="Mobile number of chief promoter/md"
                      labelKN="ಮುಖ್ಯ ಪ್ರಾಯೋಜಕ ಪ್ರವರ್ತಕರ / ವ್ಯವಸ್ಥಾಪಕ ನಿರ್ದೇಶಕರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
                      maxLength={10}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormikTextArea
                      className={'com__address incubation'}
                      placeholder={
                        'Enter text here(not to exceed 250 characters)'
                      }
                      name="registeration.incubatorInfo.incubatorAddress"
                      label="Address of the incubator"
                      labelKN="ಪರಿಪೋಷಕರ ವಿಳಾಸ"
                      rows={10}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="incubator__info">
                      <FormikSelect
                        items={IncubatorAffiliatedwith.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })}
                        name="registeration.incubatorInfo.affiliatedIncubator"
                        label="incubator that you would like to be affiliated with "
                        labelKN="ನೀವು ಸಂಯೋಜನೆಗೊಳ್ಳಲು ಬಯಸುವ ಪರಿಪೋಷಕರು ಯಾರು?"
                        labelClass="incubator__info"
                        required={true}
                      />
                    </div>
                  </Grid>
                </>
              )}
          </>
        )}
        {/* <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};
export default IncubatorInformation;
