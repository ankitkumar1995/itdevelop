import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import Layout from '../components/Layout';
import axios from 'axios';
import Image from 'next/image';
import FlipBanner from '../components/FlipBanner';
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
  getAmritEventDetail,
  getAmritEventDetailKN,
} from '../lib/api';
import Link from 'next/link';
import { BASE_URL } from './api/url';
import { getAllCalls } from './api/api';
const Amrit = ({
  wpdata,
  wpdataKN,
  amritEventData,
  amritEventDatakn,
  eventdata,
  session,
  activeCallData,
}) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const [eventStatus, setEventStatus] = useState('');
  const [kamritEventData, setKAmritEventData] = useState(amritEventData);
  const [AmritInfo, setAmritInfo] = useState();

  const { policyPdf, operationalPdf } = tdata.startupGuide;
  const { title, subTitle, bannerButton, secondButton, image } =
    kamritEventData.commonBanner;
  const {
    button,
    challenge,
    challengeDetails,
    elegibility,
    pitch,
    slider,
    comingSoonBtn,
    stepsToApply,
  } = kamritEventData.amrit;
  const { eventInfo } = eventdata.eventDetail;
  const handleData = () => {
    if (router.asPath === '/amrita2021?en') {
      setTData(wpdataKN);
      setKAmritEventData(amritEventDatakn);
      setPath('kn');
    } else {
      setTData(wpdata);
      setKAmritEventData(amritEventData);
      setPath('en');
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

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
  const difToastElevatesubmitted = () => {
    toast.error('Amrita Application Already Submitted', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const checkStatus = () => {
    difToast();
  };

  const getUser = async () => {
    try {
      const d = await axios.get(
        `${BASE_URL}/api/v1/elevate/${session.id}?callID=${activeCallData?._id}`,
        {
          headers: {
            Authorization: 'Bearer ' + session.accessToken,
          },
        }
      );

      if (d.data.data === null) {
        setEventStatus('ApplyNow');
      }
      if (d.data.status === 'success' && d.data.data !== null) {
        setEventStatus(d.data.data.appStatus);
      }
    } catch (e) {
      setEventStatus('submitted');
      activeCallData ? difToastElevatesubmitted() : '';
    }
  };

  const getAmritaInfo = async () => {
    try {
      const c = await axios.get(
        `${BASE_URL}/api/v1/elevate?route=/amrita2021`,
        {
          headers: { Authorization: 'Bearer ' + session.accessToken },
        }
      );
      if (c.data.data === null || c.data.data.appStatus == 'draft') {
        setAmritInfo('no-amritha-data');
      } else if (c.data.status === 'success' && c.data.data !== null) {
        setAmritInfo(c.data.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (session != null) {
      getUser();
      getAmritaInfo();
    } else {
      // router.push('/sign-up');
      // difToastElevate();
    }
  }, [session]);
  return (
    <div className="elevate-details overflow">
      <Layout handleChange={handleData} path={path}>
        <FlipBanner
          comingSoonBtn={comingSoonBtn}
          formActive={activeCallData ? true : false}
          pageClass={`height`}
          eventStatus={AmritInfo}
          AmritStatus={eventStatus}
          statusTitle={'Amrita application Status'}
          title={title}
          subTitle={subTitle}
          bgImage={image.sourceUrl}
          eduClassName="eduClass"
          amrit
          btnText={
            eventStatus === 'draft'
              ? 'Continue applying'
              : eventStatus === 'ApplyNow'
              ? 'Apply Now'
              : bannerButton?.title
          }
          elevateClass="elevateClass"
          amritBtn
          formUrl={'/amrita-event-form'}
          checkStatus={checkStatus}
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
            { key: '/amrita2021', label: 'Amrita Startups' },
          ]}
          menu
          classContent="elevateTop"
          classflip="linkTop"
          eventName="Amrita"
        />
        <div className="container">
          <div className="download-pdf network">
            <Link
              href={stepsToApply.pdf ? stepsToApply.pdf?.mediaItemUrl : '#'}
            >
              <a target="_blank">
                <i className="fas fa-external-link-alt"></i>
                {stepsToApply.label}
              </a>
            </Link>
          </div>
        </div>
        <marquee
          width="60%"
          direction="left"
          height="50%"
          className="marq_movtext"
        >
          Startup Applications who will be ELEVATE Winners in 2021-22 call WILL
          NOT BE CONSIDERED for AMRITA STARTUP FUNDING.
        </marquee>
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
                          height={180}
                          width={350}
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
                              {challenge &&
                                challenge.list &&
                                challenge.list.map((item, index) => (
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
                            <img src={item.img.sourceUrl} alt="" />
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
                      {challenge &&
                        challenge.notice &&
                        challenge.notice.list &&
                        challenge.notice.list.map((item, index) => (
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
                      href={`${
                        button && button.pitch && button.pitch.mediaItemUrl
                      }`}
                      className="theme-btn-pitch"
                    >
                      {button.pitch.title}
                      <i
                        className="fas fa-cloud-download-alt"
                        style={{ marginRight: '15px' }}
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </Layout>
    </div>
  );
};

export default Amrit;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const wpdata = await getStatrtupGuidePage();
  const wpdataKN = await getStatrtupGuidePageKN();
  const amritEventData = await getAmritEventDetail();
  const amritEventDatakn = await getAmritEventDetailKN();
  const eventdata = await getEventPage();
  const allCalls = await getAllCalls();
  const activeCallData = allCalls?.callsData?.filter(
    (call) => call.status === 'active'
  )?.[0];
  return {
    props: {
      session: session ? session : null,
      wpdata: wpdata.page,
      wpdataKN: wpdataKN.page,
      amritEventData: amritEventData.page,
      amritEventDatakn: amritEventDatakn.page,
      eventdata: eventdata.page,
      activeCallData: activeCallData ? activeCallData : null,
    },
  };
}
