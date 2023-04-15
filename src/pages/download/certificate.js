import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import { getProfileDetails } from '../api/api';
import moment from 'moment';
const PDF = dynamic(import('../../components/certificate/PDF'), { ssr: false });

const Certificate = ({ session }) => {
  const [certificateDetails, setCertificateDetails] = useState({});
  const [dateOfIncorporation, setDateOfIncorporation] = useState('');
  useEffect(async () => {
    if (session) {
      const { loginType, id, accessToken } = session;
      const response = await getProfileDetails({
        userType: loginType.toLowerCase(),
        userId: id,
        token: accessToken,
      });
      setCertificateDetails(response.data);
      setDateOfIncorporation(response.dateOfIncorporation);
    }
  }, [session]);

  useEffect(() => {}, [certificateDetails]);
  return (
    <PDF
      certificate={certificateDetails}
      certificateNumber={certificateDetails?.certificate?.number || ''}
      dateOfIncorporation={
        moment(dateOfIncorporation).format('DD-MM-YYYY') || ''
      }
    />
  );
};

export default Certificate;

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
  return {
    props: { session },
  };
};
