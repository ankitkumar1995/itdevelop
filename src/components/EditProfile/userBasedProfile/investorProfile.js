import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Check } from 'react-feather';
import Layout from '../../Layout';
import { ProfileCard, ProfileCardBody } from '../profileCard/ProfileCard';
import Slider from '../sliderSettings/Slider';
import EditProfileModal from '../modal';
import ProfileBanner from '../profileBanner/ProfileBanner';
import { structureInvestorProfile } from '../helper/StructureProfileData';
import { updateProfileDetails } from '../../../pages/api/api';

const InvestorProfile = ({
  session,
  profileData,
  footerData,
  headerData,
  megaMenuData,
  updateProfileData,
}) => {
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    header: '',
    formType: '',
    formValues: {},
  });
  const [profileInitialValues, setProfileInitialValues] = useState({
    fullName: '',
    tagline: '',
    introductionUrl: '',
    linkedInUrl: '',
    websiteUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    profilePic: '',
  });
  const [aboutInitialValues, setAboutInitialValues] = useState({
    about: '',
  });
  const [startupCriteriaInitialValues, setStartupCriteriaInitialValues] =
    useState({
      startup: '',
      preferredIndustries: [],
      preferredTechnology: [],
    });
  const [investorDetailsInitialValues, setInvestorDetailsInitialValues] =
    useState({
      type: '',
      stageToInvest: '',
      totalFunded: '',
      portfolio: '',
      location: '',
      range: '',
      startupsFunded: '',
    });
  const [contactInitialValues, setContactInitialValues] = useState({
    mobileNumber: '',
    email: '',
    landLineNumber: '',
    faxNumber: '',
    address: '',
    city: '',
    district: '',
    pincode: '',
    state: '',
    country: '',
  });
  const [investmentInitialValues, setInvestmentInitialValues] = useState({
    investments: [],
  });
  const [pitchInitialValues, setPitchInitialValues] = useState({
    pitchs: [],
  });
  const [portfolioInitialValues, setPortfolioInitialValues] = useState({
    portfolios: [],
  });
  const [reachInitialValues, setReachInitialValues] = useState({
    reachs: [],
  });
  const [applyInitialValues, setApplyInitialValues] = useState({
    applies: [],
  });
  const [passwordInitialValue, setPasswordInitialValues] = useState({
    currentPassword: '',
    newPassword: '',
    reenterNewPassword: '',
  });

  const calculateProgress = async (data) => {
    const value = await getFilledPercentage(data);
    setProgress(value);
  };

  useEffect(() => {
    const structuredData = structureInvestorProfile({
      ...profileData?.registeration,
      howToApply: profileData?.howToApply,
      howToPitch: profileData?.howToPitch,
      whomToReach: profileData?.whomToReach,
      portfolioCompanies: profileData?.portfolioCompanies,
      investmentCriteria: profileData?.investmentCriteria,
    });
    setProfileInitialValues({ ...structuredData?.profile });
    setAboutInitialValues({ ...structuredData?.about });
    setInvestorDetailsInitialValues({ ...structuredData?.investorDetails });
    setContactInitialValues({ ...structuredData?.contact });
    setStartupCriteriaInitialValues({ ...structuredData?.startupCriteria });
    setPitchInitialValues({ pitchs: structuredData?.howToPitch });
    setApplyInitialValues({ applies: structuredData?.howToApply });
    setReachInitialValues({ reachs: structuredData?.whomToReach });
    setPortfolioInitialValues({
      portfolios: structuredData?.portfolioCompanies,
    });
    setInvestmentInitialValues({
      investments: structuredData.investments,
    });
    const objForCalculation = {
      ...structuredData?.profile,
      ...structuredData?.about,
      ...structuredData?.investorDetails,
      ...structuredData?.contact,
      ...structuredData?.startupCriteria,
      pitchs: structuredData?.howToPitch,
      applies: structuredData?.howToApply,
      reachs: structuredData?.whomToReach,
      portfolios: structuredData?.portfolioCompanies,
      investments: structuredData.investments,
    };
    // if (!structuredData.profileData.kitsChallenge)
    //   delete objForCalculation.kitsChallenge;
    calculateProgress(objForCalculation);
  }, [profileData]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalToggle = (header, formType, formValues) => {
    setModalData({ header, formType, formValues });
    setOpenModal(true);
  };

  const handleSubmit = async (values) => {
    const [userDetails] = session;
    const { applicationId, accessToken, loginType } = userDetails;
    const updateObj = {
      applicationId,
      userType: loginType.toLowerCase(),
      token: accessToken,
      data: values,
    };
    const response = await updateProfileDetails(updateObj);
    if (response.status === 'success') {
      setOpenModal(false);
      updateProfileData({ ...response.data });
    }
  };

  return (
    <Layout
      data={footerData}
      headerData={headerData}
      megaMenuData={megaMenuData}
    >
      <div className="edit-profile-page">
        <ProfileBanner
          profileImage={profileInitialValues?.profilePic}
          profileName={profileInitialValues?.fullName}
          profileTagline={profileInitialValues?.tagline}
          introContent={{
            text: 'Intro video',
            icon: <i className="far fa-play-circle video-icon"></i>,
            redirectUrl: profileInitialValues?.introductionUrl,
          }}
          onEditButtonClick={() =>
            handleModalToggle(
              'Edit intro',
              'investorIntro',
              profileInitialValues
            )
          }
          socialLinks={{
            website: profileInitialValues?.websiteUrl,
            twitter: profileInitialValues?.twitterUrl,
            facebook: profileInitialValues?.facebookUrl,
            linkedIn: profileInitialValues?.linkedInUrl,
          }}
        />
        <div className="profile-extra-details">
          <Row className="w-100 m-0 p-0 d-flex flex-wrap extra-details-container">
            <Col sm={12} md={8}>
              {/* About */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'About'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit about',
                    'investorAbout',
                    aboutInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>{aboutInitialValues.about}</p>
                </ProfileCardBody>
              </ProfileCard>
              {/* What I look for in startups*/}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'What I look for in startups'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit what I look for in startups',
                    'investorLookForInStartups',
                    startupCriteriaInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>{startupCriteriaInitialValues?.startup}</p>
                  <div className="profile-body-extra">
                    <h3>Preferred Industirs/sectors:</h3>
                    <Slider className="industry-tech-slider">
                      {startupCriteriaInitialValues?.preferredIndustries?.map(
                        (industry, index) => (
                          <div
                            className="single-slider-item"
                            key={`Industry_${index}`}
                            title={industry}
                          >
                            <p>
                              {industry.length > 18
                                ? `${industry.substr(0, 18)}...`
                                : industry}
                            </p>
                          </div>
                        )
                      )}
                    </Slider>
                    <h3>Preferred Technologies:</h3>
                    <Slider className="industry-tech-slider">
                      {startupCriteriaInitialValues?.preferredTechnology?.map(
                        (tech, index) => (
                          <div
                            className="single-slider-item"
                            key={`Technology_${index}`}
                            title={tech}
                          >
                            <p>
                              {tech.length > 18
                                ? `${tech.substr(0, 18)}...`
                                : tech}
                            </p>
                          </div>
                        )
                      )}
                    </Slider>
                  </div>
                </ProfileCardBody>
              </ProfileCard>
              {/* Investor details */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Investor details'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit investor details',
                    'investorDetails',
                    investorDetailsInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Investor type</h4>
                      <p>{investorDetailsInitialValues.type}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Preferred Location for Investment</h4>
                      <p>{investorDetailsInitialValues?.location}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>At what stage do you prefer to invest?</h4>
                      <p>{investorDetailsInitialValues?.stageToInvest}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Investment range</h4>
                      <p>{investorDetailsInitialValues?.range}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Total Funded amount</h4>
                      <p>{investorDetailsInitialValues?.totalFunded}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Startups/organisations funded</h4>
                      <p>{investorDetailsInitialValues?.startupsFunded}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Portfolio</h4>
                      <p>{investorDetailsInitialValues?.portfolio}</p>
                    </Col>
                  </Row>
                </ProfileCardBody>
              </ProfileCard>
              {/* Contact details */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Contact details'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit contact details',
                    'investorContactDetails',
                    contactInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Email</h4>
                      <p>{contactInitialValues?.email}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Mobile Number</h4>
                      <p>{contactInitialValues?.mobileNumber}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Address</h4>
                      <p>{contactInitialValues?.address}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Landline number</h4>
                      <p>{contactInitialValues?.landLineNumber}</p>
                    </Col>
                  </Row>
                </ProfileCardBody>
              </ProfileCard>
              {/* Investment criterea */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Investment criteria'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit investment criteria',
                    'investorInvestment',
                    investmentInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {investmentInitialValues?.investments?.length > 0 ? (
                    investmentInitialValues?.investments?.map((data, index) => (
                      <div className="details-list-item" key={`IC_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">
                      No Investment Items Yet
                    </div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
              {/* How to pitch */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'How to pitch'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit how to pitch',
                    'investorPitch',
                    pitchInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {pitchInitialValues?.pitchs?.length > 0 ? (
                    pitchInitialValues?.pitchs?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item"> No Pitch item</div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
              {/* Portfolio companies */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Portfolio companies'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit portfolio companies',
                    'investorPortfolio',
                    portfolioInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {portfolioInitialValues?.portfolios?.length > 0 ? (
                    portfolioInitialValues?.portfolios?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">
                      No Portfolio Companies
                    </div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
              {/* Whom to reach */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Whom to reach'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit whom to reach',
                    'investorReach',
                    reachInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {reachInitialValues?.reachs?.length > 0 ? (
                    reachInitialValues?.reachs?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">No Reaches Item</div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
              {/* How to apply */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'How to apply'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit how to apply',
                    'investorApply',
                    applyInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {applyInitialValues?.applies?.length > 0 ? (
                    applyInitialValues?.applies?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">No Apply Item</div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
            </Col>
            <Col sm={12} md={4}>
              <button
                className="change-password-btn"
                onClick={() =>
                  handleModalToggle(
                    'Change Password',
                    'change-password',
                    passwordInitialValue
                  )
                }
              >
                Change password
              </button>
              {/* Profile Progress */}
              <ProfileCard
                headerButtonIncluded={false}
                headerText={'Profile status'}
              >
                <ProfileCardBody>
                  <div className="profile-progress-outer">
                    <div
                      className="profile-progress-inner"
                      style={{ width: `${Math.ceil(progress)}% ` }}
                    ></div>
                  </div>
                  <p className="profile-progress-text">
                    {Math.ceil(progress)}% profile completed,
                    <span className="progress-link">complete profile</span>
                  </p>
                </ProfileCardBody>
              </ProfileCard>
              {/* Download Certificate / Registration warning */}
              {/* <ProfileCard>
                <ProfileCardBody>
                  <div className="download-wrapper">
                    <div className="download-content">
                      <img src={'/assets/img/header/Group.svg'} />
                      <p>Complete your registration</p>
                      <button>Register</button>
                    </div>
                  </div>
                </ProfileCardBody>
              </ProfileCard> */}
            </Col>
          </Row>
        </div>
      </div>
      <EditProfileModal
        isOpen={openModal}
        handleModalClose={handleCloseModal}
        modalData={modalData}
        onFormSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default InvestorProfile;
