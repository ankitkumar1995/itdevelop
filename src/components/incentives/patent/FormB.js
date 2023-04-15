import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Input from '../../ElevateFormControls/input';
import UploadFiles from '../../ElevateForms/UploadFiles';
const FormB = () => {
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
        <Typography component="h1" variant="h6" align="center">
          APPLICATION FORM FOR POST FILING PATENT REIMBURSEMENT
          <br />
          ಪೇಟೆಂಟ್‌ ಕುರಿತ ವೆಚ್ಚದ ಮರುಪಾವತಿಗೆ ಸಲ್ಲಿಸಿದ ನಂತರಕ್ಕೆ ಅರ್ಜಿ ನಮೂನೆ
        </Typography>
      </div>
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter commencement date"
          name="patentApplication.reimbursementB.filingDate"
          label="Date of Filing for Patent Registration"
          labelKN="ಪೇಟೆಂಟ್‌ ಗಾಗಿ ನೋಂದಣಿಗೆ ಸಲ್ಲಿಸಿಕೊಂಡ ದಿನಾಂಕ"
          InputProps={{
            inputProps: { max: format1(maxDate) },
          }}
          format="MM/dd/yyyy"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementB.filingApplNo"
          label={'Patent filing application number'}
          labelKN="ಪೇಟೆಂಟ್‌ ಗಾಗಿ ಸಲ್ಲಿಸಿದ ಅರ್ಜಿ ಸಂಖ್ಯೆ"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="patentApplication.reimbursementB.patentFiligCost"
          label={'Total Cost of Patent Filing till date/in Pre-grant phase'}
          labelKN="ತಹಲ್‌ ವರೆಗೆ ಪೇಟೆಂಟ್‌ ಗಾಗಿ ಸಲ್ಲಿಸಲು / ಅನುದಾನ-ಪೂರ್ವ ಹಂತದಲ್ಲಿ ತಗಲಿದ ಒಟ್ಟು ವೆಚ್ಚ"
          className="patent__cost"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <UploadFiles
          typeMsg={`PDF, Multiple uploads are allowed with each file less than`}
          label="Copy of the patent application filed"
          labelKN="ಪೇಟೆಂಟ್‌ ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ಪ್ರತಿ"
          name={'patentApplication.reimbursementB.patentAppCopy'}
          size="5"
          fileSize="5242880"
          filesLimit={2}
          acceptedFiles={['.pdf']}
          required
        />
      </Grid>
    </Grid>
  );
};
export default FormB;
