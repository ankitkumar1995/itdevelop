import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import FlipBannner from '../components/FlipBanner';
import { getPMA, getPMAKN } from '../lib/api';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import CommonLoader from '../components/CommonLoader';
import AppContext from '../AppContext';
const pma = ({ wpdata, wpdatakn }) => {
  const { state } = useContext(AppContext);
  const [path, setPath] = useState('en');
  useEffect(() => {
    handleLoad();
  }, []);
  const [tdata, setTData] = useState(wpdata);
  const handleLoad = () => {
    if (path === 'en') {
      setTData(wpdata);
      setPath('en');
    } else if (path === 'kn') {
      setTData(wpdatakn);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  const handleData = () => {
    if (router.asPath === '/pma?en') {
      setTData(wpdatakn);
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
  const { title, subTitle, image } = tdata.page.commonBanner;
  const { button, content, description } = tdata.page.pma;
  return (
    <Layout handleChange={handleData} handleLoad={handleLoad} path={path}>
      <FlipBannner
        classflip="justify-content-center"
        classContent="text-center"
        darkBg
        title={title}
        subTitle={subTitle}
        bgImage={image}
        classFlip="aboutus-faqs"
        faqs
        pageClass="pma-banner"
      />
      <div className="our-story our-tory-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pma-story">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${description}</p>`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`cool-area pma-story-box`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={`single-cool`}>
                <div className="cool-text">
                  <ul>
                    {content.list.map((item, index) => (
                      <li
                        className="py-2"
                        key={index}
                        style={{ display: 'flex' }}
                      >
                        <div>
                          <i className="fas fa-check"></i>
                        </div>
                        <div className="px-3">{item.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-img">
                  <Image
                    src={content.image.sourceUrl}
                    alt=""
                    width={387}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pma">
        <div className="container">
          <div className="row text-center">
            {button.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className={`pma-pdf-btn`}>
                  <a
                    href={`${item.pdf?.mediaItemUrl || item.btn?.url}`}
                    className="pma-btn"
                    target="_blank"
                  >
                    <i
                      className="far fa-file-alt fa-2x"
                      style={{ marginRight: '15px' }}
                    ></i>
                    {item.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default pma;

export const getServerSideProps = async (context) => {
  const wpdata = await getPMA();
  const wpdatakn = await getPMAKN();
  return {
    props: {
      wpdata: wpdata,
      wpdatakn: wpdatakn,
    },
  };
};
