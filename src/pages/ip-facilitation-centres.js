import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import FlipBannner from '../components/FlipBanner';
import { getIpCentrePage, getIpCentrePageKN } from '../lib/api';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import IpCardData from '../components/Cards/IpCardData';

const ipcentre = ({ wpdata, wpdataKN }) => {
  const router = useRouter();
  const [pageClass, setPageClass] = useState('ip-center-en');
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/ip-facilitation-centres#en') {
      setTData(wpdataKN);
      setPageClass('ip-center-kn');
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
      setPageClass('ip-center-en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}#${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const data = tdata.page.ipCentre;
  const { title, subTitle, image, bannerButton } = tdata.page.commonBanner;
  const { contactDetailsHeading } = tdata.page.ipCentre;
  return (
    <Layout handleChange={handleData} path={path}>
      <div className={pageClass}>
        <FlipBannner
          className="hie"
          classflip="justify-content-center"
          classContent="text-center"
          title={title}
          sub_title={subTitle}
          bgImage={image}
          singleBtn
          btnText={bannerButton.title}
          applyUrl="#ip-center"
        />

        <div className="ip-area ip-center-page" id="ip-center">
          <div className="container">
            <div className="row">
              {data.ipData.map((item, index) => (
                <IpCardData
                  index={index}
                  image={item.image?.sourceUrl}
                  ipCenterContent={item.ipCenterContent}
                  contactDetails={item.contactDetails}
                  emails={item.emails}
                  websites={item.websites}
                  contactDetailsHeading={contactDetailsHeading}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ipcentre;

export const getServerSideProps = async (context) => {
  const wpdata = await getIpCentrePage();
  const wpdataKN = await getIpCentrePageKN();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
    },
  };
};
