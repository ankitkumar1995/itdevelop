import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import MentorRegistrationForm from '../components/registartion/Mentor';
import { BASE_URL } from './api/url';
const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
}));

const StartupRegistrationPage = ({ session, registerData }) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const classes = useStyles();

  return (
    <>
      <Header
        certiStatus={
          registerData &&
          registerData.data &&
          registerData.data.certificateStatus
        }
        headerClass="contact elevate"
        headerMenu="contact_us"
        style={{ background: 'white' }}
      />
      <div style={{ background: '#f8f8f8', height: '100%' }}>
        <div className="elevate_form_wrap registration">
          <div className="container">
            <MentorRegistrationForm
              session={session}
              registerData={
                registerData?.data?.appStatus === 'Missing'
                  ? { data: { ...registerData?.data, lastStep: 0 } }
                  : registerData
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default StartupRegistrationPage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const { accessToken } = session;
  if (session.loginType !== 'Mentor') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const response = await fetch(`${BASE_URL}/api/v1/mentor/${session.id}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });

  const registerData = await response.json();
  if (
    registerData &&
    registerData.data &&
    registerData.data.registeration &&
    Object.keys(registerData?.data?.registeration).length === 3 &&
    registerData.data.appStatus !== 'Missing'
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session, registerData },
  };
}
