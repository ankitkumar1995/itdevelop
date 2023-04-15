import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { X } from 'react-feather';
import EditIntroForm from '../forms/startups/EditIntroForm';
import EditAboutForm from '../forms/common/EditAboutForm';
import EditAboutProductForm from '../forms/startups/EditAboutProductForm';
import EditCompanyDetailsForm from '../forms/startups/EditCompanyDetailsForm';
import EditContactDetailsForm from '../forms/startups/EditContactDetailsForm';
import EditAccomplishmentForm from '../forms/startups/EditAccomplishmentForm';
import EditMarketNeedsForm from '../forms/startups/EditMarketNeedsForm';
import EditFundsForm from '../forms/startups/EditFundsForm';
import EditPeoplesForm from '../forms/startups/EditPeoplesForm';
import EditFoundersForm from '../forms/startups/EditFoundersForm';
import EditPasswordForm from '../forms/common/EditPasswordForm';
import EditIndustryPreferenceForm from '../forms/mentors/EditIndustryPreferenceForm';
import EditExperienceForm from '../forms/mentors/EditExperienceForm';
import EditAvailabilityForm from '../forms/mentors/EditAvailabilityForm';
import EditMentorContactDetailsForm from '../forms/mentors/EditMentorContactDetailsForm';
import EditProblemStatementForm from '../forms/mentors/EditProblemStatementForm';
import EditMentorIntroForm from '../forms/mentors/EditMentorIntroForm';
import EditInvestorIntroForm from '../forms/investors/EditInvestorIntroForm';
import EditLookForInStartupsForm from '../forms/investors/EditLookForInStartupsForm';
import EditInvestorDetailsForm from '../forms/investors/EditInvestorDetailsForm';
import EditInvestorContactDetailsForm from '../forms/investors/EditInvestorContactDetailsForm';
import EditInvestmentCriteriaForm from '../forms/investors/EditInvestmentCriteriaForm';
import EditPitchsForm from '../forms/investors/EditPitchsForm';
import EditPortfolioForm from '../forms/investors/EditPortfolioForm';
import EditReachsForm from '../forms/investors/EditReachsForm';
import EditAppliesForm from '../forms/investors/EditAppliesForm';
import EditPartnerDetailsForm from '../forms/partner/EditPartnerDetailsForm';
import EditOfferingsForm from '../forms/partner/EditOfferingsForm';
import EditPartnerIntroForm from '../forms/partner/EditPartnerIntroForm';
import EditIncubatorIntroForm from '../forms/incubator/EditIncubatorIntroForm';
import EditIncubatorDetailsForm from '../forms/incubator/EditIncubatorDetailsForm';
import EditIncubatorContactDetailsForm from '../forms/incubator/EditIncubatorContactDetailsForm';
import EditAmenitiesForm from '../forms/incubator/EditAmenitiesForm';
import EditFacilitiesForm from '../forms/incubator/EditFacilitiesForm';
import EditGalleryForm from '../forms/incubator/EditGalleryForm';

const RenderForm = ({ type, ...rest }) => {
  switch (type) {
    case 'startupIntro':
      return <EditIntroForm {...rest} />;
    case 'startupAbout':
      return (
        <EditAboutForm
          param={'registeration.industryInfo.aboutCompanyProfile'}
          {...rest}
        />
      );
    case 'startupProduct/service':
      return <EditAboutProductForm {...rest} />;
    case 'startupCompanyDetails':
      return <EditCompanyDetailsForm {...rest} />;
    case 'startupContactDetails':
      return <EditContactDetailsForm {...rest} />;
    case 'startupAccomplishment':
      return <EditAccomplishmentForm {...rest} />;
    case 'startupMarketNeeds':
      return <EditMarketNeedsForm {...rest} />;
    case 'startupFunds':
      return <EditFundsForm {...rest} />;
    case 'startupPeoples':
      return <EditPeoplesForm {...rest} />;
    case 'startupFounders':
      return <EditFoundersForm {...rest} />;
    case 'change-password':
      return <EditPasswordForm {...rest} />;
    case 'mentorIntro':
      return <EditMentorIntroForm {...rest} />;
    case 'mentorAbout':
      return (
        <EditAboutForm param={'registeration.intro.aboutMentor'} {...rest} />
      );
    case 'mentorIndustryPreference':
      return <EditIndustryPreferenceForm {...rest} />;
    case 'mentorExperience':
      return <EditExperienceForm {...rest} />;
    case 'mentorAvailability':
      return <EditAvailabilityForm {...rest} />;
    case 'mentorContactDetails':
      return <EditMentorContactDetailsForm {...rest} />;
    case 'mentorProblems':
      return <EditProblemStatementForm {...rest} />;
    case 'investorIntro':
      return <EditInvestorIntroForm {...rest} />;
    case 'investorAbout':
      return (
        <EditAboutForm
          param={'registeration.investorIntro.aboutInvestor'}
          {...rest}
        />
      );
    case 'investorLookForInStartups':
      return <EditLookForInStartupsForm {...rest} />;
    case 'investorDetails':
      return <EditInvestorDetailsForm {...rest} />;
    case 'investorContactDetails':
      return <EditInvestorContactDetailsForm {...rest} />;
    case 'investorInvestment':
      return <EditInvestmentCriteriaForm {...rest} />;
    case 'investorPitch':
      return <EditPitchsForm {...rest} />;
    case 'investorPortfolio':
      return <EditPortfolioForm {...rest} />;
    case 'investorReach':
      return <EditReachsForm {...rest} />;
    case 'investorApply':
      return <EditAppliesForm {...rest} />;
    case 'partnerIntro':
      return <EditPartnerIntroForm {...rest} />;
    case 'partnerAbout':
      return (
        <EditAboutForm
          param={'registration.partnerInfo.aboutCompany'}
          {...rest}
        />
      );
    case 'partnerDetails':
      return <EditPartnerDetailsForm {...rest} />;
    case 'partnerOfferings':
      return <EditOfferingsForm {...rest} />;
    case 'incubatorIntro':
      return <EditIncubatorIntroForm {...rest} />;
    case 'incubatorAbout':
      return (
        <EditAboutForm param={'registeration.intro.aboutIncubator'} {...rest} />
      );
    case 'incubatorDetails':
      return <EditIncubatorDetailsForm {...rest} />;
    case 'incubatorContactDetails':
      return <EditIncubatorContactDetailsForm {...rest} />;
    case 'incubatorAmenities':
      return <EditAmenitiesForm {...rest} />;
    case 'incubationFacilities':
      return <EditFacilitiesForm {...rest} />;
    case 'photoGallery':
      return <EditGalleryForm {...rest} />;

    default:
      return <EditIntroForm {...rest} />;
  }
};

const EditProfileModal = ({
  isOpen,
  handleModalClose,
  modalData,
  onFormSubmit,
  session,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onHide={handleModalClose}
      onRequestClose={handleModalClose}
      centered
      size="xl"
      contentClassName="edit-profile-modal-container"
    >
      <ModalHeader className="edit-modal-header">
        {modalData?.header || 'Modal Heading'}
        <div className="modal-close-btn" onClick={handleModalClose}>
          <X size={30} />
        </div>
      </ModalHeader>
      <ModalBody className="edit-profile-modal-body">
        <RenderForm
          type={modalData.formType}
          onFormSubmit={onFormSubmit}
          initialValues={modalData.formValues}
          session={session}
        />
      </ModalBody>
    </Modal>
  );
};

export default EditProfileModal;
