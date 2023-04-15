import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormikSelect from '../../ElevateFormControls/Select';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import { usersType } from '../GrienvanceData';
import GrievanceSelect from './GrievanceSelect';
import { grievanceData } from '../../grivance';
import { useField } from 'formik';
import SelectFormik from '../../registartion/forms/selectformik';
const GrievanceDetails = (props) => {
  const [field, meta] = useField(props.name);
  const subTypeValue = grievanceData.map(
    (item) => field.value.gType === item.type && item.subTypes
  );
  return (
    <>
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SelectFormik
              items={usersType.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
              name="userType"
              label={'USER TYPE'}
              labelKN="ಬಳಕೆದಾರ ವಿಧ"
              required={true}
              disabled={props?.session ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectFormik
              items={grievanceData.map((item) => {
                return {
                  value: item.type,
                  label: item.type,
                };
              })}
              name="gType"
              label={'GRIEVANCE TYPE'}
              labelKN="ಅಹವಾಲಿನ ವಿಧ"
              required={true}
            />
          </Grid>
          {grievanceData.map(
            (item) =>
              field.value.gType === item.type && (
                <Grid item xs={12}>
                  <GrievanceSelect
                    items={item.subTypes.map((item) => {
                      return {
                        value: item.name,
                        label: item.name,
                      };
                    })}
                    name="gSubType"
                    label={'Grievance Sub Type'}
                    labelKN="ಅಹವಾಲಿನ ಉಪ ವಿಧ"
                    required={true}
                  />
                </Grid>
              )
          )}

          <Grid item xs={12}>
            <FormikTextArea
              placeholder={'Enter text here (not to exceed 750 words)'}
              name="message.text"
              label={`DESCRIBE YOUR GRIEVANCE`}
              labelKN={`ನಿಮ್ಮ ಅಹವಾಲನ್ನು ವಿವರಿಸಿ`}
              rows={10}
              className="txt__area__single__line"
              required
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </>
  );
};
export default GrievanceDetails;
