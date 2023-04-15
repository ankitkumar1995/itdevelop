import * as yup from 'yup';

const youtubeUrlRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const phoneRegExp = '^((0{0,1})|[0]?)?[1-9]{1}[0-9]{9}$';
const linkedinUrlRegex =
  /^((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
const fbRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/i;
// const locRegex =
//   /^(https|http)?\:\/\/(www\.)?google\.[a-z]+\/maps\/?\?([^&]+&)*(ll=-?[0-9]{1,2}\.[0-9]+,-?[0-9]{1,2}\.[0-9]+|q=[^&+])+($|&)/;
const locRegex =
  /^(https\:\/\/)?(www\.)?(((google|goo.gl)\.?(([a-z])*)+\/maps)|(maps.)[a-z]{0,})\b/;
const twitterRegex =
  /^((http|https):\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
//const youtubeUrlRegex =/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
export const introductionValidation = yup.object({
  name: yup
    .string()
    .matches(
      /^[ A-Za-z0-9_@./#&$()+-]*$/,
      'Incubator name can contain alphanumeric and special characters'
    )
    .min(2, 'Enter atleast 2 character')
    .max(100, 'max 100 character are allowed')
    .required('Please enter your full name'),
  incubatorType: yup.string().required('Please select incubator type'),
  registeration: yup.object({
    intro: yup.object({
      communityManager: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, 'Manager name contain only characters')
        .min(2, 'Enter atleast 2 character')
        .max(100, 'max 100 character are allowed')
        .required('Please enter your full name'),
      tagline: yup.string().max(100, 'max 100 character are allowed'),
      number: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Phone number atleast 10 digits')
        .max(11, 'Phone number max 11 digits are allowed')
        .required('Please enter phone number'),
      alternateNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Phone number atleast 10 digits')
        .max(11, 'Phone number max 11 digits are allowed'),
      website: yup
        .string()
        .matches(websiteRegex, 'Please enter a valid url')
        .required('Please enter website url'),
      email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email'),
      linkedInUrl: yup
        .string()
        .matches(linkedinUrlRegex, 'Please enter valid linkedin Url')
        .required('Please enter linkedin url'),
      facebookUrl: yup
        .string()
        .matches(fbRegex, 'Please enter valid facebook profile url'),
      twitterProfile: yup
        .string()
        .matches(twitterRegex, 'Please enter valid twitter url'),
      location: yup
        .string()
        .matches(locRegex, 'Google map url not valid')
        .required('Please enter location url'),
      address: yup
        .string()
        .max(250, 'Max 250 characters are allowed')
        .required('Please enter your address'),
      landmark: yup.string().max(100, 'Max 100 characters are allowed'),
      district: yup
        .string()
        .max(50, 'Max 50 characters are allowed')
        .required('Please enter your district'),
      pinCode: yup
        .string()
        .matches(/^[0-9]{0,}$/, 'Pincode not valid')
        .min(6, 'Pincode must be 6 digits')
        .max(6, 'Pincode must be 6 digits')
        .required('Please enter your pincode'),
      city: yup.string().required('Please enter city name'),
      state: yup.string().required('Please select your state'),
      aboutIncubator: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please describe about yourself'),
      photos: yup.lazy((val) =>
        Array.isArray(val)
          ? yup
              .array()
              .of(yup.string().required('This field is required'))
              .min(1, 'This field is required')
              .required('This field is required')
          : yup
              .string()
              .min(1, 'This field is required')
              .required('This field is required')
      ),
    }),
  }),
});
export const amenitiesOrEventsValidation = yup.object({
  registeration: yup.object({
    amenitiesOrEvents: yup.object({
      totalSeats: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter total number of seats'),
      totalIncuatorStaffSeats: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter seats alloted for incubator staff'),
      totalPhysicalIncubationSeats: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter seats for physical incubation'),
      totalVirtualIncubationSeats: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter seats alloted for virtual incubation'),
      totalOccupiedSeats: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter occupied seats '),
      totalAvailableSeats: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter available seats'),
      totalMeetingRooms: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter number of meeting rooms'),
      totalConferenceRooms: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter number of conference room'),
      totalEventsConducted: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter number of events conducted'),
      anyCohortEvent: yup.string().required("Please select 'yes' or 'no'"),
      industriesOrSector: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select atleast 1 tag'),
      amenities: yup.lazy((val) =>
        Array.isArray(val)
          ? yup
              .array()
              .of(yup.string().required('This field is required'))
              .min(3, 'This field is required')
              .required('This field is required')
          : yup
              .string()
              .min(3, 'This field is required')
              .required('This field is required')
      ),
      momCommitteeMeetingAttachments: yup.lazy((val) =>
        Array.isArray(val)
          ? yup
              .array()
              .of(yup.string().required('This field is required'))
              .min(1, 'This field is required')
              .required('This field is required')
          : yup
              .string()
              .min(1, 'This field is required')
              .required('This field is required')
      ),
    }),
  }),
});
