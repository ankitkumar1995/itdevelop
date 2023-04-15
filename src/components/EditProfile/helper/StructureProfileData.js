export const structureStartupProfile = (data) => {
  if (!data) return {};
  const structuredData = {
    profileData: {
      companyName: data?.nameAndIntro?.incorporatedCompanyName,
      companyTagLine: data?.nameAndIntro?.companyTagLine,
      elevatePitch: data?.nameAndIntro?.youtubeUrl,
      linkedInUrl: data?.nameAndIntro?.linkedInUrl,
      websiteUrl: data?.nameAndIntro?.companyWebsiteUrl,
      twitterUrl: data?.nameAndIntro?.twitterUrl,
      facebookUrl: data?.nameAndIntro?.facebookUrl,
      wonKitsChallengeBefore: data?.fundingInfo?.kitsChalleneWinning,
      kitsChallenge: data?.fundingInfo?.kitsChallegeName,
      companyLogo: data?.nameAndIntro?.companyLogo,
    },
    about: { about: data?.industryInfo?.aboutCompanyProfile },
    companyDetails: {
      industry: data?.industryInfo?.industrySectorType,
      district: data?.companyFounderDetail?.district,
      commencementDate: data?.companyInfo?.dateOfIncorporationEstablishment,
      employeeSize: data?.employeeInfo?.permanantWorkers,
      currentlyFunded: data?.fundingInfo?.currentlyFunded,
      currentlyBootstrap: data?.fundingInfo?.bootstrapedFunded,
      seekingFunding: data?.fundingInfo?.fundingHelpRequirement,
    },
    companyProduct: {
      companyProduct: data?.industryInfo?.productOrServiceDescription,
    },
    contact: {
      mobileNumber: data?.companyFounderDetail?.mobile,
      email: data?.companyFounderDetail?.companyEmail,
      landLineNumber: data?.companyFounderDetail?.landLine,
      faxNumber: data?.companyFounderDetail?.fax,
      address: data?.companyFounderDetail?.registeredIncorporationAddress,
      city: data?.companyFounderDetail?.city,
      district: data?.companyFounderDetail?.district,
      pincode: data?.companyFounderDetail?.pinCode,
      state: data?.companyFounderDetail?.state,
    },
    companyFounders: {
      founders: data?.companyFounderDetail?.founderDetails?.map((founder) => ({
        fullName: founder?.founderName,
        designation: founder?.founderDesignation,
        linkedInUrl: founder?.founderLinkedIn,
        twitterUrl: founder?.founderTwitter,
        profilePic: founder?.founderProfileImage,
      })),
    },
    accomplishments: data?.accomplishments,
    funds: data?.funds,
    peoples: data?.peoples,
    needs: data?.needs,
  };
  return structuredData;
};

export const structureMentorProfile = (data) => {
  if (!data) return {};
  const structuredData = {
    profile: {
      fullName: data?.intro?.name,
      tagline: data?.intro?.tagline,
      introductionUrl: data?.intro?.inductionYoutubeVideo,
      linkedInUrl: data?.intro?.linkedInUrl,
      websiteUrl: data?.intro?.website,
      twitterUrl: data?.intro?.twitterProfile,
      facebookUrl: data?.intro?.facebookUrl,
      profilePic: data?.intro?.profilePhoto,
    },
    about: { about: data?.intro?.aboutMentor },
    industryPreference: {
      overallExperience: data?.experience?.overallExperience,
      preferredIndustries: data?.experience?.industry,
      preferredTechnology: data?.experience?.specialization,
    },
    experience: {
      qualification: data?.experience?.qualification,
      currentAssociatedCompany: data?.experience?.currentAssociatedCompany,
      haveMentorBefore: data?.experience?.mentorBefore,
      totalWorkExperience: data?.experience?.totalWorkExp,
      totalCompaniesMentored: data?.experience?.companiesMentor?.length,
      companyCurrentlyMentoring: data?.experience?.companiesMentor?.length,
      industries: data?.experience?.industry,
      specializations: data?.experience?.specialization,
      vertical: data?.experience?.vertical,
      skills: data?.experience?.skills,
      karnatakaStartupsMentoring: data?.experience?.companiesMentor,
    },
    availability: {
      selectDays: data?.availability?.daysInWeek,
      timeRange: data?.availability?.timeRange,
      preferredWorkMode: data?.availability?.preferredWorkMode,
      stageWantToBeMentor: data?.availability?.preferedMentorStage,
      mentorDuration: data?.availability?.preferMentorDuration,
      feePerMonth: data?.availability?.feeStructure,
      modeOfContact: data?.availability?.preferedContactMode,
    },
    contact: {
      mobileNumber: data?.intro?.number,
      email: data?.intro?.email,
      landLineNumber: data?.intro?.landLineNumber,
      faxNumber: data?.intro?.faxNumber,
      address: data?.intro?.address,
      city: data?.intro?.city,
      district: data?.intro?.district,
      pincode: data?.intro?.pinCode,
      state: data?.intro?.state,
      country: data?.intro?.country,
    },
    problems: data?.topMentorsGuidance,
  };
  return structuredData;
};

