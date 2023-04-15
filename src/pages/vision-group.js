import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FlipBannner from '../components/FlipBanner';
import OurCouncil from '../components/Sliders/OurCouncil';
import OurTeam from '../components/OurTeam';
import {
  getAboutusLeadershipPage,
  getAboutusLeadershipPageKN,
  getAULeadershipPage,
} from '../lib/api';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import Link from 'next/link';

const AboutusLeader = ({ wpdata, wpdataKN, postdata }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/vision-group?en') {
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
  const data = tdata.page.aboutusLeadership;
  const { title, subTitle, image } = tdata.page.commonBanner;

  const [currentCategory, setCurrentCategory] = useState(
    data?.ourSuccessStories?.categories[0]?.label
  );
  const [currentData, setData] = useState('');

  useEffect(() => {
    const filtered = filterItems(currentCategory);
    setData(filtered);
  }, [currentCategory]);
  function setCategory(name) {
    setCurrentCategory(name);
  }

  function filterItems(name) {
    return _.filter(postdata, function (post) {
      return _.some(post.categories.nodes, { name: name });
    });
  }
  return (
    <Layout handleChange={handleData} path={path}>
      <FlipBannner
        classflip="justify-content-center"
        classContent="text-center"
        title={title}
        subTitle={subTitle}
        bgImage={image}
        darkBg
        classFlip="aboutus-faqs"
        faqs
      />

      <div className="our-story our-tory-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="our-story-wrap coun-wrap">
                <span>{data.council.title}</span>
                <h5>{data.council.subTitle}</h5>
                <div
                  style={{ textAlign: 'justify' }}
                  dangerouslySetInnerHTML={{
                    __html: `<p>${data.council.description}</p>`,
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 order-first order-lg-last">
              <div className="counc-inner leadership">
                <div className="coun-fl">
                  <OurCouncil wpdata={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="suces-area sucess-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-title sucess-title">
                <Link href="#">
                  <a>{data.ourSuccessStories?.title}</a>
                </Link>
                <h3>{data.ourSuccessStories?.subTitle}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-menu vision-group">
                <div className="tab-active">
                  <ul className="nav mnu-tabs" id="myTab" role="tablist">
                    {data?.ourSuccessStories?.categories?.map((item, index) => (
                      <li className="mnu-item" key={index}>
                        <div
                          className={
                            item.label === currentCategory
                              ? 'mnu-link active'
                              : 'mnu-link'
                          }
                          onClick={() => setCategory(item.label)}
                        >
                          {item.label}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="profi-area">
                        <div className="conteiner">
                          <div className="row">
                            {currentData &&
                              currentData?.map((item, index) => (
                                <OurTeam data={item} key={index} />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutusLeader;

export const getServerSideProps = async (context) => {
  const wpdata = await getAboutusLeadershipPage();
  const wpdataKN = await getAboutusLeadershipPageKN();
  const postdata = await getAULeadershipPage();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      postdata: postdata.aULeaderships.nodes,
    },
  };
};
