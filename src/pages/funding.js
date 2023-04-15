import { getFunding, getFundingKN } from '../lib/api';
import Layout from '../components/Layout';
import FlipBanner from '../components/FlipBanner';
import Image from 'next/image';
import FundingAccordion from '../components/accordion/FundingAccordion';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import { useEffect } from 'react';
import AppContext from '../AppContext';
import CommonLoader from '../components/CommonLoader';
import { useSession } from 'next-auth/client';

const Funding = ({ wpdata, wpdatakn }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  useEffect(() => {
    if (typeof window !== undefined) {
      const pathL = window.sessionStorage.getItem('currentPath');
      setPath(pathL.includes('en') ? 'en' : pathL.includes('kn') ? 'kn' : 'en');
    }
  }, []);
  const [tdata, setTData] = useState(wpdata);
  useEffect(() => {
    handleLoad();
  }, [path]);
  const handleLoad = () => {
    if (path === 'en') {
      setTData(wpdata);
    } else if (path === 'kn') {
      setTData(wpdatakn);
    } else {
      setTData(wpdata);
    }
  };
  const handleData = () => {
    if (router.asPath === '/funding?en' && path === 'en') {
      setTData(wpdatakn);
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
  const { title, image, bannerButton } = tdata.page.commonBanner;
  const { accelarationProgram, checkPolicies, startupFunding } =
    tdata.page.funding;
  return (
    <Layout handleChange={handleData} path={path}>
      <FlipBanner
        title={title}
        siglBtn
        btnText={bannerButton.title}
        btnLink={bannerButton.url}
        bgImage={image}
        pageClass="funding__page"
      />
      <div className="amen-area amen-2 funding">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="amen-img">
                <Image
                  src={checkPolicies.image.sourceUrl}
                  width={643}
                  height={386}
                  layout="responsive"
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <Link href="#">
                    <a>{checkPolicies.title}</a>
                  </Link>
                  <h3>{checkPolicies.subTitle}</h3>
                </div>
                <div className="amen-list">
                  <p>{checkPolicies.description}</p>
                </div>
                <div className="skill-btn">
                  <div className="songle-lo-btn amebn">
                    <Link href={checkPolicies.button.url}>
                      <a className="style-btn">
                        {checkPolicies.button.title}{' '}
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="faq-area funding" id="grantsAndfund">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h3>{startupFunding.title}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <FundingAccordion data={startupFunding.content} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Funding;
export const getServerSideProps = async (context) => {
  const wpdata = await getFunding();
  const wpdatakn = await getFundingKN();
  return {
    props: {
      wpdata: wpdata,
      wpdatakn: wpdatakn,
    },
  };
};
