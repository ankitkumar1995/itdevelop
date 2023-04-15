import { Grid } from '@material-ui/core';
import { useField } from 'formik';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import FormikSelect from '../../ElevateFormControls/Select';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import {
  FundingRequirement,
  KitsChallegeWin,
  SourceOfFUnding,
  StartupStage,
  TypeOfFunding,
} from '../startupRegistrationFormData';
import Input from '../../ElevateFormControls/input';
const FundingDetails = (props) => {
  const [field, meta] = useField(props.name);
  const toggleValue = field.value.registeration.fundingInfo;
  return (
    <React.Fragment className={'funding__detail'}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid>
            <CustomToggleButton
              label="are you currently funded?"
              labelKN="ಪ್ರಸ್ತುತ ಧನಸಹಾಯ ಪಡೆಯುತ್ತಿರುವಿರೇ"
              name="registeration.fundingInfo.currentlyFunded"
              required
            />
          </Grid>
          {toggleValue.currentlyFunded == true ? (
            <>
              <Grid>
                <FormikSelect
                  items={SourceOfFUnding.map((item) => {
                    return {
                      value: item.value,
                      label: item.label,
                    };
                  })}
                  name="registeration.fundingInfo.sourceOfFunding"
                  label="source of funding"
                  labelKN="ಧನಸಹಾಯದ ಮೂಲ"
                  required={true}
                />
              </Grid>
              <Grid>
                <Box pt={3}>
                  <FormikSelect
                    items={StartupStage.map((item) => {
                      return {
                        value: item.value,
                        label: item.label,
                      };
                    })}
                    name="registeration.fundingInfo.fundingStage"
                    label="funding stage"
                    labelKN="ಧನಸಹಾಯದ ಹಂತ"
                    required={true}
                  />
                </Box>
              </Grid>
              <Grid>
                <Box pt={3}>
                  <CustomToggleButton
                    label="are you seeking funding?"
                    labelKN="ಧನಸಹಾಯವನ್ನು ಬಯಸುತ್ತಿರುವಿರೇ"
                    name="registeration.fundingInfo.fundingHelpRequirement"
                    required
                  />
                </Box>
              </Grid>
              {toggleValue.fundingHelpRequirement && (
                <>
                  <Grid>
                    <FormikSelect
                      items={FundingRequirement.map((item) => {
                        return {
                          value: item.value,
                          label: item.label,
                        };
                      })}
                      name="registeration.fundingInfo.fundingRequired"
                      label="funding requirement"
                      labelKN="ನಿಧಿಯ ಅವಶ್ಯಕತೆ"
                      required={true}
                    />
                  </Grid>
                  <Grid>
                    <Box pt={3}>
                      <FormikSelect
                        items={TypeOfFunding.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })}
                        name="registeration.fundingInfo.fundingType"
                        label="type of funding you're looking for"
                        labelKN="ನೀವು ಹುಡುಕುತ್ತಿರುವ ನಿಧಿಯ ಪ್ರಕಾರ"
                        required={true}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </>
          ) : (
            <>
              {toggleValue.currentlyFunded !== '' &&
              toggleValue.currentlyFunded === false ? (
                <>
                  <Grid>
                    <CustomToggleButton
                      label="are you currently bootstrapped?"
                      labelKN="ಧನಸಹಾಯಕ್ಕಾಗಿ ಪ್ರಸ್ತುತ ಪರಸಹಾಯವನ್ನೇನಾದರೂ ಪಡೆಯುತ್ತಿರುವಿರೇ"
                      name="registeration.fundingInfo.bootstrapedFunded"
                      required
                    />
                  </Grid>
                  {toggleValue.bootstrapedFunded !== '' &&
                  toggleValue.bootstrapedFunded === false ? (
                    <>
                      <Grid>
                        <CustomToggleButton
                          label="are you seeking funding?"
                          labelKN="ಧನಸಹಾಯಕ್ಕಾಗಿ ಪ್ರಸ್ತುತ ಪರಸಹಾಯವನ್ನೇನಾದರೂ ಪಡೆಯುತ್ತಿರುವಿರೇ"
                          name="registeration.fundingInfo.fundingHelpRequirement"
                          required
                        />
                      </Grid>
                      {toggleValue.fundingHelpRequirement && (
                        <>
                          <Grid>
                            <FormikSelect
                              items={FundingRequirement.map((item) => {
                                return {
                                  value: item.value,
                                  label: item.label,
                                };
                              })}
                              name="registeration.fundingInfo.fundingRequired"
                              label="funding requirement"
                              labelKN="ನಿಧಿಯ ಅವಶ್ಯಕತೆ"
                              required={true}
                            />
                          </Grid>
                          <Grid>
                            <Box pt={3}>
                              <FormikSelect
                                items={TypeOfFunding.map((item) => {
                                  return {
                                    value: item.value,
                                    label: item.label,
                                  };
                                })}
                                name="registeration.fundingInfo.fundingType"
                                label="type of funding you're looking for"
                                labelKN="ನೀವು ಹುಡುಕುತ್ತಿರುವ ನಿಧಿಯ ಪ್ರಕಾರ"
                                required={true}
                              />
                            </Box>
                          </Grid>
                        </>
                      )}
                    </>
                  ) : null}
                </>
              ) : (
                ''
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid>
            <CustomToggleButton
              label="are you a winner of any GoK challenge before?"
              labelKN="ಈ ಹಿಂದೆ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಯಾವುದಾದರೂ ಛಾಲೆಂಜ್ ನ (ಸವಾಲಿನ) ವಿಜೇತರಾಗಿರುವಿರೇ?"
              name="registeration.fundingInfo.kitsChalleneWinning"
              required
            />
          </Grid>
          {toggleValue.kitsChalleneWinning == true && (
            <>
              <Grid>
                <div className="kits__chalege">
                  <FormikSelect
                    items={KitsChallegeWin.map((item) => {
                      return {
                        value: item.value,
                        label: item.label,
                      };
                    })}
                    name="registeration.fundingInfo.kitsChallegeName"
                    label="select the GoK challenge you had won"
                    labelKN="ನೀವು ವಿಜೇತರಾಗಿದ್ದ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಛಾಲೆಂಜ್ ಶೀರ್ಷಿಕೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ"
                    required={true}
                  />
                </div>
              </Grid>
              {field.value.registeration.fundingInfo.kitsChallegeName ===
                'Others' && (
                <Grid>
                  <Box pt={3}>
                    {' '}
                    <Input
                      placeholder="Enter text here"
                      name="registeration.fundingInfo.otherChallengeName"
                      label="If others, specify"
                      labelKN="ಮತ್ತೇನಾದರೂ ಇದ್ದರೆ, ಸೂಚಿಸಿ"
                      required
                    />
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>
        {/* <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};
export default FundingDetails;
