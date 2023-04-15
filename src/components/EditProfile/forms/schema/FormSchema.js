import * as Yup from 'yup';

// Startups Profile Schemas

export const introSchema = Yup.object().shape({
  companyName: Yup.string()
    .required('Company name is Required')
    .typeError('This field value should be a text'),
  companyTagLine: Yup.string()
    .required('Company Tagline is Required')
    .typeError('This field value should be a text'),
  elevatePitch: Yup.string()
    .required('Link of Elevate Pitch is Required')
    .typeError('This field value should be a text'),
  linkedInUrl: Yup.string()
    .required('LinkedIn URL is Required')
    .typeError('This field value should be a text'),
  websiteUrl: Yup.string()
    .required('Company website URL is Required')
    .typeError('This field value should be a text'),
  twitterUrl: Yup.string()
    .required('Twitter URL is Required')
    .typeError('This field value should be a text'),
  facebookUrl: Yup.string()
    .required('Facebook URL is Required')
    .typeError('This field value should be a text'),
  wonKitsChallengeBefore: Yup.bool().required(
    'Please select have you won any KITS Challenge before or not'
  ),
  kitsChallenge: Yup.string()
    .when('wonKitsChallengeBefore', {
      is: true,
      then: (schema) =>
        schema.required('Please select which challenge you have won'),
      otherwise: (schema) => schema.notRequired(),
    })
    .typeError('This field value should be a text'),
  companyLogo: Yup.string()
    .required('Please upload a logo')
    .typeError('This field value should be a link of a image url'),
});

export const aboutSchema = Yup.object().shape({
  about: Yup.string()
    .required('Briefly describe about yourself')
    .typeError('This field value should be a text'),
});

export const productSchema = Yup.object().shape({
  companyProduct: Yup.string()
    .required('Briefly tell us about your products and services')
    .typeError('This field value should be a text'),
});

export const companyDetailsSchema = Yup.object().shape({
  industry: Yup.string()
    .required('Please select the industry')
    .typeError('This field value should be a text'),
  district: Yup.string()
    .required('Please select the district')
    .typeError('This field value should be a text'),
  commencementDate: Yup.date()
    .required('Please select the Commencement date of commercial operations')
    .typeError('This field value should be a Date'),
  employeeSize: Yup.number()
    .typeError('Employee Size should be a number')
    .required('Please enter Employee size'),
  currentlyFunded: Yup.bool().required('Please Choose Currently Funded or not'),
  currentlyBootstrap: Yup.bool().required(
    'Please Choose Currently Bootstrap or not'
  ),
  seekingFunding: Yup.bool().required(
    'Please Choose Seeking for Funding or not'
  ),
});

export const contactDetailsSchema = Yup.object().shape({
  mobileNumber: Yup.number()
    .min(1000000000, 'Number should be 10 digit')
    .max(9999999999, 'Number should be 10 digit')
    .required('Mobile number is required')
    .typeError('This field should be a number'),
  email: Yup.string()
    .required('email is required')
    .typeError('This field should be a text'),
  landLineNumber: Yup.number()
    .required('Landline number is required')
    .typeError('This field should be a number'),
  faxNumber: Yup.number()
    .required('Fax is required')
    .typeError('This field should be a number'),
  address: Yup.string()
    .required('Address is required')
    .typeError('This field should be a text'),
  city: Yup.string()
    .required('City/town is required')
    .typeError('This field should be a text'),
  district: Yup.string()
    .required('District is required')
    .typeError('This field should be a text'),
  pincode: Yup.number()
    .required('Pincode is required')
    .min(100000, 'Pin code should be 6 digit')
    .max(999999, 'Pin code should be 6 digit')
    .typeError('This field should be a number'),
  state: Yup.string()
    .required('State is required')
    .typeError('This field should be a text'),
});

export const foundersAdvisorySchema = Yup.object().shape({
  founders: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string()
        .required('Full name is Required')
        .typeError('This field value should be a text'),
      designation: Yup.string()
        .required('Designation is Required')
        .typeError('This field value should be a text'),
      linkedInUrl: Yup.string()
        .required('LinkedIn Profile URL is Required')
        .typeError('This field value should be a text'),
      twitterUrl: Yup.string()
        .required('Twitter Profile URL is Required')
        .typeError('This field value should be a text'),
      profilePic: Yup.string()
        .required('Please Upload a Profile Photo')
        .typeError('This field value should be an image'),
    })
  ),
});

export const accomplishmentSchema = Yup.object().shape({
  accomplishment: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .required('This field is required'),
});

export const marketNeedsSchema = Yup.object().shape({
  needs: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .required('This field is required'),
});

