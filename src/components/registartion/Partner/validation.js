import * as yup from 'yup';

const youtubeUrlRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const phoneRegExp = '^((0{0,1})|[0]?)?[1-9]{1}[0-9]{9}$';
const linkedinUrlRegex =
  /^((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
const fbRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/i;
const locRegex =
  /^(https|http)?\:\/\/(www\.)?google\.[a-z]+\/maps\/?\?([^&]+&)*(ll=-?[0-9]{1,2}\.[0-9]+,-?[0-9]{1,2}\.[0-9]+|q=[^&+])+($|&)/;
const twitterRegex =
  /^((http|https):\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
//const youtubeUrlRegex =/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
export const partnerInfoValidation = yup.object({
  registration: yup.object({
    partnerInfo: yup.object({
      companyName: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'Incubator name can contain alphanumeric and special characters'
        )
        .min(2, 'Enter atleast 2 character')
        .max(100, 'max 100 character are allowed')
        .required('Please enter your full name'),

      companyWebsite: yup
        .string()
        .matches(websiteRegex, 'Please enter a valid url')
        .required('Please enter website url'),
      comapnyLinkedInUrl: yup
        .string()
        .matches(linkedinUrlRegex, 'Please enter valid linkedin Url'),
      companyFacebookUrl: yup
        .string()
        .matches(fbRegex, 'Please enter valid facebook profile url'),
      comapnyTwitterUrl: yup
        .string()
        .matches(twitterRegex, 'Please enter valid twitter url'),

      comapnyLogo: yup.lazy((val) =>
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
      aboutCompany: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please describe about your company'),
      partneringType: yup.string().required('Please select partner type'),
      otherPartnerType: yup.string().when('partneringType', {
        is: 'Others',
        then: yup.string().required('This is required field'),
      }),
      serviceOffers: yup.lazy((val) =>
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
      servingOfferingsAttachment: yup.lazy((val) =>
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
export const partnerContactValidation = yup.object({
  registration: yup.object({
    partnerContactInfo: yup.object({
      contactPersoneDesignation: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'Incubator name contain alphanumeric and special characters'
        )
        .min(2, 'Enter atleast 2 characters')
        .max(50, 'max 50 characters are allowed')
        .required('Please enter designation'),
      spocName: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'SPOC name contain alphanumeric and special characters'
        )
        .min(2, 'Enter atleast 2 characters')
        .max(50, 'max 50 characters are allowed')
        .required('Please enter full name'),
      spocNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Phone number should be  atleast 10 digits')
        .max(11, 'Phone number max 11 digits are allowed')
        .required('Please enter phone number'),
      spocEmail: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email'),
      registeredPartnerAddress: yup
        .string()
        .max(250, 'Max 250 characters are allowed')
        .required('Please enter registered address'),
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
      cityTown: yup.string().required('Please enter city name'),
      state: yup.string().required('Please select your state'),
    }),
  }),
});
