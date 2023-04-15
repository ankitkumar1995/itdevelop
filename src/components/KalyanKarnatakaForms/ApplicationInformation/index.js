import { Grid } from '@material-ui/core';
import FormikSelect from '../../ElevateFormControls/Select';

const ApplicationInformation = (props) => {
  const getOption = () => {
    const options = [{ label: 'Select', value: 'none' }];
    props.activeCallData?.programs.forEach((item) => {
      options.push({ label: item, value: item });
    });
    return options;
  };
  return (
    <Grid container spacing={3}>
      <FormikSelect
        items={getOption()}
        eventSelect
        kalyanaSelect
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
