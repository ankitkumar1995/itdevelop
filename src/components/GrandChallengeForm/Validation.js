import { yupToFormErrors } from 'formik';
import { max } from 'lodash';
import * as yup from 'yup';
const num1to100 = /100|[1-9]?\d/;
const phoneRegExp = '[1-9]{1}[0-9]{9}';

const fundingAmount = /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/;

const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

export const ApplicationInformationValidation = yup.object({
  companyInformation: yup.object({
    nameOfCompany: yup.string().required('Please enter your company name'),
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
    website: yup.string().matches(websiteRegex, 'Please enter a valid url'),
    registrationCertificate: yup
      .array()
      .min(1, 'Please upload atleast one file'),
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
        .required('Please enter correspondence address'),
      district: yup.string().required('Please select a district'),
      city: yup.string().required('Please enter city name'),
      state: yup.string().required('Please enter state name'),
      pincode: yup
        .string()
        .matches(/^([1-9][0-9]*?)/, 'Pincode is not valid')
        .required('Please enter pincode'),
    }),
  }),
});

export const technologyDetailsValidation = yup.object({
  technologyDetails: yup.object({
    challengeName: yup.string().required('Please select one challenge'),
    problemStatement: yup
      .string()
      .required('Please select 1 problem statement'),
    titleOfProject: yup
      .string()
      .matches('^[a-z|A-Z|]+[a-z|A-Z|0-9|s]*', 'Title is not valid')
      .min(3, 'Project title should be atleast 3 characters')
      .required('Please enter project title'),
    descriptionOfProject: yup
      .string()
      .matches(/^\s*(\S+\s+){0,499}\S*$/, 'Must not exceed 500 words'),
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
});
