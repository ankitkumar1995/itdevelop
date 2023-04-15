import * as yup from 'yup';

const youtubeUrlRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const phoneRegExp = '[1-9]{1}[0-9]{9}';
const landLineRegexp = /^[0-9]\d{2,4}-\d{6,8}$/;
const faxRegExp = /^[0-9]{1,3}-[0-9]{3}-[0-9]{7}$/;
/* /^((\+91)*([-\([\d]*\)]?)*)[1-9]?(-[0-9]+)*$/; */
const numAndhyphen = /^(\+91-)*[0-9]{3,}(-(\((\d+)\)))*(-[0-9]+)*$/;
const linkdinUrlRegex =
  /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;
const numOfOffice = /^[1-9][0-9]*$/;
const numStartwith0 = /^[0-9]*$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const characterRegex = /^[a-zA-Z ]*$/;
const twitterRegex =
  /^((http|https):\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
//const youtubeUrlRegex =/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
export const nameAndIntroValidation = yup.object({
  registeration: yup.object({
    nameAndIntro: yup.object({
      incorporatedCompanyName: yup
        .string()
        .min(2, 'Enter atleast 2 character')
        .max(100, 'max 100 character are allowed')
        .required('Please enter your company name'),

      companyTagLine: yup
        .string()
        .min(1, 'Please enter company vision or tagline')
        .max(150, 'Max 150 character are allowed'),
      youtubeUrl: yup
        .string()
        .matches(youtubeUrlRegex, 'Please enter valid youtube url'),
      linkedInUrl: yup
        .string()
        .matches(linkdinUrlRegex, 'Please enter valid linkedinUrl'),
      companyWebsiteUrl: yup
        .string()
        .matches(websiteRegex, 'Please enter a valid url')
        .required('Please enter your company website url'),
      // companyLogo: yup.string().min(1, 'This field is required'),
      companyLogo: yup.lazy((val) =>
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
export const industryInfoValidation = yup.object({
  registeration: yup.object({
    industryInfo: yup.object({
      industrySectorType: yup.string().required('Please select one option'),
      productOrServiceBased: yup.string().required('Please select one option'),
      additionalIndustriesSectors: yup
        .array()
        .of(yup.string())
        .min(1, 'Pick at least 1 industry'),
      aboutCompanyProfile: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please brief about your company'),
      productOrServiceDescription: yup
        .string()
        .matches(/^\s*(\S+\s+){0,249}\S*$/, 'Must not exceed 250 words')
        .required('Please describe your product or service'),
    }),
  }),
});

export const comapnyInfoValidation = yup.object({
  registeration: yup.object({
    companyInfo: yup.object({
      statusOfCompanyUnitUndertaking: yup
        .string()
        .required('Please select type of company'),
      noOfEstablishmentOrBranches: yup
        .string()
        .matches(
          /^[0-9][0-9]?$|^100$/,
          'Enter number of branches from 0 to 100'
        ),
      dateOfCommercialOperations: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter date of commercial operations')
        .required('Please enter date of commercial operations'),
      dateOfIncorporationEstablishment: yup
        .date()
        .max(new Date(), 'Future date not allowed')
        .typeError('Please enter date of incorporation')
        .required('Please enter date of incorporation'),

      incorporationNumber: yup
        .string()
        .min(2, 'please enter atleast 2 character')
        .max(50, 'only 50 characters are allowed')
        .required('Please enter incorporation number'),
      companyPanNumber: yup
        .string()
        .matches(
          '[aA-zZ]{5}[0-9]{4}[aA-zZ]{1}',
          'Company pan number is not valid'
        )
        .required('Please enter company pan number'),
      licenseCertificate: yup.array().min(1, 'This field is required'),
    }),
  }),
});

export const startupInfoValidation = yup.object({
  registeration: yup.object({
    startupInfo: yup.object({
      startupStage: yup
        .string()
        .required(`Please select this is required field`),
      isNewProductService: yup.string().required("Please select 'yes' or 'no'"),
    }),
  }),
});
export const employeeInfoValidation = yup.object({
  registeration: yup.object({
    employeeInfo: yup.object({
      permanantWorkers: yup
        .number()
        .nullable()
        .min(
          yup.ref('permanantWorkersInKarnataka'),
          'Total Workforce should be greater than or equal to workforce in Karnataka'
        )
        .required('Please enter total number of permanent workforce'),
      womenWorkers: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter total number of women workforce'),
      permanantWorkersInKarnataka: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter number of permanent workforce in karnataka'),
      womenWorkersinKarnataka: yup
        .string()
        .matches(/^[0-9]*$/, 'Only numbers are allowed')
        .required('Please enter number of women workforce in karnataka'),
      womenStartup: yup.boolean().required("Please select 'yes' or 'no'"),
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
  }),
});

export const companyFounderDetailValidation = yup.object({
  registeration: yup.object({
    companyFounderDetail: yup.object({
      registeredIncorporationAddress: yup
        .string()
        .max(250, 'Max 250 characters are allowed')
        .required('Please enter registered address '),
      city: yup.string().required('Please enter city'),
      district: yup.string().required('Please select district'),
      pinCode: yup
        .string()
        .matches(/^[0-9]{0,}$/, 'Pincode not valid')
        .min(6, 'Pincode must be 6 digits')
        .required('Please enter pincode'),
      state: yup.string().required('Please enter state'),
      mobile: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Phone number must be exactly 10 digits')
        .required('Please enter phone number'),
      companyEmail: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email'),
      landLine: yup
        .string()
        .matches(numAndhyphen, 'Only number and hyphen "(-)" are allowed')
        .max(15, 'Max 15 digits are allowed'),

      fax: yup
        .string()
        .matches(
          numAndhyphen,
          'Fax number allows number and hyphen "(-)" with or without +91'
        )
        .max(15, 'Max 15 digits are allowed'),
      founderDetails: yup.array().of(
        yup.object().shape({
          founderName: yup
            .string()
            .matches(/^[a-zA-Z ]*$/, 'Full name contain only alphabets')
            .required('Please enter founder name'),
          founderDesignation: yup
            .string()
            .required('Please enter founder designation '),
          founderEmail: yup
            .string()
            .email('Please enter a valid email')
            .required('Please enter founder email'),
          founderNumber: yup
            .string()
            .matches(phoneRegExp, 'Please enter a valid phone number')
            .required('Please enter founder mobile number'),
          founderLinkedIn: yup
            .string()
            .matches(linkdinUrlRegex, 'Please enter valid linkedin url'),
          founderTwitter: yup
            .string()
            .matches(twitterRegex, 'Please enter valid twitter url'),
          founderProfileImage: yup.lazy((val) =>
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
          isScSt: yup.string().required("Please select 'yes' or 'no'"),
          scstCertificate: yup.lazy((val) =>
            Array.isArray(val)
              ? yup
                  .array()
                  .of(
                    yup.string().when('isScSt', {
                      is: 'true',
                      then: yup.string().required('This field is required'),
                    })
                  )
                  .when('isScSt', {
                    is: 'true',
                    then: yup
                      .array()
                      .min(1, 'This field is required')
                      .required('This field is required'),
                  })
              : yup.string().when('isScSt', {
                  is: 'true',
                  then: yup
                    .string()
                    .min(1, 'This field is required')
                    .required('This field is required'),
                })
          ),
          category: yup.string().when('isScSt', {
            is: 'true',
            then: yup.string().required('Please select category'),
          }),
        })
      ),
    }),
  }),
});
export const fundingInfoValidation = yup.object({
  registeration: yup.object({
    fundingInfo: yup.object({
      currentlyFunded: yup.boolean().required("Please select 'yes' or 'no'"),

      bootstrapedFunded: yup.boolean().when('currentlyFunded', {
        is: false,
        then: yup.boolean().required("Please select 'yes' or 'no'"),
      }),
      kitsChalleneWinning: yup
        .string()
        .required("Please select 'yes' or 'no' "),
      kitsChallegeName: yup.string().when('kitsChalleneWinning', {
        is: 'true',
        then: yup.string().required('Please select Gok award'),
      }),
      otherChallengeName: yup.string().when('kitsChallegeName', {
        is: 'Others',
        then: yup.string().required('This is required field'),
      }),
      sourceOfFunding: yup.string().when('currentlyFunded', {
        is: 'true',
        then: yup.string().required('Please select source of funding'),
      }),
      fundingStage: yup.string().when('currentlyFunded', {
        is: 'true',
        then: yup.string().required('Please select funding stage'),
      }),
      fundingHelpRequirement: yup
        .string()
        .when('currentlyFunded', {
          is: true,
          then: yup.string().required("Please select 'yes' or 'no'"),
        })
        .when('bootstrapedFunded', {
          is: false,
          then: yup.string().required("Please select 'yes' or 'no'"),
        }),
      // fundingHelpRequirement: yup.string().when('bootstrapedFunded', {
      //   is: false,
      //   then: yup.string().required("Please select 'yes' or 'no'"),
      // }),
      fundingRequired: yup.string().when('fundingHelpRequirement', {
        is: 'true',
        then: yup.string().required('Please select required funding'),
      }),
      fundingType: yup.string().when('fundingHelpRequirement', {
        is: 'true',
        then: yup.string().required('Please select funding type'),
      }),
    }),
  }),
});

export const financialInfoValidation = yup.object({
  registeration: yup.object({
    financialInfo: yup.object({
      isRevenueBelow100cr: yup.string().required("Please select 'yes' or 'no'"),
      signedCALetter: yup.array().min(1, 'This field is required'),
    }),
  }),
});
export const incubatorInfoValidation = yup.object({
  registeration: yup.object({
    incubatorInfo: yup.object({
      isCurrentIncubator: yup.boolean().required("Please select 'yes' or 'no'"),
      gok_supported: yup.string().when('isCurrentIncubator', {
        is: true,
        then: yup.string().required("Please select 'yes' or 'no'"),
      }),

      gok_incubator_details: yup.string().when('gok_supported', {
        is: 'true',
        then: yup.string().required('Please select one option'),
      }),
      incubatorName: yup.string().when('gok_supported', {
        is: 'false',
        then: yup.string().required('Please enter incubator name'),
      }),
      incubatorWebsite: yup.string().when('gok_supported', {
        is: 'false',
        then: yup
          .string()
          .matches(websiteRegex, 'Please enter valid website url')
          .required('Please enter website url'),
      }),
      cheifPromoterName: yup.string().when('gok_supported', {
        is: 'false',
        then: yup
          .string()
          .matches(characterRegex, 'Incubator name contain only alphabets')
          .required('Please enter chief promoter name'),
      }),
      cheifPromoterEmail: yup.string().when('gok_supported', {
        is: 'false',
        then: yup
          .string()
          .email('Please enter a valid email')
          .required('Please enter chief promoter email'),
      }),
      cheifPromoterNumber: yup.string().when('gok_supported', {
        is: 'false',
        then: yup
          .string()
          .matches(phoneRegExp, 'Please enter valid mobile number')
          .required('Please enter chief promoter number'),
      }),
      incubatorAddress: yup.string().when('gok_supported', {
        is: 'false',
        then: yup
          .string()
          .max(250, 'Max 250 characters are allowed')
          .required('Please enter incubator address'),
      }),
      affiliatedIncubator: yup.string().when('gok_supported', {
        is: 'false',
        then: yup.string().required('Please select one option'),
      }),
    }),
  }),
});

export const selfDeclarationValidation = yup.object({
  registeration: yup.object({
    selfDeclaration: yup.object({
      infoFoundAboutKaratakaStartUpCell: yup
        .string()
        .required('Please select one option'),
      signedAnexure: yup.array().min(1, 'This field is required'),
    }),
  }),
});
