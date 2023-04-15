import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Check } from 'react-feather';
import Layout from '../../Layout';
import { ProfileCard, ProfileCardBody } from '../profileCard/ProfileCard';
import Slider from '../sliderSettings/Slider';
import EditProfileModal from '../modal';
import ProfileBanner from '../profileBanner/ProfileBanner';
import { structureIncubatorProfile } from '../helper/StructureProfileData';
import { updateProfileDetails } from '../../../pages/api/api';

const IncubatorProfile = ({
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
    locationUrl: '',
    linkedInUrl: '',
    websiteUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    profilePic: '',
  });
  const [aboutInitialValues, setAboutInitialValues] = useState({
    about: '',
  });
  const [passwordInitialValue, setPasswordInitialValues] = useState({
    currentPassword: '',
    newPassword: '',
    reenterNewPassword: '',
  });
  const [incubatorDetailsInitialValues, setIncubatorDetailsInitilValues] =
    useState({
      totalSeats: '',
      allotedSeats: '',
      allotedSeatsForPhysical: '',
      allotedSeatsForVirtual: '',
      occupiedSeats: '',
      availableSeats: '',
      meetingRooms: '',
      conferenceRooms: '',
      features: [],
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
    contactPersonName: '',
    alternateMobileNumber: '',
  });
  const [amenitiesInitialValues, setAmenitiesInitialValues] = useState({
    amenities: [''],
  });
  const [facilitiesInitialValues, setFacilitiesInitialValues] = useState({
    facilities: [''],
  });
  const [galleryInitialValues, setGalleryInitialValues] = useState({
    photos: [],
  });

  const calculateProgress = async (data) => {
    const value = await getFilledPercentage(data);
    setProgress(value);
  };

  useEffect(() => {
    const structuredData = structureIncubatorProfile({
      ...profileData?.registeration,
      name: profileData?.name,
      features: profileData?.features,
      facilities: profileData?.facilities,
    });
    setProfileInitialValues({ ...structuredData.profile });
    setAboutInitialValues({ ...structuredData.about });
    setIncubatorDetailsInitilValues({ ...structuredData.incubatorDetails });
    setContactInitialValues({ ...structuredData.contact });
    setGalleryInitialValues({ ...structuredData.gallery });
    setAmenitiesInitialValues({ ...structuredData.amenities });
    setFacilitiesInitialValues({ ...structuredData.facilities });
    const objForCalculation = {
      ...structuredData.profile,
      ...structuredData.about,
      ...structuredData.incubatorDetails,
      ...structuredData.contact,
      ...structuredData.gallery,
      ...structuredData.amenities,
      ...structuredData.facilities,
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
          profileName={profileInitialValues.fullName}
          profileTagline={profileInitialValues.tagline}
          introContent={{
            text: 'View location',
            icon: <i className="fas fa-map-marker-alt"></i>,
            redirectUrl: profileInitialValues.locationUrl,
          }}
          onEditButtonClick={() =>
            handleModalToggle(
              'Edit intro',
              'incubatorIntro',
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
                    'incubatorAbout',
                    aboutInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <p>{aboutInitialValues.about}</p>
                </ProfileCardBody>
              </ProfileCard>
              {/* Photo Gallery */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Photo Gallery'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit photo gallery',
                    'photoGallery',
                    galleryInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row className="profile-card-image-gallery">
                    {galleryInitialValues.photos?.length > 0 ? (
                      galleryInitialValues.photos?.map((photo, index) => (
                        <div
                          className="gallery-image"
                          key={`incubator_gallery_${index}`}
                          style={{ backgroundImage: `url(${photo})` }}
                        ></div>
                      ))
                    ) : (
                      <p>Your Gallery is empty</p>
                    )}
                  </Row>
                </ProfileCardBody>
              </ProfileCard>
              {/* Incubator details */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Incubator details'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit incubator details',
                    'incubatorDetails',
                    incubatorDetailsInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Total no. of seats in incubator</h4>
                      <p>{incubatorDetailsInitialValues.totalSeats}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Seats alloted for incubator staff</h4>
                      <p>{incubatorDetailsInitialValues.allotedSeats}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Seat alloted for physical incubation</h4>
                      <p>
                        {incubatorDetailsInitialValues.allotedSeatsForPhysical}
                      </p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Seats alloted for virtual incubation</h4>
                      <p>
                        {incubatorDetailsInitialValues.allotedSeatsForVirtual}
                      </p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>No. of occupied seats</h4>
                      <p>{incubatorDetailsInitialValues.occupiedSeats}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>No. of available seats</h4>
                      <p>{incubatorDetailsInitialValues.availableSeats}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>No. of meeting room(s)</h4>
                      <p>{incubatorDetailsInitialValues.meetingRooms}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>No. of conference room(s)</h4>
                      <p>{incubatorDetailsInitialValues.conferenceRooms}</p>
                    </Col>
                  </Row>
                  <div className="profile-body-extra">
                    <h3>Features:</h3>
                    <Slider className="industry-tech-slider">
                      {incubatorDetailsInitialValues.features?.map(
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
                  </div>
                </ProfileCardBody>
              </ProfileCard>
              {/* Contact details */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Contact details'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit contact details',
                    'incubatorContactDetails',
                    contactInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  <Row>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Contact person name</h4>
                      <p>{contactInitialValues?.contactPersonName}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Mobile Number</h4>
                      <p>{contactInitialValues.mobileNumber}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Email</h4>
                      <p>{contactInitialValues?.email}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Alternate contact number</h4>
                      <p>{contactInitialValues?.alternateMobileNumber}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Incubator landline number</h4>
                      <p>{contactInitialValues.landLineNumber}</p>
                    </Col>
                    <Col sm={12} md={6} className="details-item">
                      <h4>Address</h4>
                      <p>{contactInitialValues.address}</p>
                    </Col>
                  </Row>
                </ProfileCardBody>
              </ProfileCard>
              {/* List of amenities */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'List of amenities'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit amenities',
                    'incubatorAmenities',
                    amenitiesInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {amenitiesInitialValues.amenities?.map((data, index) => (
                    <div className="details-list-item" key={`Acc_${index}`}>
                      <span className="list-item-icon">
                        <Check size={20} />
                      </span>
                      {data}
                    </div>
                  ))}
                </ProfileCardBody>
              </ProfileCard>
              {/* Incubation facilities */}
              <ProfileCard
                headerButtonIncluded={true}
                headerText={'Incubation facilities'}
                OnClickHeaderButton={() =>
                  handleModalToggle(
                    'Edit facilities',
                    'incubationFacilities',
                    facilitiesInitialValues
                  )
                }
              >
                <ProfileCardBody>
                  {facilitiesInitialValues.facilities.length > 0 ? (
                    facilitiesInitialValues.facilities.map((data, index) => (
                      <div className="details-list-item" key={`Acc_${index}`}>
                        <span className="list-item-icon">
                          <Check size={20} />
                        </span>
                        {data}
                      </div>
                    ))
                  ) : (
                    <p>No Facility information provided</p>
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

export default IncubatorProfile;
