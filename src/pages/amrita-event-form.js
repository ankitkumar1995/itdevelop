import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getSession, session } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import AmritEventForm from '../components/AmritEventForm';
import { getAllCalls } from './api/api';
import { BASE_URL } from './api/url';
const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
}));

const AmritEvent = ({ allCalls, session, data, saveData, activeCallData }) => {
  const classes = useStyles();
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
            <AmritEventForm
              allCalls={allCalls}
              session={session}
              eleData={saveData}
              data={data}
              activeCallData={activeCallData}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AmritEvent;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { accessToken } = session;

  const allCalls = await getAllCalls();
  const activeCallData = allCalls?.callsData?.filter(
    (call) => call.status === 'active'
  )?.[0];
  const response = await fetch(`${BASE_URL}/api/v1/startup/${session.id}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });

  const eleData = await fetch(
    `${BASE_URL}/api/v1/elevate/${session.id}?callID=${activeCallData._id}`,
    {
      headers: { Authorization: 'Bearer ' + accessToken },
    }
  );
  const saveData = await eleData.json();

  const data = await response.json();
  if (saveData.status === 'error') {
    return {
      redirect: {
        destination: '/amrita2021',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      allCalls,
      data,
      saveData,
      activeCallData,
    },
  };
}
