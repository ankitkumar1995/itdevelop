import { max } from 'lodash';
import * as yup from 'yup';
const num1to100 = /100|[1-9]?\d/;
const phoneRegExp = '[1-9]{1}[0-9]{9}';

const fundingAmount = /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/;

const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
export const StartUpDetailValidation = yup.object({
  startUpDetails: yup.object({
    founderName: yup
      .string()
      .required('Please enter your name')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .min(3, 'Founder name is too short')
      .max(26, 'Founder name is too long'),
    designation: yup
      .string()
      .required('Please enter your designation')
      .matches(
        /^[aA-zZ\s][aA-zZ0-9-\s]*$/,
        "Designation starts with alphabet and allows alphabets,digits and '-'"
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
});

export const ApplicationInformationValidation = yup.object({
  companyInformation: yup.object({
    programName: yup.string().required('Please select one event'),
    nameOfCompany: yup.string().required('Please enter your company name'),
    entityType: yup.string().required('Select entity type'),
    incorporationDate: yup
      .date()
      .max(new Date(), 'Future date not allowed')
      .typeError('Please enter date of incorporation')
      .required('Please enter date of incorporation'),

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
    scPromotedStartup: yup.boolean().required("Please select 'yes' or 'no'"),
    scStDetails: yup.array().when('scPromotedStartup', {
      is: true,
      then: yup.array().of(
        yup.object().shape({
          stakeHolderName: yup
            .string()
            .matches(/^[a-zA-Z ]*$/, 'Stack holder name contain only alphabets')
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
    registrationCertificate: yup.array().min(1, 'This field is required'),
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
export const SelfCertificationValidation = yup.object({
  selfCertification: yup.object({
    revUnder100CR: yup.string().required("Please select 'yes' or 'no'"),
    womenStartup: yup.boolean().required("Please select 'yes' or 'no'"),
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
  }),
});

export const technologyDetailsValidation = yup.object({
  technologyDetails: yup.object({
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

export const companyDescriptionValidation = yup.object({
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
    awardWinnerGOK: yup.boolean().required(`Please select 'yes' or 'no'`),
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
    startupPantents: yup.string().required(`Please select 'yes' or 'no'`),
    anyMentors: yup.boolean().required(`Please select 'yes' or 'no'`),
    nameOfMentors: yup.array().when('anyMentors', {
      is: true,
      then: yup
        .array()
        .of(
          yup
            .string()
            .matches(
              /^[A-Za-z ]+(,[a-zA-Z]+)*$/,
              "Please enter name separated with comma ',' without any special characters and numbers.\t"
            )
        )
        .compact()
        .min(1, 'Please enter the name of mentors')
        .required('Please enter the name of mentors'),
    }),
    incubatedInGOK: yup.string().required(`Please select 'yes' or 'no'`),
    competitors: yup
      .string()
      .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not excced 250 words')
      .required('Competitors are required'),

    milestone: yup
      .string()
      .matches(/^\s*(\S+\s+){0,499}\S*$/, 'Must not excced 500 words')
      .required('Milestone is required'),
  }),
});

export const SupportingDocumentValidation = yup.object({
  supportingDocs: yup.object({
    pitchDeck: yup
      .array()
      .min(1, 'Please upload one file')
      .max(1, 'Only one file allow to upload')
      .required(),
  }),
});