export const fundingSchema = Yup.object().shape({
  funds: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const peopleSchema = Yup.object().shape({
  peoples: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(10, 'Atleast 10 Character')
    .required('Please fill this field'),
  newPassword: Yup.string()
    .min(10, 'Atleast 10 Character')
    .required('Please fill this field'),
  reenterNewPassword: Yup.string()
    .min(10, 'Atleast 10 Character')
    .required('Please fill this field'),
});

// Mentor Profile Schemas

export const mentorIntroSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is Required')
    .typeError('This field value should be a text'),
  tagline: Yup.string()
    .required('Tagline is Required')
    .typeError('This field value should be a text'),
  introductionUrl: Yup.string()
    .required('Link of Introduction is Required')
    .typeError('This field value should be a text'),
  linkedInUrl: Yup.string()
    .required('LinkedIn URL is Required')
    .typeError('This field value should be a text'),
  websiteUrl: Yup.string()
    .required('Website URL is Required')
    .typeError('This field value should be a text'),
  twitterUrl: Yup.string()
    .required('Twitter URL is Required')
    .typeError('This field value should be a text'),
  facebookUrl: Yup.string()
    .required('Facebook URL is Required')
    .typeError('This field value should be a text'),
  profilePic: Yup.string()
    .required('Please upload a a profile picture')
    .typeError('This field value should be a link of a image url'),
});

export const mentorIndustryPreferenceSchema = Yup.object().shape({
  overallExperience: Yup.string()
    .required('Experience is Required')
    .typeError('This field value should be a text'),
  preferredIndustries: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 preferred industry'),
  preferredTechnology: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 preferred technology'),
});

export const mentorExperienceSchema = Yup.object().shape({
  qualification: Yup.string()
    .required('qualification is Required')
    .typeError('This field value should be a text'),
  currentAssociatedCompany: Yup.string()
    .required('Please mention current associate company')
    .typeError('This field value should be a text'),
  haveMentorBefore: Yup.bool().required('Please select'),
  totalWorkExperience: Yup.string()
    .required('Experience is Required')
    .typeError('This field value should be a text'),
  totalCompaniesMentored: Yup.number()
    .min(0, 'Minimum value is 0')
    .required('Please mention how many companies you have mentored')
    .typeError('This field value should be a number'),
  companyCurrentlyMentoring: Yup.string()
    .required('Please mention how many companies you are currently mentoring')
    .typeError('This field value should be a text'),
  industries: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 industry/sector'),
  specializations: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 specialization'),
  vertical: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 vertical'),
  skills: Yup.array().of(Yup.string()).min(1, 'Please select atleast 1 skill'),
  karnatakaStartupsMentoring: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 startup you are mentoring'),
});

export const mentorAvailabilitySchema = Yup.object().shape({
  selectDays: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 day'),
  timeRange: Yup.string()
    .required('Availability time range is Required')
    .typeError('This field value should be a text'),
  preferredWorkMode: Yup.string()
    .required('Work mode is Required')
    .typeError('This field value should be a text'),
  stageWantToBeMentor: Yup.string()
    .required('stage is Required')
    .typeError('This field value should be a text'),
  mentorDuration: Yup.string()
    .required('duration is Required')
    .typeError('This field value should be a text'),
  feePerMonth: Yup.string()
    .required('fee is Required')
    .typeError('This field value should be a text'),
  modeOfContact: Yup.string()
    .required('Contact is Required')
    .typeError('This field value should be a text'),
});

export const mentorContactDetailsSchema = Yup.object().shape({
  mobileNumber: Yup.number()
    .min(1000000000, 'Number should be 10 digit')
    .max(9999999999, 'Number should be 10 digit')
    .required('Mobile number is required')
    .typeError('This field should be a number'),
  email: Yup.string()
    .required('email is required')
    .typeError('This field should be a text'),
  landLineNumber: Yup.number()
    .required('Landline number is required')
    .typeError('This field should be a number'),
  faxNumber: Yup.number()
    .required('Fax is required')
    .typeError('This field should be a number'),
  address: Yup.string()
    .required('Address is required')
    .typeError('This field should be a text'),
  city: Yup.string()
    .required('City/town is required')
    .typeError('This field should be a text'),
  district: Yup.string()
    .required('District is required')
    .typeError('This field should be a text'),
  pincode: Yup.number()
    .required('Pincode is required')
    .min(100000, 'Pin code should be 6 digit')
    .max(999999, 'Pin code should be 6 digit')
    .typeError('This field should be a number'),
  state: Yup.string()
    .required('State is required')
    .typeError('This field should be a text'),
  country: Yup.string()
    .required('Country is required')
    .typeError('This field should be a text'),
});

export const mentorProblemSchema = Yup.object().shape({
  problems: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .required('This field is required'),
});

