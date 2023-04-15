import { Grid } from '@material-ui/core';
import React from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import Link from 'next/link';
import CommonCheckBox from '../../ElevateFormControls/CommonCheckBox';

const DeclarationForm = (props) => {
  return (
    <Grid container spacing={3}>
      <div className="upload_doc_instxn incentive">
        <div className="conatiner">
          <div>
            Please download the Annexure 1 below (Expenditure statement with
            invoices) & upload
            <span className="upload_doc_instxn_hltd"> signed copy</span> of the
            same.
          </div>

          <Link href="/assets/Patents_Annexure_1_Detailed_Statement_of_Expenditure_Incurred_For_Adoption_of_Technology.doc">
            <div className="self_decla_annex">
              <a target={'_blank'}>Annexure 1</a>
            </div>
          </Link>
        </div>
      </div>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={'PDF,only one file allowed with size less than '}
            label="Upload duly signed copy of Self Declaration Annexure 1"
            labelKN="ಸಹಿ ಮಾಡಿರುವ ಅನುಬಂಧ 1 ರ ಪ್ರತಿಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
            name={'patentApplication.documents.annexure1'}
            size="1"
            fileSize="1048576"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <div className="upload_doc_instxn incentive">
        <div className="conatiner">
          <div>
            Please download the Annexure 1 below (Self declaration) & upload
            <span className="upload_doc_instxn_hltd"> signed copy</span> of the
            same.
          </div>

          <Link href="/assets/Patents_Annexure_2_Declaration.doc">
            <div className="self_decla_annex">
              <a target={'_blank'}>Annexure 2</a>
            </div>
          </Link>
        </div>
      </div>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={'PDF,only one file allowed with size less than '}
            label="Upload duly signed copy of Self Declaration Annexure 2"
            labelKN="ಸಹಿ ಮಾಡಿರುವ ಅನುಬಂಧ 2 ರ ಪ್ರತಿಯನ್ನು"
            name={'patentApplication.documents.annexure2'}
            size="1"
            fileSize="1048576"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <div className="upload_doc_instxn incentive">
        <div className="conatiner">
          <div>
            Please download the Annexure 1 below (Incubator Endorsement
            Template) & upload
            <span className="upload_doc_instxn_hltd"> signed copy</span> of the
            same.
          </div>
          <Link href="/assets/Patents_Annexure_3_Incubator_Endorsement_&_Gurantee.doc">
            <div className="self_decla_annex">
              <a target={'_blank'}>Annexure 3</a>
            </div>
          </Link>
        </div>
      </div>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={'PDF,only one file allowed with size less than '}
            label="Upload duly signed copy of Self Declaration Annexure 3"
            labelKN="ಸಹಿ ಮಾಡಿರುವ ಅನುಬಂಧ 3 ರ ಪ್ರತಿಯನ್ನು "
            name={'patentApplication.documents.annexure3'}
            size="1"
            fileSize="1048576"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <hr />
      <div className="mandate-text">
        <p>* ALL THE SUPPORTING DOCUMENTS ARE TO BE UPLOADED * MANDATORY</p>
      </div>
      <CommonCheckBox
        checkbox={props.checkbox}
        getValue={props.getValue}
        declarationContent={`I hereby verify that all the documents uploaded are true to my knowledge and I agree to the Terms & Conditions and Privacy Policy of Startup Karnataka.`}
        declarationContentKN={`ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾದ ಎಲ್ಲಾ ದಾಖಲೆಗಳು ನನ್ನ ಜ್ಞಾನಕ್ಕೆ ನಿಜವೆಂದು ನಾನು ಈ ಮೂಲಕ ಪರಿಶೀಲಿಸುತ್ತೇನೆ ಮತ್ತು ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಕರ್ನಾಟಕದ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು ಮತ್ತು ಗೌಪ್ಯತೆ ನೀತಿಗೆ ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ`}
      />
    </Grid>
  );
};
export default DeclarationForm;
