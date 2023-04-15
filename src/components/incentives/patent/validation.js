import * as yup from 'yup';
const acceptNumWithStZero = /^[1-9][0-9]*$/;
export const formAValidation = yup.object({
  patentApplication: yup.object({
    reimbursementA: yup.object({
      companyName: yup
        .string()
        .min(2, 'Company name should be equal to or greater than 2 characters')
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter your company name'),
      kitsRegNo: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter kits registration no.'),
      incubDetails: yup.object({
        gokSupported: yup.string().required("Please select 'yes' or 'no'"),
        incubGokAffiliated: yup.string().when('gokSupported', {
          is: 'true',
          then: yup.string().required('Please select one incubator'),
        }),
        incubNameAddress: yup.string().when('gokSupported', {
          is: 'false',
          then: yup
            .string()
            .max(250, 'Max. 250 characters are allowed')
            .required('Please enter incubator details'),
        }),
        inventorName: yup.string().max(50, 'Max. 50 characters are allowed'),
        inventorDesignation: yup
          .string()
          .max(50, 'Max. 50 characters are allowed'),
        patentOwner: yup
          .string()
          .max(50, 'Max.50 characters are allowed')
          .matches(/^[a-zA-Z ]*$/, 'Owner name contain only alphabets')
          .required("Please enter patent owner's name"),
        patentTitle: yup
          .string()
          .max(500, 'Max.500 characters are allowed')
          .required('Please enter patent title'),
        totalReimbursementClaimed: yup
          .string()
          .matches(acceptNumWithStZero, 'Only numbers are allowed')
          .max(10, 'Max. 10 digits are allowed')
          .required('Please enter total reimbursement claimed'),
        pastFurnishClaimDetails: yup
          .string()
          .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
          .required('Please enter some text'),
      }),
      patentDetails: yup.object({
        title: yup
          .string()
          .max(100, 'Max. 100 characters are allowed')
          .required('Please enter invention title'),
        brief: yup
          .string()
          .matches(/^\s*(\S+\s+){0,299}\S*$/, 'Must not exceed 300 words')
          .required('Please brief about invention'),
        adavantage: yup
          .string()
          .matches(/^\s*(\S+\s+){0,299}\S*$/, 'Must not exceed 300 words')
          .required('Please enter some text'),
        applicableSectors: yup
          .string()
          .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
          .required('Please enter some text'),
      }),
    }),
  }),
});

export const formBValidation = yup.object({
  patentApplication: yup.object({
    reimbursementB: yup.object({
      filingDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter patent reg. form filling date')
        .required('Please enter patent reg. form filling date'),
      filingApplNo: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'Patent filling application no. can contain only alphanumeric and special characters'
        )
        .max(25, 'Max. 25 characters are allowed')
        .required(),
      patentFiligCost: yup
        .string()
        .matches(acceptNumWithStZero, 'Only numbers are allowed')
        .max(10, 'Max. 10 digits are allowed')
        .required('Please enter total cost of patent filling'),
      patentAppCopy: yup
        .array()
        .min(1, 'Please upload one file')
        .max(2, 'Max. 2 files allow to upload')
        .required('Please upload one file'),
    }),
  }),
});

export const formCValidation = yup.object({
  patentApplication: yup.object({
    postGrantReimbursement: yup.object({
      patentTitle: yup
        .string()
        .max(500, 'Max. 500 characters are allowed')
        .required('Please enter patent title'),
      postReimbursementClaim: yup
        .string()
        .required("Please selct 'yes' or 'no'"),
      furnishDetails: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please enter some text'),
      patentERegNumber: yup
        .string()
        .max(50, 'Max. 50 characters are allowed')
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'E-Registration no. can contain only alphanumeric and special characters'
        )
        .required('Please enter patent e-registration no.'),
      patentGrantDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter patent grant date')
        .required('Please enter patent grant date'),
      form27: yup.lazy((val) =>
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
      patentRegisterationCost: yup
        .string()
        .max(10, 'Max. 10 digits are allowed')
        .matches(acceptNumWithStZero, 'Only numbers are allowed')
        .required('Please enter patent registration cost'),
      expensesStatement: yup.lazy((val) =>
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

export const declarationValidation = yup.object({
  patentApplication: yup.object({
    documents: yup.object({
      annexure1: yup.lazy((val) =>
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
      annexure2: yup.lazy((val) =>
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
      annexure3: yup.lazy((val) =>
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
