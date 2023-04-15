import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getSession, session } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import { BASE_URL } from './api/url';
import GrandChallengeForm from '../components/GrandChallengeForm';
import { getAllGckCalls } from './api/api';
import { getGrandChallengeDetail } from '../lib/api';

const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
}));

const GrandChallenge = ({
  session,
  gckData,
  registerData,
  list,
  gckEventData,
}) => {
  const classes = useStyles();
  const { button, termAndConditionPdf } = gckEventData.grandChallenge;
  return (
    <>
      <Header
        headerClass="contact elevate"
        headerMenu="contact_us"
        style={{ background: 'white' }}
      />
      <div style={{ background: '#f8f8f8', height: '100%' }}>
        <div className="elevate_form_wrap">
          <div className="container">
            <GrandChallengeForm
              session={session}
              gckChallenge={list}
              gckData={gckData}
              registerData={registerData}
              tAndCPdf={termAndConditionPdf?.mediaItemUrl}
              pitchPdf={button?.pitch?.mediaItemUrl}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default GrandChallenge;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const gckEventData = await getGrandChallengeDetail();
  if (!session) {
    return {
      redirect: {
        destination: '/sign-up',
        permanent: false,
      },
    };
  }
  const { accessToken } = session;
  const response = await fetch(`${BASE_URL}/api/v1/startup/${session.id}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });
  const gckRes = await fetch(`${BASE_URL}/api/v1/gck/${session.id}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });
  const gckData = await gckRes.json();
  const gckChallenge = await getAllGckCalls();

  const registerData = await response.json();
  const list = [];
  const data = gckChallenge.callsData.map((item) =>
    item.status === 'active' ? list.push(item) : null
  );
  if (gckData.status === 'error') {
    return {
      redirect: {
        destination: '/grandchallenge',
        permanent: false,
      },
    };
  }
  return {
    props: {
      gckEventData: gckEventData.page,
      session,
      gckChallenge,
      gckData,
      registerData,
      list,
    },
  };
}
