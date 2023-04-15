import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import UploadFiles from '../../ElevateForms/UploadFiles';

const FormC = () => {
  var maxDate = new Date();

  function format1(date) {
    let _date = new Date(date);

    var day = ('0' + _date.getDate()).slice(-2);
    var month = ('0' + (_date.getMonth() + 1)).slice(-2);
    var year = _date.getFullYear();

    return year + '-' + month + '-' + day;
  }
  return (
    <Grid container spacing={3}>
      <div className="address__title incentive">
        <Typography component="h3" variant="h6" align="center">
          APPLICATION FORM FOR POST GRANT PATENT REIMBURSEMENT
          <br />
          ಅನುದಾನ ಪಡೆದ ನಂತರದ ಪೇಟೆಂಟ್‌ ವೆಚ್ಚದ ಮರುಪಾವತಿಗೆ ಅರ್ಜಿ ನಮೂನೆ
        </Typography>
      </div>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder="Enter text here (not to exceed 500 characters)"
          name="patentApplication.postGrantReimbursement.patentTitle"
          label={'Title of the PATENT'}
          labelKN="ಪೇಟೆಂಟ್‌ನ ಶೀರ್ಷಿಕೆ"
          rows={10}
          className="space__text"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <CustomToggleButton
          label="Have you claimed for post filing reimbursement for this patent before this application?"
          labelKN="ನೀವು ಈ ಅರ್ಜಿಗೂ ಮುನ್ನ ಸದರಿ ಪೇಟೆಂಟ್‌ಗಾಗಿ ಸಲ್ಲಿಸಿಕೊಂಡ ನಂತರದ ಮರುಪಾವತಿಗಾಗಿ ಕೋರಿರುವಿರಾ?"
          name="patentApplication.postGrantReimbursement.postReimbursementClaim"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="patentApplication.postGrantReimbursement.furnishDetails"
          label={`please furnish details of the same`}
          labelKN={`ಅದರ ಕುರಿತ ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಒದಗಿಸಿ`}
          rows={10}
          className="txt__area__single__line"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.postGrantReimbursement.patentERegNumber"
          label={'Patent e-Registration Number '}
          labelKN="ಪೇಟೆಂಟ್‌ ಕುರಿತ ಇ-ನೋಂದಣಿ ಸಂಖ್ಯೆ"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter commencement date"
          name="patentApplication.postGrantReimbursement.patentGrantDate"
          label="Date of Grant of Patent"
          labelKN="ಪೇಟೆಂಟ್‌ ಅನುಮೋದನೆಯಾದ ದಿನಾಂಕ"
          InputProps={{
            inputProps: { max: format1(maxDate) },
          }}
          format="MM/dd/yyyy"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF, only one file allow to upload with maximum size `}
            label="Form 27 to be attached "
            labelKN="ನಮೂನೆ 27 ನ್ನು ಅಡಕ ಮಾಡಬೇಕು"
            name={'patentApplication.postGrantReimbursement.form27'}
            size="4"
            fileSize="4194304"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.postGrantReimbursement.patentRegisterationCost"
          label={'Total Cost of Patent Registration'}
          labelKN="ಪೇಟೆಂಟ್‌ ನೋಂದಣಿಗೆ ತಗಲಿದ ಒಟ್ಟು ವೆಚ್ಚ"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,all the statements should be compressed and merged to one single file less than `}
            label="Detailed statement of expenses incurred towards the Patent Registration along with the copies of Invoices & receipts"
            labelKN="ಪೇಟೆಂಟ್‌ ನೋಂದಣಿಗಾಗಿ ತಗಲಿದ ಖರ್ಚುಗಳ ವಿವರವಾದ ದಸ್ತಾವೇಜು, ಜೊತೆಗೆ ಇನ್ವಾಯ್ಸ್‌ ಗಳ ಮತ್ತು ರಸೀತಿಗಳ ಪ್ರತಿಗಳು"
            name={'patentApplication.postGrantReimbursement.expensesStatement'}
            size="5"
            fileSize="5242880"
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
    </Grid>
  );
};
export default FormC;
