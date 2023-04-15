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
  getEventPage,
  getkarnatakaevent,
  getkarnatakaeventkn,
} from '../lib/api';
import { BASE_URL } from './api/url';
import { getAllCalls } from './api/api';
import Loading from '../components/CommonLoader/Loading';
const KK2022 = ({
  karnatakaevent,
  karnatakaeventkn,
  eventdata,
  session,
  allCalls,
  activeCallData,
}) => {
  const [path, setPath] = useState('en');
  const [eventStatus, setEventStatus] = useState('');
  const [karnatakaeventDetail, setkarnatakaEventDetail] =
    useState(karnatakaevent);
  const [AmritInfo, setAmritInfo] = useState();
  const karnatakaeventdetail =
    karnatakaeventDetail.karnatakaEventBy?.elevateKarnataka;

  const handleData = () => {
    if (
      router.asPath === '/elevate-karnataka?en' ||
      router.path === '/elevate-karnataka?en#'
    ) {
      setkarnatakaEventDetail(karnatakaeventkn);
      setPath('kn');
    } else {
      setkarnatakaEventDetail(karnatakaevent);
      setPath('en');
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const difToastElevatesubmitted = () => {
    toast.error('Application form Already Submitted', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
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
    }
  }, [session]);
  return (
    <div className="elevate-details overflow">
      <Layout handleChange={handleData} path={path}>
        <FlipBanner
          comingSoonBtn={karnatakaeventdetail?.banner?.commingSoon}
          formActive={activeCallData ? true : false}
          pageClass={`height`}
          eventStatus={AmritInfo}
          AmritStatus={eventStatus}
          title={karnatakaeventdetail?.banner?.title}
          subTitle={karnatakaeventdetail?.banner?.subTitle}
          bgImage={karnatakaeventdetail?.banner?.image?.sourceUrl}
          eduClassName="eduClass"
          amrit
          btnText={
            eventStatus === 'draft'
              ? 'Continue applying'
              : eventStatus === 'ApplyNow'
              ? karnatakaeventdetail?.banner?.applyButton?.title
              : karnatakaeventdetail?.banner?.applyButton?.title
          }
          elevateClass="elevateClass"
          formUrl={karnatakaeventdetail?.banner?.applyButton?.url}
          startupguide
          startupGuide
          uploadPdf
          elevate={'elevate'}
          flipMenu={[
            { key: '/', label: 'Funding & Programs' },
            { key: '#', label: 'Elevate 2023' },
          ]}
          menu
          classContent="elevateTop"
          classflip="linkTop"
          eventName="Amrita"
        />
        <Loading />
        <div className="kalyana__logo">
          <div className="container">
            <div className="row d-flex flex-wrap">
              {karnatakaeventdetail?.eventLogos?.map((image, index) => (
                <div className="col-4" key={index}>
                  <Image
                    src={image?.image?.sourceUrl}
                    alt=""
                    height={180}
                    width={350}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="share-area elevate">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="share-wrap">
                  <div className="share-top-wrap">
                    <div className="elevate-content">
                      {/* <h4>{challenge?.challengeTitle}</h4> */}
                      {karnatakaeventdetail?.eventContent?.map(
                        (item, index) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${item?.content}`,
                            }}
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="even-box">
                  <div className="date-wrap">
                    <div className="date-heading">
                      <h4>{karnatakaeventdetail?.challengeDetail?.title}</h4>
                      <img
                        src={
                          karnatakaeventdetail?.challengeDetail
                            ?.karnatakaDetailLogo?.sourceUrl
                        }
                        alt="..."
                      />
                    </div>
                    <div className="date-inner-wrap">
                      {karnatakaeventdetail?.challengeDetail?.content?.map(
                        (item, index) => (
                          <div
                            className={
                              karnatakaeventdetail?.challengeDetail?.content
                                .length -
                                1 ==
                              index
                                ? 'date-inner-fx bdr'
                                : 'date-inner-fx'
                            }
                            key={index}
                          >
                            <div className="date-icon">
                              <img src={item?.image?.sourceUrl} alt="" />
                            </div>
                            <div className="date-inner-text">
                              <h4>{item.title}</h4>
                              <p>{item.subTitle}</p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {karnatakaeventdetail?.eventButton?.map((item, index) => (
                <div className="btn-class">
                  <div className="header-btn eer eduClass pitch-btn">
                    <a
                      href={`${
                        item?.button && item.button.pitch
                          ? item.button.pitch.mediaItemUrl
                          : item.button?.apply?.url
                      }`}
                      className="theme-btn-pitch"
                    >
                      {item?.button?.apply?.title}
                      <i
                        className="fas fa-cloud-download-alt"
                        style={{ marginRight: '15px' }}
                      ></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ToastContainer />
      </Layout>
    </div>
  );
};

export default KK2022;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const karnatakaevent = await getkarnatakaevent();
  const karnatakaeventkn = await getkarnatakaeventkn();
  const eventdata = await getEventPage();
  const allCalls = await getAllCalls();
  const activeCallData = allCalls?.callsData?.filter(
    (call) => call.status === 'active'
  )?.[0];

  return {
    props: {
      session: session ? session : null,
      allCalls,
      karnatakaevent,
      karnatakaeventkn,
      eventdata: eventdata.page,
      activeCallData: activeCallData ? activeCallData : null,
    },
  };
}
