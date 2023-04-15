import * as yup from 'yup';

const youtubeUrlRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const phoneRegExp = '^((0{0,1})|[0]?)?[1-9]{1}[0-9]{9}$';

const linkedinUrlRegex =
  /^((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
const fbRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/i;

const twitterRegex =
  /^((http|https):\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)([-a-zA-Z0-9()@:%_+.~#?&=/]*)$/;
//const youtubeUrlRegex =/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
export const introductionValidation = yup.object({
  registeration: yup.object({
    intro: yup.object({
      name: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, 'Full name can contain only alphabets')
        .min(2, 'Enter atleast 2 character')
        .max(100, 'max 100 character are allowed')
        .required('Please enter your full name'),

      tagline: yup.string().max(100, 'max 100 character are allowed'),
      number: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Phone number atleast 10 digits')
        .required('Please enter phone number'),
      alternateNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Phone number atleast 10 digits'),

      email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email'),
      website: yup
        .string()
        .matches(websiteRegex, 'Please enter a valid url')
        .required('Please enter website url'),
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
      inductionYoutubeVideo: yup
        .string()
        .matches(youtubeUrlRegex, 'Please enter valid youtube url'),
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
      aboutMentor: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please describe about yourself'),
      profilePhoto: yup.lazy((val) =>
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
export const experienceValidation = yup.object({
  registeration: yup.object({
    experience: yup.object({
      qualification: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter your qualification'),
      currentAssociatedCompany: yup
        .string()
        .max(50, 'Max. 50 characters are allowed'),
      totalWorkExp: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter total work experience'),
      startupEcoParticipatant: yup
        .string()
        .required("Please select 'yes' or 'no' "),
      mentorBefore: yup.string().required("Please select 'yes' or 'no' "),
      //companiesMentor: yup.array().of(yup.string()),
      skills: yup.array().of(yup.string()).min(1, 'Please enter your skills'),
      industry: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select atleast 1 tag'),
      vertical: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select atleast 1 tag'),
      specialization: yup
        .array()
        .of(yup.string())
        .min(1, 'Please enter specialization field'),
      companyProfile: yup.lazy((val) =>
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

export const availabilityValidation = yup.object({
  registeration: yup.object({
    availability: yup.object({
      daysInWeek: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select atleast one day'),
      hoursInWeek: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter availability, hours in a week'),
      preferredWorkMode: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter preferred work mode'),
      preferedMentorStage: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter preferred work mode'),
      preferedContactMode: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter preferred work mode'),
      preferMentorDuration: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter preferred work mode'),
      feeStructure: yup.string().max(50, 'Max 50 characters are allowed'),
      mentorReason: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please enter some text'),
    }),
  }),
});
