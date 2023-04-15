import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { Check } from 'react-feather';
import Layout from '../../Layout';
import { ProfileCard, ProfileCardBody } from '../profileCard/ProfileCard';
// import Slider from 'react-slick';
import EditProfileModal from '../modal';
import ProfileBanner from '../profileBanner/ProfileBanner';
import { sliderSettings } from '../sliderSettings/SliderSettings';
import { structureMentorProfile } from '../helper/StructureProfileData';
import Slider from '../sliderSettings/Slider';
import { updateProfileDetails } from '../../../pages/api/api';

// const sliderSettings = {
//   dots: false,
//   infinite: true,
//   speed: 1000,
//   slidesToShow: 3,
//   slidesToScroll: 3,
//   responsive: [
//     {
//       breakpoint: 1160,
//       settings: {
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         infinite: true,
//       },
//     },
//     {
//       breakpoint: 992,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         infinite: true,
//       },
//     },
//     {
//       breakpoint: 750,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         infinite: true,
//       },
//     },
//     {
//       breakpoint: 460,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         infinite: true,
//       },
//     },
//   ],
// };

const MentorProfile = ({
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
  const [industryPreferenceInitialValues, setIndustryPreferenceInitialValues] =
    useState({
      overallExperience: '',
      preferredIndustries: [],
      preferredTechnology: [],
    });
  const [experienceInitialValues, setExperienceInitialValues] = useState({
    qualification: '',
    currentAssociatedCompany: '',
    haveMentorBefore: '',
    totalWorkExperience: '',
    totalCompaniesMentored: 0,
    companyCurrentlyMentoring: '',
    industries: [],
    specializations: [],
    vertical: [],
    skills: [],
    karnatakaStartupsMentoring: [],
  });
  const [availabilityInitialValues, setAvailabilityInitialValues] = useState({
    selectDays: [],
    timeRange: '',
    preferredWorkMode: '',
    stageWantToBeMentor: '',
    mentorDuration: '',
    feePerMonth: '',
    modeOfContact: '',
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
  const [problemInitialValues, setProbolemInitialValues] = useState({
    problems: [''],
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
    const structuredData = structureMentorProfile({
      ...profileData?.registeration,
      topMentorsGuidance: profileData?.topMentorsGuidance,
    });
    setProfileInitialValues({ ...structuredData.profile });
    setAboutInitialValues({ ...structuredData.about });
    setIndustryPreferenceInitialValues({
      ...structuredData.industryPreference,
    });
    setExperienceInitialValues({ ...structuredData.experience });
    setAvailabilityInitialValues({ ...structuredData.availability });
    setContactInitialValues({ ...structuredData.contact });
    setProbolemInitialValues({ problems: structuredData.problems });

    const objForCalculation = {
      ...structuredData.profile,
      ...structuredData.about,
      ...structuredData.industryPreference,
      ...structuredData.experience,
      ...structuredData.availability,
      ...structuredData.contact,
      problems: structuredData.problems,
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

  const dummyData = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  ];

  return (
    <Layout
      data={footerData}
      headerData={headerData}
      megaMenuData={megaMenuData}
    >
      <div className="edit-profile-page">
        <ProfileBanner
          profileImage={profileInitialValues.profilePic}
          profileName={profileInitialValues.fullName}
          profileTagline={profileInitialValues.tagline}
          introContent={{
            text: 'Intro video',
            icon: <i className="far fa-play-circle video-icon"></i>,
            redirectUrl: profileInitialValues.introductionUrl,
          }}
          onEditButtonClick={() =>
            handleModalToggle('Edit intro', 'mentorIntro', profileInitialValues)
          }
          socialLinks={{
            website: profileInitialValues.websiteUrl,
            twitter: profileInitialValues.twitterUrl,
            facebook: profileInitialValues.facebookUrl,
            linkedIn: profileInitialValues.linkedInUrl,
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
                    'mentorAbout',
                    aboutInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>{aboutInitialValues.about}</p>
                </ProfileCardBody>
              </ProfileCard>
              {/* Industry Preference */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Industry Preference'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit industry preference',
                    'mentorIndustryPreference',
                    industryPreferenceInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>
                    {industryPreferenceInitialValues.overallExperience ||
                      'Edit your experience to showcase in your profile'}
                  </p>
                  <div className="profile-body-extra">
                    <h3>Preferred Industries/sectors:</h3>
                    <Slider className="industry-tech-slider">
                      {industryPreferenceInitialValues?.preferredIndustries?.map(
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
                      {industryPreferenceInitialValues?.preferredTechnology?.map(
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
              {/* Your Experience */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Your Experience'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit your experience',
                    'mentorExperience',
                    experienceInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Qualification</h4>
                      <p>{experienceInitialValues.qualification}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Current associated company</h4>
                      <p>{experienceInitialValues.currentAssociatedCompany}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Total work experience</h4>
                      <p>{experienceInitialValues.totalWorkExperience}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Total companies mentored till date</h4>
                      <p>{experienceInitialValues.totalCompaniesMentored}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>No. of companies - currently mentoring</h4>
                      <p>
                        {experienceInitialValues?.companyCurrentlyMentoring}
                      </p>
                    </Col>
                  </Row>
                  <div className="profile-body-extra">
                    <h3>Your current industries/sectors:</h3>
                    <Slider className="industry-tech-slider">
                      {experienceInitialValues?.industries?.map(
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
                    <h3>Specializations:</h3>
                    <Slider className="industry-tech-slider">
                      {experienceInitialValues?.specializations?.map(
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
                    <h3>Vertical:</h3>
                    <Slider className="industry-tech-slider">
                      {experienceInitialValues?.vertical?.map(
                        (vertical, index) => (
                          <div
                            className="single-slider-item"
                            key={`Technology_${index}`}
                            title={vertical}
                          >
                            <p>
                              {vertical.length > 18
                                ? `${vertical.substr(0, 18)}...`
                                : vertical}
                            </p>
                          </div>
                        )
                      )}
                    </Slider>
                    <h3>Skills:</h3>
                    <Slider className="industry-tech-slider">
                      {experienceInitialValues?.skills?.map((skill, index) => (
                        <div
                          className="single-slider-item"
                          key={`Technology_${index}`}
                          title={skill}
                        >
                          <p>
                            {skill.length > 18
                              ? `${skill.substr(0, 18)}...`
                              : skill}
                          </p>
                        </div>
                      ))}
                    </Slider>
                    <h3>List of companies mentored:</h3>
                    <Slider className="industry-tech-slider">
                      {experienceInitialValues.karnatakaStartupsMentoring &&
                        experienceInitialValues.karnatakaStartupsMentoring
                          ?.length > 0 &&
                        experienceInitialValues?.karnatakaStartupsMentoring?.map(
                          (tech, index) => (
                            <div
                              className="single-slider-item"
                              key={`Technology_${index}`}
                            >
                              <p>{tech}</p>
                            </div>
                          )
                        )}
                    </Slider>
                  </div>
                </ProfileCardBody>
              </ProfileCard>
              {/* Your availability */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Your availability'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit your availability',
                    'mentorAvailability',
                    availabilityInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Your availability in a week (days)</h4>
                      <p>{availabilityInitialValues?.selectDays?.join(', ')}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Your preferred time range</h4>
                      <p>{availabilityInitialValues?.timeRange}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Preferred work mode</h4>
                      <p>{availabilityInitialValues?.preferredWorkMode}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>At what stage do you prefer to mentor?</h4>
                      <p>{availabilityInitialValues?.stageWantToBeMentor}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Preferred mentor duration</h4>
                      <p>{availabilityInitialValues?.mentorDuration}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Preferred mode of contact</h4>
                      <p>{availabilityInitialValues?.modeOfContact}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Your fee per month (in USD)</h4>
                      <p>{availabilityInitialValues?.feePerMonth}</p>
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
                    'mentorContactDetails',
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
              {/* Top problems I help with */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Top problems I help with'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit top problems I help with',
                    'mentorProblems',
                    problemInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {problemInitialValues?.problems?.length > 0 ? (
                    problemInitialValues?.problems?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={18} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">
                      No Problems are there
                    </div>
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

export default MentorProfile;
