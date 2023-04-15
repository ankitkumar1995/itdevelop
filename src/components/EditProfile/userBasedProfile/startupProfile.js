import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Check } from 'react-feather';
import Layout from '../../Layout';
import { ProfileCard, ProfileCardBody } from '../profileCard/ProfileCard';
import EditProfileModal from '../modal';
import ProfileBanner from '../profileBanner/ProfileBanner';
import { structureStartupProfile } from '../helper/StructureProfileData';
import Slider from '../sliderSettings/Slider';
import { updateProfileDetails } from '../../../pages/api/api';
import { getFilledPercentage } from '../helper/helper';

const StartupProfile = ({
  session,
  profileData,
  footerData,
  headerData,
  megaMenuData,
  updateProfileData,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalData, setModalData] = useState({
    header: '',
    formType: '',
    formValues: {},
  });
  const [profileInitialValues, setProfileInitialValues] = useState({
    companyName: '',
    companyTagLine: '',
    elevatePitch: '',
    linkedInUrl: '',
    websiteUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    wonKitsChallengeBefore: '',
    kitsChallenge: '',
    companyLogo: '',
  });
  const [aboutInitialValues, setAboutInitialValues] = useState({
    about: '',
  });
  const [productInitialValues, setProductInitialValues] = useState({
    companyProduct: '',
  });
  const [companyInitialValues, setCompanyInitialValues] = useState({
    industry: '',
    district: '',
    commencementDate: '',
    employeeSize: '',
    currentlyFunded: '',
    currentlyBootstrap: '',
    seekingFunding: '',
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
  });
  const [accomplishmentsInitialValues, setAccomplishmentsInitialValues] =
    useState({ accomplishment: [] });
  const [needsInitialValues, setNeedsInitialValues] = useState({ needs: [] });
  const [fundingInitialValues, setFundingInitialValues] = useState({
    funds: [],
  });
  const [peopleInitialValues, setPeopleInitialValues] = useState({
    peoples: [],
  });
  const [founderInitialValues, setFounderInitialValues] = useState({
    founders: [
      {
        fullName: '',
        designation: '',
        linkedInUrl: '',
        twitterUrl: '',
        profilePic: '',
      },
    ],
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
    const structuredData = structureStartupProfile({
      ...profileData?.registeration,
      accomplishments: profileData?.accomplishments,
      funds: profileData?.funding,
      peoples: profileData?.people,
      needs: profileData?.marketNeeds,
    });
    setProfileInitialValues({ ...structuredData.profileData });
    setAboutInitialValues({ ...structuredData.about });
    setProductInitialValues({ ...structuredData.companyProduct });
    setContactInitialValues({ ...structuredData.contact });
    setFounderInitialValues({ ...structuredData.companyFounders });
    setCompanyInitialValues({ ...structuredData.companyDetails });
    setAccomplishmentsInitialValues({
      accomplishment: structuredData.accomplishments,
    });
    setNeedsInitialValues({ needs: structuredData.needs });
    setPeopleInitialValues({ peoples: structuredData.peoples });
    setFundingInitialValues({ funds: structuredData.funds });
    const objForCalculation = {
      ...structuredData.profileData,
      ...structuredData.about,
      ...structuredData.companyProduct,
      ...structuredData.contact,
      ...structuredData.companyFounders,
      ...structuredData.companyDetails,
      accomplishment: structuredData.accomplishments,
      needs: structuredData.needs,
      peoples: structuredData.peoples,
      funds: structuredData.funds,
    };
    if (!structuredData.profileData.kitsChallenge)
      delete objForCalculation.kitsChallenge;
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
          profileImage={profileInitialValues?.companyLogo}
          profileName={profileInitialValues?.companyName}
          profileTagline={profileInitialValues?.companyTagLine}
          introContent={{
            text: 'Elevator pitch',
            icon: <i className="far fa-play-circle video-icon"></i>,
            redirectUrl: profileInitialValues?.elevatePitch,
          }}
          onEditButtonClick={() =>
            handleModalToggle(
              'Edit intro',
              'startupIntro',
              profileInitialValues
            )
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
              {/* About Your Company */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'About your company'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit about',
                    'startupAbout',
                    aboutInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>{aboutInitialValues.about}</p>
                </ProfileCardBody>
              </ProfileCard>
              {/* About Your Product Service */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'About your product/service'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit about your products/services',
                    'startupProduct/service',
                    productInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>{productInitialValues.companyProduct}</p>
                </ProfileCardBody>
              </ProfileCard>
              {/* Company Details */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Company Details'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit company details',
                    'startupCompanyDetails',
                    companyInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Industry/Sector</h4>
                      <p>{companyInitialValues.industry}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Location</h4>
                      <p>{companyInitialValues.district}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Experience</h4>
                      <p>5 years</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Employee size</h4>
                      <p>120</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Funding status</h4>
                      <p>None</p>
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
                    'startupContactDetails',
                    contactInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Email</h4>
                      <p>{contactInitialValues.email}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Mobile Number</h4>
                      <p>{contactInitialValues.mobileNumber}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Address</h4>
                      <p>{contactInitialValues.address}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Landline number</h4>
                      <p>080-22345678</p>
                    </Col>
                  </Row>
                </ProfileCardBody>
              </ProfileCard>
              {/* Founders & advisors details */}
              <ProfileCard
                // headerButtonIncluded={true}
                headerText={'Founders & advisors details'}
                // OnClickHeaderButton={() =>
                //   handleModalToggle(
                //     'Edit founders & advisory details',
                //     'startupFounders',
                //     founderInitialValues
                //   )
                // }
              >
                <ProfileCardBody>
                  <Slider className="founders-slider">
                    {founderInitialValues?.founders?.map((profile, index) => (
                      <div className="single-founder-item">
                        <div className="founder-avatar">
                          <img src={profile.profilePic} alt="" />
                        </div>
                        <h2 className="founder-name">{profile.fullName}</h2>
                        <p className="founder-designation">
                          {profile.designation}
                        </p>
                        <div className="founder-social">
                          {/* <Link> */}
                          <a href={profile.twitterUrl}>
                            <i className="fab fa-twitter"></i>
                          </a>
                          {/* </Link> */}
                          {/* <Link> */}
                          <a href={profile.linkedInUrl}>
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                          {/* </Link> */}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </ProfileCardBody>
              </ProfileCard>
              {/* Accomplishment */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Accomplishment'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit accomplishments',
                    'startupAccomplishment',
                    accomplishmentsInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {accomplishmentsInitialValues?.accomplishment?.length > 0 ? (
                    accomplishmentsInitialValues?.accomplishment?.map(
                      (data, index) => (
                        <div className="details-list-item" key={`Acc_${index}`}>
                          <span className="list-item-icon">
                            <Check size={20} />
                          </span>
                          {data}
                        </div>
                      )
                    )
                  ) : (
                    <div className="details-list-item">
                      No Accomplishment item
                    </div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
              {/* Market needs */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Market needs'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit market needs',
                    'startupMarketNeeds',
                    needsInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {needsInitialValues?.needs?.length > 0 ? (
                    needsInitialValues?.needs?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">
                      No market needs item
                    </div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
              {/* Funding */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Funding'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit Funding',
                    'startupFunds',
                    fundingInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {fundingInitialValues?.funds?.length > 0 ? (
                    fundingInitialValues?.funds?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">No funding item</div>
                  )}
                </ProfileCardBody>
              </ProfileCard>
              {/* People */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'People'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit Peoples',
                    'startupPeoples',
                    peopleInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {peopleInitialValues?.peoples?.length > 0 ? (
                    peopleInitialValues?.peoples?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item">No Peoples item</div>
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

export default StartupProfile;
