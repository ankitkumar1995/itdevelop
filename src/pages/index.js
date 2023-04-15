import CommonBanner from '../components/CommonBannner';
import Layout from '../components/Layout';
import OurConnection from '../components/OurConnection';
import OurSocialFeedsBox from '../components/OurSocialFeedsBox';
import SpeakSliderBox from '../components/Sliders/SpeakSliderBox';
import StartupStoryBox from '../components/StartupStoryBox';
import { getHomePage, getHomePageKN } from '../lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import Marquee from 'react-fast-marquee';
import { slugify } from '../utils/slugify';
import AppContext from '../AppContext';
import { useContext } from 'react';
import dynamic from 'next/dynamic';
// const Layout = dynamic(() => import('../components/Layout'));
const Home = ({ wpdata, wpdataKN }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const value = useContext(AppContext);

  useEffect(() => {
    if (typeof window !== undefined) {
      const pathL = window.sessionStorage.getItem('currentPath');
      setPath(
        pathL?.includes('en') ? 'en' : pathL?.includes('kn') ? 'kn' : 'en'
      );
    }
  }, []);

  const [tdata, setTData] = useState(wpdata);
  const [session, loading] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  useEffect(() => {
    handleLoad();
  }, [path]);
  const handleLoad = () => {
    if (path === 'en') {
      setTData(wpdata);
    } else if (path === 'kn') {
      setTData(wpdataKN);
    } else {
      setTData(wpdata);
    }
  };
  const handleData = () => {
    if (router.asPath === '/?en') {
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
  }, [router.isReady]);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: '#000000ba',
      zIndex: '999',
    },
  };
  const {
    ourReach,
    ourStory,
    founderSpeak,
    socialFeeds,
    eventPopupImage,
    importantMessage,
  } = tdata.homePage;
  const { title, subTitle, image } = tdata.commonBanner;

  useEffect(() => {
    setShowModal(true);
  }, []);

  function closeModal() {
    setShowModal(false);
    setSecondModal(true);
  }
  function secondCloseModal() {
    setSecondModal(false);
  }
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  return (
    // <Suspense fallback="loading">
    <Layout
      handleChange={handleData}
      path={path}
      pageTitle={'Mission Startup Karnataka - Home Page'}
    >
      <div className="slick__overflow">
        <CommonBanner
          darkBg
          title={title}
          subTitle={subTitle}
          pageClass={'home-page'}
          image={image.sourceUrl}
          dropDownData={wpdata.homePage.bannerDropDown}
          path={path}
        />
        {importantMessage && (
          <Marquee speed={40} pauseOnHover={true} pauseOnClick={true}>
            <div className="marq_movtext">
              <Link
                href={
                  importantMessage && importantMessage.urlText
                    ? importantMessage.urlText
                    : '#'
                }
              >
                <a>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: importantMessage.message,
                    }}
                  />
                </a>
              </Link>
            </div>
          </Marquee>
        )}
        {/* our story */}
        <div className="story-area">
          <div className="shap">
            <span></span>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="story-wrap">
                  <div className="product-title story">
                    <a href="#">{ourStory.title}</a>
                    <h3>{ourStory.subTitle}</h3>
                  </div>
                  <div className="story-inner">
                    <div className="story-img">
                      <Image
                        src={ourStory.image.sourceUrl}
                        width="885"
                        height="492"
                        layout="intrinsic"
                        alt="our story"
                      />
                    </div>
                    <StartupStoryBox data={ourStory.industryInfo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="conect-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 connection-img">
                <div className="conect-image">
                  <Image
                    src={ourReach.image.sourceUrl}
                    width="582"
                    height="456"
                    layout="intrinsic"
                    alt="our reach"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="conect-wrap">
                  <div className="conect-hdn">
                    <a href="#">{ourReach.heading}</a>
                    <h3>{ourReach.subHeading}</h3>
                  </div>
                  <div className="conect-inner">
                    <OurConnection data={ourReach.businessInfo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="speak-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product-title story">
                  <a href="#">{founderSpeak.heading}</a>
                  <h3>{founderSpeak.subHeading}</h3>
                </div>
              </div>
            </div>
            <SpeakSliderBox data={founderSpeak.content} />
          </div>
        </div>
        <div className="social-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product-title story">
                  <a href="#">{socialFeeds.heading}</a>
                  <h3>{socialFeeds.subHeading}</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <OurSocialFeedsBox data={socialFeeds.content} />
            </div>
            <div className="social-button">
              <div className="songle-lo-btn">
                <Link href="https://twitter.com/Startup_Kar">
                  <a className="social-btn-tw" target="_blank">
                    FOLLOW US ON <i className="fab fa-twitter"></i>
                  </a>
                </Link>
              </div>
              <div className="songle-lo-btn">
                <Link href="https://www.linkedin.com/company/startupkarnataka/?originalSubdomain=in">
                  <a className="social-btn-ln" target="_blank">
                    FOLLOW US ON <i className="fab fa-linkedin"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {eventPopupImage?.length !== 0 &&
        eventPopupImage?.map((item, index) => {
          return (
            <>
              {item?.image !== null && (
                <>
                  {index === 0 && (
                    <div className="modal_innermo">
                      <Modal
                        className="modal_banel"
                        onRequestClose={closeModal}
                        isOpen={showModal}
                        style={customStyles}
                      >
                        <div>
                          <img
                            src={item?.image?.sourceUrl}
                            className="popup__event__img"
                            alt="event popup"
                          />
                          <span className="apply_wrapper">
                            <a
                              href={item?.pageUrl?.url}
                              target={
                                item?.pageUrl ? item.pageUrl?.target : '_self'
                              }
                            >
                              <span className="apply_wrapper_nw">
                                {item?.pageUrl?.title}
                              </span>
                            </a>
                          </span>
                          <img
                            className="cancel_arrow"
                            onClick={closeModal}
                            src="/assets/img/download-cross.png"
                          />
                        </div>
                      </Modal>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="modal_innermo">
                      <Modal
                        className="modal_banel"
                        onRequestClose={secondCloseModal}
                        isOpen={secondModal}
                        style={customStyles}
                      >
                        <div>
                          <img
                            src={item?.image?.sourceUrl}
                            className="popup__event__img"
                            alt="event popup"
                          />
                          <span className="apply_wrapper">
                            <a
                              href={item?.pageUrl?.url}
                              target={
                                item?.pageUrl ? item.pageUrl?.target : '_self'
                              }
                            >
                              <span className="apply_wrapper_nw">
                                {item?.pageUrl?.title}
                              </span>
                            </a>
                          </span>
                          <img
                            className="cancel_arrow"
                            onClick={secondCloseModal}
                            src="/assets/img/download-cross.png"
                          />
                        </div>
                      </Modal>
                    </div>
                  )}
                </>
              )}
            </>
          );
        })}
    </Layout>
    // </Suspense>
  );
};

export default React.memo(Home);
export const getServerSideProps = async (context) => {
  const wpdata = await getHomePage();
  const wpdataKN = await getHomePageKN();
  return {
    props: {
      wpdata: wpdata.pageBy,
      wpdataKN: wpdataKN.pageBy,
    },
  };
};
