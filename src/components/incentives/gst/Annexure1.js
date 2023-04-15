import { Grid, Typography } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import UploadFiles from '../../ElevateForms/UploadFiles';
import SelectFormik from '../../registartion/forms/selectformik';
import { GOKData } from '../../ElevateForms/ElevateFormData';

const DeclarationForm = (props) => {
  const [field, meta] = useField(props.name);
  const toggleValue =
    field.value.gstReimbursement.gstAnnexure1Part1.gokSupported;
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
          COMMON APPLICATION FORM FOR PATENT REIMBURSEMENT
          <br />
          ಪೇಟೆಂಟ್‌ ಪಡೆಯಲು ತಗಲಿದ ವೆಚ್ಚದ ಮರುಪಾವತಿಗಾಗಿ ಸರ್ವಸಾಮಾನ್ಯ ಅರ್ಜಿ ನಮೂನೆ
        </Typography>
      </div>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.companyName"
          label={'company name per incorporation certificate'}
          labelKN="ನಿಗಮಿತಗೊಂಡ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ ಕಂಪನಿಯ ಹೆಸರು"
          disabled={true}
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.kitsRegNo"
          label={'KITS Registration Number '}
          labelKN="KITS ನೋಂದಣಿ ಸಂಖ್ಯೆ"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <CustomToggleButton
          label="Are you applying through a GoK Supported Incubator?"
          labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪರಿಪೋಷಕದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿಕೊಳ್ಳುತ್ತಿರುವಿರಾ?"
          name="gstReimbursement.gstAnnexure1Part1.gokSupported"
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
            name="gstReimbursement.gstAnnexure1Part1.incubGokAffiliated"
            label={'GoK supported incubator you are affiliated with'}
            labelKN="ನೀವು ಸಂಯೋಜಿಸಿಕೊಂಡಿರುವ ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪರಿಪೋಷಕದ ಹೆಸರೇನು"
            required={true}
          />
        </Grid>
      )}
      {toggleValue === false && (
        <Grid item xs={12}>
          <FormikTextArea
            placeholder="Enter text here (not to exceed 250 characters)"
            name="gstReimbursement.gstAnnexure1Part1.nameOfTheIncubator"
            label={'SPECIFY THE NAME OF INCUBATOR and Address'}
            labelKN="ಇನ್ಕ್ಯುಬೇಟರ್ ಹೆಸರು ಮತ್ತು ವಿಳಾಸವನ್ನು ಸೂಚಿಸಿ"
            rows={10}
            className="com__address space__text"
            required
          />
        </Grid>
      )}
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.reimburseClaim"
          label={'Reimbursement Claim '}
          labelKN="ಪಡೆಯುವ ಮರುಪಾವತಿ"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.gstSupplierPaymentTo"
          label={'GST paid to the supplier of goods to Incubatee or Incubator'}
          labelKN="ಜಿ.ಎಸ್.ಟಿ. ತೆರಿಗೆ ಪಾವತಿಸಿದ ಸರಕುಗಳ ಸರಬರಾಜುದಾರರ ಹೆಸರು"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.gstTaxPayment"
          label={'For GST Paid to Tax Department '}
          labelKN="ತೆರಿಗೆ ಇಲಾಖೆಗೆ ಪಾವತಿಸಿದ ಜಿ.ಎಸ್.ಟಿ. ಗಾಗಿ."
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.reimbursementClaimAmount"
          label={'Amount of Reimbursement Claimed'}
          labelKN="ಕೋರಿರುವ ಮರುಪಾವತಿಯ ಮೊತ್ತ"
          required
        />
      </Grid>
      {/* <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.incubationCommenceDate"
          label={'Date of commencement of incubation'}
          labelKN="ಪರಿಪೋಷಣೆ ಪ್ರಾರಂಭಗೊಂಡ ದಿನಾಂಕ"
          required
        />
      </Grid> */}
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.incubationCommenceDate"
          label={'Date of commencement of incubation'}
          labelKN="ಪರಿಪೋಷಣೆ ಪ್ರಾರಂಭಗೊಂಡ ದಿನಾಂಕ"
          InputProps={{
            inputProps: { max: format1(maxDate) },
          }}
          format="MM/dd/yyyy"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="TIN No of the applicant / GST Reg no"
          name="gstReimbursement.gstAnnexure1Part1.gstRegNo"
          label={'Tax Identification Number of the Applicant/ GST Regn. no.'}
          labelKN="ಅರ್ಜಿದಾರರ ತೆರಿಗೆ ಗುರುತಿನ ಸಂಖ್ಯೆ / ಜಿ.ಎಸ್.ಟಿ. ನೋಂದಣಿ ಸಂಖ್ಯೆ"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="GST of the Supplier"
          name="gstReimbursement.gstAnnexure1Part1.supplierGstRegNo"
          label={'Please provide GST Registartion No. of the supplier'}
          labelKN="ಸರಬರಾಜುದಾರರ ಜಿ.ಎಸ್.ಟಿ. ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು ದಯವಿಟ್ಟು ಒದಗಿಸಿ "
          required
        />
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF, only one file allowed with file size less than`}
            label="Upload the year wise and monthly/ quartely (statement as applicable) NET GST paid to the Government being claimed by the applicant"
            labelKN=""
            name={'gstReimbursement.gstAnnexure1Part1.gstPaidDoc'}
            size="5"
            fileSize="5242880"
            notRequiredArray={true}
            filesLimit={1}
            acceptedFiles={['.pdf']}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF, only one file allowed with file size less than`}
            label="Upload Copy of tax returns filed by startup for the year for which reimbursement is being claimed"
            labelKN="ಅಪ್ಲೋಡ್ ಮರುಪಾವತಿ ಕೋರುತ್ತಿರುವ ವರ್ಷಕ್ಕಾಗಿ ನವೋದ್ಯಮದಿಂದ ತೆರಿಗೆ ಕುರಿತು ಫೈಲ್‌ ರಿಟರ್ನ್‌ ಮಾಡಿರುವ ಪ್ರತಿ"
            name={'gstReimbursement.gstAnnexure1Part1.itrDoc'}
            size="4"
            fileSize="4194304"
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
            typeMsg={`PDF, only one file allowed with file size less than`}
            label="Upload Relevant purchase invoices raised"
            labelKN="ಅಪ್ಲೋಡ್ ರಚಿಸಿರುವ ಪ್ರಸ್ತುತವಿರುವ ಖರೀದಿ ಇನ್ವಾಯ್ಸ್‌ ಗಳು"
            name={'gstReimbursement.gstAnnexure1Part1.purchaseInvoiceDoc'}
            size="1"
            fileSize="1048576"
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
          name="gstReimbursement.gstAnnexure1Part1.gstCertiNo"
          label={'GST Registration Certificate No'}
          labelKN="ಜಿ.ಎಸ್.ಟಿ. ನೋಂದಣಿ ಪ್ರಮಾಣ ಪತ್ರದ ಸಂಖ್ಯೆ"
          required={true}
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter text here"
          name="gstReimbursement.gstAnnexure1Part1.gstCertiDate"
          label={'GST Registration Certificate Date'}
          labelKN="ಜಿ.ಎಸ್.ಟಿ. ನೋಂದಣಿ ಪ್ರಮಾಣ ಪತ್ರದ ದಿನಾಂಕ"
          InputProps={{
            inputProps: { max: format1(maxDate) },
          }}
          format="MM/dd/yyyy"
          required={true}
        />
      </Grid>
      <Grid item xs={12}>
        <div className="incentive-uploads">
          <UploadFiles
            typeMsg={`PDF, only one file allowed with file size less than`}
            label="Upload GST Registration Certificate"
            labelKN="ಅಪ್ಲೋಡ್ ಜಿ.ಎಸ್.ಟಿ. ನೋಂದಣಿ ಪ್ರಮಾಣ ಪತ್ರ "
            name={'gstReimbursement.gstAnnexure1Part1.gstCertiDoc'}
            size="1"
            fileSize="1048576"
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
            typeMsg={`PDF, only one file allowed with file size less than`}
            label="Upload Copy of other registration of Commercial Tax Department/ Central tax
      Department"
            labelKN="ಅಪ್ಲೋಡ್ ವಾಣಿಜ್ಯ ತೆರಿಗೆ ಇಲಾಖೆ/ ಕೇಂದ್ರ ತೆರಿಗೆ ಇಲಾಖೆಯ ಕುರಿತ ಇತರೆ ನೋಂದಣಿಯ ಪ್ರತಿ."
            name={'gstReimbursement.gstAnnexure1Part1.otherRegTaxDoc'}
            size="2"
            fileSize="2097152"
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
            typeMsg={`PDF, only one file allowed with file size less than`}
            label="Upload Audited Financial Statements for the years for which reimbursement is claimed."
            labelKN="ಅಪ್ಲೋಡ್ ಮರುಪಾವತಿಗಾಗಿ ಕೋರಿರುವ ವರ್ಷಗಳ ಲೆಕ್ಕಪರಿಶೋಧಿತ ಆರ್ಥಿಕ ದಸ್ತಾವೇಜುಗಳು"
            name={
              'gstReimbursement.gstAnnexure1Part1.auditedFinanceStatementDoc'
            }
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
          name="gstReimbursement.gstAnnexure1Part1.totalGstClaimYear"
          label={
            'Turn over for the year for which GST reimbursements claimed for the year'
          }
          labelKN="ಸಪ್ತಾಹದಲ್ಲಿ ನೀವು ಲಭ್ಯವಾಗುವುದು (ಘಂಟೆಗಳು)"
          required={true}
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 500 characters)'}
          name="gstReimbursement.gstAnnexure1Part1.gstOfficerNameAndAddress"
          label={`Mention details  of the  Local GST officer (Officers name, designation, address)`}
          labelKN={`ನಿಮ್ಮ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ`}
          rows={10}
          className="space__text"
          required
        />
      </Grid>
    </Grid>
  );
};
export default DeclarationForm;
