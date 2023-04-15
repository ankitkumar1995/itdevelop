import * as yup from 'yup';

const youtubeUrlRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const phoneRegExp = '^((0{0,1})|[0]?)?[1-9]{1}[0-9]{9}$';
const linkdinUrlRegex =
  /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
const fbRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/i;

const twitterRegex =
  /^((http|https):\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
//const youtubeUrlRegex =/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
export const introductionValidation = yup.object({
  registeration: yup.object({
    investorIntro: yup.object({
      investorType: yup.string().required('Please select investor type'),
      tagline: yup.string().max(100, 'max. 100 characters are allowed'),
      fullName: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'Investor name can contain only alphanumeric and special characters'
        )
        .max(100, 'max. 100 characters are allowed')
        .required('Please enter full name/firm name'),
      contactNumber: yup
        .string()
        .matches(
          phoneRegExp,
          'Phone number is not valid or min. 10 digits and max. 11 digits area allowed'
        )
        .min(10, 'Phone number min. 10 digits and max. 11 digits area allowed')
        .max(11, 'Phone number max. 11 digits are allowed')
        .required('Please enter phone number'),
      alternateContactNumber: yup
        .string()
        .matches(
          phoneRegExp,
          'Phone number is not valid or min. 10 digits and max. 11 digits area allowed'
        )
        .min(10, 'Phone number min. 10 digits and max. 11 digits area allowed')
        .max(11, 'Phone number max. 11 digits are allowed'),
      email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email'),
      firmWebsiteUrl: yup
        .string()
        .matches(websiteRegex, 'Please enter a valid url')
        .required('Please enter website url'),
      linkedInUrl: yup
        .string()
        .matches(linkdinUrlRegex, 'Please enter valid linkedin Url')
        .required('Please enter linkedin url'),
      facebookUrl: yup
        .string()
        .matches(fbRegex, 'Please enter valid facebook profile url'),
      twitterUrl: yup
        .string()
        .matches(twitterRegex, 'Please enter valid twitter url'),
      introVideo: yup
        .string()
        .matches(youtubeUrlRegex, 'Please enter valid youtube url')
        .required('Please enter youtube url'),
      address: yup
        .string()
        .max(250, 'Max 250 characters are allowed')
        .required('Please enter your address'),
      landMark: yup.string().max(100, 'Max. 100 characters are allowed'),
      district: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter your district'),
      pinCode: yup
        .string()
        .matches(/^[0-9]{0,}$/, 'Pincode not valid')
        .min(6, 'Pincode must be 6 digits')
        .max(6, 'Pincode must be 6 digits')
        .required('Please enter your pincode'),
      cityTown: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter city name'),
      state: yup.string().required('Please select your state'),
      aboutInvestor: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please describe about yourself'),
      logo: yup.lazy((val) =>
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
export const investmentDetailsValidation = yup.object({
  registeration: yup.object({
    investmentDetails: yup.object({
      preferredIndustrySector: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least 1 tag'),
      preferredTechnology: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least 1 tag'),
      totalOrgFunded: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter total number of organizations funded'),
      totalAmoutFunded: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'Total amount can contain only alphanumeric and special characters'
        )
        .required('Please enter total funded amount'),
      preferredInvestmentStage: yup
        .string()
        .required('Please select investment stage'),
      investmentRange: yup.string().required('Please select investment range'),
      presentPortfolio: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter present portfolio'),
      fundSize: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter amount'),
    }),
  }),
});
