import FormikStepper, { formData, FormikStep } from '../FormikStepper';
import CompanyDetails from '../SignUpForms/Startup/CompanyDetails';

import * as yup from 'yup';

import { values, valuesIn } from 'lodash';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import FormikStepperEl from '../FormikStepperEl';
import SuccessModal from '../SuccessModal';
import {
  companyDescriptionValidation,
  SelfCertificationValidation,
  StartUpDetailValidation,
  SupportingDocumentValidation,
} from '../AmritEventForm/Validation';
import { BASE_URL } from '../../pages/api/url';
import StartupDetails from '../ElevateForms/StartupDetails';
import SelfCertification from '../ElevateForms/SelfCertification';
import TechnologyDetails from './TechnologyDetails';
import CompanyDescription from '../ElevateForms/CompanyDescription';
import SupportingDocuments from '../ElevateForms/SupportingDocuments';
import CompanyInformation from './CompanyInformation';
import {
  ApplicationInformationValidation,
  technologyDetailsValidation,
} from './Validation';
import moment from 'moment';
import { CancelScheduleSend } from '@material-ui/icons';
import { useRouter } from 'next/router';
const num1to100 = /100|[1-9]?\d/;
const phoneRegExp = '[1-9]{1}[0-9]{9}';

const fundingAmount = /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/;

