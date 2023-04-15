import { Grid } from '@material-ui/core';
import React from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import Link from 'next/link';
const FinancialInformation = () => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomToggleButton
            label="Is your company's revenue below 100cr per annum."
            labelKN="ನಿಮ್ಮ ಕಂಪನಿಯ ಆದಾಯವು ಪ್ರತಿ ವರ್ಷಕ್ಕೆ 100CR ಗಿಂತ ಕಡಿಮೆಯಿದೆಯೇ?"
            name="registeration.financialInfo.isRevenueBelow100cr"
            required
          />
        </Grid>
        <div className="upload_doc_instxn">
          <div className="conatiner">
            <div>
              Please download the CA letter below and upload a
              <span className="upload_doc_instxn_hltd">
                {' '}
                sealed & signed copy
              </span>{' '}
              of the same on the company letter head.
            </div>
            <div className="self_decla_annex">
              <Link href="/assets/CA_Letter_Template.docx">
                <a>CA Letter template</a>
              </Link>
            </div>
          </div>
        </div>
        <Grid item xs={12}>
          <UploadFiles
            elevate
            label="Upload signed copy of CA letter"
            labelKN="CA ಪತ್ರದ ಸಹಿ ಪ್ರತಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
            name="registeration.financialInfo.signedCALetter"
            size="1"
            fileSize="1048576"
            filesLimit={3}
            required
            acceptedFiles={['.pdf']}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default FinancialInformation;
