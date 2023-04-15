import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import FlipBanner from '../components/FlipBanner';
import Link from 'next/link';
import { getElevateWomenEvent, getElevateWomenEventKN } from '../lib/api';
import ChallengeDetails from '../components/ChallengeDetails';
import { slugify } from '../utils/slugify';
import { useRouter } from 'next/router';
const ElevateWomen = ({ wpdata, wpdataKN }) => {
  const [tdata, setTData] = useState(wpdata);
  const [path, setPath] = useState('en');
  const router = useRouter();
  const handleData = () => {
    if (router.asPath === '/elevate-women?en') {
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
  const { title, subTitle, image, bannerButton } = tdata.page.commonBanner;
  const {
    stepsToApply,
    eventLogo,
    background,
    objectives,
    structureOfElevateWomen,
    eligibilityCrieteria,
    challengeDetails,
  } = tdata.page.womenElevate;
  return (
    <div className="elevate-details overflow">
      <Layout handleChange={handleData} path={path}>
        <FlipBanner
          title={title}
          subTitle={subTitle}
          bgImage={image.sourceUrl}
          singleBtn
          applyUrl={bannerButton?.url}
          target={bannerButton?.url === '#' ? '_self' : '_blank'}
          btnText={bannerButton?.title}
          eduClassName="elevate-women"
          flipMenu={[
            { key: '/', label: 'Funding & Programs' },
            { key: '/elevate-women', label: 'Elevate Women' },
          ]}
          menu
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
        <div className="share-area elevate-women">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="share-wrap">
                  <div className="share-top-wrap">
                    <div className="elevate-content">
                      <h4>{background.title}</h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<p>${background.description}</p>`,
                        }}
                      />
                    </div>
                    <div className="elevate-content objective">
                      <h4>{objectives.title}</h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: objectives.description,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <ChallengeDetails
                  title={challengeDetails?.title}
                  logo={challengeDetails?.logo?.sourceUrl}
                  data={challengeDetails?.content}
                />
              </div>
              <div className="elevate-content">
                <h4>{structureOfElevateWomen.title}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: structureOfElevateWomen.description,
                  }}
                />
              </div>
              <div className="elevate-content eligibility">
                <h4>{eligibilityCrieteria.title}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: eligibilityCrieteria.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ElevateWomen;
export async function getServerSideProps(context) {
  const wpdata = await getElevateWomenEvent();
  const wpdataKN = await getElevateWomenEventKN();
  return {
    props: {
      wpdata,
      wpdataKN,
    },
  };
}
