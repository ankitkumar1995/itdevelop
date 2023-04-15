import { FormikStep } from '../FormikStepper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NameAndIntro from './nameAndIntro';
import IndustryInformation from './industryInformation';
import CompanyInformation from './companyInformation';
import StartupInformation from './startupInformation';
import EmployeesInformation from './employeesInformation';
import CompanyFounder from './companyFounder';
import FundingDetails from './fundingDetails';
import FinancialInformation from './financialInformation';
import IncubatorInformation from './incubatorInformation';
import SelfDeclaration from './selfDeclaration';
import {
  comapnyInfoValidation,
  companyFounderDetailValidation,
  employeeInfoValidation,
  financialInfoValidation,
  fundingInfoValidation,
  incubatorInfoValidation,
  industryInfoValidation,
  nameAndIntroValidation,
  selfDeclarationValidation,
  startupInfoValidation,
} from './validation';
import CheckAndSuccessModal from '../CheckAndSuccessModal';
import moment from 'moment';
import FormikStepperReg from '../FormikStepperReg';
import { set } from 'lodash';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../pages/api/url';
import { useSession } from 'next-auth/client';
// const num1to100 = /100|[1-9]?\d/;
// const phoneRegExp = '[1-9]{1}[0-9]{9}';

// const fundingAmount = /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/;

