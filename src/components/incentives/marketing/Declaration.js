import { Grid } from '@material-ui/core';
import React from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import Link from 'next/link';
import Input from '../../ElevateFormControls/input';
import CommonCheckBox from '../../ElevateFormControls/CommonCheckBox';
const DeclarationForm = (props) => {
  return (
    <Grid container spacing={3}>
      <div className="upload_doc_instxn">
        <div className="conatiner">
          <div>
            To be printed on Company/Entity letterhead and duly signed and
            affixed with company/entity seal. Please download the annexure below
            to be printed on company letter head and upload the duly signed
            copy.
            <br />
            ಕಂಪನಿ / ಸಂಸ್ಥೆಯ ಲೆಟರ್‌ ಹೆಡ್‌ ನಲ್ಲಿ ಮುದ್ರಿಸಬೇಕು ಮತ್ತು ಸಹಿ ಹಾಕಿ
            ಕಂಪನಿಯ/ಸಂಸ್ಥೆಯ ಮುದ್ರೆಯನ್ನು ಒತ್ತಬೇಕು. ಈ ಕೆಳಕಂಡ ಅನುಬಂಧವನ್ನು ದಯವಿಟ್ಟು
            ಡೌನ್ಲೋಡ್‌ ಮಾಡಿ ಕಂಪನಿಯ ಲೆಟರ್‌ಹೆಡ್‌ ಮೇಲೆ ಮುದ್ರಿಸಿ ಸಹಿ ಮಾಡಿದ ಪ್ರತಿಯನ್ನು
            ಅಪ್ಲೋಡ್‌ ಮಾಡಿ.
          </div>
          <div className="self_decla_annex">
            <Link href="/assets/CA_Letter_Template.docx">
              <a>Self Declaration Annexure</a>
            </Link>
          </div>
        </div>
      </div>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Upload duly signed copy of Self Declaration Annexure"
            labelKN="ಸಹಿ ಮಾಡಿರುವ ಸ್ವಯಂ ಘೋಷಣೆಯ ಅನುಬಂಧದ ಪ್ರತಿಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ."
            name={'marketingReimbursement.partB.selfDeclaration1'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <div className="upload_doc_instxn">
        <div className="conatiner">
          <div>
            Duly filled Annexure II if applying through an Empanelled Incubator
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
            labelKN="ಸಹಿ ಮಾಡಿರುವ ಸ್ವಯಂ ಘೋಷಣೆಯ ಪ್ರತಿಯನ್ನು ಅನುಬಂಧ 2 ಆಗಿ ಅಪ್ಲೋಡ್‌ ಮಾಡಿ."
            name={'marketingReimbursement.partB.selfDeclaration2'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Upload duly signed copy of Self Declaration Annexure"
            labelKN=""
            name={'marketingReimbursement.partB.eventReimbursementClaim'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Welcome Letter from Organizers"
            labelKN="ಆಯೋಜಕರಿಂದ ಆಹ್ವಾನ ಪತ್ರ"
            name={'marketingReimbursement.partB.organizationWelcomeLetter'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Confirmation of registration & receipt of registration fee"
            labelKN="ನೋಂದಣಿಯನ್ನು ಖಚಿತಪಡಿಸಿ ಮತ್ತು ನೋಂದಣಿ ಶುಲ್ಕದ ರಸೀತಿ ಒದಗಿಸಿ"
            name={'marketingReimbursement.partB.registerationFeeReciept'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Event Brochures / Proceedings"
            labelKN="ಸಮಾವೇಶದ ಬ್ರೋಷರ್‌ ಗಳು / ನಡವಳಿಗಳು"
            name={'marketingReimbursement.partB.eventPreceedings'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Event Web Page showing Company Name, Shipping documents,Printed"
            labelKN="ಕಂಪನಿಯ ಹೆಸರು, ರವಾನಿಸುವ ಮುದ್ರಿತ ದಾಖಲಾತಿಗಳನ್ನು ಕಾಣಿಸುವ ಸಮಾವೇಶದ ವೆಬ್‌ ಪೇಜ್‌"
            name={'marketingReimbursement.partB.eventWebPageDoc'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Market Research Subscription/ Reports (Web link/Letter/E-mail communications) if applicable"
            labelKN="ಮಾರುಕಟ್ಟೆ ಸಂಶೋಧನೆ ವಂತಿಗೆದಾರಿಕೆ /ವರದಿಗಳು (ವೆಬ್‌ ಕೊಂಡಿ / ಪತ್ರ / ಮಿಂಚಂಚೆ ಸಂವಹನಗಳು), ಅನ್ವಯಿಸುವುದಿದ್ದಲ್ಲಿ."
            name={'marketingReimbursement.partB.marketResearch'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="If reimbursement is claimed against Advertisements / PR in International Print / Broadcast / Online Publications / Google Adwords/ social media marketing content, the following need to be furnished:- Photocopies/Scanned documents of publicity material"
            labelKN="ಅಂತರರಾಷ್ಟ್ರೀಯ ಮುದ್ರಣ/ಬಾನುಲಿ/ಆನ್ಲೈನ್‌ ಪ್ರಕಟಣೆಗಳು /ಗೂಗಲ್/ ಆಡ್‌ವರ್ಡ್ಸ್‌ / ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಮಾರುಕಟ್ಟೆ ವಿಷಯವಸ್ತುವಿನಲ್ಲಿ ಜಾಹೀರಾತುಗಳು / ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕ ಸಂಬಂಧವಾಗಿ ಮರುಪಾವತಿಯನ್ನು ಕೋರುತ್ತಿದ್ದಲ್ಲಿ, ಈ ಕೆಳಕಂಡವುಗಳನ್ನು ಒದಗಿಸಬೇಕು : - ಪ್ರಚಾರ ಪದಾರ್ಥಗಳ ಪ್ರತಿಗಳು / ಸ್ಕ್ಯಾನ್‌ ದಾಖಲಾತಿಗಳು."
            name={'marketingReimbursement.partB.advertisementReimbursement'}
            size="5"
            fileSize="5242880"
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
          name="marketingReimbursement.partB.webLinks"
          label={'Web links'}
          labelKN="ವೆಬ್‌ ಕೊಂಡಿಗಳು"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="Invoice of the payment towards the service providers and payment proof"
            labelKN="ಸೇವಾಪೂರೈಕೆದಾರರುಗಳಿಗೆ ಪಾವತಿಸಿದುದ್ದರ ಇನ್ವಾಯ್ಸ್‌ ಮತ್ತು ಪಾವತಿಯ ಪುರಾವೆ"
            name={'marketingReimbursement.partB.marketExpensesInvoices'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      {/* <Grid item xs={12}>
        <UploadFiles
          imageTypeMsg
          label="Copy of Invoices and Purchase Orders for all Marketing Expenses claimed along with at least one supporting document for each expense. In this regard, the company/unit has to produce proof of stay at the location along with air travel (boarding pass) and visa stamped"
          labelKN="ಮರುಪಾವತಿ ಕೋರುವ ಎಲ್ಲ ಮಾರ್ಕೆಟಿಂಗ್‌ ಖರ್ಚುಗಳ ಕುರಿತ ಇನ್ವಾಯ್ಸ್‌ ಗಳು ಮತ್ತು ಖರೀದಿ ಆದೇಶಗಳ ಪ್ರತಿಗಳು ಮತ್ತು ಪ್ರತಿಯೊಂದು ಖರ್ಚಿಗೆ ಕನಿಷ್ಠ ಒಂದು ಬೆಂಬಲದ ದಾಖಲೆಯೊಂದಿಗೆ. ಈ ಬಗ್ಗೆ, ಕಂಪನಿ / ಘಟಕವು ತಂಗಿಕೊಂಡಿದ್ದ ಸ್ಥಳದ ಮತ್ತು ವಿಮಾನ ಪ್ರಯಾಣದ (ಬೋರ್ಡಿಂಗ್‌ ಪಾಸ್)‌ ಮತ್ತು ಮುದ್ರೆ ಹಾಕಿರುವ ವೀಸಾ – ಇವುಗಳ ಪುರಾವೆಯನ್ನು ಒದಗಿಸಬೇಕು"
          name={'marketingReimbursement.partB'}
          size="5"
          fileSize="5242880"
          notRequiredArray={true}
          filesLimit={1}
          acceptedFiles={['.pdf']}
          required
        />
      </Grid> */}
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF,only one file allowed with size less than `}
            label="A report of all business development activities undertaken by the company during the visit to the trade fair by the unit shall also be submitted."
            labelKN="ಘಟಕದಿಂದ ವ್ಯಾಪಾರ ಸಮಾವೇಶಕ್ಕೆ ಭೇಟಿ ನೀಡಿದ ಸಂದರ್ಭದಲ್ಲಿ ಅಂತಹ ಕಂಪನಿಯಿಂದ ಕೈಗೊಂಡ ಎಲ್ಲ ವ್ಯವಹಾರ ಅಭಿವೃದ್ಧಿ ಚಟುವಟಿಕೆಗಳ ವರದಿಯೊಂದನ್ನು ಸಹ ಸಲ್ಲಿಸತಕ್ಕದ್ದು."
            name={'marketingReimbursement.partB.businessDevActivityReports'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
            required
          />
        </div>
      </Grid>
      <hr />
      <div className="mandate-text">
        <p> * ALL THE SUPPORTING DOCUMENTS ARE TO BE UPLOADED * MANDATORY </p>
      </div>
      <CommonCheckBox
        checkbox={props.checkbox}
        getValue={props.getValue}
        notRequiredPrivacy={true}
        declarationContent={`I Solemnly declare that the particulars given in the above statement are correct, I also undertake that any financial assistance granted to us on the basis of this declaration shall be liable to be refunded to KITS, if at any time, any information furnished in this application/ declaration is found to be wrong or incorrect or misleading.`}
        declarationContentKN={`ಈ ಮೇಲೆ ತಿಳಿಸಿರುವಂತೆ ಒದಗಿಸಿರುವ ವಿವರಗಳು ಸರಿಯಾಗಿರುವುದೆಂದು ನಾನು ಪ್ರಮಾಣ ಮಾಡಿ ಘೋಷಿಸುತ್ತೇನೆ, ಯಾವುದೇ ಸಂದರ್ಭದಲ್ಲಿ, ಈ ಅರ್ಜಿಯಲ್ಲಿ/ಘೋಷಣೆಯಲ್ಲಿ ಒದಗಿಸಿರುವ ಯಾವುದೇ ಮಾಹಿತಿಯು ತಪ್ಪಾಗಿರುವ ಅಥವಾ ಸರಿಯಾದುದಲ್ಲವಾಗಿದ್ದು ಅಥವಾ ದಾರಿ ತಪ್ಪಿಸುವಂತಿರುವುದು ಕಂಡುಬಂದಲ್ಲಿ, ಈ ಘೋಷಣೆಯ ಆಧಾರವಾಗಿ ನಮಗೆ ಮಂಜೂರಾಗಿರುವ ಯಾವುದೇ ಆರ್ಥಿಕ ಸಹಾಯವನ್ನು ಕಿಟ್ಸ್‌ ಸಂಸ್ಥೆಗೆ ಮರುಪಾವತಿ ಮಾಡಲು ಬದ್ಧರಾಗಿರುತ್ತೇವೆ.`}
      />
    </Grid>
  );
};
export default DeclarationForm;
