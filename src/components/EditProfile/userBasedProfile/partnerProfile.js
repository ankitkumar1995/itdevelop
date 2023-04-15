import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Check } from 'react-feather';
import Layout from '../../Layout';
import { ProfileCard, ProfileCardBody } from '../profileCard/ProfileCard';
import EditProfileModal from '../modal';
import ProfileBanner from '../profileBanner/ProfileBanner';
import { structurePartnerProfile } from '../helper/StructureProfileData';
import { updateProfileDetails } from '../../../pages/api/api';

const PartnerProfile = ({
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
    linkedInUrl: '',
    websiteUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    profilePic: '',
  });
  const [aboutInitialValues, setAboutInitialValues] = useState({
    about: '',
  });
  const [partnerDetailsInititalValues, setPartnerDetailsInititalValues] =
    useState({
      mobileNumber: '',
      email: '',
      address: '',
      city: '',
      district: '',
      pincode: '',
      state: '',
      country: '',
      partneringType: '',
      partneringSubType: '',
      contactPersonName: '',
      contactPersonDesignation: '',
    });
  const [offeringsInitialValues, setOfferingsInitialValues] = useState({
    offers: [],
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
    const structuredData = structurePartnerProfile({
      ...profileData?.registration,
      name: profileData?.fullName,
      email: profileData?.email,
      website: profileData?.url,
      partneringSubType: profileData?.otherPartnerType,
    });
    setProfileInitialValues({ ...structuredData?.profile });
    setAboutInitialValues({ ...structuredData?.about });
    setPartnerDetailsInititalValues({ ...structuredData?.partnerDetails });
    setOfferingsInitialValues({ offers: structuredData.offers });
    const objForCalculation = {
      ...structuredData?.profile,
      ...structuredData?.about,
      ...structuredData?.partnerDetails,
      offers: structuredData.offers,
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
          profileImage={
            profileInitialValues?.profilePic ||
            'https://siliguriobserver.com/wp-content/uploads/2020/07/521-5216271_flipkart-storage-devices-upto-50-off-castel-del.png'
          }
          profileName={profileInitialValues?.fullName}
          profileTagline={
            profileInitialValues?.tagline ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium ultricies arcu quis porta. Suspendisse vitae venenatis metus.'
          }
          onEditButtonClick={() =>
            handleModalToggle(
              'Edit intro',
              'partnerIntro',
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
              {/* About */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'About'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit about',
                    'partnerAbout',
                    aboutInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>{aboutInitialValues?.about}</p>
                </ProfileCardBody>
              </ProfileCard>
              {/* Partner details */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Partner details'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit partner details',
                    'partnerDetails',
                    partnerDetailsInititalValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Partnering type</h4>
                      <p>{partnerDetailsInititalValues?.partneringType}</p>
                    </Col>

                    <Col sm={12} md={6} className="details-item">
                      <h4>Contact person name</h4>
                      <p>{partnerDetailsInititalValues?.contactPersonName}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Contact person designation</h4>
                      <p>
                        {partnerDetailsInititalValues?.contactPersonDesignation}
                      </p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Cotact person email</h4>
                      <p>{partnerDetailsInititalValues?.email}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Contact person mobile number</h4>
                      <p>{partnerDetailsInititalValues?.mobileNumber}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Address</h4>
                      <p>{partnerDetailsInititalValues?.address}</p>
                    </Col>
                  </Row>
                </ProfileCardBody>
              </ProfileCard>
              {/* Partner offerings */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Partner offerings'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit Partner offerings',
                    'partnerOfferings',
                    offeringsInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {offeringsInitialValues?.offers?.length > 0 ? (
                    offeringsInitialValues?.offers?.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <div className="details-list-item"> No offered item</div>
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

export default PartnerProfile;
