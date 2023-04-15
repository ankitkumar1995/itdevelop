import { Grid, Typography } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import SelectFormik from '../../registartion/forms/selectformik';
import { GOKData } from '../incentiveFormData';

const FormA = (props) => {
  const [field, meta] = useField(props.name);
  const toggleValue =
    field.value.patentApplication.reimbursementA.incubDetails.gokSupported;
  return (
    <Grid container spacing={3}>
      <div className="address__title incentive">
        <Typography component="h1" variant="h6" align="center">
          COMMON APPLICATION FORM FOR PATENT REIMBURSEMENT
          <br />
          ಪೇಟೆಂಟ್‌ ಪಡೆಯಲು ತಗಲಿದ ವೆಚ್ಚದ ಮರುಪಾವತಿಗಾಗಿ ಸರ್ವಸಾಮಾನ್ಯ ಅರ್ಜಿ ನಮೂನೆ
        </Typography>
      </div>
      <Grid item xs={12} sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementA.companyName"
          label={'Company Name'}
          labelKN="ಕಂಪನಿಯ ಹೆಸರು "
          disabled={true}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementA.kitsRegNo"
          label={'KITS Registration Number'}
          labelKN="KITS  ನೋಂದಣಿ ಸಂಖ್ಯೆ"
          disabled={true}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomToggleButton
          label="Are you applying through a GoK Supported Incubator?"
          labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪರಿಪೋಷಕದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿಕೊಳ್ಳುತ್ತಿರುವಿರಾ?"
          name="patentApplication.reimbursementA.incubDetails.gokSupported"
          required
        />
      </Grid>
      {toggleValue === true && (
        <Grid item xs={12} sm={6}>
          <SelectFormik
            items={GOKData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="patentApplication.reimbursementA.incubDetails.incubGokAffiliated"
            label={'GoK supported incubator you are affiliated with'}
            labelKN="ನೀವು ಸಂಯೋಜಿಸಿಕೊಂಡಿರುವ ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪರಿಪೋಷಕದ ಹೆಸರೇನು"
            required={true}
          />
        </Grid>
      )}
      {toggleValue === false && (
        <Grid item xs={12}>
          <FormikTextArea
            placeholder="Enter text here(not exceed 250 characters)"
            name="patentApplication.reimbursementA.incubDetails.incubNameAddress"
            label={'SPECIFY THE NAME OF INCUBATOR and Address'}
            labelKN="ಇನ್ಕ್ಯುಬೇಟರ್ ಹೆಸರು ಮತ್ತು ವಿಳಾಸವನ್ನು ಸೂಚಿಸಿ"
            rows={10}
            className="txt__area__single__line"
            required
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementA.incubDetails.inventorName"
          label={'Inventors Name'}
          labelKN="ಆವಿಷ್ಕಾರರ ಹೆಸರು"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementA.incubDetails.inventorDesignation"
          label={'Inventors Designation'}
          labelKN="ಆವಿಷ್ಕಾರರ ಪದನಾಮ"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementA.incubDetails.patentOwner"
          label={'Owner of the Patent'}
          labelKN="ಪೇಟೆಂಟ್‌ ನ ಮಾಲೀಕರು"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder="Enter text here (not to exceed 500 characters)"
          name="patentApplication.reimbursementA.incubDetails.patentTitle"
          label={'Patent Title'}
          labelKN="ಪೇಟೆಂಟ್‌ ನ ಶೀರ್ಷಿಕೆ"
          rows={10}
          className="txt__area__single__line"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementA.incubDetails.totalReimbursementClaimed"
          label={'No of Patents for which reimbursement has been claimed'}
          labelKN="ವೆಚ್ಚ ಮರುಪಾವತಿ ಪಡೆಯಬಯಸಿರುವ ಪೇಟೆಂಟ್‌ ಗಳ ಸಂಖ್ಯೆ"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="patentApplication.reimbursementA.incubDetails.pastFurnishClaimDetails"
          label={`Furnish details of the past claims (Furnish patent filing no's)`}
          labelKN={`ಈ ಹಿಂದೆ ಪಡೆದುಕೊಂಡಿರುವುದರ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ* (ಪೇಟೆಂಟ್‌ ಸಲ್ಲಿಕೆಯ ಸಂಖ್ಯೆಗಳನ್ನು ಒದಗಿಸಿ)`}
          rows={10}
          className="txt__area__single__line"
          required
        />
      </Grid>
      <div className="address__title">
        <Typography component="h1" variant="h6" align="center">
          Details of Patent Registration
          <br />
          ಪೇಟೆಂಟ್‌ ಗಾಗಿ ನೋಂದಣಿಗೊಂಡ ವಿವರಗಳು
        </Typography>
      </div>
      <Grid item xs={12} sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementA.patentDetails.title"
          label={'Title of the Invention'}
          labelKN="ಆವಿಷ್ಕಾರದ ಶೀರ್ಷಿಕೆ"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 300 words)'}
          name="patentApplication.reimbursementA.patentDetails.brief"
          label={`Brief note on Invention`}
          labelKN={`ಆವಿಷ್ಕಾರದ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತ ಟಿಪ್ಪಣಿ`}
          rows={10}
          className="txt__area__single__line"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 300 words)'}
          name="patentApplication.reimbursementA.patentDetails.adavantage"
          label={`Advantages of the Invention`}
          labelKN={`ಆವಿಷ್ಕಾರದ ಅನುಕೂಲಗಳು`}
          rows={10}
          className="txt__area__single__line"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="patentApplication.reimbursementA.patentDetails.applicableSectors"
          label={`Applicable Sectors of the Invention`}
          labelKN={`ಆವಿಷ್ಕಾರವು ಅನ್ವಯವಾಗುವ ವಲಯಗಳು`}
          rows={10}
          className="txt__area__single__line"
          required
        />
      </Grid>
    </Grid>
  );
};
export default FormA;