export const structureIncubatorProfile = (data) => {
  if (!data) return {};
  const structuredData = {
    profile: {
      fullName: data?.name,
      tagline: data?.intro?.tagline,
      locationUrl: data?.intro?.location,
      linkedInUrl: data?.intro?.linkedInUrl,
      websiteUrl: data?.intro?.website,
      twitterUrl: data?.intro?.twitterProfile,
      facebookUrl: data?.intro?.facebookUrl,
      profilePic: data?.intro?.logo,
    },
    about: { about: data?.intro?.aboutIncubator },
    incubatorDetails: {
      totalSeats: data?.amenitiesOrEvents?.totalSeats,
      allotedSeats: data?.amenitiesOrEvents?.totalSeats,
      allotedSeatsForPhysical:
        data?.amenitiesOrEvents?.totalPhysicalIncubationSeats,
      allotedSeatsForVirtual:
        data?.amenitiesOrEvents?.totalVirtualIncubationSeats,
      occupiedSeats: data?.amenitiesOrEvents?.totalOccupiedSeats,
      availableSeats: data?.amenitiesOrEvents?.totalAvailableSeats,
      meetingRooms: data?.amenitiesOrEvents?.totalMeetingRooms,
      conferenceRooms: data?.amenitiesOrEvents?.totalConferenceRooms,
      features: data?.features,
    },
    contact: {
      mobileNumber: data?.intro?.number,
      email: data?.intro?.email,
      landLineNumber: data?.intro?.number,
      faxNumber: data?.intro?.number,
      address: data?.intro?.address,
      city: data?.intro?.city,
      district: data?.intro?.district,
      pincode: data?.intro?.pinCode,
      state: data?.intro?.state,
      country: data?.intro?.country,
      contactPersonName: data?.intro?.communityManager,
      alternateMobileNumber: data?.intro?.alternateNumber,
    },
    gallery: { photos: data?.intro?.photos },
    amenities: { amenities: data?.amenitiesOrEvents?.amenities },
    facilities: { facilities: data?.facilities },
  };
  return structuredData;
};

export const structureInvestorProfile = (data) => {
  if (!data) return {};
  const structuredData = {
    profile: {
      fullName: data?.investorIntro?.fullName,
      tagline: data?.investorIntro?.tagline,
      introductionUrl: data?.investorIntro?.introVideo,
      linkedInUrl: data?.investorIntro?.linkedInUrl,
      websiteUrl: data?.investorIntro?.firmWebsiteUrl,
      twitterUrl: data?.investorIntro?.twitterUrl,
      facebookUrl: data?.investorIntro?.facebookUrl,
      profilePic: data?.investorIntro?.logo,
    },
    about: { about: data?.investorIntro?.aboutInvestor },
    startupCriteria: {
      startup: data?.investmentDetails?.startupCriteria,
      preferredIndustries: data?.investmentDetails?.preferredIndustrySector,
      preferredTechnology: data?.investmentDetails?.preferredTechnology,
    },
    investorDetails: {
      type: data?.investorIntro?.investorType,
      stageToInvest: data?.investmentDetails?.preferredInvestmentStage,
      totalFunded: data?.investmentDetails?.totalAmoutFunded,
      portfolio: data?.investmentDetails?.presentPortfolio,
      location: data?.investmentDetails?.preferredLocation,
      range: data?.investmentDetails?.investmentRange,
      startupsFunded: data?.investmentDetails?.totalOrgFunded,
    },
    contact: {
      mobileNumber: data?.investorIntro?.contactNumber,
      email: data?.investorIntro?.email,
      landLineNumber: data?.investorIntro?.contactNumber,
      faxNumber: data?.investorIntro?.contactNumber,
      address: data?.investorIntro?.address,
      city: data?.investorIntro?.cityTown,
      district: data?.investorIntro?.district,
      pincode: data?.investorIntro?.pinCode,
      state: data?.investorIntro?.state,
      country: data?.investorIntro?.country,
    },
    howToApply: data?.howToApply,
    howToPitch: data?.howToPitch,
    whomToReach: data?.whomToReach,
    portfolioCompanies: data?.portfolioCompanies,
    investments: data?.investmentCriteria,
  };
  return structuredData;
};

export const structurePartnerProfile = (data) => {
  if (!data) return {};
  const structuredData = {
    profile: {
      fullName: data?.name,
      tagline: data?.partnerInfo?.tagLine,
      linkedInUrl: data?.partnerInfo?.comapnyLinkedInUrl,
      websiteUrl: data?.partnerInfo?.companyWebsite,
      twitterUrl: data?.partnerInfo?.comapnyTwitterUrl,
      facebookUrl: data?.partnerInfo?.companyFacebookUrl,
      profilePic: data?.partnerInfo?.comapnyLogo,
      introductionUrl: data?.partnerInfo?.companyYoutubeUrl,
    },
    about: { about: data?.partnerInfo?.aboutCompany },
    partnerDetails: {
      mobileNumber: data?.partnerContactInfo?.spocNumber,
      email: data?.partnerContactInfo?.spocEmail,
      address: data?.partnerContactInfo?.registeredPartnerAddress,
      city: data?.partnerContactInfo?.cityTown,
      district: data?.partnerContactInfo?.district,
      pincode: data?.partnerContactInfo?.pinCode,
      state: data?.partnerContactInfo?.state,
      country: data?.partnerContactInfo?.country,
      partneringType: data?.partnerInfo?.partneringType,
      contactPersonName: data?.partnerContactInfo?.spocName,
      contactPersonDesignation:
        data?.partnerContactInfo?.contactPersoneDesignation,
    },
    offers: data?.partnerInfo?.serviceOffers,
  };
  return structuredData;
};