// Investor Profile Schemas

export const investorIntroSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is Required')
    .typeError('This field value should be a text'),
  tagline: Yup.string()
    .required('Tagline is Required')
    .typeError('This field value should be a text'),
  introductionUrl: Yup.string()
    .required('Link of Introduction is Required')
    .typeError('This field value should be a text'),
  linkedInUrl: Yup.string()
    .required('LinkedIn URL is Required')
    .typeError('This field value should be a text'),
  websiteUrl: Yup.string()
    .required('Website URL is Required')
    .typeError('This field value should be a text'),
  twitterUrl: Yup.string()
    .required('Twitter URL is Required')
    .typeError('This field value should be a text'),
  facebookUrl: Yup.string()
    .required('Facebook URL is Required')
    .typeError('This field value should be a text'),
  profilePic: Yup.string()
    .required('Please upload a profile picture')
    .typeError('This field value should be a link of a image url'),
});

export const investorLookForInStartupsSchema = Yup.object().shape({
  startup: Yup.string()
    .required('Startup description is Required')
    .typeError('This field value should be a text'),
  preferredIndustries: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 preferred industry'),
  preferredTechnology: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select atleast 1 preferred technology'),
});

export const investorDetailsSchema = Yup.object().shape({
  type: Yup.string()
    .required('Type is Required')
    .typeError('This field value should be a text'),
  stageToInvest: Yup.string()
    .required('Stage to invest is Required')
    .typeError('This field value should be a text'),
  totalFunded: Yup.string()
    .required('Total funded amount is Required')
    .typeError('This field value should be a text'),
  portfolio: Yup.string()
    .required('Portfolio amount is Required')
    .typeError('This field value should be a text'),
  location: Yup.string()
    .required('Location is Required')
    .typeError('This field value should be a text'),
  range: Yup.string()
    .required('Investment range is Required')
    .typeError('This field value should be a text'),
  startupsFunded: Yup.string()
    .required('Total number of organisations is Required')
    .typeError('This field value should be a text'),
});

export const investorContactDetailsSchema = Yup.object().shape({
  mobileNumber: Yup.number()
    .min(1000000000, 'Number should be 10 digit')
    .max(9999999999, 'Number should be 10 digit')
    .required('Mobile number is required')
    .typeError('This field should be a number'),
  email: Yup.string()
    .required('email is required')
    .typeError('This field should be a text'),
  landLineNumber: Yup.number()
    .required('Landline number is required')
    .typeError('This field should be a number'),
  faxNumber: Yup.number()
    .required('Fax is required')
    .typeError('This field should be a number'),
  address: Yup.string()
    .required('Address is required')
    .typeError('This field should be a text'),
  city: Yup.string()
    .required('City/town is required')
    .typeError('This field should be a text'),
  district: Yup.string()
    .required('District is required')
    .typeError('This field should be a text'),
  pincode: Yup.number()
    .required('Pincode is required')
    .min(100000, 'Pin code should be 6 digit')
    .max(999999, 'Pin code should be 6 digit')
    .typeError('This field should be a number'),
  state: Yup.string()
    .required('State is required')
    .typeError('This field should be a text'),
  country: Yup.string()
    .required('Country is required')
    .typeError('This field should be a text'),
});

