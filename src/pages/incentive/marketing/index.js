import React from 'react';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import { getSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { BASE_URL } from '../../api/url';
import MarketingForm from '../../../components/incentives/marketing';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
}));

const MarketingReimbursement = ({
  session,
  marketingRes,
  incentiveList,
  registerData,
}) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const classes = useStyles();
  return (
    <>
      <Header
        headerClass="contact elevate"
        headerMenu="contact_us"
        style={{ background: 'white' }}
      />
      <div style={{ background: '#f8f8f8', height: '100%' }}>
        <div className="elevate_form_wrap registration">
          <div className="container">
            <MarketingForm
              registerData={registerData}
              session={session}
              marketingRes={marketingRes?.data?.marketingReimbursement}
              stepCount={marketingRes?.data?.lastStep}
              updateId={
                incentiveList?.data?.startupData?.find(
                  (ite) => ite.appStatus === 'Draft'
                )?._id
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MarketingReimbursement;
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
  const incentiveList = await axios
    .post(
      `${BASE_URL}/api/v1/startup/incentive/list`,
      {
        userId: session.id,
        type: 'marketing',
        appStatus: [
          'Missing',
          'Accepted',
          'Approved',
          'Rejected',
          'Pending',
          'Draft',
          'Submitted',
        ],
      },
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      }
    )
    .then(async (res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  const res =
    incentiveList?.data?.startupData?.length !== 0 &&
    incentiveList?.data?.startupData?.find(
      (ite) => ite.appStatus === 'Draft'
    ) &&
    (await fetch(
      `${BASE_URL}/api/v1/startup/incentive/fetch/${
        incentiveList?.data?.startupData?.find(
          (ite) => ite.appStatus === 'Draft'
        )?._id
      }`,
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      }
    ));
  const marketingRes = res ? await res.json() : null;
  const response = await fetch(`${BASE_URL}/api/v1/startup/${session.id}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });

  const registerData = await response.json();
  return {
    props: {
      session,
      marketingRes: marketingRes,
      incentiveList,
      registerData,
    },
  };
}
