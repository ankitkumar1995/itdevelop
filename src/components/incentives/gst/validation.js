import * as yup from 'yup';
const acceptNumWithStZero = /^[1-9][0-9]*$/;
export const gstAnnexureValidation = yup.object({
  gstReimbursement: yup.object({
    gstAnnexure1Part1: yup.object({
      companyName: yup
        .string()
        .min(2, 'Company name should be equal to or greater than 2 characters')
        .max(100, 'Max 100 character are allowed')
        .required('Please enter company name'),
      kitsRegNo: yup.string().required('Please enter kits registration number'),
      gokSupported: yup.string().required("Please select 'yes' or 'no'"),
      incubGokAffiliated: yup.string().when('gokSupported', {
        is: 'true',
        then: yup.string().required('Please select one incubator'),
      }),
      nameOfTheIncubator: yup.string().when('gokSupported', {
        is: 'false',
        then: yup
          .string()
          .max(250, 'Max. 250 characters are allowed')
          .required('Please enter incubator details'),
      }),
      reimburseClaim: yup
        .string()
        .matches(acceptNumWithStZero, 'Only numbers allowed')
        .max(10, 'Max. 10 digits are allowed')
        .required('Please enter reimbursement claim'),

      gstSupplierPaymentTo: yup
        .string()
        .matches(acceptNumWithStZero, 'Only numbers allowed')
        .max(10, 'Max. 10 digits are allowed')
        .required('Please enter reimbursement claim'),
      gstTaxPayment: yup
        .string()
        .matches(acceptNumWithStZero, 'Only numbers allowed')
        .max(10, 'Max. 10 digits are allowed')
        .required('Please enter reimbursement claim'),
      reimbursementClaimAmount: yup
        .string()
        .matches(acceptNumWithStZero, 'Only numbers allowed')
        .max(10, 'Max. 10 digits are allowed')
        .required('Please enter reimbursement claim amount'),
      incubationCommenceDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter incubation commence date')
        .required('Please enter incubation commence date'),
      gstRegNo: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'TIN no./GST reg. no. can contain only alphanumeric and special characters'
        )
        .max(50, 'Max. 50 characters allowed')
        .required('Please enter TIN no./Gst reg no.'),
      supplierGstRegNo: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'GST reg. no. of supplier can contain only alphanumeric and special characters'
        )
        .max(50, 'Max. 50 characters allowed')
        .required('Please enter Gst reg no. of supplier'),
      itrDoc: yup.lazy((val) =>
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
      purchaseInvoiceDoc: yup.lazy((val) =>
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
      gstCertiNo: yup
        .string()
        .matches(
          /^[ A-Za-z0-9_@./#&$()+-]*$/,
          'GST reg. certificate no. can contain only alphanumeric and special characters'
        )
        .max(50, 'Max. 50 characters are allowed')
        .required('Please enter gst reg. certificate no.'),
      gstCertiDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter incubation commence date')
        .required('Please enter certificate issued date'),
      gstCertiDoc: yup.lazy((val) =>
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
      otherRegTaxDoc: yup.lazy((val) =>
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
      auditedFinanceStatementDoc: yup.lazy((val) =>
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
      totalGstClaimYear: yup
        .string()
        .matches(acceptNumWithStZero, 'Only numbers allowed')
        .max(10, 'Max. 10 digits are allowed')
        .required('Please enter gst claimed year'),
      gstOfficerNameAndAddress: yup
        .string()
        .max(500, 'Max. 500 characters are allowed')
        .required('Please enter gst office detail'),
    }),
  }),
});
export const declarationValidation = yup.object({
  gstReimbursement: yup.object({
    gstAnnexure1Part2: yup.object({
      selfDeclarationDoc1: yup.lazy((val) =>
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
      selfDeclarationDoc2: yup.lazy((val) =>
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
