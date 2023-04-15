import axios from 'axios';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CheckAndSuccessModal from '../../CheckAndSuccessModal';
import FormikStepperReg, { FormikStep } from '../../FormikStepperReg';
import DeclarationForm from './Declaration';
import DetailForm from './Details';
import { declarationValidation, detailsValidation } from './validation';
import { useRouter } from 'next/router';
const MarketingForm = (props) => {
  const router = useRouter();
  const [apiId, setApiId] = useState('');
  const [checkbox, setCheckBox] = useState(false);
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastStep, setLastStep] = useState(0);
  const [successModalData, setSuccessModalData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    marketingReimbursement: {
      partA: {
        companyName: '',
        kitsRegNo: '',
        gokSupportedIncubator: '',
        gokSupportedName: '',
        incubatorAddress: '',
        incubGokAffiliated: '',
        incubatorAddress: '',
        claimUnderMDA: '',
        releaseDate: '',
        claimingIncentiveName: '',
        passportNo: '',
        womanAny: '',
        womanDetails: '',
        appIncentiveDate: '',
        incubRegDetails: '',
        actualDepartureDate: '',
        passportCopyDepartureDoc: [],
        actualArrivalDate: '',
        passportCopyArrivalDoc: [],
        fairDetails: '',
        Place: '',
        eventDurationFromDate: '',
        eventDurationToDate: '',
        productsExportedDetails: '',
        productExportedCountries: '',
        eventOrganizersDetails: '',
        eventParticipants: '',
        delegateFees: '',
        empTicketCost: '',
        empExpenditureCost: '',
        exhibitionInfra: '',
        hotelExpenses: '',
        foreignSeminarOranized: {
          empCustTravelCost: '',
          empCustBoardingCost: '',
          eventHotelExpense: '',
          dA: '',
          advertisement: '',
          totalExpenditure: '',
          orgBlacklisted: '',
          assistanceAvail: '',
        },
      },
      partB: {
        selfDeclaration1: [],
        selfDeclaration2: [],
        eventReimbursementClaim: [],
        organizationWelcomeLetter: [],
        registerationFeeReciept: [],
        eventPreceedings: [],
        eventWebPageDoc: [],
        marketResearch: [],
        advertisementReimbursement: [],
        webLinks: [],
        marketExpensesInvoices: [],
        businessDevActivityReports: [],
      },
    },
    status: 'Pending',
  });
  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.stepCount);
    setInitialValues({
      marketingReimbursement: {
        partA: {
          companyName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.companyName) ||
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.companyName) ||
            '',
          kitsRegNo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.certificate &&
              props.registerData.data.certificate.number) ||
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.kitsRegNo) ||
            '',
          gokSupportedIncubator:
            props.marketingRes &&
            props.marketingRes.partA &&
            props.marketingRes.partA &&
            props.marketingRes.partA.gokSupportedIncubator
              ? true
              : props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA &&
                !props.marketingRes.partA.gokSupportedIncubator
              ? false
              : '',

          incubatorAddress:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.incubatorAddress) ||
            '',
          incubGokAffiliated:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.incubGokAffiliated) ||
            '',
          gokSupportedName:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.gokSupportedName) ||
            '',
          incubatorAddress:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.incubatorAddress) ||
            '',
          claimUnderMDA:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.claimUnderMDA) ||
            '',
          releaseDate:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.releaseDate) ||
            '',
          claimingIncentiveName:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.claimingIncentiveName) ||
            '',
          passportNo:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.passportNo) ||
            '',
          womanAny:
            props.marketingRes &&
            props.marketingRes.partA &&
            props.marketingRes.partA &&
            props.marketingRes.partA.womanAny
              ? true
              : props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA &&
                !props.marketingRes.partA.womanAny
              ? false
              : '',
          womanDetails:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.womanDetails) ||
            '',
          appIncentiveDate:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.appIncentiveDate) ||
            '',
          incubRegDetails:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.incubRegDetails) ||
            '',
          actualDepartureDate:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.actualDepartureDate) ||
            '',
          passportCopyDepartureDoc:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.passportCopyDepartureDoc) ||
            [],
          actualArrivalDate:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.actualArrivalDate) ||
            '',
          passportCopyArrivalDoc:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.passportCopyArrivalDoc) ||
            [],
          fairDetails:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.fairDetails) ||
            '',
          Place:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.Place) ||
            '',
          eventDurationFromDate:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.eventDurationFromDate) ||
            '',
          eventDurationToDate:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.eventDurationToDate) ||
            '',
          productsExportedDetails:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.productsExportedDetails) ||
            '',
          productExportedCountries:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.productExportedCountries) ||
            '',
          eventOrganizersDetails:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.eventOrganizersDetails) ||
            '',
          eventParticipants:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.eventParticipants) ||
            '',
          delegateFees:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.delegateFees) ||
            '',
          empTicketCost:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.empTicketCost) ||
            '',
          empExpenditureCost:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.empExpenditureCost) ||
            '',
          exhibitionInfra:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.exhibitionInfra) ||
            '',
          hotelExpenses:
            (props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA.hotelExpenses) ||
            '',
          foreignSeminarOranized: {
            empCustTravelCost:
              (props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA.foreignSeminarOranized &&
                props.marketingRes.partA.foreignSeminarOranized
                  .empCustTravelCost) ||
              '',
            empCustBoardingCost:
              (props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA.foreignSeminarOranized &&
                props.marketingRes.partA.foreignSeminarOranized
                  .empCustBoardingCost) ||
              '',
            eventHotelExpense:
              (props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA.foreignSeminarOranized &&
                props.marketingRes.partA.foreignSeminarOranized
                  .eventHotelExpense) ||
              '',
            dA:
              (props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA.foreignSeminarOranized &&
                props.marketingRes.partA.foreignSeminarOranized.dA) ||
              '',
            advertisement:
              props.marketingRes &&
              props.marketingRes.partA &&
              props.marketingRes.partA &&
              props.marketingRes.partA.foreignSeminarOranized &&
              props.marketingRes.partA.foreignSeminarOranized.advertisement
                ? true
                : props.marketingRes &&
                  props.marketingRes.partA &&
                  props.marketingRes.partA &&
                  props.marketingRes.partA.foreignSeminarOranized &&
                  !props.marketingRes.partA.foreignSeminarOranized.advertisement
                ? false
                : '',

            totalExpenditure:
              (props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA.foreignSeminarOranized &&
                props.marketingRes.partA.foreignSeminarOranized
                  .totalExpenditure) ||
              '',
            orgBlacklisted:
              (props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA.foreignSeminarOranized &&
                props.marketingRes.partA.foreignSeminarOranized
                  .orgBlacklisted) ||
              '',
            assistanceAvail:
              (props.marketingRes &&
                props.marketingRes.partA &&
                props.marketingRes.partA.foreignSeminarOranized &&
                props.marketingRes.partA.foreignSeminarOranized
                  .assistanceAvail) ||
              '',
          },
        },
        partB: {
          selfDeclaration1:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.selfDeclaration1) ||
            [],
          selfDeclaration2:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.selfDeclaration2) ||
            [],
          eventReimbursementClaim:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.eventReimbursementClaim) ||
            [],
          organizationWelcomeLetter:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.organizationWelcomeLetter) ||
            [],
          registerationFeeReciept:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.registerationFeeReciept) ||
            [],
          eventPreceedings:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.eventPreceedings) ||
            [],
          eventWebPageDoc:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.eventWebPageDoc) ||
            [],
          marketResearch:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.marketResearch) ||
            [],
          advertisementReimbursement:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.advertisementReimbursement) ||
            [],
          webLinks:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.webLinks) ||
            [],
          marketExpensesInvoices:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.marketExpensesInvoices) ||
            [],
          businessDevActivityReports:
            (props.marketingRes &&
              props.marketingRes.partB &&
              props.marketingRes.partB.businessDevActivityReports) ||
            [],
        },
      },
    });
  }, [props]);
  return (
    <FormikStepperReg
      elevate
      formTopText="Marketing reimbursement"
      enableReinitialize={true}
      initialValues={initialValues}
      incentive
      incentiveName={'Marketing Incetives'}
      validateOnChange
      successModalData={successModalData}
      showSuccessModal={showSuccessModal}
      setShowSuccessModal={setShowSuccessModal}
      checkbox={checkbox}
      onSubmit={async (values, helpers, step, type) => {
        if (step === 0) {
          const res =
            props.updateId || apiId
              ? await axios
                  .post(
                    `${BASE_URL}/api/v1/startup/incentive/update/${
                      apiId !== '' ? apiId : props.updateId
                    }`,
                    {
                      'marketingReimbursement.partA':
                        values.marketingReimbursement.partA,
                      lastStep: step + 1,
                      userId: props.session.id,
                      applicationId: props.session.applicationId,
                      type: 'marketing',
                    },
                    {
                      headers: {
                        Authorization: 'Bearer ' + props.session.accessToken,
                      },
                    }
                  )
                  .then((res) => {
                    if (res) {
                      setApiId(res.data.data._id);
                      if (type === 'saveAndexit') {
                        router.push('/');
                      }
                      setLastStep(res.data.data.lastStep);
                    }
                  })
              : await axios
                  .post(
                    `${BASE_URL}/api/v1/startup/incentive/create/`,
                    {
                      'marketingReimbursement.partA':
                        values.marketingReimbursement.partA,
                      lastStep: step + 1,
                      userId: props.session.id,
                      applicationId: props.session.applicationId,
                      type: 'marketing',
                    },
                    {
                      headers: {
                        Authorization: 'Bearer ' + props.session.accessToken,
                      },
                    }
                  )
                  .then((res) => {
                    if (res) {
                      setApiId(res.data.data._id);
                      if (type === 'saveAndexit') {
                        router.push('/');
                      }
                      setLastStep(res.data.data.lastStep);
                    }
                  });
        }
        if (step === 1) {
          if (checkbox) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/incentive/update/${
                  apiId !== '' ? apiId : props.updateId
                }`,
                {
                  'marketingReimbursement.partB':
                    values.marketingReimbursement.partB,
                  lastStep: step + 1,
                  status: 'Pending',
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then(async (res) => {
                if (res) {
                  setLastStep(res.data.data.lastStep);
                  await setSuccessModalData(res);
                  await setShowSuccessModal(true);
                }
              });
          } else {
            <CheckAndSuccessModal
              terms
              show={!checkbox}
              onClose={() => setShow(false)}
            />;
          }
        }
      }}
      lastStep={lastStep}
    >
      <FormikStep label="Details" validationSchema={detailsValidation}>
        <DetailForm />
      </FormikStep>
      <FormikStep label="Declaration" validationSchema={declarationValidation}>
        <DeclarationForm getValue={getValue} checkbox={checkbox} />
      </FormikStep>
    </FormikStepperReg>
  );
};
export default MarketingForm;
