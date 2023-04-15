import { Grid } from '@material-ui/core';
import React from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import Link from 'next/link';
import CommonCheckBox from '../../ElevateFormControls/CommonCheckBox';
import DocCheckbox from '../../ElevateFormControls/CommonCheckBox/DocCheckBox';
import { useField } from 'formik';
const Annexure1 = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <Grid container spacing={3}>
      <div className="upload_doc_instxn incentive gst">
        <div className="conatiner">
          <div>
            Please download the annexure below to be printed on company letter
            head and upload the duly signed copy.
          </div>
          <div className="self_decla_annex">
            <Link href="/assets/CA_Letter_Template.docx">
              <a>Self Declaration Annexure 1</a>
            </Link>
          </div>
        </div>
      </div>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Upload duly signed copy of Self Declaration Annexure 1"
            labelKN="ಸಹಿ ಮಾಡಿರುವ ಸ್ವಯಂ ಘೋಷಣೆ ಅನುಬಂಧ 1 ರ ಪ್ರತಿಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
            name={'gstReimbursement.gstAnnexure1Part2.selfDeclarationDoc1'}
            size="4"
            fileSize="4194304"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <div className="upload_doc_instxn incentives">
        <div className="conatiner">
          <div>
            Please download the annexure below to be printed on company letter
            head and upload the duly signed copy.
          </div>
          <div className="self_decla_annex">
            <Link href="/assets/CA_Letter_Template.docx">
              <a>Incubator Endorsment Template</a>
            </Link>
          </div>
        </div>
      </div>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Upload duly signed copy of Self Declaration Annexure 2"
            labelKN="ಸ್ವಯಂ ಘೋಷಣೆಯಾಗಿ ಸಹಿ ಮಾಡಿರುವ ಅನುಬಂಧ 2 ರ ಪ್ರತಿಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
            name={'gstReimbursement.gstAnnexure1Part2.selfDeclarationDoc2'}
            size="4"
            fileSize="4194304"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <DocCheckbox
        name="gstcheckbox1"
        label="check1"
        checkbox={props.checkbox}
        declarationContent={`Certified that all the plant and machineries claimed for GST reimbursement are new and no second hand machinery has been included. (Good working condition)`}
        getValue={
          (field.value.gstcheckbox1 && field.value.gstcheckbox2) ||
          (field.value.gstcheckbox3 && field.value.gstcheckbox1) ||
          (field.value.gstcheckbox2 && field.value.gstcheckbox3)
            ? props.getValue
            : null
        }
      />
      <DocCheckbox
        name="gstcheckbox2"
        label="check2"
        declarationContent={`I/We hereby certify that the particulars given above and in the appended enclosures are true and correct to the best of my/our knowledge and belief and that no material facts have been concealed or suppressed.`}
        checkbox={props.checkbox}
        getValue={
          (field.value.gstcheckbox1 && field.value.gstcheckbox2) ||
          (field.value.gstcheckbox3 && field.value.gstcheckbox1) ||
          (field.value.gstcheckbox2 && field.value.gstcheckbox3)
            ? props.getValue
            : null
        }
      />
      <DocCheckbox
        name="gstcheckbox3"
        label="check3"
        declarationContent={`I/We here by certify that the particulars given above and in the appended enclosures in regards to the eligibility for reimbursement are consistent with the terms and conditions stated in the Karnataka Startup Policy 2015-2020 and the Karnataka Startup Policy Operational Guidelines.`}
        checkbox={props.checkbox}
        getValue={
          (field.value.gstcheckbox1 && field.value.gstcheckbox2) ||
          (field.value.gstcheckbox3 && field.value.gstcheckbox1) ||
          (field.value.gstcheckbox2 && field.value.gstcheckbox3)
            ? props.getValue
            : null
        }
      />
    </Grid>
  );
};
export default Annexure1;
