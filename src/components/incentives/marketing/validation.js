import * as yup from 'yup';
const acceptNumWithStZero = /^[1-9][0-9]*$/;
const alphaNum = /^[ A-Za-z0-9_@./#&$()+-]*$/;
const numLakhs = /^([1-4][0-9]{0,5}|[5][0-9]{0,4}|500000)$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const passportRegex = '^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$';
export const detailsValidation = yup.object({
  marketingReimbursement: yup.object({
    partA: yup.object({
      companyName: yup
        .string()
        .min(2, 'Company name should be equal to or greater than 2 characters')
        .max(100, 'Max 100 characters are allowed')
        .required('Please enter company name'),
      kitsRegNo: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter kits registration number'),
      gokSupportedIncubator: yup
        .string()
        .required("Please select 'yes' or 'no'"),
      incubatorAddress: yup.string().when('gokSupportedIncubator', {
        is: 'false',
        then: yup
          .string()
          .max(250, 'Max. 250 characters are allowed')
          .required('Please enter incubator details'),
      }),
      incubGokAffiliated: yup.string().when('gokSupportedIncubator', {
        is: 'true',
        then: yup.string().required('Please select one incubator'),
      }),
      claimUnderMDA: yup
        .string()
        .max(10, 'Max. 10 digits are allowed')
        .matches(acceptNumWithStZero, 'Only numbers allowed')
        .required('Please enter no. of claim'),
      releaseDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter incubation commence date')
        .required('Please enter release date'),
      claimingIncentiveName: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter name of individuals claiming incentive'),
      passportNo: yup
        .string()
        .matches(passportRegex, 'Please enter valid passport number')
        .required('Please enter passport no.'),
      womanAny: yup.string().required("Please select 'yes' or 'no'"),
      womanDetails: yup.string().when('womanAny', {
        is: 'true',
        then: yup
          .string()
          .max(300, 'Max. 300 characters are allowed')
          .required('Please enter women details'),
      }),
      appIncentiveDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter incentive application date')
        .required('Please enter incentive date'),
      incubRegDetails: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please enter incbator reg. details'),
      actualDepartureDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter actual departure date')
        .required('Please enter actual departure date'),
      passportCopyDepartureDoc: yup.lazy((val) =>
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
      actualArrivalDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter actual arrival date')
        .required('Please enter actual arrival date'),
      passportCopyArrivalDoc: yup.lazy((val) =>
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
      fairDetails: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please enter fair detail'),
      Place: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter place'),
      eventDurationFromDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter event date')
        .required('Please enter event date'),
      eventDurationToDate: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter incentive application date')
        .required('Please enter incentive date'),
      productsExportedDetails: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter product export detail'),
      productExportedCountries: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter exported countries'),
      eventOrganizersDetails: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please enter organizer details'),
      eventParticipants: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please enter participants details'),
      delegateFees: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter fees'),
      empTicketCost: yup
        .string()
        .max(100, 'Max. 100 character are allowed')
        .required('Please enter ticket cost'),
      empExpenditureCost: yup
        .string()
        .max(100, 'Max. 100 characters are allowed')
        .required('Please enter expenditure travel cost'),
      exhibitionInfra: yup
        .string()
        .max(250, 'Max. 250 characters are allowed')
        .required('Please enter exhibition infrastructure'),
      hotelExpenses: yup
        .string()
        .max(250, 'Max. 250 characters are allowed')
        .required('Please enter hotel expenses'),
      foreignSeminarOranized: yup.object({
        empCustTravelCost: yup
          .string()
          .max(100, 'Max.100 characters are allowed')
          .required('Please enter employee and cutomer travel cost'),
        empCustBoardingCost: yup
          .string()
          .max(100, 'Max.100 characters are allowed')
          .required('Please enter employee and customer boarding cost'),
        eventHotelExpense: yup
          .string()
          .max(250, 'Max. 250 characters are allowed')
          .required('Please enter hotel expenses for event'),
        dA: yup
          .string()
          .max(100, 'Max.100 characters are allowed')
          .required('Please enter DA'),
        advertisement: yup.string().required("Please select 'yes' or 'no'"),
        totalExpenditure: yup
          .string()
          .matches(numLakhs, 'Expendiature claim less than or equal to 5 lakhs')
          .max(100, 'Max. 100 characters are allowed')
          .required('Please enter total expendiature claimed'),
        orgBlacklisted: yup
          .string()
          .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
          .required('Please describe in detail'),
        assistanceAvail: yup
          .string()
          .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
          .required('Please describe in detail'),
      }),
    }),
  }),
});
export const declarationValidation = yup.object({
  marketingReimbursement: yup.object({
    partB: yup.object({
      selfDeclaration1: yup.lazy((val) =>
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
      selfDeclaration2: yup.lazy((val) =>
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
      eventReimbursementClaim: yup.lazy((val) =>
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
      organizationWelcomeLetter: yup.lazy((val) =>
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
      registerationFeeReciept: yup.lazy((val) =>
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
      eventPreceedings: yup.lazy((val) =>
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
      eventWebPageDoc: yup.lazy((val) =>
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
      marketResearch: yup.lazy((val) =>
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
      advertisementReimbursement: yup.lazy((val) =>
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
      webLinks: yup
        .mixed()
        .when('isArray', {
          is: Array.isArray,
          then: yup
            .array()
            .of(yup.string().matches(websiteRegex, 'Please enter a valid url')),
          otherwise: yup
            .string()
            .matches(websiteRegex, 'Please enter a valid url'),
        })
        .required('This field is required'),
      marketExpensesInvoices: yup.lazy((val) =>
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
      businessDevActivityReports: yup.lazy((val) =>
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
