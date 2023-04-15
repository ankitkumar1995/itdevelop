import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import Layout from '../components/Layout';
import Image from 'next/image';
import FlipBanner from '../components/FlipBanner';
import Link from 'next/link';
import { getVriddhiSchemeEvent, getVriddhiSchemeEventKN } from '../lib/api';
import ChallengeDetails from '../components/ChallengeDetails';
import { slugify } from '../utils/slugify';
import { useRouter } from 'next/router';
const VriddhiScheme = ({ wpdata, wpdataKN }) => {
  const [tdata, setTData] = useState(wpdata);
  const [path, setPath] = useState('en');
  const router = useRouter();
  const handleData = () => {
    if (router.asPath === '/vriddhi-scheme?en') {
      setTData(wpdataKN);
      setPath('en');
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
    structureOfVriddhiScheme,
    eligibilityCrieteria,
    challengeDetails,
  } = tdata.page.vriddhiScheme;
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
          btnText={bannerButton ? bannerButton?.title : null}
          eduClassName="vriddhi-scheme"
          flipMenu={[
            { key: '/', label: 'Funding & Programs' },
            { key: '/vriddhi-scheme', label: 'Vriddhi Scheme' },
          ]}
          menu
        />

        <div className="share-area vriddhi-scheme">
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
                <h4>{structureOfVriddhiScheme.title}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: structureOfVriddhiScheme.description,
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

export default VriddhiScheme;
export async function getServerSideProps(context) {
  const wpdata = await getVriddhiSchemeEvent();
  const wpdataKN = await getVriddhiSchemeEventKN();
  const session = await getSession({ req: context.req });

  return {
    props: {
      wpdata,
      wpdataKN,
      session: session ? session : null,
    },
  };
}
