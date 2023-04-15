import FormikStepper, { formData, FormikStep } from '../FormikStepper';
import CompanyDetails from '../SignUpForms/Startup/CompanyDetails';
import CompanyDescription from './CompanyDescription';
import SelfCertification from './SelfCertification';
import * as yup from 'yup';
import StartupDetails from './StartupDetails';
import TechnologyDetails from './TechnologyDetails';
import { values, valuesIn } from 'lodash';
import ApplicationInformation from './ApplicationInformation';
import SupportingDocuments from './SupportingDocuments';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import FormikStepperEl from '../FormikStepperEl';
import SuccessModal from '../SuccessModal';
import { BASE_URL } from '../../pages/api/url';
const num1to100 = /100|[1-9]?\d/;
const phoneRegExp = '[1-9]{1}[0-9]{9}';

const fundingAmount = /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/;

const EleveateForm = (props) => {
  const [checkbox, setCheckBox] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    startUpDetails: {
      founderName: '',
      designation: '',
      emailPrimary: '',
      emailSecondary: '',
      mobileNumber: '',
    },

    companyInformation: {
      programName: '',
      nameOfCompany: '',
      entityType: '',
      incorporationDate: '',
      registrationNumber: '',
      companyPan: '',
      website: '',
      registrationCertificate: [],
      scPromotedStartup:
        props.eleData &&
        props.eleData.data &&
        props.eleData.data.companyInformation &&
        props.eleData.data.companyInformation.scPromotedStartup
          ? true
          : props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            !props.eleData.data.companyInformation.scPromotedStartup
          ? false
          : false,
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
        programName:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.programName) ||
          '',
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
        scPromotedStartup:
          (props.eleData &&
            props.eleData.data &&
            props.eleData.data.companyInformation &&
            props.eleData.data.companyInformation.scPromotedStartup) ||
          false,
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
          props.eleData.data &&
          props.eleData.data.selfCertification &&
          props.eleData.data.selfCertification.workingTowardInnovation
            ? true
            : props.eleData.data &&
              props.eleData.data.selfCertification &&
              !props.eleData.data.selfCertification.workingTowardInnovation
            ? false
            : false,

        womenStartup:
          props.eleData.data &&
          props.eleData.data.selfCertification &&
          props.eleData.data.selfCertification.womenStartup
            ? true
            : props.eleData.data &&
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
          [],
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

  return (
    <div className="elevate__form">
      <FormikStepperEl
        formTopText="ELEVATE 2021 and ELEVATE UNNATI 2021 Application :"
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
        // showModal={showModal}
        checkbox={checkbox}
        elevate
        formEventHeading={'ELEVATE 2021 and ELEVATE UNNATI 2021 Application'}
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange
        onSubmit={async (values, helpers, step) => {
          if (step === 0) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/elevate`,
                { startUpDetails: values.startUpDetails },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
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
                  companyInformation: {
                    ...values.companyInformation,
                    scPromotedStartup:
                      values.companyInformation.programName === 'ELEVATE 2021'
                        ? false
                        : true,
                    scStDetails:
                      values.companyInformation.programName === 'ELEVATE 2021'
                        ? undefined
                        : values.companyInformation.scStDetails,
                  },
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
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
                { selfCertification: values.selfCertification },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
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
                { technologyDetails: values.technologyDetails },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (res.data.status === 'success') {
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
            };
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/elevate`,
                { companyDescription: desc_of_company },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                }
              });
          }
          if (step === 5) {
            if (checkbox) {
              let pitchDeck = values.supportingDocs.pitchDeck.toString();
              const res = await axios
                .post(
                  `${BASE_URL}/api/v1/elevate`,
                  {
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
              show={checkbox}
              onClose={() => setShow(false)}
            />;
          }
        }}
      >
        <FormikStep
          label="Startup details"
          customSubmit={values}
          validationSchema={yup.object({
            startUpDetails: yup.object({
              founderName: yup
                .string()
                .required('Please enter your name')
                .matches(
                  /^[aA-zZ\s]+$/,
                  'Only alphabets are allowed for this field '
                )
                .min(3, 'Founder name is too short')
                .max(26, 'Founder name is too long'),
              designation: yup
                .string()
                .required('Please enter your designation')
                .matches(
                  /^[aA-zZ\s]+$/,
                  'Only alphabets are allowed for this field '
                )
                .min(2, 'Designation atleast 2 character')
                .max(26, 'Designation max 26 character are allowed'),
              emailPrimary: yup
                .string()
                .email('Please enter valid email')
                .required('Email is required'),
              emailSecondary: yup.string().email('Please enter valid email'),
              mobileNumber: yup
                .string()
                .matches(phoneRegExp, 'Phone number is not valid')
                .length(10, 'Phone number must be exactly 10 digits')
                .required('Please Enter phone number'),
            }),
          })}
        >
          <StartupDetails value={values} />
        </FormikStep>
        <FormikStep
          label="Application/Company Information"
          validationSchema={yup.object({
            companyInformation: yup.object({
              programName: yup.string().required('Please select one event'),
              nameOfCompany: yup
                .string()
                .required('Please enter your company name'),
              entityType: yup.string().required('Select entity type'),
              incorporationDate: yup
                .string()
                .required('Please select or enter incorporation date'),

              registrationNumber: yup
                .string()
                .min(1, 'Enter your registration/incorporation number')
                .max(50, 'Not exceed more than 50 characters')
                .required('Please enter your incorporation number'),
              companyPan: yup
                .string()
                .matches(
                  '[aA-zZ]{5}[0-9]{4}[aA-zZ]{1}',
                  'Company pan number is not valid'
                )
                .required('Please enter company pan number'),
              website: yup
                .string()
                .matches(
                  /((http|https):\/\/|www.)([a-z0-9-]{2,})+(\.[a-z-]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                  'Please enter a valid url'
                ),
              scPromotedStartup: yup
                .boolean()
                .required("Please select 'yes' or 'no'"),
              scStDetails: yup.array().when('scPromotedStartup', {
                is: true,
                then: yup.array().of(
                  yup.object().shape({
                    stakeHolderName: yup
                      .string()
                      .matches(
                        /^[a-zA-Z ]*$/,
                        'Stack holder name contain only alphabets'
                      )
                      .min(3, 'Please enter 3 or more characters')
                      .max(50, 'Only 50 characters are allowed')
                      .required('Please enter stake holder name'),
                    rdNumber: yup
                      .string()
                      .max(50, 'Maximum 50 Character are allowed')
                      .required('Please enter RD Number'),
                    sharePercentage: yup
                      .string()
                      .matches(
                        /(?:\b|-)([1-9]{1,2}[0]?|100)\b/,
                        'Enter share between 1 to 100'
                      )
                      .required('Please enter amount of share held'),
                    digitalCasteCerti: yup
                      .array()
                      .min('1', 'Please upload atleast one file')
                      .required(),
                    moa: yup
                      .array()
                      .min('1', 'Please upload atleast one file')
                      .required(),
                  })
                ),
              }),
              registrationCertificate: yup
                .array()
                .min(1, 'This field is required'),
              registeredAddress: yup.object({
                registeredAddress: yup
                  .string()
                  .max(300, 'Maximum 300 characters are allowed')
                  .required('Please enter registered address'),
                district: yup.string().required('Please select a district'),
                city: yup.string().required('Please enter city name'),
                state: yup.string().required('Please enter state name'),
                pincode: yup
                  .string()
                  .matches(/^[0-9]{0,}$/, 'Pincode not valid')
                  .max(6, 'Pincode must be 6 digits')
                  .required('Please enter your area pincode '),
              }),
              correspondenceAddress: yup.object({
                registeredAddress: yup
                  .string()
                  .max(300, 'Maximum 300 characters are allowed')
                  .required('Please enter registered address'),
                district: yup.string().required('Please select a district'),
                city: yup.string().required('Please enter city name'),
                state: yup.string().required('Please enter state name'),
                pincode: yup
                  .string()
                  .matches(/^([1-9][0-9]*?)/, 'Pincode is not valid')
                  .required('Please enter pincode'),
              }),
            }),
          })}
        >
          <ApplicationInformation
            images={
              initialValues &&
              initialValues.companyInformation &&
              initialValues.companyInformation.registrationCertificate
            }
          />
        </FormikStep>
        <FormikStep
          label="Self Certification"
          validationSchema={yup.object({
            selfCertification: yup.object({
              revUnder100CR: yup
                .string()
                .required("Please select 'yes' or 'no'"),
              womenStartup: yup
                .boolean()
                .required("Please select 'yes' or 'no'"),
              workingTowardInnovation: yup
                .string()
                .required("Please select 'yes' or 'no'"),
              details: yup.object().when('womenStartup', (womenStartup) => {
                if (womenStartup) {
                  return yup.object({
                    nameOfWomenEntrepreneur: yup
                      .string()
                      .required('This field is required'),
                    designationOfWomenEntrepreneur: yup
                      .string()
                      .required('This field is required'),
                    mobileNumber: yup
                      .string()
                      .matches(phoneRegExp, 'Phone number is not valid')
                      .length(10, 'Phone number must be exactly 10 digits')
                      .required('Please Enter phone number'),
                    email: yup
                      .string()
                      .email('Please enter valid email')
                      .required('Email is required'),
                  });
                }
              }),

              //({
              //   nameOfWomenEntrepreneur:yup.string().test('womenStartup','This field is required',(value,context)=>{
              // //const {womenStartup}=this.parent;
              //      if(value !== undefined)
              //      {
              //        return true
              //      }
              //      else
              //      {
              //        return false
              //      }
              //   }),
              //   designationOfWomenEntrepreneur:yup.string().test('womenStartup','This field is required',(value,context)=>{
              //     //const {womenStartup}=this.parent;

              //          if(value !== undefined)
              //          {
              //            return true
              //          }
              //          else
              //          {
              //            return false
              //          }
              //       }),
              //       mobileNumber:yup.string().test('womenStartup','This field is required',(value,context)=>{
              //     //const {womenStartup}=this.parent;

              //          if(value !== undefined)
              //          {
              //            return true
              //          }
              //          else
              //          {
              //            return false
              //          }
              //       }),
              //       email:yup.string().test('womenStartup','This field is required',(value,context)=>{
              //         //const {womenStartup}=this.parent;

              //              if(value !== undefined)
              //              {
              //                return true
              //              }
              //              else
              //              {
              //                return false
              //              }
              //           }),
              // })

              // email: yup.string().when('womenStartup', {
              //   is: true,
              //   then: yup
              //     .string()
              //     .email('Please enter valid email')
              //     .required('Email is required'),
              // }),
            }),
          })}
        >
          <SelfCertification />
        </FormikStep>
        <FormikStep
          label="Technology details"
          validationSchema={yup.object({
            technologyDetails: yup.object({
              titleOfProject: yup
                .string()
                .matches('^[a-z|A-Z|]+[a-z|A-Z|0-9|s]*', 'Title is not valid')
                .min(3, 'Project title should be atleast 3 characters')
                .required('Please enter project title'),
              descriptionOfProject: yup
                .string()
                .matches(
                  /^\s*(\S+\s+){0,499}\S*$/,
                  'Must not exceed 500 words'
                ),
              technology: yup
                .array()
                .of(yup.string())
                .min(1, 'Please select at least 1 tag'),
              otherTechnology: yup.string().when('technology', (technology) => {
                const othersFind = technology.find((ele) => ele === 'Others');
                if (othersFind === 'Others') {
                  return yup
                    .string()
                    .min(1, 'Please enter other technology')
                    .max(100, 'Max 100 characters are allowed')
                    .required('Please enter other technology');
                }
              }),
              whatNeedsToBeDone: yup
                .string()
                .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
                .required('This is required field'),
            }),
          })}
        >
          <TechnologyDetails
            initialValues={initialValues}
            selectedValues={
              initialValues &&
              initialValues.technologyDetails &&
              initialValues.technologyDetails.technology
            }
            validationSchema={yup.object({
              technologyDetails: yup.object({
                titleOfProject: yup
                  .string()
                  .matches('^[a-z|A-Z|]+[a-z|A-Z|0-9|s]*', 'Title is not valid')
                  .min(3, 'Project title should be atleast 3 characters')
                  .required('Please enter project title'),
                descriptionOfProject: yup
                  .string()
                  .matches(
                    /^\s*(\S+\s+){0,499}\S*$/,
                    'Must not exceed 500 words'
                  ),
                stageOfStartup: yup
                  .string()
                  .required('Stage of Startup is required'),
                technology: yup
                  .array()
                  .of(yup.string())
                  .min(1, 'Pick at least 1 tag'),

                whatNeedsToBeDone: yup
                  .string()
                  .matches(
                    /^\s*(\S+\s+){0,249}\S*$/,
                    'Must not exceed 250 words'
                  )
                  .required('This is required field'),
              }),
            })}
          />
        </FormikStep>
        <FormikStep
          label="Company description"
          validationSchema={yup.object({
            companyDescription: yup.object({
              receivedFinancialSupport: yup
                .boolean()
                .required("Please select 'yes' or 'no'"),

              nameOfAward: yup.string().when('receivedFinancialSupport', {
                is: true,
                then: yup
                  .string()
                  .min(3, 'Please enter 3 or more characters')
                  .max(26, 'Max 26 character are allowed')
                  .required('Please enter award name'),
              }),
              fundingAmount: yup.string().when('receivedFinancialSupport', {
                is: true,
                then: yup
                  .string()
                  .matches(
                    /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/,
                    'Amount is not valid'
                  )
                  .required('Please enter funding amount'),
              }),
              awardWinnerGOK: yup
                .boolean()
                .required(`Please select 'yes' or 'no'`),
              nameOfGOKAward: yup.string().when('awardWinnerGOK', {
                is: true,
                then: yup
                  .string()
                  .min(3, 'Please enter 3 or more characters')
                  .max(26, 'Max 26 character are allowed')
                  .required('Please enter award name'),
              }),
              GOKfundingAmount: yup.string().when('awardWinnerGOK', {
                is: true,
                then: yup
                  .string()
                  .matches(
                    /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/,
                    'Amount is not valid'
                  )
                  .required('Please enter funding amount'),
              }),
              startupPantents: yup
                .string()
                .required(`Please select 'yes' or 'no'`),
              anyMentors: yup.string().required(`Please select 'yes' or 'no'`),
              incubatedInGOK: yup
                .string()
                .required(`Please select 'yes' or 'no'`),
              competitors: yup
                .string()
                .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not excced 250 words')
                .required('Competitors are required'),

              milestone: yup
                .string()
                .matches(/^\s*(\S+\s+){0,499}\S*$/, 'Must not excced 500 words')
                .required('Milestone is required'),
            }),
          })}
        >
          <CompanyDescription />
        </FormikStep>
        <FormikStep
          label="Supporting Documents"
          validationSchema={yup.object({
            supportingDocs: yup.object({
              pitchDeck: yup
                .array()
                .min(1, 'This field is required')
                .max(1, 'This field is required'),
            }),
          })}
        >
          <SupportingDocuments getValue={getValue} />
        </FormikStep>
      </FormikStepperEl>
    </div>
  );
};
export default EleveateForm;
