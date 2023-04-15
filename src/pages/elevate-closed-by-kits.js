import EleveateForm from '../components/ElevateForms';
import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import { BASE_URL } from './api/url';
const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
}));

const Elevate = ({ session, data, saveData }) => {
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
            <EleveateForm data={data} session={session} eleData={saveData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Elevate;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

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
  const eleData = await fetch(`${BASE_URL}/api/v1/elevate/${session.id}`, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });

  const data = await response.json();
  const saveData = await eleData.json();
  // if (saveData.status === 'error') {
  //   return {
  //     redirect: {
  //       destination: '/elevate2021',
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: { session, data, saveData },
  };
}