const StartupRegistrationForm = (props) => {
  const [submitDisable, setSubmitDisable] = useState(false);
  const router = useRouter();
  const [checkbox, setCheckBox] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState(null);
  const [lastStep, setLastStep] = useState(0);
  const [saveAndExitUrl, setSaveAndExitUrl] = useState('');
  const [exitDisable, setExitDisable] = useState(false);
  const [session] = useSession();
  const dateOfCommercialOp =
    (props.registerData &&
      props.registerData.data &&
      props.registerData.data.registeration &&
      props.registerData.data.registeration.companyInfo &&
      props.registerData.data.registeration.companyInfo
        .dateOfCommercialOperations) ||
    '';
  const dateofComOp = moment(new Date(dateOfCommercialOp)).format('YYYY-MM-DD');
  const dateOfIncorporationEstablis =
    (props.registerData &&
      props.registerData.data &&
      props.registerData.data.dateOfIncorporation) ||
    (props.registerData &&
      props.registerData.data &&
      props.registerData.data.registeration &&
      props.registerData.data.registeration.companyInfo &&
      props.registerData.data.registeration.companyInfo
        .dateOfIncorporationEstablishment) ||
    '';
  const dateOfIncorp = moment(new Date(dateOfIncorporationEstablis)).format(
    'YYYY-MM-DD'
  );
  const structeredFounderDetailData = (data) => {
    const { founderDetails } = data;
    const updatedFounder = [];

    for (let founder of founderDetails) {
      // const scSt =
      //   typeof founder.isScSt === 'string' && founder.isScSt === 'false'
      //     ? false
      //     : true;
      if (founder.isScSt) {
        updatedFounder.push(founder);
      } else {
        updatedFounder.push({
          ...founder,
          scstCertificate: '',
          category: undefined,
        });
      }
    }
    return { ...data, founderDetails: updatedFounder };
  };
  const [initialValues, setInitialValues] = useState({
    registeration: {
      nameAndIntro: {
        incorporatedCompanyName: '',
        companyTagLine: '',
        youtubeUrl: '',
        linkedInUrl: '',
        companyWebsiteUrl: '',
        companyLogo: [],
      },
      industryInfo: {
        industrySectorType: '',
        productOrServiceBased: '',
        additionalIndustriesSectors: [],
        aboutCompanyProfile: '',
        productOrServiceDescription: '',
      },
      fundingInfo: {
        currentlyFunded: '',
        kitsChalleneWinning: '',
        bootstrapedFunded: '',
        kitsChallegeName: '',
        sourceOfFunding: '',
        fundingStage: '',
        fundingHelpRequirement: '',
        fundingRequired: '',
        fundingType: '',
        otherChallengeName: '',
      },
      companyInfo: {
        statusOfCompanyUnitUndertaking: '',
        noOfEstablishmentOrBranches: 1,
        dateOfCommercialOperations: '',
        dateOfIncorporationEstablishment: '',
        incorporationNumber: '',
        companyPanNumber: '',
        licenseCertificate: [],
      },
      startupInfo: {
        startupStage: '',
        isNewProductService: '',
        supportingDocs: [],
      },
      employeeInfo: {
        permanantWorkers: '',
        womenWorkers: '',
        permanantWorkersInKarnataka: '',
        womenWorkersinKarnataka: '',
        womenStartup: '',
        details: {
          nameOfWomenEntrepreneur: '',
          designationOfWomenEntrepreneur: '',
          mobileNumber: '',
          email: '',
        },
      },
      companyFounderDetail: {
        registeredIncorporationAddress: '',
        city: '',
        district: '',
        pinCode: '',
        state: 'Karnataka',
        mobile: '',
        companyEmail: '',
        landLine: '',
        fax: '',
        founderDetails: [
          {
            founderName: '',
            founderDesignation: '',
            founderEmail: '',
            founderNumber: '',
            founderLinkedIn: '',
            founderTwitter: '',
            founderProfileImage: [],
            isScSt: false,
            scstCertificate: [],
            category: '',
          },
        ],
      },
      financialInfo: {
        isRevenueBelow100cr: '',
        signedCALetter: [],
      },
      incubatorInfo: {
        isCurrentIncubator: '',
        gok_supported: '',
        gok_incubator_details: '',
        incubatorName: '',
        incubatorWebsite: '',
        cheifPromoterName: '',
        cheifPromoterEmail: '',
        cheifPromoterNumber: '',
        incubatorAddress: '',
        affiliatedIncubator: '',
      },
      selfDeclaration: {
        infoFoundAboutKaratakaStartUpCell: '',
        signedAnexure: [],
      },
    },
  });

  const getValue = (val) => {
    setCheckBox(val);
  };

  useEffect(() => {
    setLastStep(props?.registerData?.data?.lastStep);
    setInitialValues({
      registeration: {
        nameAndIntro: {
          incorporatedCompanyName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.companyName) ||
            'test',
          companyTagLine:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.nameAndIntro &&
              props.registerData.data.registeration.nameAndIntro
                .companyTagLine) ||
            '',

          youtubeUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.nameAndIntro &&
              props.registerData.data.registeration.nameAndIntro.youtubeUrl) ||
            '',
          linkedInUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.nameAndIntro &&
              props.registerData.data.registeration.nameAndIntro.linkedInUrl) ||
            '',
          companyWebsiteUrl:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.url) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.nameAndIntro &&
              props.registerData.data.registeration.nameAndIntro
                .companyWebsiteUrl)
              ? props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.nameAndIntro &&
                props.registerData.data.registeration.nameAndIntro
                  .companyWebsiteUrl
                ? props.registerData?.data?.url ===
                  props.registerData?.data?.registeration?.nameAndIntro
                    .companyWebsiteUrl
                  ? props.registerData?.data?.url
                  : props.registerData?.data?.registeration?.nameAndIntro
                      ?.companyWebsiteUrl
                : props.registerData?.data.url
              : '',
          companyLogo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.nameAndIntro &&
              props.registerData.data.registeration.nameAndIntro.companyLogo) ||
            [],
        },
        industryInfo: {
          industrySectorType:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.industryInfo &&
              props.registerData.data.registeration.industryInfo
                .industrySectorType) ||
            '',
          productOrServiceBased:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.industryInfo &&
              props.registerData.data.registeration.industryInfo
                .productOrServiceBased) ||
            '',
          additionalIndustriesSectors:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.industryInfo &&
              props.registerData.data.registeration.industryInfo
                .additionalIndustriesSectors) ||
            [],
          aboutCompanyProfile:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.industryInfo &&
              props.registerData.data.registeration.industryInfo
                .aboutCompanyProfile) ||
            '',

          productOrServiceDescription:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.industryInfo &&
              props.registerData.data.registeration.industryInfo
                .productOrServiceDescription) ||
            '',
        },
        companyInfo: {
          statusOfCompanyUnitUndertaking:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyInfo &&
              props.registerData.data.registeration.companyInfo
                .statusOfCompanyUnitUndertaking) ||
            '',
          noOfEstablishmentOrBranches:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyInfo &&
              props.registerData.data.registeration.companyInfo
                .noOfEstablishmentOrBranches) ||
            '',
          dateOfCommercialOperations: dateofComOp || '',
          dateOfIncorporationEstablishment: dateOfIncorp || '',
          incorporationNumber:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.incorporationNumber) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyInfo &&
              props.registerData.data.registeration.companyInfo
                .incorporationNumber) ||
            '',
          companyPanNumber:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyInfo &&
              props.registerData.data.registeration.companyInfo
                .companyPanNumber) ||
            '',
          licenseCertificate:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyInfo &&
              props.registerData.data.registeration.companyInfo
                .licenseCertificate) ||
            [],
        },
        startupInfo: {
          startupStage:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.startupInfo &&
              props.registerData.data.registeration.startupInfo.startupStage) ||
            '',
          isNewProductService:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.startupInfo &&
            props.registerData.data.registeration.startupInfo
              .isNewProductService
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.startupInfo &&
                !props.registerData.data.registeration.startupInfo
                  .isNewProductService
              ? false
              : '',
          supportingDocs:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.startupInfo &&
              props.registerData.data.registeration.startupInfo
                .supportingDocs) ||
            [],
        },
        employeeInfo: {
          permanantWorkers:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.employeeInfo &&
              props.registerData.data.registeration.employeeInfo
                .permanantWorkers) ||
            '',
          womenWorkers:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.employeeInfo &&
              props.registerData.data.registeration.employeeInfo
                .womenWorkers) ||
            '',
          permanantWorkersInKarnataka:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.employeeInfo &&
              props.registerData.data.registeration.employeeInfo
                .permanantWorkersInKarnataka) ||
            '',
          womenWorkersinKarnataka:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.employeeInfo &&
              props.registerData.data.registeration.employeeInfo
                .womenWorkersinKarnataka) ||
            '',
          womenStartup:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.employeeInfo &&
            props.registerData.data.registeration.employeeInfo.womenStartup
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.employeeInfo &&
                !props.registerData.data.registeration.employeeInfo.womenStartup
              ? false
              : '',
          details: {
            nameOfWomenEntrepreneur:
              (props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.employeeInfo &&
                props.registerData.data.registeration.employeeInfo.details &&
                props.registerData.data.registeration.employeeInfo.details
                  .nameOfWomenEntrepreneur) ||
              '',
            designationOfWomenEntrepreneur:
              (props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.employeeInfo &&
                props.registerData.data.registeration.employeeInfo.details &&
                props.registerData.data.registeration.employeeInfo.details
                  .designationOfWomenEntrepreneur) ||
              '',
            mobileNumber:
              (props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.employeeInfo &&
                props.registerData.data.registeration.employeeInfo.details &&
                props.registerData.data.registeration.employeeInfo.details
                  .mobileNumber) ||
              '',
            email:
              (props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.employeeInfo &&
                props.registerData.data.registeration.employeeInfo.details &&
                props.registerData.data.registeration.employeeInfo.details
                  .email) ||
              '',
          },
        },
        companyFounderDetail: {
          registeredIncorporationAddress:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail
                .registeredIncorporationAddress) ||
            '',
          city:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail
                .city) ||
            '',
          district:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail
                .district) ||
            '',
          pinCode:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail
                .pinCode) ||
            '',
          state: 'Karnataka',
          mobile:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.phone) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail
                .mobile) ||
            '',
          companyEmail:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.email) ||
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail
                .companyEmail) ||
            '',
          landLine:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail
                .landLine) ||
            '',
          fax:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.companyFounderDetail &&
              props.registerData.data.registeration.companyFounderDetail.fax) ||
            '',
          founderDetails:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.companyFounderDetail &&
            props.registerData.data.registeration.companyFounderDetail
              .founderDetails
              ? [
                  ...(props.registerData &&
                    props.registerData.data &&
                    props.registerData.data.registeration &&
                    props.registerData.data.registeration
                      .companyFounderDetail &&
                    props.registerData.data.registeration.companyFounderDetail.founderDetails.map(
                      (founder) => ({
                        ...founder,
                        scstCertificate:
                          founder.scstCertificate === ''
                            ? []
                            : founder.scstCertificate,
                      })
                    )),
                ]
              : [
                  {
                    founderName: '',
                    founderDesignation: '',
                    founderEmail: '',
                    founderNumber: '',
                    founderLinkedIn: '',
                    founderTwitter: '',
                    founderProfileImage: [],
                    isScSt: false,
                    category: '',
                    scstCertificate: [],
                  },
                ],
        },
        fundingInfo: {
          currentlyFunded:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.fundingInfo &&
            props.registerData.data.registeration.fundingInfo.currentlyFunded
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.fundingInfo &&
                !props.registerData.data.registeration.fundingInfo
                  .currentlyFunded
              ? false
              : '',
          kitsChalleneWinning:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.fundingInfo &&
            props.registerData.data.registeration.fundingInfo
              .kitsChalleneWinning
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.fundingInfo &&
                !props.registerData.data.registeration.fundingInfo
                  .kitsChalleneWinning
              ? false
              : '',
          bootstrapedFunded:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.fundingInfo &&
            props.registerData.data.registeration.fundingInfo.bootstrapedFunded
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.fundingInfo &&
                !props.registerData.data.registeration.fundingInfo
                  .bootstrapedFunded
              ? false
              : '',
          kitsChallegeName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.fundingInfo &&
              props.registerData.data.registeration.fundingInfo
                .kitsChallegeName) ||
            '',
          sourceOfFunding:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.fundingInfo &&
              props.registerData.data.registeration.fundingInfo
                .sourceOfFunding) ||
            '',
          fundingStage:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.fundingInfo &&
              props.registerData.data.registeration.fundingInfo.fundingStage) ||
            '',
          fundingHelpRequirement:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.fundingInfo &&
            props.registerData.data.registeration.fundingInfo
              .fundingHelpRequirement
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.fundingInfo &&
                !props.registerData.data.registeration.fundingInfo
                  .fundingHelpRequirement
              ? false
              : '',
          fundingRequired:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.fundingInfo &&
              props.registerData.data.registeration.fundingInfo
                .fundingRequired) ||
            '',
          fundingType:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.fundingInfo &&
              props.registerData.data.registeration.fundingInfo.fundingType) ||
            '',
          otherChallengeName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.fundingInfo &&
              props.registerData.data.registeration.fundingInfo
                .otherChallengeName) ||
            '',
        },

        financialInfo: {
          isRevenueBelow100cr:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.financialInfo &&
            props.registerData.data.registeration.financialInfo
              .isRevenueBelow100cr
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.financialInfo &&
                !props.registerData.data.registeration.financialInfo
                  .isRevenueBelow100cr
              ? false
              : '',
          signedCALetter:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.financialInfo &&
              props.registerData.data.registeration.financialInfo
                .signedCALetter) ||
            [],
        },
        incubatorInfo: {
          isCurrentIncubator:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.incubatorInfo &&
            props.registerData.data.registeration.incubatorInfo
              .isCurrentIncubator
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.incubatorInfo &&
                !props.registerData.data.registeration.incubatorInfo
                  .isCurrentIncubator
              ? false
              : '',
          gok_supported:
            props.registerData &&
            props.registerData.data &&
            props.registerData.data.registeration &&
            props.registerData.data.registeration.incubatorInfo &&
            props.registerData.data.registeration.incubatorInfo.gok_supported
              ? true
              : props.registerData &&
                props.registerData.data &&
                props.registerData.data.registeration &&
                props.registerData.data.registeration.incubatorInfo &&
                !props.registerData.data.registeration.incubatorInfo
                  .gok_supported
              ? false
              : '',
          gok_incubator_details:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .gok_incubator_details) ||
            '',
          incubatorName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .incubatorName) ||
            '',
          incubatorWebsite:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .incubatorWebsite) ||
            '',
          cheifPromoterName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .cheifPromoterName) ||
            '',
          cheifPromoterEmail:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .cheifPromoterEmail) ||
            '',
          cheifPromoterNumber:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .cheifPromoterNumber) ||
            '',
          incubatorAddress:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .incubatorAddress) ||
            '',
          affiliatedIncubator:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.incubatorInfo &&
              props.registerData.data.registeration.incubatorInfo
                .affiliatedIncubator) ||
            '',
        },
        selfDeclaration: {
          infoFoundAboutKaratakaStartUpCell:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.selfDeclaration &&
              props.registerData.data.registeration.selfDeclaration
                .infoFoundAboutKaratakaStartUpCell) ||
            '',
          signedAnexure:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.registeration &&
              props.registerData.data.registeration.selfDeclaration &&
              props.registerData.data.registeration.selfDeclaration
                .signedAnexure) ||
            [],
        },
      },
    });
  }, [props]);

  return (
    <div className="elevate__form">
      <FormikStepperReg
        exitDisable={exitDisable}
        setExitDisable={setExitDisable}
        saveAndExitUrl={saveAndExitUrl}
        elevate
        formTopText="Register your startup"
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange
        checkbox={checkbox}
        submitDisable={submitDisable}
        form
        currentStep={
          props.registerData &&
          props.registerData.data &&
          props.registerData.data.appStatus === 'Missing'
            ? true
            : false
        }
        successModalData={successModalData}
        showSuccessModal={showSuccessModal}
        onSubmit={async (values, helpers, step, type) => {
          // if (type === 'saveAndexit') {
          //   setExitDisable(true);
          // }
          if (step === 0) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  // registeration: {
                  'registeration.nameAndIntro': {
                    ...values.registeration.nameAndIntro,
                    incorporatedCompanyName:
                      values.registeration.nameAndIntro.incorporatedCompanyName,
                    companyTagLine:
                      values.registeration.nameAndIntro.companyTagLine,
                    youtubeUrl: values.registeration.nameAndIntro.youtubeUrl,
                    linkedInUrl: values.registeration.nameAndIntro.linkedInUrl,
                    companyWebsiteUrl:
                      values.registeration.nameAndIntro.companyWebsiteUrl,
                    companyLogo:
                      values.registeration.nameAndIntro.companyLogo.toString(),
                  },
                  lastStep: step + 1,
                },
                // },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                  });
                }
              });
          }
          if (step === 1) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.industryInfo':
                    values.registeration.industryInfo,
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                  });
                }
              });
          }
          if (step === 2) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.companyInfo': values.registeration.companyInfo,
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                  });
                }
              });
            // if (res) {
            //   setInitialValues({
            //     ...initialValues,
            //     companyInfo: res.data.data.registeration,
            //   });
            //   return res.data.status;
            // } else {
            //   return null;
            // }
          }
          if (step === 3) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.startupInfo': values.registeration.startupInfo,
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then(async (res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                  });
                }
              });
            // if (res) {
            //   setInitialValues({
            //     ...initialValues,
            //     startupInfo: res.data.data.registeration.startupInfo,
            //   });
            //   return res.data.status;
            // } else {
            //   return null;
            // }
          }
          if (step === 4) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.employeeInfo': {
                    ...values.registeration.employeeInfo,
                    details: {
                      nameOfWomenEntrepreneur:
                        values.registeration.employeeInfo.womenStartup === false
                          ? undefined
                          : values.registeration.employeeInfo.details
                              .nameOfWomenEntrepreneur,
                      designationOfWomenEntrepreneur:
                        values.registeration.employeeInfo.womenStartup === false
                          ? undefined
                          : values.registeration.employeeInfo.details
                              .designationOfWomenEntrepreneur,
                      mobileNumber:
                        values.registeration.employeeInfo.womenStartup === false
                          ? undefined
                          : values.registeration.employeeInfo.details
                              .mobileNumber,
                      email:
                        values.registeration.employeeInfo.womenStartup === false
                          ? undefined
                          : values.registeration.employeeInfo.details.email,
                    },
                  },
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                  });
                }
              });
            // if (res) {
            //   setInitialValues({
            //     ...initialValues,
            //     employeeInfo: res.data.data.registeration.employeeInfo,
            //   });
            //   return res.data.status;
            // } else {
            //   return null;
            // }
          }
          if (step === 5) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.companyFounderDetail':
                    structeredFounderDetailData(
                      values.registeration.companyFounderDetail
                    ),
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                    companyFounderDetail:
                      res?.data?.registeration?.companyFounderDetail,
                  });
                }
              });
            // if (res) {
            //   setInitialValues({
            //     ...initialValues,
            //     companyFounderDetail:
            //       res.data.data.registeration.companyFounderDetail,
            //   });
            //   return res.data.status;
            // } else {
            //   return null;
            // }
          }

          if (step === 6) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.fundingInfo': {
                    ...values.registeration.fundingInfo,
                    bootstrapedFunded:
                      values.registeration.fundingInfo.currentlyFunded === true
                        ? undefined
                        : values.registeration.fundingInfo.bootstrapedFunded,
                    fundingHelpRequirement:
                      values.registeration.fundingInfo.bootstrapedFunded ===
                      true
                        ? undefined
                        : values.registeration.fundingInfo
                            .fundingHelpRequirement,
                    fundingRequired:
                      values.registeration.fundingInfo
                        .fundingHelpRequirement === false
                        ? undefined
                        : values.registeration.fundingInfo.fundingRequired,
                    fundingType:
                      values.registeration.fundingInfo
                        .fundingHelpRequirement === false
                        ? undefined
                        : values.registeration.fundingInfo.fundingType,
                  },
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                    fundingInfo: res?.data?.registeration?.fundingInfo,
                  });
                }
              });
            // if (res) {
            //   setInitialValues({
            //     ...initialValues,
            //     fundingInfo: res.data.data.registeration.fundingInfo,
            //   });
            //   return res.data.status;
            // } else {
            //   return null;
            // }
          }
          if (step === 7) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.financialInfo':
                    values.registeration.financialInfo,
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                    financialInfo: res?.data?.registeration?.financialInfo,
                  });
                }
              });
            // if (res) {
            //   setInitialValues({
            //     ...initialValues,
            //     //financialInfo: res.data.data.registeration.financialInfo,
            //   });
            //   return res.data.status;
            // } else {
            //   return null;
            // }
          }
          if (step === 8) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                {
                  'registeration.incubatorInfo': {
                    ...values.registeration.incubatorInfo,
                    gok_supported:
                      values.registeration.incubatorInfo.isCurrentIncubator ===
                      true
                        ? values.registeration.incubatorInfo.gok_supported
                        : undefined,
                    gok_incubator_details:
                      values.registeration.incubatorInfo.isCurrentIncubator ===
                        true &&
                      values.registeration.incubatorInfo.gok_supported === true
                        ? values.registeration.incubatorInfo
                            .gok_incubator_details
                        : undefined,
                    incubatorName:
                      values.registeration.incubatorInfo.gok_supported === true
                        ? undefined
                        : values.registeration.incubatorInfo.incubatorName,
                    incubatorWebsite:
                      values.registeration.incubatorInfo.gok_supported === true
                        ? undefined
                        : values.registeration.incubatorInfo.incubatorWebsite,
                    cheifPromoterName:
                      values.registeration.incubatorInfo.gok_supported === true
                        ? undefined
                        : values.registeration.incubatorInfo.cheifPromoterName,
                    cheifPromoterEmail:
                      values.registeration.incubatorInfo.gok_supported === true
                        ? undefined
                        : values.registeration.incubatorInfo.cheifPromoterEmail,
                    cheifPromoterNumber:
                      values.registeration.incubatorInfo.gok_supported === true
                        ? undefined
                        : values.registeration.incubatorInfo
                            .cheifPromoterNumber,
                    incubatorAddress:
                      values.registeration.incubatorInfo.gok_supported === true
                        ? undefined
                        : values.registeration.incubatorInfo.incubatorAddress,
                    affiliatedIncubator:
                      values.registeration.incubatorInfo.gok_supported === true
                        ? undefined
                        : values.registeration.incubatorInfo
                            .affiliatedIncubator,
                  },
                  lastStep: step + 1,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then((res) => {
                if (res) {
                  if (type === 'saveAndexit') {
                    router.push('/');
                  }
                  setLastStep(res?.data?.data?.lastStep);
                  setInitialValues({
                    ...initialValues,
                    incubatorInfo: res?.data?.registeration?.incubatorInfo,
                  });
                }
              });
            // if (res) {
            //   setInitialValues({
            //     ...initialValues,
            //     //incubatorInfo: res.data.data.registeration.incubatorInfo,
            //   });
            //   return res.data.status;
            // } else {
            //   return null;
            // }
          }
          if (step === 9) {
            if (checkbox) {
              setSubmitDisable(true);
              const res = await axios
                .post(
                  `${BASE_URL}/api/v1/startup/update/${props.session.applicationId}`,
                  {
                    'registeration.selfDeclaration':
                      values.registeration.selfDeclaration,
                    lastStep: step + 1,
                    status: 'Pending',
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + props.session.accessToken,
                    },
                  }
                )
                .then(async (res) => {
                  if (res) {
                    setSubmitDisable(false);
                    await setSuccessModalData(res);
                    await setShowSuccessModal(true);
                    setLastStep(res?.data?.data?.lastStep);
                    setInitialValues({
                      ...initialValues,
                      selfDeclaration:
                        res?.data?.registeration?.selfDeclaration,
                    });
                  }
                });

              // if (res) {
              //   (async () => {
              //     await setSuccessModalData(res);
              //     await setShowSuccessModal(true);
              //   })();

              //   setInitialValues({
              //     ...initialValues,
              //     selfDeclaration: res.data.data.registeration.selfDeclaration,
              //   });
              //   return res.data.status;
              // } else {
              //   return null;
              // }
            } else {
              <>
                {setSubmitDisable(false)}
                <CheckAndSuccessModal
                  terms
                  show={!checkbox}
                  onClose={() => setShow(false)}
                />
                ;
              </>;
            }
          }
        }}
        lastStep={lastStep}
        appStatus={props.registerData.data?.appStatus}
      >
        <FormikStep
          label="Startup Introduction"
          validationSchema={nameAndIntroValidation}
        >
          <NameAndIntro />
        </FormikStep>
        <FormikStep
          label="Sector Profile"
          validationSchema={industryInfoValidation}
        >
          <IndustryInformation
            getValue={getValue}
            selectedValues={
              initialValues &&
              initialValues.registeration &&
              initialValues.registeration.industryInfo &&
              initialValues.registeration.industryInfo
                .additionalIndustriesSectors
            }
          />
        </FormikStep>
        <FormikStep
          label="Establishment Details"
          validationSchema={comapnyInfoValidation}
        >
          <CompanyInformation
            initialValues={initialValues}
            getValue={getValue}
          />
        </FormikStep>
        <FormikStep
          label="Startup Stage"
          validationSchema={startupInfoValidation}
        >
          <StartupInformation getValue={getValue} />
        </FormikStep>
        <FormikStep
          label="Employee Information"
          validationSchema={employeeInfoValidation}
        >
          <EmployeesInformation />
        </FormikStep>
        <FormikStep
          label="Company Location & Advisory Details"
          validationSchema={companyFounderDetailValidation}
        >
          <CompanyFounder />
        </FormikStep>
        <FormikStep
          label="Funding Details"
          validationSchema={fundingInfoValidation}
        >
          <FundingDetails />
        </FormikStep>
        <FormikStep
          label="Financial Information"
          validationSchema={financialInfoValidation}
        >
          <FinancialInformation />
        </FormikStep>
        <FormikStep
          label="Startup Incubation Details"
          validationSchema={incubatorInfoValidation}
        >
          <IncubatorInformation />
        </FormikStep>
        <FormikStep
          label="Startup Declaration"
          validationSchema={selfDeclarationValidation}
        >
          <SelfDeclaration getValue={getValue} />
        </FormikStep>
      </FormikStepperReg>
    </div>
  );
};
export default StartupRegistrationForm;
