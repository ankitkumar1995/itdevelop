import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import FlipBannner from '../components/FlipBanner';
import { getEduInstitutesPage, getEduInstitutesPageKN } from '../lib/api';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';

const EduInstitutes = ({ wpdata, wpdataKN }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/academia?en') {
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
  const data = tdata.page.eduInstitute;
  const { title, subTitle, image, bannerButton } = tdata.page.commonBanner;
  return (
    <Layout handleChange={handleData} path={path}>
      <div>
        <FlipBannner
          className="hie"
          classflip="justify-content-center"
          classContent="text-center"
          title={title}
          subTitle={subTitle}
          bgImage={image}
          btnText={bannerButton.title}
          eduClassName="eduClass"
          applyUrl={'#edu-institute'}
          singleBtn
        />

        <div className="ip-area" id="edu-institute">
          <div className="container">
            <div className="row">
              {data.eduData.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="single-ip edu">
                    <div className="ip-img">
                      <Image
                        src={item.image.sourceUrl}
                        alt=""
                        width={630}
                        height={290}
                      />
                    </div>
                    <div className="ip-containt scroll edu-institute">
                      <div className="ip-top-containt">
                        <div>
                          <h2> {item.title}</h2>
                        </div>
                      </div>
                      <div className="ip-text">
                        <div
                          className="flexible"
                          dangerouslySetInnerHTML={{
                            __html: item.aboutInstitute,
                          }}
                        />
                      </div>
                      <div className="ip-text">
                        <div
                          className="flexible"
                          dangerouslySetInnerHTML={{
                            __html: item.focusArea,
                          }}
                        />
                      </div>
                      <div className="ip-text">
                        <div
                          className="flexible"
                          dangerouslySetInnerHTML={{
                            __html: item.address,
                          }}
                        />
                      </div>
                      <div className="ip-text emails">
                        <div className="flexible">
                          {item.emails && <b>Emails:</b>}
                          {item.emails &&
                            item.emails.map((em, index) => (
                              <Link
                                key={index}
                                href={em ? `mailto:${em.email}` : '#'}
                              >
                                <a>{em.email}</a>
                              </Link>
                            ))}
                        </div>
                      </div>
                      {item.button && (
                        <div className="more-detail">
                          <Link href={item.button ? item.button?.url : '#'}>
                            <a target={item.button?.target}>
                              {item.button.title}
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="ip-link">
                      <Link
                        href={item.emails ? `mailto:${item.emails[0]}` : '#'}
                      >
                        <a>{item.email}</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EduInstitutes;

export const getServerSideProps = async (context) => {
  const wpdata = await getEduInstitutesPage();
  const wpdataKN = await getEduInstitutesPageKN();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
    },
  };
};
