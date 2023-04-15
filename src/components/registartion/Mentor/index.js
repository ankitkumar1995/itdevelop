import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CheckAndSuccessModal from '../../CheckAndSuccessModal';
import FormikStepperReg, { FormikStep } from '../../FormikStepperReg';
import Availability from './availability';
import Experience from './experience';
import Introduction from './Introduction';
import {
  availabilityValidation,
  experienceValidation,
  introductionValidation,
} from './validation';
import { useRouter } from 'next/router';
const MentorRegistrationForm = (props) => {
  const router = useRouter();
  const [checkbox, setCheckBox] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState(null);
  const [lastStep, setLastStep] = useState(0);
  const [exitDisable, setExitDisable] = useState(false);
  const [initialValues, setInitialValues] = useState({
    registeration: {
      intro: {
        name: '',
        number: '',
        alternateNumber: '',
        tagline: '',
        email: '',
        website: '',
        linkedInUrl: '',
        facebookUrl: '',
        twitterProfile: '',
        inductionYoutubeVideo: '',
        address: '',
        landmark: '',
        city: '',
        pinCode: 0,
        district: '',
        state: '',
        country: 'India',
        aboutMentor: '',
        profilePhoto: [],
      },
      experience: {
        qualification: '',
        currentAssociatedCompany: '',
        totalWorkExp: '',
        startupEcoParticipatant: '',
        mentorBefore: '',
        companiesMentor: [],
        skills: [],
        industry: [],
        vertical: [],
        specialization: [],
        companyProfile: [],
      },
      availability: {
        daysInWeek: [],
        hoursInWeek: '',
        preferredWorkMode: '',
        preferedMentorStage: '',
        preferedContactMode: '',
        preferMentorDuration: '',
        feeStructure: '',
        mentorReason: '',
      },
    },
    topMentorsGuidance: [],
  });
  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.registerData?.data?.lastStep);
    setInitialValues({
      registeration: {
        intro: {
          name:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.name) ||
            '',
          number:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.phone) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.number) ||
            '',
          alternateNumber:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.alternateNumber) ||
            '',
          tagline:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.tagline) ||
            '',
          email:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.email) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.email) ||
            '',
          website:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.url
              ? props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.intro &&
                props.registerData.data.registeration.intro.website
                ? props.registerData.data.url ===
                  props.registerData.data.registeration.intro.website
                  ? props.registerData.data.url
                  : props.registerData.data.registeration.intro.website
                : props.registerData.data.url
              : '',
          linkedInUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.linkedinProfile) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.linkedInUrl) ||
            '',
          facebookUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.facebookUrl) ||
            '',
          twitterProfile:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.twitterProfile) ||
            '',
          inductionYoutubeVideo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro
                .inductionYoutubeVideo) ||
            '',
          address:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.address) ||
            '',
          landmark:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.landmark) ||
            '',
          city:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.city) ||
            '',
          pinCode:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.pinCode) ||
            '',
          district:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.district) ||
            '',
          state:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.state) ||
            '',
          country: 'India',
          aboutMentor:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.aboutMentor) ||
            '',
          profilePhoto:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.profilePhoto) ||
            [],
        },
        experience: {
          qualification:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience.qualification) ||
            '',
          currentAssociatedCompany:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience
                .currentAssociatedCompany) ||
            '',
          totalWorkExp:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.experience) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience.totalWorkExp) ||
            '',
          startupEcoParticipatant:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.experience &&
            props.registerData.data.registeration.experience
              .startupEcoParticipatant
              ? true
              : props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.experience &&
                !props.registerData.data.registeration.experience
                  .startupEcoParticipatant
              ? false
              : '',
          mentorBefore:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.experience &&
            props.registerData.data.registeration.experience.mentorBefore
              ? true
              : props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.experience &&
                !props.registerData.data.registeration.experience.mentorBefore
              ? false
              : '',
          companiesMentor:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience
                .companiesMentor) ||
            [],
          skills:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience.skills) ||
            [],
          industry:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience.industry) ||
            [],
          vertical:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience.vertical) ||
            [],
          specialization:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience
                .specialization) ||
            [],
          companyProfile:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.experience &&
              props.registerData.data.registeration.experience
                .companyProfile) ||
            [],
        },
        availability: {
          daysInWeek:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability.daysInWeek) ||
            [],
          hoursInWeek:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability.hoursInWeek) ||
            '',
          preferredWorkMode:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability
                .preferredWorkMode) ||
            '',
          preferedMentorStage:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability
                .preferedMentorStage) ||
            '',
          preferedContactMode:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability
                .preferedContactMode) ||
            '',
          preferMentorDuration:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability
                .preferMentorDuration) ||
            '',
          feeStructure:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability
                .feeStructure) ||
            '',
          mentorReason:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.availability &&
              props.registerData.data.registeration.availability
                .mentorReason) ||
            '',
        },
      },
      topMentorsGuidance:
        (props.registerData &&
          props.registerData.data &&
          props.registerData.data.topMentorsGuidance) ||
        [],
    });
  }, [props]);
  return (
    <FormikStepperReg
      exitDisable={exitDisable}
      setExitDisable={setExitDisable}
      elevate
      formTopText="Register as Mentor"
      initialValues={initialValues}
      enableReinitialize={true}
      validateOnChange
      successModalData={successModalData}
      showSuccessModal={showSuccessModal}
      checkbox={checkbox}
      onSubmit={async (values, helpers, step, type) => {
        if (type === 'saveAndexit') {
          setExitDisable(true);
        }
        if (step === 0) {
          const res = axios
            .post(
              `${BASE_URL}/api/v1/mentor/update/${props.session.applicationId}`,
              {
                'registeration.intro': values.registeration.intro,
                lastStep: step + 1,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + props.session.accessToken,
                },
              }
            )
            .then(async (res) => {
              if (res) {
                if (type === 'saveAndexit') {
                  router.push('/');
                }
                setLastStep(res.data.data.lastStep);
              }
            });
        }
        if (step === 1) {
          const res = axios
            .post(
              `${BASE_URL}/api/v1/mentor/update/${props.session.applicationId}`,
              {
                'registeration.experience': values.registeration.experience,
                lastStep: step + 1,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + props.session.accessToken,
                },
              }
            )
            .then(async (res) => {
              if (res) {
                if (type === 'saveAndexit') {
                  router.push('/');
                }
                setLastStep(res.data.data.lastStep);
              }
            });
        }
        if (step === 2) {
          if (checkbox) {
            const res = axios
              .post(
                `${BASE_URL}/api/v1/mentor/update/${props.session.applicationId}`,
                {
                  'registeration.availability':
                    values.registeration.availability,
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
                  //setLastStep(res.data.data.lastStep);
                }
              });
          } else {
            // <CheckAndSuccessModal
            //   terms
            //   show={!checkbox}
            //   onClose={() => setShow(false)}
            // />;
          }
        }
      }}
      lastStep={lastStep}
    >
      <FormikStep
        label="Introduction"
        validationSchema={introductionValidation}
      >
        <Introduction />
      </FormikStep>
      <FormikStep label="Experience" validationSchema={experienceValidation}>
        <Experience />
      </FormikStep>
      <FormikStep
        label="Availability"
        validationSchema={availabilityValidation}
      >
        <Availability getValue={getValue} />
      </FormikStep>
    </FormikStepperReg>
  );
};
export default MentorRegistrationForm;
