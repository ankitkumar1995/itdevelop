import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CheckAndSuccessModal from '../../CheckAndSuccessModal';
import FormikStepperReg, { FormikStep } from '../../FormikStepperReg';
import AmenitiesOrEvents from './AmenitiesOrEvents';
import Introduction from './introduction';
import {
  amenitiesOrEventsValidation,
  introductionValidation,
} from './validation';
import { useRouter } from 'next/router';
const IncubatorRegistrationForm = (props) => {
  const router = useRouter();
  const [checkbox, setCheckBox] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastStep, setLastStep] = useState(0);
  const [successModalData, setSuccessModalData] = useState(null);
  const [exitDisable, setExitDisable] = useState(false);
  const [initialValues, setInitialValues] = useState({
    incubatorType: '',
    name: '',
    registeration: {
      intro: {
        communityManager: '',
        tagline: '',
        number: '',
        alternateNumber: '',
        website: '',
        email: '',
        linkedInUrl: '',
        facebookUrl: '',
        twitterProfile: '',
        location: '',
        address: '',
        landmark: '',
        city: '',
        pinCode: '',
        district: '',
        state: '',
        country: 'India',
        aboutIncubator: '',
        photos: [],
      },
      amenitiesOrEvents: {
        totalSeats: '',
        totalIncuatorStaffSeats: '',
        totalPhysicalIncubationSeats: '',
        totalVirtualIncubationSeats: '',
        totalOccupiedSeats: '',
        totalAvailableSeats: '',
        totalMeetingRooms: '',
        totalConferenceRooms: '',
        totalEventsConducted: '',
        anyCohortEvent: true,
        industriesOrSector: [],
        amenities: ['', '', ''],
        momCommitteeMeetingAttachments: [],
      },
    },
  });
  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.registerData?.data?.lastStep);
    setInitialValues({
      name:
        (props.registerData &&
          props.registerData.data &&
          props.registerData.data.fullName) ||
        '',
      incubatorType:
        (props.registerData &&
          props.registerData.data &&
          props.registerData.data.incubatorType) ||
        '',
      registeration: {
        intro: {
          communityManager:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.communityManager) ||
            '',
          tagline:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.tagline) ||
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
          website:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.websiteUrl) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.website) ||
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
          linkedInUrl:
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
          location:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.location) ||
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
          aboutIncubator:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.aboutIncubator) ||
            '',
          photos:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.intro &&
              props.registerData.data.registeration.intro.photos) ||
            [],
        },
        amenitiesOrEvents: {
          totalSeats:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalSeats) ||
            '',
          totalIncuatorStaffSeats:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalIncuatorStaffSeats) ||
            '',
          totalPhysicalIncubationSeats:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalPhysicalIncubationSeats) ||
            '',
          totalVirtualIncubationSeats:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalVirtualIncubationSeats) ||
            '',

          totalOccupiedSeats:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalOccupiedSeats) ||
            '',

          totalAvailableSeats:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalAvailableSeats) ||
            '',
          totalMeetingRooms:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalMeetingRooms) ||
            '',
          totalConferenceRooms:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalConferenceRooms) ||
            '',
          totalEventsConducted:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .totalEventsConducted) ||
            '',
          anyCohortEvent:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.amenitiesOrEvents &&
            props.registerData.data.registeration.amenitiesOrEvents
              .anyCohortEvent
              ? true
              : props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.amenitiesOrEvents &&
                !props.registerData.data.registeration.amenitiesOrEvents
                  .anyCohortEvent
              ? false
              : '',
          industriesOrSector:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .industriesOrSector) ||
            [],
          amenities: (props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.amenitiesOrEvents &&
            props.registerData.data.registeration.amenitiesOrEvents
              .amenities) || ['', '', ''],
          momCommitteeMeetingAttachments:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.amenitiesOrEvents &&
              props.registerData.data.registeration.amenitiesOrEvents
                .momCommitteeMeetingAttachments) ||
            [],
        },
      },
    });
  }, [props]);
  return (
    <FormikStepperReg
      exitDisable={exitDisable}
      setExitDisable={setExitDisable}
      elevate
      formTopText="Register your incubator"
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
              `${BASE_URL}/api/v1/incubator/update/${props.session.applicationId}`,
              {
                incubatorType: values.incubatorType,
                name: values.name,
                'registeration.intro': values.registeration.intro,
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
                `${BASE_URL}/api/v1/incubator/update/${props.session.applicationId}`,
                {
                  'registeration.amenitiesOrEvents':
                    values.registeration.amenitiesOrEvents,
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
        <Introduction />
      </FormikStep>
      <FormikStep
        label="Amenities or Event"
        validationSchema={amenitiesOrEventsValidation}
      >
        <AmenitiesOrEvents getValue={getValue} />
      </FormikStep>
    </FormikStepperReg>
  );
};
export default IncubatorRegistrationForm;
