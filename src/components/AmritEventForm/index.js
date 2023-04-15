import axios from 'axios';
import { useEffect, useState } from 'react';
import FormikStepperEl, { FormikStep } from '../FormikStepperEl';
import { values, valuesIn } from 'lodash';
import SuccessModal from '../SuccessModal';
import {
  ApplicationInformationValidation,
  companyDescriptionValidation,
  SelfCertificationValidation,
  StartUpDetailValidation,
  SupportingDocumentValidation,
  technologyDetailsValidation,
} from './Validation';
import { BASE_URL } from '../../pages/api/url';
import StartupDetails from '../ElevateForms/StartupDetails';
import SelfCertification from '../ElevateForms/SelfCertification';
import TechnologyDetails from '../ElevateForms/TechnologyDetails';
import CompanyDescription from '../ElevateForms/CompanyDescription';
import SupportingDocuments from '../ElevateForms/SupportingDocuments';
import Amrit from './Amrit';
import moment from 'moment';
import { useRouter } from 'next/router';
const AmritEventForm = (props) => {
  const [checkbox, setCheckBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [lastStep, setLastStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    startUpDetails: {
      founderName: '',
      designation: '',
      emailPrimary: '',
      emailSecondary: '',
      mobileNumber: '',
    },

    companyInformation: {
      programName: 'AMRITA 2021 for (OBC & Minorities Innovative Startups)',
      nameOfCompany: '',
      entityType: '',
      incorporationDate: '',
      registrationNumber: '',
      companyPan: '',
      website: '',
      registrationCertificate: [],
      scPromotedStartup: true,
      scStDetails: [
        {
          stakeHolderName: '',
          rdNumber: '',
          sharePercentage: '',
          category: '',
          digitalCasteCerti: '',
          moa: '',
        },
      ],
      registeredAddress: {
        registeredAddress: '',
        district: '',
        city: '',
        state: 'Karnataka',
        pincode: '',
      },
      correspondnceSame: false,
      correspondenceAddress: {
        registeredAddress: '',
        district: '',
        city: '',
        state: 'Karnataka',
        pincode: '',
      },
    },
    selfCertification: {
      revUnder100CR: '',
      workingTowardInnovation: '',
      womenStartup: false,
      details: {
        nameOfWomenEntrepreneur: '',
        designationOfWomenEntrepreneur: '',
        mobileNumber: '',
        email: '',
      },
    },

    technologyDetails: {
      titleOfProject: '',
      descriptionOfProject: '',
      sector: '',
      technology: '',
      otherTechnology: '',
      stageOfStartup: '',
      whatNeedsToBeDone: '',
    },

    companyDescription: {
      receivedFinancialSupport: '',
      nameOfAward: '',
      fundingAmount: '',
      awardWinnerGOK: '',
      nameOfGOKAward: '',
      GOKfundingAmount: '',
      startupPantents: '',
      anyMentors: '',
      nameOfMentors: '',
      incubatedInGOK: '',
      nameOfIncubator: '',
      competitors: '',
      milestone: '',
    },
    supportingDocs: {
      pitchDeck: [],
    },
  });

  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.eleData?.data?.lastStep);
    setInitialValues({
      startUpDetails: {
        founderName:
          (props.data && props.data.data && props.data.data.name) || '',
        designation:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.startUpDetails &&
            props.eleData.data.startUpDetails.designation) ||
          '',
        emailPrimary:
          (props.data && props.data.data && props.data.data.email) || '',
        emailSecondary:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.startUpDetails &&
            props.eleData.data.startUpDetails.emailSecondary) ||
          '',
        mobileNumber:
          (props.data && props.data.data && props.data.data.phone) || '',
      },

      companyInformation: {
        programName: 'AMRITA 2021 for (OBC & Minorities Innovative Startups)',
        nameOfCompany:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.nameOfCompany) ||
          (props.data && props.data.data && props.data.data.companyName) ||
          '',
        entityType:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.entityType) ||
          '',
        incorporationDate:
          (props.data &&
            props.data.data &&
            props.data.data.dateOfIncorporation) ||
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.incorporationDate) ||
          '',

        registrationNumber:
          (props.data &&
            props.data.data &&
            props.data.data.incorporationNumber) ||
          '',
        companyPan:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.companyPan) ||
          '',
        website:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.website) ||
          (props.data && props.data.data && props.data.data.url) ||
          '',
        registrationCertificate:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.registrationCertificate) ||
          [],
        scPromotedStartup: true,
        scStDetails:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.companyInformation &&
          props.eleData.data.companyInformation.scStDetails
            ? [
                ...(props.eleData &&
                  props.eleData.data &&
                  props.eleData.data.companyInformation &&
                  props.eleData.data.companyInformation.scStDetails),
              ]
            : [
                {
                  stakeHolderName: '',
                  rdNumber: '',
                  sharePercentage: '',
                  category: '',
                  digitalCasteCerti: [],
                  moa: [],
                },
              ] || [
                {
                  stakeHolderName: '',
                  rdNumber: '',
                  sharePercentage: '',
                  category: '',
                  digitalCasteCerti: [],
                  moa: [],
                },
              ],
        registeredAddress: {
          registeredAddress:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.registeredAddress
                .registeredAddress) ||
            '',
          district:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.registeredAddress
                .district) ||
            '',
          city:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.registeredAddress.city) ||
            '',
          state:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.registeredAddress.state) ||
            'Karnataka',
          pincode:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.registeredAddress
                .pincode) ||
            '',
        },
        correspondnceSame:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.correspondnceSame) ||
          false,
        correspondenceAddress: {
          registeredAddress:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.correspondenceAddress
                .registeredAddress) ||
            '',
          district:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.correspondenceAddress
                .district) ||
            '',
          city:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.correspondenceAddress
                .city) ||
            '',
          state: 'Karnataka',
          pincode:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyInformation &&
              props.eleData.data.companyInformation.correspondenceAddress
                .pincode) ||
            '',
        },
      },

      selfCertification: {
        revUnder100CR:
          props.data && props.data.data && props.data.data.revenueUnder100Cr,

        workingTowardInnovation:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.selfCertification &&
          props.eleData.data.selfCertification.workingTowardInnovation
            ? true
            : props.eleData &&
              props.eleData.data &&
              props.eleData.data.selfCertification &&
              !props.eleData.data.selfCertification.workingTowardInnovation
            ? false
            : false,

        womenStartup:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.selfCertification &&
          props.eleData.data.selfCertification.womenStartup
            ? true
            : props.eleData &&
              props.eleData.data &&
              props.eleData.data.selfCertification &&
              !props.eleData.data.selfCertification.womenStartup
            ? false
            : false,

        details: {
          nameOfWomenEntrepreneur:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.selfCertification &&
              props.eleData.data.selfCertification.details &&
              props.eleData.data.selfCertification.details
                .nameOfWomenEntrepreneur) ||
            '',
          designationOfWomenEntrepreneur:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.selfCertification &&
              props.eleData.data.selfCertification.details &&
              props.eleData.data.selfCertification.details
                .designationOfWomenEntrepreneur) ||
            '',
          mobileNumber:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.selfCertification &&
              props.eleData.data.selfCertification.details &&
              props.eleData.data.selfCertification.details.mobileNumber) ||
            '',
          email:
            (props.eleData &&
              props.eleData.data &&
              props.eleData.data.selfCertification &&
              props.eleData.data.selfCertification.details &&
              props.eleData.data.selfCertification.details.email) ||
            '',
        },
      },

      technologyDetails: {
        titleOfProject:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.technologyDetails &&
            props.eleData.data.technologyDetails.titleOfProject) ||
          '',
        descriptionOfProject:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.technologyDetails &&
            props.eleData.data.technologyDetails.descriptionOfProject) ||
          '',
        sector:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.technologyDetails &&
            props.eleData.data.technologyDetails.sector) ||
          '',
        technology:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.technologyDetails &&
            props.eleData.data.technologyDetails.technology) ||
          [],
        otherTechnology:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.technologyDetails &&
            props.eleData.data.technologyDetails.otherTechnology) ||
          '',
        stageOfStartup:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.technologyDetails &&
            props.eleData.data.technologyDetails.stageOfStartup) ||
          '',
        whatNeedsToBeDone:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.technologyDetails &&
            props.eleData.data.technologyDetails.whatNeedsToBeDone) ||
          '',
      },

      companyDescription: {
        receivedFinancialSupport:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.companyDescription &&
          props.eleData.data.companyDescription.receivedFinancialSupport
            ? true
            : props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyDescription &&
              !props.eleData.data.companyDescription.receivedFinancialSupport
            ? false
            : '',
        nameOfAward:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.nameOfAward) ||
          '',
        fundingAmount:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.fundingAmount) ||
          '',
        awardWinnerGOK:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.companyDescription &&
          props.eleData.data.companyDescription.awardWinnerGOK
            ? true
            : props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyDescription &&
              !props.eleData.data.companyDescription.awardWinnerGOK
            ? false
            : '',
        nameOfGOKAward:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.nameOfGOKAward) ||
          '',
        GOKfundingAmount:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.GOKfundingAmount) ||
          '',
        startupPantents:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.companyDescription &&
          props.eleData.data.companyDescription.startupPantents
            ? true
            : props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyDescription &&
              !props.eleData.data.companyDescription.startupPantents
            ? false
            : '',
        anyMentors:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.companyDescription &&
          props.eleData.data.companyDescription.anyMentors
            ? true
            : props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyDescription &&
              !props.eleData.data.companyDescription.anyMentors
            ? false
            : '',
        nameOfMentors:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.nameOfMentors) ||
          '',
        incubatedInGOK:
          props.eleData &&
          props.eleData.data &&
          props.eleData.data.companyDescription &&
          props.eleData.data.companyDescription.incubatedInGOK
            ? true
            : props.eleData &&
              props.eleData.data &&
              props.eleData.data.companyDescription &&
              !props.eleData.data.companyDescription.incubatedInGOK
            ? false
            : '',
        nameOfIncubator:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.nameOfIncubator) ||
          '',
        competitors:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.competitors) ||
          '',
        milestone:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyDescription &&
            props.eleData.data.companyDescription.milestone) ||
          '',
      },
      supportingDocs: {
        pitchDeck:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.supportingDocs &&
            props.eleData.data.supportingDocs.pitchDeck) ||
          [],
      },
    });
  }, [props]);
  const activeCallData = props.allCalls?.callsData?.filter(
    (call) => call.status === 'active'
  )?.[0];
  return (
    <div className="elevate__form">
      <FormikStepperEl
        saveExitUrl={'/amrita2021'}
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
        // showModal={showModal}
        checkbox={checkbox}
        elevate
        event={'Amrita'}
        landingPageUrl={'/amrita2021'}
        formEventHeading={'AMRITA 2021'}
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange
        onSubmit={async (values, helpers, step, type) => {
          if (step === 0) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/elevate`,

                {
                  callID: activeCallData._id,
                  startUpDetails: values.startUpDetails,
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
                    router.push('/amrita2021');
                  }
                  setLastStep(res.data.data.lastStep);
                  setInitialValues({
                    ...initialValues,
                    startUpDetails: res.data.data.startUpDetails,
                  });
                }
              });
          }
          if (step === 1) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/elevate`,
                {
                  callID: activeCallData._id,
                  companyInformation: {
                    ...values.companyInformation,
                    companyPan:
                      values.companyInformation.companyPan.toUpperCase(),
                  },
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
                    router.push('/amrita2021');
                  }

                  setLastStep(res.data.data.lastStep);
                  setInitialValues({
                    ...initialValues,
                    companyInformation: res.data.data.companyInformation,
                  });
                }
              });
          }

          if (step === 2) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/elevate`,
                {
                  callID: activeCallData._id,
                  selfCertification: {
                    ...values.selfCertification,
                    details: {
                      nameOfWomenEntrepreneur:
                        values.selfCertification.womenStartup === false
                          ? undefined
                          : values.selfCertification.details
                              .nameOfWomenEntrepreneur,
                      designationOfWomenEntrepreneur:
                        values.selfCertification.womenStartup === false
                          ? undefined
                          : values.selfCertification.details
                              .designationOfWomenEntrepreneur,
                      mobileNumber:
                        values.selfCertification.womenStartup === false
                          ? undefined
                          : values.selfCertification.details.mobileNumber,
                      email:
                        values.selfCertification.womenStartup === false
                          ? undefined
                          : values.selfCertification.details.email,
                    },
                  },
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
                    router.push('/amrita2021');
                  }
                  setLastStep(res.data.data.lastStep);

                  setInitialValues({
                    ...initialValues,
                    selfCertification: res.data.data.selfCertification,
                  });
                }
              });
          }
          if (step === 3) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/elevate`,
                {
                  callID: activeCallData._id,
                  technologyDetails: {
                    ...values.technologyDetails,
                    otherTechnology: values.technologyDetails.technology.find(
                      (item) => item === 'Others'
                    )
                      ? values.technologyDetails.otherTechnology
                      : undefined,
                  },
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
                  if (res.data.status === 'success') {
                    if (type === 'saveAndexit') {
                      router.push('/amrita2021');
                    }

                    setLastStep(res.data.data.lastStep);
                    setInitialValues({
                      ...initialValues,
                      technologyDetails: res.data.data.technologyDetails,
                    });
                  }
                }
              });
          }
          if (step === 4) {
            let desc_of_company = {
              ...values.companyDescription,
              nameOfMentors:
                typeof values.companyDescription.nameOfMentors === 'string'
                  ? values.companyDescription.nameOfMentors.split(',')
                  : values.companyDescription.nameOfMentors,
              nameOfAward:
                values.companyDescription.receivedFinancialSupport === false
                  ? undefined
                  : values.companyDescription.nameOfAward,
              fundingAmount:
                values.companyDescription.receivedFinancialSupport === false
                  ? undefined
                  : values.companyDescription.fundingAmount,
              nameOfGOKAward:
                values.companyDescription.awardWinnerGOK === false
                  ? undefined
                  : values.companyDescription.nameOfGOKAward,
              GOKfundingAmount:
                values.companyDescription.awardWinnerGOK === false
                  ? undefined
                  : values.companyDescription.GOKfundingAmount,
              nameOfMentors:
                values.companyDescription.anyMentors === false
                  ? undefined
                  : values.companyDescription.nameOfMentors,
              nameOfIncubator:
                values.companyDescription.incubatedInGOK === false
                  ? undefined
                  : values.companyDescription.nameOfIncubator,
            };
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/elevate`,
                {
                  callID: activeCallData._id,
                  companyDescription: desc_of_company,
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
                    router.push('/amrita2021');
                  }
                  setLastStep(res.data.data.lastStep);
                }
              });
          }
          if (step === 5) {
            if (checkbox) {
              let pitchDeck = values.supportingDocs.pitchDeck.toString();

              setLoading(true);
              const res = await axios
                .post(
                  `${BASE_URL}/api/v1/elevate`,
                  {
                    callID: activeCallData._id,
                    supportingDocs: {
                      pitchDeck: pitchDeck,
                    },
                    status: 'pending',
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + props.session.accessToken,
                    },
                  }
                )
                .then(async (res, err) => {
                  if (res) {
                    setLoading(false);
                    setLastStep(res.data.data.lastStep);
                    await setShowModal(true);
                    await setModalData(res);

                    return res;
                  } else {
                    await setModalData(res);
                  }
                });

              // if (res) {
              //   setSuccessMsg(res);
              // }
              // const submitData = await res.json();
              // setEleRes(true);
            }
          } else {
            <SuccessModal
              terms
              landingPageUrl={'/amrita2021'}
              show={checkbox}
              onClose={() => setShow(false)}
            />;
          }
        }}
        loading={loading}
        lastStep={lastStep}
      >
        <FormikStep
          label="Startup details"
          customSubmit={values}
          validationSchema={StartUpDetailValidation}
        >
          <StartupDetails />
        </FormikStep>
        <FormikStep
          label="Application/Company Information"
          validationSchema={ApplicationInformationValidation}
        >
          <Amrit activeCallData={props.activeCallData} />
        </FormikStep>
        <FormikStep
          label="Self Certification"
          validationSchema={SelfCertificationValidation}
        >
          <SelfCertification />
        </FormikStep>
        <FormikStep
          label="Technology details"
          validationSchema={technologyDetailsValidation}
        >
          <TechnologyDetails
            initialValues={initialValues}
            selectedValues={
              initialValues &&
              initialValues.technologyDetails &&
              initialValues.technologyDetails.technology
            }
          />
        </FormikStep>
        <FormikStep
          label="Company description"
          validationSchema={companyDescriptionValidation}
        >
          <CompanyDescription />
        </FormikStep>
        <FormikStep
          label="Supporting Documents"
          validationSchema={SupportingDocumentValidation}
        >
          <SupportingDocuments getValue={getValue} />
        </FormikStep>
      </FormikStepperEl>
    </div>
  );
};
export default AmritEventForm;
