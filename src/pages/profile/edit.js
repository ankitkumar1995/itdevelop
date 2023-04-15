import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import StartupProfile from '../../components/EditProfile/userBasedProfile/startupProfile';
import MentorProfile from '../../components/EditProfile/userBasedProfile/mentorProfile';
import InvestorProfile from '../../components/EditProfile/userBasedProfile/investorProfile';
import { initializeApollo } from '../../lib/apollo';
import { FooterQuery, HeaderQuery, MegaMenuQuery } from '../../lib/LayoutQuery';
import PartnerProfile from '../../components/EditProfile/userBasedProfile/partnerProfile';
import IncubatorProfile from '../../components/EditProfile/userBasedProfile/incubatorProfile';
import { getProfileDetails } from '../api/api';
import Loader from '../../components/loader/loader';

const EditProfile = ({ footerData, headerData, megaMenuData }) => {
  const router = useRouter();
  const session = useSession();
  const [userDetails] = session;
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(async () => {
    if (typeof window !== 'undefined') {
      if (userDetails === null) {
        router.push({ pathname: '/' });
      }
      setLoading(true);
      if (userDetails) {
        const { accessToken, id, loginType } = userDetails;
        setUserType(loginType?.toLowerCase());
        const profileData = await getProfileDetails({
          userId: id,
          userType: loginType?.toLowerCase(),
          token: accessToken,
        });
        if (profileData.status === 'success') setLoading(false);
        setProfileDetails(profileData.data);
      }
    }
  }, [userDetails]);

  const userProfiles = {
    startup: (
      <StartupProfile
        session={session}
        profileData={profileDetails}
        footerData={footerData}
        headerData={headerData}
        megaMenuData={megaMenuData}
        updateProfileData={(data) => setProfileDetails({ ...data })}
      />
    ),
    mentor: (
      <MentorProfile
        session={session}
        profileData={profileDetails}
        footerData={footerData}
        headerData={headerData}
        megaMenuData={megaMenuData}
        updateProfileData={(data) => setProfileDetails({ ...data })}
      />
    ),
    investor: (
      <InvestorProfile
        session={session}
        profileData={profileDetails}
        footerData={footerData}
        headerData={headerData}
        megaMenuData={megaMenuData}
        updateProfileData={(data) => setProfileDetails({ ...data })}
      />
    ),
    partner: (
      <PartnerProfile
        session={session}
        profileData={profileDetails}
        footerData={footerData}
        headerData={headerData}
        megaMenuData={megaMenuData}
        updateProfileData={(data) => setProfileDetails({ ...data })}
      />
    ),
    incubator: (
      <IncubatorProfile
        session={session}
        profileData={profileDetails}
        footerData={footerData}
        headerData={headerData}
        megaMenuData={megaMenuData}
        updateProfileData={(data) => setProfileDetails({ ...data })}
      />
    ),
  };

  useEffect(() => {
    if (userDetails === undefined) {
      console.log('u undefined');
    }
    if (userDetails === null) {
      console.log('u null');
    }
  }, [userDetails]);

  if (userType && !loading) {
    return userProfiles[userType];
  } else if (userDetails === undefined) {
    return <Loader text={'Loading Profile'} />;
  } else if (userDetails === null) {
    return <Loader text={'Redirecting you to Home page'} />;
  } else {
    return <Loader />;
  }
};

export default EditProfile;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const apolloClient = initializeApollo();
  const footerData = await apolloClient.query({
    query: FooterQuery,
  });
  const headerData = await apolloClient.query({
    query: HeaderQuery,
  });
  const megaMenuData = await apolloClient.query({
    query: MegaMenuQuery,
  });
  return {
    props: { footerData, headerData, megaMenuData },
  };
};
