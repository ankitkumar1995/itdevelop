import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getTermsConditions, getTermsConditionsKN } from '../lib/api';
import Link from 'next/link';
import { slugify } from '../utils/slugify';
import { useRouter } from 'next/router';
const TermsCondition = ({ wpdata, wpdataKN }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/terms-and-conditions?en') {
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const { title, subtitle, content, button } = tdata.termsAndConditions;
  return (
    <div>
      <Header
        headerClass="contact"
        headerMenu="contact_us"
        handleChange={handleData}
        path={path}
      />
      <div className="share-area" style={{ marginBottom: '49px' }}>
        <div className="container">
          <div className="row">
            <div className="terms-title">
              <span>{title}</span>
              <h3>{subtitle}</h3>
            </div>
            <div className="elevate-content terms">
              {content.map((item, index) => (
                <div key={index} style={{ padding: '25px 0' }}>
                  <h4 className="terms-h4">{item.title}</h4>
                  <div className="terms-list-fx">
                    <div className="learn-list">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<p>${item.text}</p>`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsCondition;

export async function getServerSideProps(context) {
  const wpdata = await getTermsConditions();
  const wpdataKN = await getTermsConditionsKN();
  return {
    props: {
      wpdata: wpdata.page,
      wpdataKN: wpdataKN.page,
    },
  };
}
