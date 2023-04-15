import React, { useEffect, useState } from 'react';
import FlipBanner from '../components/FlipBanner';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import { getWomenEntrepreneur, getWomenEntrepreneurKN } from '../lib/api';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const womenEnterpreneur = ({ wpdata, wpdataKN }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const {
    personalityQuote,
    mandatoryDocuments,
    eligibilityCrieteria,
    incentives,
  } = tdata.womenEnterpreneur;
  const { title, image } = tdata.commonBanner;

  const handleData = () => {
    if (router.asPath === '/women-entrepreneur?en') {
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  return (
    <div>
      <Header
        handleChange={handleData}
        path={path}
        headerClass="contact"
        headerMenu="contact_us"
      />
      <FlipBanner
        title={title}
        bgImage={image.sourceUrl}
        classContent="women__entr"
        flipMenuClass={'we-flip-menu'}
        downloadBtn
        pageClass="women__entr"
        custLinkBtnClass="apply__btn-we"
        custPdfBtnClass="down__btn-we"
        acustPdfBtnClass="adown__btn-we"
        flipMenu={[
          { key: '#', label: 'Resources' },
          { key: '#', label: 'Women entrepreneur’s scheme' },
        ]}
        menu
      />
      <div className="we-area">
        <div className="container">
          <div
            dangerouslySetInnerHTML={{
              __html: `<b>${personalityQuote}</b>`,
            }}
          ></div>
        </div>
      </div>
      <div className="we-area ec">
        <div className="container">
          <div
            dangerouslySetInnerHTML={{
              __html: eligibilityCrieteria,
            }}
          ></div>
        </div>
      </div>
      <div className="we-area mand__doc">
        <div className="container">
          <div
            dangerouslySetInnerHTML={{
              __html: mandatoryDocuments,
            }}
          ></div>
        </div>
      </div>
      <div className="we-area incentive">
        <div className="container">
          <div
            dangerouslySetInnerHTML={{
              __html: incentives,
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default womenEnterpreneur;

export async function getServerSideProps() {
  const res = await getWomenEntrepreneur();
  const resKN = await getWomenEntrepreneurKN();

  return {
    props: {
      wpdata: res.page,
      wpdataKN: resKN.page,
    },
  };
}