export const investorInvestmentSchema = Yup.object().shape({
  investments: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const investorPitchsSchema = Yup.object().shape({
  pitchs: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const investorPortfoliosSchema = Yup.object().shape({
  portfolios: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const investorReachsSchema = Yup.object().shape({
  reachs: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const investorAppliesSchema = Yup.object().shape({
  applies: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

// Partner Profile Schemas

export const partnerIntroSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is Required')
    .typeError('This field value should be a text'),
  tagline: Yup.string()
    .required('Tagline is Required')
    .typeError('This field value should be a text'),
  introductionUrl: Yup.string()
    .required('Link of Introduction is Required')
    .typeError('This field value should be a text'),
  linkedInUrl: Yup.string()
    .required('LinkedIn URL is Required')
    .typeError('This field value should be a text'),
  websiteUrl: Yup.string()
    .required('Website URL is Required')
    .typeError('This field value should be a text'),
  twitterUrl: Yup.string()
    .required('Twitter URL is Required')
    .typeError('This field value should be a text'),
  facebookUrl: Yup.string()
    .required('Facebook URL is Required')
    .typeError('This field value should be a text'),
  profilePic: Yup.string()
    .required('Please upload a a profile picture')
    .typeError('This field value should be a link of a image url'),
});

export const partnerDetailsSchema = Yup.object().shape({
  mobileNumber: Yup.number()
    .min(1000000000, 'Number should be 10 digit')
    .max(9999999999, 'Number should be 10 digit')
    .required('Mobile number is required')
    .typeError('This field should be a number'),
  email: Yup.string()
    .required('email is required')
    .typeError('This field should be a text'),
  address: Yup.string()
    .required('Address is required')
    .typeError('This field should be a text'),
  city: Yup.string()
    .required('City/town is required')
    .typeError('This field should be a text'),
  district: Yup.string()
    .required('District is required')
    .typeError('This field should be a text'),
  pincode: Yup.number()
    .required('Pincode is required')
    .min(100000, 'Pin code should be 6 digit')
    .max(999999, 'Pin code should be 6 digit')
    .typeError('This field should be a number'),
  state: Yup.string()
    .required('State is required')
    .typeError('This field should be a text'),
  country: Yup.string()
    .required('Country is required')
    .typeError('This field should be a text'),
  partneringType: Yup.string()
    .required('Partner type is required')
    .typeError('This field should be a text'),
  partneringSubType: Yup.string()
    .required('Partner sub type is required')
    .typeError('This field should be a text'),
  contactPersonName: Yup.string()
    .required('Contact person name is required')
    .typeError('This field should be a text'),
  contactPersonDesignation: Yup.string()
    .required('Contact person designation is required')
    .typeError('This field should be a text'),
});

export const partnerOfferingsSchema = Yup.object().shape({
  offers: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

// Incubator Profile Schemas

export const incubatorIntroSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is Required')
    .typeError('This field value should be a text'),
  tagline: Yup.string()
    .required('Tagline is Required')
    .typeError('This field value should be a text'),
  locationUrl: Yup.string()
    .required('Link of google map location is Required')
    .typeError('This field value should be a text'),
  linkedInUrl: Yup.string()
    .required('LinkedIn URL is Required')
    .typeError('This field value should be a text'),
  websiteUrl: Yup.string()
    .required('Website URL is Required')
    .typeError('This field value should be a text'),
  twitterUrl: Yup.string()
    .required('Twitter URL is Required')
    .typeError('This field value should be a text'),
  facebookUrl: Yup.string()
    .required('Facebook URL is Required')
    .typeError('This field value should be a text'),
  profilePic: Yup.string()
    .required('Please upload a a profile picture')
    .typeError('This field value should be a link of a image url'),
});

export const incubatorGallerySchema = Yup.object().shape({
  photos: Yup.array()
    .of(Yup.string().required('Please fill this field'))
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const incubatorDetailsSchema = Yup.object().shape({
  totalSeats: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  allotedSeats: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  allotedSeatsForPhysical: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  allotedSeatsForVirtual: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  occupiedSeats: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  availableSeats: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  meetingRooms: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  conferenceRooms: Yup.number()
    .min(1, 'Minimum number should be 1')
    .required('This field is required')
    .typeError('This field should be a number'),
  features: Yup.array()
    .of(Yup.string())
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const incubatorContactDetailsSchema = Yup.object().shape({
  contactPersonName: Yup.string()
    .required('Contact person name is required')
    .typeError('This field should be a text'),
  mobileNumber: Yup.number()
    .min(1000000000, 'Number should be 10 digit')
    .max(9999999999, 'Number should be 10 digit')
    .required('Mobile number is required')
    .typeError('This field should be a number'),
  alternateMobileNumber: Yup.number()
    .min(1000000000, 'Number should be 10 digit')
    .max(9999999999, 'Number should be 10 digit')
    .required('Alternate Mobile number is required')
    .typeError('This field should be a number'),
  email: Yup.string()
    .required('email is required')
    .typeError('This field should be a text'),
  landLineNumber: Yup.number()
    .required('Landline number is required')
    .typeError('This field should be a number'),
  address: Yup.string()
    .required('Address is required')
    .typeError('This field should be a text'),
  city: Yup.string()
    .required('City/town is required')
    .typeError('This field should be a text'),
  district: Yup.string()
    .required('District is required')
    .typeError('This field should be a text'),
  pincode: Yup.number()
    .required('Pincode is required')
    .min(100000, 'Pin code should be 6 digit')
    .max(999999, 'Pin code should be 6 digit')
    .typeError('This field should be a number'),
  state: Yup.string()
    .required('State is required')
    .typeError('This field should be a text'),
  country: Yup.string()
    .required('Country is required')
    .typeError('This field should be a text'),
});

export const incubatorAmenitiesSchema = Yup.object().shape({
  amenities: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});

export const incubationFacilitiySchema = Yup.object().shape({
  facilities: Yup.array()
    .of(
      Yup.string()
        .min(10, 'Atleast 10 Character')
        .required('Please fill this field')
    )
    .min(1, 'Add atleast one item')
    .required('This field is required'),
});
