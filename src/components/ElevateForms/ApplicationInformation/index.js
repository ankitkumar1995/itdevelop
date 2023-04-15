import { Grid } from '@material-ui/core';
import FormikSelect from '../../ElevateFormControls/Select';
import CheckBox from '../../ElevateFormControls/CheckBox';
import { copyData } from '../../ElevateFormControls/ToggleButton';
const ApplicationInformation = (props) => {
  return (
    <Grid container spacing={3}>
      <FormikSelect
        items={[
          { label: 'Select', value: '' },
          { label: 'ELEVATE 2021', value: 'ELEVATE 2021' },
          {
            label: 'ELEVATE UNNATI (For SC/ST Entreprenuers)',
            value: 'ELEVATE UNNATI 2021 (FOR SC/ST Enterpreneurs)',
          },
        ].map((item) => {
          return {
            value: item.value,
            label: item.label,
          };
        })}
        images={props.images || []}
        initialValues={props.initialValues}
        name="companyInformation.programName"
        label={'Please Choose the program /scheme you wish to apply? '}
        labelKN="ದಯವಿಟ್ಟು ನೀವು ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಬಯಸುವ ಪ್ರೋಗ್ರಾಂ /ಸ್ಕೀಮ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿಕೊಳ್ಳಿ?"
        required={true}
      />
    </Grid>
  );
};
export default ApplicationInformation;
