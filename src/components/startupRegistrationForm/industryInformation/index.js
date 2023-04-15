import React from 'react';
import Grid from '@material-ui/core/Grid';

import FormikSelect from '../../ElevateFormControls/Select';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import {
  IndustrySectorType,
  TagAddtionalIndustrySector,
} from '../startupRegistrationFormData';
import CommonMultiSelect from '../../ElevateFormControls/CommonMultiSelect';
export default function IndustryInformation(props) {
  //  const [agree, setAgree] = useState(false);

  //  const getAgree = (val) => {
  //    setAgree(!val);
  //    props.getValue(!val);
  //  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormikSelect
            items={IndustrySectorType.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.industryInfo.industrySectorType"
            label="industry/sector"
            labelKN="ಉದ್ಯಮ / ವಲಯ"
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormikSelect
            items={[
              { label: 'Select', value: '' },
              { label: 'Product', value: 'Product' },
              { label: 'Service', value: 'Service' },
              { label: 'Both', value: 'Both' },
            ].map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.industryInfo.productOrServiceBased"
            label="product/service based?"
            labelKN="ಉತ್ಪನ್ನ ಆಧಾರಿತವೋ / ಸೇವಾ ಆಧಾರಿತವೋ"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <CommonMultiSelect
            //others={setOthersValue}
            selectedValues={props.selectedValues}
            name="registeration.industryInfo.additionalIndustriesSectors"
            label="tag additional industries/sectors"
            labelKN="ಹೆಚ್ಚುವರಿ ಕೈಗಾರಿಕೆಗಳನ್ನು /ವಲಯಗಳನ್ನು ತಳಕು ಹಾಕಿ"
            options={TagAddtionalIndustrySector.map((i) => {
              return {
                id: i,
                label: i,
              };
            })}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="registeration.industryInfo.aboutCompanyProfile"
            label="company profile brief"
            labelKN="ಕಂಪನಿ ಲಕ್ಷಣಗಳ ಸಂಕ್ಷಿಪ್ತ ವಿವರ"
            className="space__text"
            rows={10}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="registeration.industryInfo.productOrServiceDescription"
            label="briefly describe your product/service"
            labelKN="ನಿಮ್ಮ ಉತ್ಪನ್ನ / ಸೇವೆಗಳ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತವಾಗಿ ವಿವರಿಸಿ"
            className="space__text"
            rows={10}
            required
          />
        </Grid>
        {/* <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
