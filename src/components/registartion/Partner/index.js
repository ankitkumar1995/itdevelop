import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CheckAndSuccessModal from '../../CheckAndSuccessModal';
import FormikStepperReg, { FormikStep } from '../../FormikStepperReg';
import ContactDetails from './ContactDetails';
import PartnerDetails from './PartnerDetails';
import { partnerContactValidation, partnerInfoValidation } from './validation';
import { useRouter } from 'next/router';
const PartnerRegistrationForm = (props) => {
  const router = useRouter();
  const [checkbox, setCheckBox] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastStep, setLastStep] = useState(0);
  const [successModalData, setSuccessModalData] = useState(null);
  const [exitDisable, setExitDisable] = useState(false);
  const [initialValues, setInitialValues] = useState({
    registration: {
      partnerInfo: {
        companyName: '',
        companyWebsite: '',
        comapnyLinkedInUrl: '',
        companyFacebookUrl: '',
        comapnyTwitterUrl: '',
        comapnyLogo: [],
        aboutCompany: '',
        partneringType: '',
        otherPartnerType: '',
        serviceOffers: ['', '', ''],
        servingOfferingsAttachment: [],
      },
      partnerContactInfo: {
        contactPersoneName: '',
        contactPersoneDesignation: '',
        spocName: '',
        spocNumber: '',
        spocEmail: '',
        registeredPartnerAddress: '',
        cityTown: '',
        district: '',
        pinCode: '',
        state: '',
        country: '',
      },
    },
  });
  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.registerData?.data?.lastStep);
    setInitialValues({
      registration: {
        partnerInfo: {
          companyName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.fullName) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo.companyName) ||
            '',
          companyWebsite:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.url) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo
                .companyWebsite) ||
            '',
          comapnyLinkedInUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo
                .comapnyLinkedInUrl) ||
            '',
          companyFacebookUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo
                .companyFacebookUrl) ||
            '',
          comapnyTwitterUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo
                .comapnyTwitterUrl) ||
            '',
          comapnyLogo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo.comapnyLogo) ||
            [],
          aboutCompany:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo.aboutCompany) ||
            '',
          partneringType:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.partnerType) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo
                .partneringType) ||
            '',
          otherPartnerType:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.otherPartnerType) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo
                .otherPartnerType) ||
            '',
          serviceOffers: (props.registerData &&
            props.registerData.data &&
            props.registerData.data.registration &&
            props.registerData.data.registration.partnerInfo &&
            props.registerData.data.registration.partnerInfo.serviceOffers) || [
            '',
            '',
            '',
          ],
          servingOfferingsAttachment:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerInfo &&
              props.registerData.data.registration.partnerInfo
                .servingOfferingsAttachment) ||
            [],
        },
        partnerContactInfo: {
          contactPersoneDesignation:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .contactPersoneDesignation) ||
            '',
          spocName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.name) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .spocName) ||
            '',
          spocNumber:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.phone) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .spocNumber) ||
            '',

          spocEmail:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.email) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .spocEmail) ||
            '',

          registeredPartnerAddress:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .registeredPartnerAddress) ||
            '',
          cityTown:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .cityTown) ||
            '',
          pinCode:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .pinCode) ||
            '',
          district:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo
                .district) ||
            '',
          state:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registration &&
              props.registerData.data.registration.partnerContactInfo &&
              props.registerData.data.registration.partnerContactInfo.state) ||
            '',
          country: 'India',
        },
      },
    });
  }, [props]);
  return (
    <FormikStepperReg
      exitDisable={exitDisable}
      setExitDisable={setExitDisable}
      elevate
      formTopText="Partner Registration"
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
              `${BASE_URL}/api/v1/partner/update/${props.session.applicationId}`,
              {
                'registration.partnerInfo': values.registration.partnerInfo,
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
                `${BASE_URL}/api/v1/partner/update/${props.session.applicationId}`,
                {
                  'registration.partnerContactInfo':
                    values.registration.partnerContactInfo,
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
        label="Partner details"
        validationSchema={partnerInfoValidation}
      >
        <PartnerDetails />
      </FormikStep>
      <FormikStep
        label="Contact details"
        validationSchema={partnerContactValidation}
      >
        <ContactDetails getValue={getValue} />
      </FormikStep>
    </FormikStepperReg>
  );
};
export default PartnerRegistrationForm;
