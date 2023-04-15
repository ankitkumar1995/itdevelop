import { Grid, Typography } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';
import FormikTextArea from '../../ElevateFormControls/FormikTextArea';
import Input from '../../ElevateFormControls/input';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import UploadFiles from '../../ElevateForms/UploadFiles';
import SelectFormik from '../../registartion/forms/selectformik';
import { GOKData } from '../incentiveFormData';

const DetailForm = (props) => {
  const [field, meta] = useField(props.name);
  const toggleValue =
    field.value.marketingReimbursement.partA.gokSupportedIncubator;
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
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.companyName"
          label={'company name per incorporation certificate'}
          labelKN="ನಿಗಮಿತಗೊಂಡ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ ಕಂಪನಿಯ ಹೆಸರು"
          disabled={true}
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.kitsRegNo"
          label={'KITS Registration Number '}
          labelKN="KITS ನೋಂದಣಿ ಸಂಖ್ಯೆ"
          disabled={true}
          required
        />
      </Grid>
      <Grid item sm={6}>
        <CustomToggleButton
          label="Are you applying through a GoK Supported Incubator?"
          labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪರಿಪೋಷಕದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿಕೊಳ್ಳುತ್ತಿರುವಿರಾ?"
          name="marketingReimbursement.partA.gokSupportedIncubator"
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
            name="marketingReimbursement.partA.incubGokAffiliated"
            label={'GoK supported incubator you are affiliated with '}
            labelKN="ನೀವು ಸಂಯೋಜಿಸಿಕೊಂಡಿರುವ ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಬೆಂಬಲಿತ ಪರಿಪೋಷಕದ ಹೆಸರೇನು"
            required={true}
          />
        </Grid>
      )}
      {toggleValue === false && (
        <Grid item xs={12} sm={6}>
          <FormikTextArea
            placeholder="Enter text here (not to exceed 250 characters)"
            name="marketingReimbursement.partA.incubatorAddress"
            label={'SPECIFY THE NAME OF INCUBATOR and Address'}
            labelKN="ಇನ್ಕ್ಯುಬೇಟರ್ ಹೆಸರು ಮತ್ತು ವಿಳಾಸವನ್ನು ಸೂಚಿಸಿ"
            rows={10}
            className="txt__area__single__line"
            required
          />
        </Grid>
      )}
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.claimUnderMDA"
          className="claim"
          label={'Number of claims taken under MDA from State Government'}
          labelKN="ರಾಜ್ಯ ಸರ್ಕಾರದಿಂದ ಎಂ.ಡಿ.ಎ ರಡಿಯಲ್ಲಿ ಪಡೆದುಕೊಂಡ ಕ್ಲೇಮುಗಳ ಸಂಖ್ಯೆ"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter realease date"
          name="marketingReimbursement.partA.releaseDate"
          label="Date of releases (dd-mm-yyyy)"
          labelKN="ಬಿಡುಗಡೆಯ ದಿನಾಂಕಗಳು (ದಿದಿ – ಮಾಮಾ – ವವವವ)"
          InputProps={{
            inputProps: { max: format1(maxDate) },
          }}
          format="MM/dd/yyyy"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.claimingIncentiveName"
          label={
            'Name of Individuals Claiming Incentive who attended the fair / exhibition'
          }
          labelKN="ಪ್ರೋತ್ಸಾಹಕ ಕೋರುತ್ತಿರುವ, ಸಂತೆ /ಪ್ರದರ್ಶನದಲ್ಲಿ ಭಾಗವಹಿಸಿದ ವ್ಯಕ್ತಿಗಳ ಹೆಸರು."
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.passportNo"
          label={'Passport Particulars/No'}
          labelKN="ಪಾಸ್‌ಪೋರ್ಟ್‌ ವಿವರಗಳು  / ಸಂಖ್ಯೆ."
          required
        />
      </Grid>
      <Grid item sm={6}>
        <CustomToggleButton
          label="Whether any individual is a woman"
          labelKN="ಯಾವುದಾದರು ವ್ಯಕ್ತಿ ಮಹಿಳೆಯರೇ?"
          name="marketingReimbursement.partA.womanAny"
          required
        />
      </Grid>
      {field.value.marketingReimbursement.partA.womanAny && (
        <Grid item xs={12}>
          <FormikTextArea
            placeholder="Enter text here (not to exceed 300 characters)"
            name="marketingReimbursement.partA.womanDetails"
            label={'If yes, please specify details'}
            labelKN="ಹೌದಾದರೆ, ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ"
            className="com__address space__text"
            rows={10}
            required
          />
        </Grid>
      )}
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter incentive application date"
          name="marketingReimbursement.partA.appIncentiveDate"
          label="Date of Application of Incentive"
          labelKN="ಪ್ರೋತ್ಸಾಹಕವು ಅನ್ವಯವಾಗುವ ದಿನಾಂಕ"
          InputProps={{
            inputProps: { max: format1(maxDate) },
          }}
          format="MM/dd/yyyy"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="marketingReimbursement.partA.incubRegDetails"
          label={'Affiliated Incubator registration Details'}
          labelKN="ಸಂಯೋಜಿತ ಪರಿಪೋಷಕ ನೋಂದಣಿ ವಿವರಗಳು"
          rows={10}
          className="space__text"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter departure date"
          name="marketingReimbursement.partA.actualDepartureDate"
          label="Date of actual departure from India"
          labelKN="ಭಾರತದಿಂದ ವಾಸ್ತವ ನಿರ್ಗಮನದ ದಿನಾಂಕ"
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
            typeMsg={`PDF, only one file allowed with size less than`}
            label="Please furnish copy of the Passport duly highlighting date of departure"
            labelKN="ನಿರ್ಗಮನದ ದಿನಾಂಕವನ್ನು ಎದ್ದುತೋರಿಸುವ ಪಾಸ್‌ಪೋರ್ಟ್‌ ಪ್ರತಿಯನ್ನು ದಯವಿಟ್ಟು ಒದಗಿಸಿ"
            name={'marketingReimbursement.partA.passportCopyDepartureDoc'}
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
          type="date"
          placeholder="Enter arival date"
          name="marketingReimbursement.partA.actualArrivalDate"
          label="Date of arrival"
          labelKN=""
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
            typeMsg={`PDF, only one file allowed with size less than`}
            label="Please furnish copy of the Passport duly highlighting date of Arrival"
            labelKN="ಆಗಮನದ ದಿನಾಂಕವನ್ನು ಎದ್ದುತೋರಿಸುವ ಪಾಸ್‌ಪೋರ್ಟ್‌ ಪ್ರತಿಯನ್ನು ದಯವಿಟ್ಟು ಒದಗಿಸಿ"
            name={'marketingReimbursement.partA.passportCopyArrivalDoc'}
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
        <FormikTextArea
          placeholder="Enter text here (not to exceed 250 words)"
          name="marketingReimbursement.partA.fairDetails"
          label={'Particulars of fair / Exhibition / Buyer - Seller details'}
          labelKN="ಸಂತೆ / ಪ್ರದರ್ಶನದ ವಿವರಗಳು / ಖರೀದುಗಾರ – ಮಾರಾಟಗಾರರ ವಿವರಗಳು"
          rows={10}
          className="space__text"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.Place"
          label={'Place'}
          labelKN="ಸ್ಥಳ"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter event duration from date"
          name="marketingReimbursement.partA.eventDurationFromDate"
          label="Duration of event - From date"
          labelKN="ಸಮಾವೇಶದ ಅವಧಿ – ಇಂದ ದಿನಾಂಕ"
          InputProps={{
            inputProps: { max: format1(maxDate) },
          }}
          format="MM/dd/yyyy"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          type="date"
          placeholder="Enter event duration to date"
          name="marketingReimbursement.partA.eventDurationToDate"
          label="Duration of event - To date"
          labelKN="ಸಮಾವೇಶದ ಅವಧಿ – ವರೆಗೆ ದಿನಾಂಕ"
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
          name="marketingReimbursement.partA.productsExportedDetails"
          label={'Details of products exported'}
          labelKN="ರಫ್ತು ಮಾಡಿದ ಉತ್ಪನ್ನಗಳ ವಿವರಗಳು"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.productExportedCountries"
          label={'To which countries products are exported'}
          labelKN="ಯಾವ ದೇಶಗಳಿಗೆ ಆ ಉತ್ಪನ್ನಗಳು ರಫ್ತುಗೊಂಡಿವೆ"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="marketingReimbursement.partA.eventOrganizersDetails"
          label={`Details of the organizers of the event like ITPO/EPCs / other recognized agencies`}
          labelKN={`ITPO/EPCS/ಮತ್ತಿತರ ಗುರುತಾದ ಸಂಸ್ಥೆಗಳಂತಹ ಸಮಾವೇಶ ಆಯೋಜಕರ ವಿವರಗಳು `}
          rows={10}
          className="space__text"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="marketingReimbursement.partA.eventParticipants"
          label={`International Event/Trade Show participation attended by Startup`}
          labelKN={`ನವೋದ್ಯಮದಿಂದ ಭಾಗವಹಿಸಿದ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಸಮಾವೇಶ / ವ್ಯಾಪಾರ ಪ್ರದರ್ಶನ`}
          rows={10}
          className="space__text"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 100 characters)'}
          name="marketingReimbursement.partA.delegateFees"
          label={`Conference Participation & Sponsorship Fees ( Delegate Fee)`}
          labelKN={`ಭಾಗವಹಿಸಿದ ಸಮ್ಮೇಳನಾ ಗೋಷ್ಠಿ ಮತ್ತು ಪ್ರಾಯೋಜಕತ್ವ ಶುಲ್ಕ (ನಿಯುಕ್ತಿಯ ಶುಲ್ಕ)`}
          rows={10}
          className="space__text character"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 100 characters)'}
          name="marketingReimbursement.partA.empTicketCost"
          label={`Founders/Employee/Customer ticket cost`}
          labelKN={`ಸಂಸ್ಥಾಪಕರ / ನೌಕರರ / ಗ್ರಾಹಕರ ಟಿಕೆಟ್‌ ವೆಚ್ಚ`}
          rows={10}
          className="space__text character"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 100 characters)'}
          name="marketingReimbursement.partA.empExpenditureCost"
          label={`Employee Expenditure Travel cost`}
          labelKN={`ನೌಕರರ ವೆಚ್ಚ, ಪ್ರಯಾಣ ದರ`}
          rows={10}
          className="space__text character"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 characters)'}
          name="marketingReimbursement.partA.exhibitionInfra"
          label={`Exhibition Infrastructure (Stall / Publicity Material / Electricity / Equipment / AV)`}
          labelKN={`ವಸ್ತುಪ್ರದರ್ಶನ ಮೂಲಸೌಕರ್ಯ (ಮಳಿಗೆ/ ಪ್ರಚಾರ ಸಾಮಗ್ರಿ / ವಿದ್ಯುತ್‌ / ಉಪಕರಣ / ದೃಕ್‌ಶ್ರವಣ )`}
          rows={10}
          className="com__address space__text"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 characters)'}
          name="marketingReimbursement.partA.hotelExpenses"
          label={`Hotel Expenses for Event (Conference Room, Food, Support Staff, Audio-Visual Demos)`}
          labelKN={`ಸಮಾವೇಶದ ಹೊಟೇಲ್‌ ಖರ್ಚುಗಳು (ಸಮ್ಮೇಳನಾ ಕೊಠಡಿ, ಆಹಾರ, ಬೆಂಬಲದ ಸಿಬ್ಬಂದಿ, ದೃಕ್‌-ಶ್ರವಣ ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಳು)`}
          rows={10}
          className="com__address space__text"
          required
        />
      </Grid>
      <hr />
      <div className="address__title incentive">
        <Typography component="h1" variant="h6" align="center">
          Customer Seminar hosted by Startup for international customers in
          foreign locations/ outside India
        </Typography>
      </div>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 100 characters)'}
          name="marketingReimbursement.partA.foreignSeminarOranized.empCustTravelCost"
          label={`Travel costs for Employees and Customer participants`}
          labelKN={`ನೌಕರರಿಗೆ ಮತ್ತು ಭಾಗವಹಿಸಿದ ಗ್ರಾಹಕರಿಗೆ ಪ್ರಯಾಣ ವೆಚ್ಚಗಳು`}
          rows={10}
          className="space__text character"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 100 characters)'}
          name="marketingReimbursement.partA.foreignSeminarOranized.empCustBoardingCost"
          label={`Boarding costs for Employees and Customer participants`}
          labelKN={`ನೌಕರರು ಮತ್ತು ಭಾಗವಹಿಸಿದ ಗ್ರಾಹಕರು ತಂಗಿದ್ದ ಸ್ಥಳದ ವೆಚ್ಚಗಳು`}
          rows={10}
          className="space__text character"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 characters)'}
          name="marketingReimbursement.partA.foreignSeminarOranized.eventHotelExpense"
          label={`Hotel Expenses for Event (Conference Room, Food, Support Staff, Audio-Visual Demos)`}
          labelKN={`ಸಮಾವೇಶದ ಹೊಟೇಲ್‌ ವೆಚ್ಚಗಳು (ಸಮ್ಮೇಳನಾ ಕೊಠಡಿ, ಆಹಾರ, ಬೆಂಬಲ ಸಿಬ್ಬಂದಿ, ದೃಕ್‌-ಶ್ರವಣ ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಳು)`}
          rows={10}
          className="com__address space__text"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 100 characters)'}
          name="marketingReimbursement.partA.foreignSeminarOranized.dA"
          label={`DA`}
          labelKN={`ತುಟ್ಟಿ ಭತ್ಯೆ`}
          rows={10}
          className="space__text character"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <CustomToggleButton
          label="Advertisements / PR in International Print / Broadcast / Online Publications / Google Adwords"
          labelKN="ಅಂತಾರಾಷ್ಟ್ರೀಯ ಮುದ್ರಣ/ಬಾನುಲಿ/ಆನ್‌ಲೈನ್‌ ಪ್ರಕಟಣೆಗಳು /ಗೂಗಲ್‌ ಆಡ್‌ವರ್ಡ್ಸ್‌ ಗಳಲ್ಲಿ ಜಾಹೀರಾತುಗಳು / ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕ ಹೌದು / ಇಲ್ಲ."
          name="marketingReimbursement.partA.foreignSeminarOranized.advertisement"
          required
        />
      </Grid>
      <Grid item sm={6}>
        <Input
          placeholder="Enter text here"
          name="marketingReimbursement.partA.foreignSeminarOranized.totalExpenditure"
          label={'Total Expenditure Claimed (Subject to 5 Lakh)'}
          labelKN="ಕ್ಲೇಮು ಮಾಡಲು ಬಯಸಿರುವ ಒಟ್ಟು ವೆಚ್ಚ (5 ಲಕ್ಷ ಮೀರಿಲ್ಲದಿರುವುದಕ್ಕೆ ಒಳಪಟ್ಟು)"
          required={true}
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="marketingReimbursement.partA.foreignSeminarOranized.orgBlacklisted"
          label={`Whether the organization has been charged / prosecuted/ debarred/ blacklisted under investigation under Export & Import Policy of India or any other law framed by Govt. of India relating to export and import business ?`}
          labelKN={`ರಫ್ತು ಮತ್ತು ಆಮದು ವ್ಯವಹಾರಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಭಾರತದ ಅಥವಾ ಭಾರತ ಸರ್ಕಾರದಿಂದ ಇನ್ಯಾವುದೇ ಕಾನೂನಿನ ರಫ್ತು/ಆಮದು ನೀತಿಯಡಿಯಲ್ಲಿನ ತನಿಖೆಯಡಿ ಸಂಸ್ಥೆಯು (ಕ್ಲೇಮು ಕೋರಿರುವ) ಆರೋಪಿತ / ದಾವೆ ಹೂಡಿದ / ಬರಖಾಸ್ತಾದ / ಕಪ್ಪುಪಟ್ಟಿಗೆ ಸೇರಿಸಲಾಗಿದೆಯೇ?`}
          rows={10}
          className="space__text incentive org"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormikTextArea
          placeholder={'Enter text here (not to exceed 250 words)'}
          name="marketingReimbursement.partA.foreignSeminarOranized.assistanceAvail"
          label={`Whether assistance availed from other Govt. Bodies / EPCs/ Commodity Boards / Authorities etc., for the activity under reference.(if yes, Please give full details)`}
          labelKN={`ಉಲ್ಲೇಖಿತ ಚಟುವಟಿಕೆಗೆ ಇತರೆ ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಗಳು / ಇಪಿಸಿಎಸ್‌/ ದಾಸ್ತಾನು ಮಂಡಳಿಗಳು /ಪ್ರಾಧಿಕಾರಗಳು ಮುಂತಾದವುಗಳಿಂದ ಸಹಾಯವನ್ನು ಪಡೆದುಕೊಳ್ಳಲಾಗಿದೆಯೇ? (ಹೌದಾದಲ್ಲಿ, ದಯವಿಟ್ಟು ಪೂರ್ಣ ವಿವರಗಳನ್ನು ನೀಡಿ)`}
          rows={10}
          className="space__text incentive assit"
          required
        />
      </Grid>
    </Grid>
  );
};
export default DetailForm;