const GrandChallengeForm = (props) => {
  const router = useRouter();
  const [checkbox, setCheckBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastStep, setLastStep] = useState(0);

  const dateOfIncorpo =
    props.registerData &&
    props.registerData.data &&
    props.registerData.data.dateOfIncorporation;
  const dateofIncorp = moment(dateOfIncorpo).format('YYYY-MM-DD');
  const [initialValues, setInitialValues] = useState({
    startUpDetails: {
      founderName: '',
      designation: '',
      emailPrimary: '',
      emailSecondary: '',
      mobileNumber: '',
    },

    companyInformation: {
      nameOfCompany: '',
      entityType: '',
      incorporationDate: '',
      registrationNumber: '',
      companyPan: '',
      website: '',
      registrationCertificate: '',
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
      challengeName: '',
      problemStatement: '',
      titleOfProject: '',
      descriptionOfProject: '',
      sector: '',
      technology: [],
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
      nameOfMentors: [],
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
    setLastStep(props?.gckData?.data?.lastStep);
    setInitialValues({
      startUpDetails: {
        founderName:
          (props.registerData &&
            props.registerData.data &&
            props.registerData.data.name) ||
          '',
        designation:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.startUpDetails &&
            props.gckData.data.startUpDetails.designation) ||
          '',
        emailPrimary:
          (props.registerData &&
            props.registerData.data &&
            props.registerData.data.email) ||
          '',
        emailSecondary:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.startUpDetails &&
            props.gckData.data.startUpDetails.emailSecondary) ||
          '',
        mobileNumber:
          (props.registerData &&
            props.registerData.data &&
            props.registerData.data.phone) ||
          '',
      },

      companyInformation: {
        nameOfCompany:
          (props.registerData &&
            props.registerData.data &&
            props.registerData.data.companyName) ||
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.nameOfCompany) ||
          '',
        entityType:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.entityType) ||
          '',
        incorporationDate:
          dateOfIncorpo ||
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.incorporationDate) ||
          '',
        registrationNumber:
          (props.registerData &&
            props.registerData.data &&
            props.registerData.data.incorporationNumber) ||
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.registrationNumber) ||
          '',
        companyPan:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.companyPan) ||
          '',
        website:
          (props.registerData &&
            props.registerData.data &&
            props.registerData.data.url) ||
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.website) ||
          '',
        registrationCertificate:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.registrationCertificate) ||
          [],
        registeredAddress: {
          registeredAddress:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.registeredAddress
                .registeredAddress) ||
            '',
          district:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.registeredAddress
                .district) ||
            '',
          city:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.registeredAddress.city) ||
            '',
          state:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.registeredAddress.state) ||
            'Karnataka',
          pincode:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.registeredAddress
                .pincode) ||
            '',
        },
        correspondnceSame:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyInformation &&
            props.gckData.data.companyInformation.correspondnceSame) ||
          false,
        correspondenceAddress: {
          registeredAddress:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.correspondenceAddress
                .registeredAddress) ||
            '',
          district:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.correspondenceAddress
                .district) ||
            '',
          city:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.correspondenceAddress
                .city) ||
            '',
          state: 'Karnataka',
          pincode:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyInformation &&
              props.gckData.data.companyInformation.correspondenceAddress
                .pincode) ||
            '',
        },
      },

      selfCertification: {
        revUnder100CR:
          (props.registerData &&
            props.registerData.data &&
            props.registerData.data.revenueUnder100Cr) ||
          false,

        workingTowardInnovation:
          props.gckData.data &&
          props.gckData.data.selfCertification &&
          props.gckData.data.selfCertification.workingTowardInnovation
            ? true
            : props.gckData.data &&
              props.gckData.data.selfCertification &&
              !props.gckData.data.selfCertification.workingTowardInnovation
            ? false
            : false,

        womenStartup:
          props.gckData.data &&
          props.gckData.data.selfCertification &&
          props.gckData.data.selfCertification.womenStartup
            ? true
            : props.gckData.data &&
              props.gckData.data.selfCertification &&
              !props.gckData.data.selfCertification.womenStartup
            ? false
            : false,

        details: {
          nameOfWomenEntrepreneur:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.selfCertification &&
              props.gckData.data.selfCertification.details &&
              props.gckData.data.selfCertification.details
                .nameOfWomenEntrepreneur) ||
            '',
          designationOfWomenEntrepreneur:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.selfCertification &&
              props.gckData.data.selfCertification.details &&
              props.gckData.data.selfCertification.details
                .designationOfWomenEntrepreneur) ||
            '',
          mobileNumber:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.selfCertification &&
              props.gckData.data.selfCertification.details &&
              props.gckData.data.selfCertification.details.mobileNumber) ||
            '',
          email:
            (props.gckData &&
              props.gckData.data &&
              props.gckData.data.selfCertification &&
              props.gckData.data.selfCertification.details &&
              props.gckData.data.selfCertification.details.email) ||
            '',
        },
      },

      technologyDetails: {
        challengeName:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.challengeName) ||
          '',
        problemStatement:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.problemStatement &&
            props.gckData.data.technologyDetails.problemStatementTelgu &&
            JSON.stringify({
              problemStatement:
                props.gckData.data.technologyDetails.problemStatement,
              problemStatementTelgu:
                props.gckData.data.technologyDetails.problemStatementTelgu,
            })) ||
          '',
        titleOfProject:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.titleOfProject) ||
          '',
        descriptionOfProject:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.descriptionOfProject) ||
          '',
        sector:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.sector) ||
          '',
        technology:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.technology) ||
          [],
        otherTechnology:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.otherTechnology) ||
          '',
        stageOfStartup:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.stageOfStartup) ||
          '',
        whatNeedsToBeDone:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.technologyDetails &&
            props.gckData.data.technologyDetails.whatNeedsToBeDone) ||
          '',
      },

      companyDescription: {
        receivedFinancialSupport:
          props.gckData &&
          props.gckData.data &&
          props.gckData.data.companyDescription &&
          props.gckData.data.companyDescription.receivedFinancialSupport
            ? true
            : props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyDescription &&
              !props.gckData.data.companyDescription.receivedFinancialSupport
            ? false
            : '',
        nameOfAward:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.nameOfAward) ||
          '',
        fundingAmount:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.fundingAmount) ||
          '',
        awardWinnerGOK:
          props.gckData &&
          props.gckData.data &&
          props.gckData.data.companyDescription &&
          props.gckData.data.companyDescription.awardWinnerGOK
            ? true
            : props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyDescription &&
              !props.gckData.data.companyDescription.awardWinnerGOK
            ? false
            : '',
        nameOfGOKAward:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.nameOfGOKAward) ||
          '',
        GOKfundingAmount:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.GOKfundingAmount) ||
          '',
        startupPantents:
          props.gckData &&
          props.gckData.data &&
          props.gckData.data.companyDescription &&
          props.gckData.data.companyDescription.startupPantents
            ? true
            : props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyDescription &&
              !props.gckData.data.companyDescription.startupPantents
            ? false
            : '',
        anyMentors:
          props.gckData &&
          props.gckData.data &&
          props.gckData.data.companyDescription &&
          props.gckData.data.companyDescription.anyMentors
            ? true
            : props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyDescription &&
              !props.gckData.data.companyDescription.anyMentors
            ? false
            : '',
        nameOfMentors:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.nameOfMentors) ||
          [],
        incubatedInGOK:
          props.gckData &&
          props.gckData.data &&
          props.gckData.data.companyDescription &&
          props.gckData.data.companyDescription.incubatedInGOK
            ? true
            : props.gckData &&
              props.gckData.data &&
              props.gckData.data.companyDescription &&
              !props.gckData.data.companyDescription.incubatedInGOK
            ? false
            : '',
        nameOfIncubator:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.nameOfIncubator) ||
          '',
        competitors:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.competitors) ||
          '',
        milestone:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.companyDescription &&
            props.gckData.data.companyDescription.milestone) ||
          '',
      },
      supportingDocs: {
        pitchDeck:
          (props.gckData &&
            props.gckData.data &&
            props.gckData.data.supportingDocs &&
            props.gckData.data.supportingDocs.pitchDeck) ||
          [],
      },
    });
  }, [props]);
  return (
    <div className="elevate__form">
      <FormikStepperEl
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
        // showModal={showModal}
        checkbox={checkbox}
        idType={'gck'}
        elevate
        event={'Amrit'}
        landingPageUrl={'/grandchallenge'}
        formEventHeading={'Grand Challenges Karnataka 2022'}
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange
        onSubmit={async (values, helpers, step, type) => {
          if (step === 0) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/gck`,
                { startUpDetails: values.startUpDetails, lastStep: step + 1 },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/grandchallenge');
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
                `${BASE_URL}/api/v1/gck`,
                {
                  companyInformation: values.companyInformation,
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
                    router.push('/grandchallenge');
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
                `${BASE_URL}/api/v1/gck`,
                {
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
                    router.push('/grandchallenge');
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
            // const dataID = props.gckChallenge.find(function (item) {
            //   if (item.name === values.technologyDetails.challengeName)
            //     return item;
            // });
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/gck`,
                {
                  callID: props?.gckChallenge?.filter((item) =>
                    values?.technologyDetails?.challengeName?.includes(
                      item?.name
                    )
                  )?.[0]?._id,
                  technologyDetails: {
                    ...values.technologyDetails,
                    ...JSON.parse(values.technologyDetails.problemStatement),
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
                    router.push('/grandchallenge');
                  }
                  setLastStep(res.data.data.lastStep);
                  if (res.data.status === 'success') {
                    setInitialValues({
                      ...initialValues,
                      technologyDetails: {
                        ...res.data.data.technologyDetails,
                        problemStatement: JSON.stringify({
                          problemStatement:
                            res.data.data.technologyDetails.problemStatement,
                          problemStatementTelgu:
                            res.data.data.technologyDetails
                              .problemStatementTelgu,
                        }),
                      },
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
            };
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/gck`,
                { companyDescription: desc_of_company, lastStep: step + 1 },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/grandchallenge');
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
                  `${BASE_URL}/api/v1/gck`,
                  {
                    supportingDocs: {
                      pitchDeck: pitchDeck,
                    },
                    lastStep: step + 1,
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
                    setLastStep(res.data.data.lastStep);
                    await setShowModal(true);
                    await setModalData(res);
                    setLoading(false);
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
              show={checkbox}
              onClose={() => setShow(false)}
            />;
          }
        }}
        loading={loading}
        lastStep={lastStep}
      >
        <FormikStep
          label="Personal details"
          customSubmit={values}
          validationSchema={StartUpDetailValidation}
        >
          <StartupDetails />
        </FormikStep>
        <FormikStep
          label="Application/Company Information"
          validationSchema={ApplicationInformationValidation}
        >
          <CompanyInformation />
        </FormikStep>
        <FormikStep
          label="Self Certification"
          validationSchema={SelfCertificationValidation}
        >
          <SelfCertification />
        </FormikStep>
        <FormikStep
          label="Challenge details"
          validationSchema={technologyDetailsValidation}
        >
          <TechnologyDetails
            initialValues={initialValues}
            selectedValues={
              initialValues &&
              initialValues.technologyDetails &&
              initialValues.technologyDetails.technology
            }
            gckChallenge={props.gckChallenge}
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
          <SupportingDocuments
            getValue={getValue}
            tAndCPdf={props.tAndCPdf}
            pitchPdf={props.pitchPdf}
          />
        </FormikStep>
      </FormikStepperEl>
    </div>
  );
};
export default GrandChallengeForm;
