import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import Layout from '../components/Layout';
import axios from 'axios';
import Image from 'next/image';
import FlipBanner from '../components/FlipBanner';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import 'react-toastify/dist/ReactToastify.css';
import { sitkQuery } from '../lib/api';
import CommonAccordian from '../components/accordion/CommonAccordian';

const GrandChallenge = ({ sitkEventDetail }) => {
  const [path, setPath] = useState('en');
  const [sitkDetail, setSitkDetail] = useState(sitkEventDetail);
  const { title, subTitle, bannerButton, image } = sitkDetail?.commonBanner;
  const {
    programDetail,
    problemStatement,
    challengeDetails,
    programImage,
    otherChallegeDetail,
    problemDetailSecond,
  } = sitkDetail?.sitk;
  //   const { button, challenge, challengeDetails, elegibility } =
  //     kGckEventData.grandChallenge;
  //   const { partnerDepartment, problemStatement, gckFunding } =
  //     kGckEventData.grandChallenge.challenge;
  //   const handleData = () => {
  //     if (router.asPath === '/grandchallenge#en') {
  //       setKGckEventData(gckEventDatakn);
  //       setPath('kn');
  //     } else {
  //       setKGckEventData(gckEventData);
  //       setPath('en');
  //     }
  //   };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}#${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  return (
    <div className="elevate-details overflow">
      <Layout>
        <FlipBanner
          pageClass={`height`}
          statusTitle={'Grand Challenge application Status'}
          title={title}
          singleBtn
          applyUrl={bannerButton?.url}
          subTitle={subTitle}
          bgImage={image.sourceUrl}
          eduClassName="eduClass sitk"
          btnText={bannerButton?.title}
          formUrl={bannerButton?.url}
          elevate={'elevate'}
          classPolicy="classPolicy"
          flipMenu={[
            { key: '/', label: 'Funding & Programs' },
            { key: '/grandchallenge', label: 'Grand Challenge' },
          ]}
          menu
          classContent="elevateTop"
          classflip="linkTop"
          eventName="Grand Challenge"
        />
        <div className="share-area gck sitk">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="share-wrap">
                  <div className="share-top-wrap">
                    <div className="share-imege">
                      <span className="image-margin">
                        {programImage?.length > 0 &&
                          programImage?.map((item, index) => (
                            <Image
                              src={item.image.sourceUrl}
                              alt=""
                              height={190}
                              width={350}
                            />
                          ))}
                      </span>
                    </div>
                    {programDetail?.map((item, index) => {
                      return (
                        <div className="elevate-content" key={index}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `<p>${item.content}</p>`,
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="even-box">
                  <div className="date-wrap">
                    <div className="date-heading">
                      <h4>{challengeDetails.title}</h4>
                      <img src={challengeDetails.image.sourceUrl} alt="..." />
                    </div>
                    <div className="date-inner-wrap">
                      {challengeDetails?.content?.map((item, index) => (
                        <div
                          className={
                            challengeDetails.content.length - 1 == index
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="elevate-content sitk">
                {problemDetailSecond?.map((item, index) => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${item.content}`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="elevate-content sitk">
                <h4>Problem Statement :</h4>
                <div>
                  <CommonAccordian data={problemStatement} />
                </div>
                {/* <FundingAccordion data={startupFunding.content} /> */}
              </div>
              <div className="elevate-content sitk">
                {otherChallegeDetail.map((item, index) => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${item.content}`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </Layout>
    </div>
  );
};

export default GrandChallenge;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const sitkEventDetail = await sitkQuery();
  //const sitkEventDatakn = await getGrandChallengeDetailKN();
  //  const activeCallData = allCalls?.callsData?.filter(
  //     (call) => call.status === 'active'
  //   )?.[0];
  return {
    props: {
      session: session ? session : null,
      sitkEventDetail: sitkEventDetail.page,
      //   gckEventDatakn: gckEventDatakn.page,
    },
  };
}
