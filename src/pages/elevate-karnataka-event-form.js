import KalyanKarnatakaForms from '../components/KalyanKarnatakaForms';
import axios from 'axios';
import React, { useEffect } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import { BASE_URL } from './api/url';
import Head from 'next/head';
import { getAllCalls } from './api/api';
import { useRouter } from 'next/router';
const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
}));

const KalyanKarnataka = ({
  allCalls,
  session,
  data,
  saveData,
  activeCallData,
}) => {
  const router = useRouter();
  const getUser = async () => {
    try {
      const d = await axios.get(
        `${BASE_URL}/api/v1/elevate/${session.id}?callID=${activeCallData?._id}`,
        {
          headers: {
            Authorization: 'Bearer ' + session.accessToken,
          },
        }
      );
    } catch (e) {
      router.push('/KK-2022');
    }
  };
  useEffect(() => {
    if (session != null) {
      getUser();
    }
  }, [session]);
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Elevate Karnataka - 2022 Application Form</title>
      </Head>
      <Header
        headerClass="contact elevate"
        headerMenu="contact_us"
        style={{ background: 'white' }}
      />
      <div style={{ background: '#f8f8f8', height: '100%' }}>
        <div className="elevate_form_wrap">
          <div className="container">
            <KalyanKarnatakaForms
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
export default KalyanKarnataka;

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
    `${BASE_URL}/api/v1/elevate/${session.id}?callID=${activeCallData?._id}`,
    {
      headers: { Authorization: 'Bearer ' + accessToken },
    }
  );
  const saveData = await eleData.json();

  const data = await response.json();
  // if (saveData.status === 'error') {
  //   return {
  //     redirect: {
  //       destination: '/elevatekarnataka2022',
  //       permanent: false,
  //     },
  //   };
  // }

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
