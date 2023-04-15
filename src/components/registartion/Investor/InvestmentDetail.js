import React from 'react';
import { Grid } from '@material-ui/core';
import Input from '../../ElevateFormControls/input';
import CommonMultiSelect from '../../ElevateFormControls/CommonMultiSelect';
import { TechData } from '../../ElevateForms/ElevateFormData';
import {
  industryData,
  investementRangeData,
  investmentStageData,
} from '../registrationFormData';
import FormikSelect from '../../ElevateFormControls/Select';
import CheckBox from '../../ElevateFormControls/CheckBox';
const InvestmentDetails = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CommonMultiSelect
            //others={setOthersValue}
            //selectedValues={props.selectedValues}
            name="registeration.investmentDetails.preferredIndustrySector"
            label="Preferred industry/ sector for investment"
            labelKN="ಹೂಡಿಕೆಗಾಗಿ ಆಯ್ಕೆಯ ಉದ್ಯಮ ಕ್ಷೇತ್ರ  / ವಲಯ"
            options={industryData.map((i) => {
              return {
                id: i,
                label: i,
              };
            })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CommonMultiSelect
            //others={setOthersValue}
            selectedValues={props.selectedValues}
            name="registeration.investmentDetails.preferredTechnology"
            label="preferred technology for investment"
            labelKN="ಹೂಡಿಕೆಗಾಗಿ ಆಯ್ಕೆಯ ತಂತ್ರಜ್ಞಾನ"
            options={TechData.map((i) => {
              return {
                id: i,
                label: i,
              };
            })}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.investmentDetails.totalOrgFunded"
            label="Total number of organizations funded"
            labelKN="ಎಷ್ಟು ಸಂಸ್ಥೆಗಳಿಗೆ ಧನಸಹಾಯ ನೀಡಲಾಗಿದೆ"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter total amount"
            name="registeration.investmentDetails.totalAmoutFunded"
            label="Total amount funded till date"
            labelKN="ಪ್ರಸ್ತುತ ದಿನಾಂಕದವರೆಗೆ ಧನಸಹಾಯ ನೀಡಿರುವ ಒಟ್ಟು ಮೊತ್ತ"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormikSelect
            items={investmentStageData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.investmentDetails.preferredInvestmentStage"
            label={'At what stage do you prefer to invest'}
            labelKN="ಯಾವ ಹಂತದಲ್ಲಿ ನೀವು ಹೂಡಿಕೆ ಮಾಡಲು ಬಯಸುವಿರಿ"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikSelect
            items={investementRangeData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="registeration.investmentDetails.investmentRange"
            label={'what is your investment range'}
            labelKN="ನಿಮ್ಮ ಹೂಡಿಕೆಯ ವಿಸ್ತಾರ, ಮಟ್ಟವೆಷ್ಟು"
            required={true}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number here"
            name="registeration.investmentDetails.presentPortfolio"
            label="Present portfolio (in usd)"
            maxLength={10}
            labelKN="ಪ್ರಸ್ತುತದಲ್ಲಿರುವ ಹೂಡಿಕೆಯ ಹಂದರ (ಅಮೆರಿಕನ್ ಡಾಲರ್ ಗಳಲ್ಲಿ)"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter number of companies"
            name="registeration.investmentDetails.fundSize"
            maxLength={10}
            label="Fund size ( in usd)"
            labelKN="ಧನಸಹಾಯದ ಪ್ರಮಾಣ (ಅಮೆರಿಕನ್ ಡಾಲರ್ ಗಳಲ್ಲಿ)"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default InvestmentDetails;
