import React, { useState, useEffect } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import { BASE_URL } from './api/url';
import PartnerRegistrationForm from '../components/registartion/Partner';
const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
}));

const PartnerRegistrationPage = ({ session, registerData }) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const classes = useStyles();
  return (
    <>
      <Header
        //certiStatus={registerData.data.certificateStatus}
        headerClass="contact elevate"
        headerMenu="contact_us"
        style={{ background: 'white' }}
      />
      <div style={{ background: '#f8f8f8', height: '100%' }}>
        <div className="elevate_form_wrap registration">
          <div className="container">
            <PartnerRegistrationForm
              session={session}
              registerData={registerData}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PartnerRegistrationPage;
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
  if (session.loginType !== 'Partner') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const { accessToken } = session;

  const response = await fetch(`${BASE_URL}/api/v1/partner/${session.id}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });

  const registerData = await response.json();
  if (
    registerData &&
    registerData.data &&
    registerData.data.registration &&
    Object.keys(registerData?.data?.registration).length === 2 &&
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
