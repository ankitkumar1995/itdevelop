import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import Layout from '../components/Layout';
import axios from 'axios';
import Image from 'next/image';
import FlipBanner from '../components/FlipBanner';
import ElevateCard from '../components/Cards/ElevateCard';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getElevate2021,
  getStatrtupGuidePage,
  getStatrtupGuidePageKN,
  getEventPage,
  getElevate2021Kn,
} from '../lib/api';
import Link from 'next/link';
import { BASE_URL } from './api/url';
const elevate2021 = ({
  wpdata,
  wpdataKN,
  elevatedata,
  elevatedatakn,
  eventdata,
  session,
}) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const [elevateStatus, setElevate] = useState('');
  const [kelevatedata, setElevatedata] = useState(elevatedata);
  const [elevateInfo, setElevateInfo] = useState();
  const { policyPdf, operationalPdf } = tdata.startupGuide;
  const { title, subTitle, bannerButton, secondButton, image } =
    kelevatedata.commonBanner;
  const { button, challenge, challengeDetails, elegibility, pitch, slider } =
    kelevatedata.elevate2021;
  const { eventInfo } = eventdata.eventDetail;
  const handleData = () => {
    if (router.asPath === '/elevate2021?en') {
      setTData(wpdataKN);
      setElevatedata(elevatedatakn);
      setPath('kn');
    } else {
      setTData(wpdata);
      setElevatedata(elevatedata);
      setPath('en');
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  // useEffect(() => {
  //   router.push(`localhost:3000/${path}`, undefined, {
  //     shallow: true,
  //   });
  // }, []);

  const difToast = () => {
    toast.success('Will be available soon!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const difToastElevate = () => {
    toast.error('Please Sign up / Login to Apply', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const difToastElevatesubmitted = (msg) => {
    if (session?.loginType === 'Startup') {
      toast.error('Elevate Application Already Submitted', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error('Only startups can apply for Elevate / Amrita', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  useEffect(() => {
    difToastElevatesubmitted();
  }, [session]);
  const checkStatus = () => {
    difToast();
  };

  const getUser = async () => {
    try {
      const d = await axios.get(`${BASE_URL}/api/v1/elevate/` + session.id, {
        headers: {
          Authorization: 'Bearer ' + session.accessToken,
        },
      });
      if (d.data.data === null) {
        setElevate('ApplyNow');
      }
      if (d.data.status === 'success' && d.data.data !== null) {
        setElevate(d.data.data.appStatus);
      }
    } catch (e) {
      setElevate('submitted');
      // difToastElevatesubmitted();
    }
  };

  const getElevateInfo = async () => {
    try {
      const c = await axios.get(
        `${BASE_URL}/api/v1/elevate?route=/elevate2021`,
        {
          headers: { Authorization: 'Bearer ' + session.accessToken },
        }
      );
      if (c.data.data === null || c.data.data.appStatus == 'draft') {
        setElevateInfo('no-data');
      } else if (c.data.status === 'success' && c.data.data !== null) {
        setElevateInfo(c.data.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (session != null) {
      getElevateInfo();
      getUser();
    } else {
      // router.push('/sign-up');
      // difToastElevate();
    }
  }, [session]);

  return (
    <div className="elevate-details overflow">
      <Layout handleChange={handleData} path={path}>
        <FlipBanner
          pageClass={`height`}
          eventStatus={elevateInfo}
          statusTitle={'Elevate application Status'}
          elevateStatus={elevateStatus}
          title={title}
          subTitle={subTitle}
          bgImage={image.sourceUrl}
          applyBtn
          eduClassName="eduClass"
          btnText={
            elevateStatus === 'draft'
              ? 'Continue applying'
              : elevateStatus === 'ApplyNow'
              ? 'Apply Now'
              : bannerButton.title
          }
          elevateClass="elevateClass"
          elevateBtn
          formUrl={'/elevate'}
          checkStatus={checkStatus}
          userType={session?.loginType}
          elevateBtntext={secondButton.title}
          startupguide
          startupGuide
          uploadPdf
          elevate={'elevate'}
          policyPdf={policyPdf}
          operationalPdf={operationalPdf}
          classPolicy="classPolicy"
          flipMenu={[
            { key: '/', label: 'Funding & Programs' },
            { key: '/elevate2021', label: 'ELEVATE' },
          ]}
          menu
          classContent="elevateTop"
          classflip="linkTop"
        />
        <div className="container">
          <div className="download-pdf network">
            <Link href={'/assets/Apply to Elevate - Quick Guide.pdf'}>
              <a target="_blank">
                <i className="fas fa-external-link-alt"></i>
                Elevate 2021 & Elevate Unnati - Steps to apply
              </a>
            </Link>
          </div>
        </div>
        <div className="share-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="share-wrap">
                  <div className="share-top-wrap">
                    <div className="share-imege">
                      <span className="image-margin">
                        <Image
                          src={challenge.image1?.sourceUrl}
                          alt=""
                          height={150}
                          width={500}
                        />
                      </span>
                    </div>
                    <div className="elevate-content">
                      <h4>{challenge.challengeTitle}</h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<p>${challenge.challengeDesc}</p>`,
                        }}
                      ></div>
                    </div>
                    <div className="share-this">
                      <div className="reward-wrap">
                        <h4>{challenge.rewards}</h4>
                        <div className="learn-list-fx">
                          <div className="learn-list">
                            <ul>
                              {challenge.list.map((item, index) => (
                                <li key={index}>
                                  <a href="#">
                                    <i className="fa fa-check"></i>

                                    {item.text}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="even-box">
                  <div className="date-wrap">
                    <div className="date-heading">
                      <h4>{challengeDetails.title}</h4>
                      <img src={eventInfo.image.sourceUrl} alt="..." />
                    </div>
                    <div className="date-inner-wrap">
                      {challengeDetails.content.map((item, index) => (
                        <div
                          className={
                            challengeDetails.content.length - 1 == index
                              ? 'date-inner-fx bdr'
                              : 'date-inner-fx'
                          }
                          key={index}
                        >
                          <div className="date-icon">
                            <a href="#">
                              <img src={item.img.sourceUrl} alt="" />
                            </a>
                          </div>
                          <div className="date-inner-text">
                            <h4>{item.heading}</h4>
                            <p>{item.subHeading}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <div className="header-btn eer eduClass register">
                <a href="#" className="theme-btn">
                  {challengeDetails.button.title}
                  <i
                    className="fas fa-arrow-right"
                    style={{ marginRight: '15px' }}
                  ></i>
                </a>
              </div> */}
              </div>
              <div className="elevate-content notice">
                <h4>{challenge.notice.title}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h5>${challenge.notice.subtitle}</h5>`,
                  }}
                />
                <div className="learn-list-fx">
                  <div className="elevate-list">
                    <ul>
                      {challenge.notice.list.map((item, index) => (
                        <li key={index}>
                          <div className="elevate-notice">
                            <i className="fa fa-check"></i>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `<p>${item.text}</p>`,
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${challenge.notice.text}</p>`,
                  }}
                />
              </div>
              <div className="elevate-content">
                {elegibility.map((item, index) => (
                  <>
                    <h4 className="elevate-heading">{item.heading}</h4>
                    <h6>{item.subheading}</h6>
                    <h4>{item.title}</h4>
                    <div className="elevate-list-fx">
                      <div className="learn-list">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<h5>${item.list}</h5>`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </>
                ))}
                <div className="btn-class">
                  <div className="header-btn eer eduClass pitch-btn">
                    <a
                      href={`${button.pitch.mediaItemUrl}`}
                      className="theme-btn-pitch"
                    >
                      {button.pitch.title}
                      <i
                        className="fas fa-cloud-download-alt"
                        style={{ marginRight: '15px' }}
                      ></i>
                    </a>
                  </div>
                  <div className="header-btn eer eduClass">
                    <a href="#" className="theme-btn">
                      {button.apply.title}
                      <i
                        className="fas fa-arrow-right"
                        style={{ marginRight: '15px' }}
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="over-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <span>{pitch.title}</span>
                  <h3>{pitch.heading}</h3>
                  <div className="pitch-img">
                    <Image
                      src={pitch.img.sourceUrl}
                      height={400}
                      width={1200}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="office-area" id="ourOffices">
          <div className="container" style={{ maxWidth: '1140px' }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="elevate-title">
                  <span>{slider.title}</span>
                  <h3>{slider.heading}</h3>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <ElevateCard data={slider.slider[0].card} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </div>
  );
};

export default elevate2021;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const wpdata = await getStatrtupGuidePage();
  const wpdataKN = await getStatrtupGuidePageKN();
  const elevatedata = await getElevate2021();
  const elevatedatakn = await getElevate2021Kn();
  const eventdata = await getEventPage();
  return {
    props: {
      session: session ? session : null,
      wpdata: wpdata.page,
      wpdataKN: wpdataKN.page,
      elevatedata: elevatedata.page,
      elevatedatakn: elevatedatakn.page,
      eventdata: eventdata.page,
    },
  };
}
