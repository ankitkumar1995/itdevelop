import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CheckAndSuccessModal from '../../CheckAndSuccessModal';
import FormikStepperReg, { FormikStep } from '../../FormikStepperReg';
import InvestorIntroduction from './introduction';
import InvestmentDetails from './InvestmentDetail';
import {
  introductionValidation,
  investmentDetailsValidation,
} from './validation';
import { useRouter } from 'next/router';
const InvestorRegistrationForm = (props) => {
  const router = useRouter();
  const [checkbox, setCheckBox] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastStep, setLastStep] = useState(0);
  const [successModalData, setSuccessModalData] = useState(null);
  const [exitDisable, setExitDisable] = useState(false);
  const [initialValues, setInitialValues] = useState({
    registeration: {
      investorIntro: {
        investorType: '',
        tagline: '',
        fullName: '',
        firmWebsiteUrl: '',
        contactNumber: '',
        alternateContactNumber: '',
        email: '',
        linkedInUrl: '',
        facebookUrl: '',
        twitterUrl: '',
        introVideo: '',
        address: '',
        landMark: '',
        cityTown: '',
        district: '',
        pinCode: '',
        state: '',
        country: '',
        aboutInvestor: '',
        logo: [],
      },
      investmentDetails: {
        preferredIndustrySector: [],
        preferredTechnology: [],
        totalOrgFunded: '',
        totalAmoutFunded: '',
        preferredInvestmentStage: '',
        investmentRange: '',
        presentPortfolio: '',
        fundSize: '',
      },
    },
    status: 'Pending',
  });
  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.registerData?.data?.lastStep);
    setInitialValues({
      registeration: {
        investorIntro: {
          investorType:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.investoryType) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro
                .investorType) ||
            '',
          tagline:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.tagline) ||
            '',
          fullName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.companyName) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.fullName) ||
            '',

          firmWebsiteUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.url) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro
                .firmWebsiteUrl) ||
            '',

          contactNumber:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.phone) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro
                .contactNumber) ||
            '',
          alternateContactNumber:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro
                .alternateContactNumber) ||
            '',

          email:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.email) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.email) ||
            '',
          linkedInUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.linkedInProfile) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro
                .linkedInUrl) ||
            '',
          facebookUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro
                .facebookUrl) ||
            '',
          twitterUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.twitterUrl) ||
            '',
          introVideo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.introVideo) ||
            '',
          address:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.address) ||
            '',
          landMark:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.landMark) ||
            '',
          cityTown:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.cityTown) ||
            '',
          pinCode:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.pinCode) ||
            '',
          district:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.district) ||
            '',
          state:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.state) ||
            '',
          country: 'India',
          aboutInvestor:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro
                .aboutInvestor) ||
            '',
          logo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investorIntro &&
              props.registerData.data.registeration.investorIntro.logo) ||
            [],
        },
        investmentDetails: {
          preferredIndustrySector:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .preferredIndustrySector) ||
            [],
          preferredTechnology:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .preferredTechnology) ||
            [],
          totalOrgFunded:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .totalOrgFunded) ||
            '',
          totalAmoutFunded:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .totalAmoutFunded) ||
            '',
          preferredInvestmentStage:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .preferredInvestmentStage) ||
            '',

          investmentRange:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .investmentRange) ||
            '',

          presentPortfolio:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .presentPortfolio) ||
            '',
          fundSize:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.investmentDetails &&
              props.registerData.data.registeration.investmentDetails
                .fundSize) ||
            '',
        },
      },
    });
  }, [props]);
  return (
    <FormikStepperReg
      exitDisable={exitDisable}
      setExitDisable={setExitDisable}
      elevate
      formTopText="Register as Investor"
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange
      successModalData={successModalData}
      showSuccessModal={showSuccessModal}
      checkbox={checkbox}
      onSubmit={async (values, helpers, step, type) => {
        if (type === 'saveAndexit') {
          setExitDisable(true);
        }
        if (step === 0) {
          const res = await axios
            .post(
              `${BASE_URL}/api/v1/investor/update/${props.session.applicationId}`,
              {
                'registeration.investorIntro':
                  values.registeration.investorIntro,
                lastStep: step + 1,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + props.session.accessToken,
                },
              }
            )
            .then((res) => {
              if (res) {
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
                `${BASE_URL}/api/v1/investor/update/${props.session.applicationId}`,
                {
                  'registeration.investmentDetails':
                    values.registeration.investmentDetails,
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
      <FormikStep
        label="Introduction"
        validationSchema={introductionValidation}
      >
        <InvestorIntroduction validationSchema={introductionValidation} />
      </FormikStep>
      <FormikStep
        label="Investment Details"
        validationSchema={investmentDetailsValidation}
      >
        <InvestmentDetails
          getValue={getValue}
          selectedValues={
            initialValues &&
            initialValues.registeration &&
            initialValues.registeration.investmentDetails
          }
        />
      </FormikStep>
    </FormikStepperReg>
  );
};
export default InvestorRegistrationForm;
