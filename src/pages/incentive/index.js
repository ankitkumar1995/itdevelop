import React from 'react';
import IncentiveBox from '../../components/IncetiveBox';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { getSession } from 'next-auth/client';
import { BASE_URL } from '../api/url';
import axios from 'axios';
import { getIncentiveForm } from '../../lib/api';
const data = [
  {
    url: '#1',
  },
  {
    url: '#2',
  },
  {
    url: '#3',
  },
];
const Incentives = ({ patentList, gstList, marketList, session, wpdata }) => {
  const { patentImage, marketingImage, gstImage } =
    wpdata?.page?.incentivesForm;
  return (
    <>
      <Header headerClass="contact" headerMenu="contact_us" />

      <div className="incentives-area">
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              fontSize: '35px',
              fontWeight: '700',
              padding: '10px 0',
            }}
          >
            <p>Incentives</p>
          </div>
          <div className="incentive-contnt-area">
            <IncentiveBox
              title={'Patent Reibursement'}
              incentiveName={'Patent'}
              listData={patentList}
              formHref="/incentive/patent"
              image={patentImage.sourceUrl}
            />
            <IncentiveBox
              title={'Market Incentives'}
              incentiveName={'Marketing'}
              listData={marketList}
              formHref="/incentive/marketing"
              image={marketingImage.sourceUrl}
            />
            <IncentiveBox
              title={'Gst Incentives'}
              incentiveName={'Gst'}
              listData={gstList}
              formHref="/incentive/gst"
              image={gstImage.sourceUrl}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Incentives;
export async function getServerSideProps(context) {
  const wpdata = await getIncentiveForm();
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
  const patentList = await axios
    .post(
      `${BASE_URL}/api/v1/startup/incentive/list`,
      {
        userId: session.id,
        type: 'patent',
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
  const gstList = await axios
    .post(
      `${BASE_URL}/api/v1/startup/incentive/list`,
      {
        userId: session.id,
        type: 'gst',
        appStatus: [
          'Missing', //missing - orange red
          'Accepted', // accepted - green
          'Approved', //approved - green
          'Rejected', //rejected - red
          'Pending', //
          'Draft', //incomplete - dark yellow
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
  const marketList = await axios
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

  return {
    props: {
      wpdata,
      session,
      patentList:
        patentList?.data?.startupData?.length !== 0
          ? patentList.data.startupData
          : null,
      gstList:
        gstList?.data?.startupData?.length !== 0
          ? gstList.data.startupData
          : null,
      marketList:
        marketList?.data?.startupData?.length !== 0
          ? marketList.data.startupData
          : null,
    },
  };
}
