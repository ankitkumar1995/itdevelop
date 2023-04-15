import FlipBannner from '../components/FlipBanner';
import Layout from '../components/Layout';
import Partners from '../components/Partners';
import { getAboutus, getAboutusKN } from '../lib/api';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Image from 'next/image';
import StatisticsCard from '../components/Cards/StatisticsCard';
import StrategiesSlider from '../components/Sliders/StrategiesSlider';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';

const Aboutus = ({ wpdata, wpdataKN }) => {
  const [pageClass, setPageClass] = useState('aboutus-en');
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const [focus, setFocus] = useState(false);
  const handleData = () => {
    if (router.asPath === '/aboutus?en') {
      setPageClass('aboutus-kn');
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setPageClass('aboutus-en');
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
  const classes = (index) => {
    if (index == 1) {
      return 'color2';
    }
    if (index == 2) {
      return 'color3';
    }
    if (index == 3) {
      return 'color4';
    }
  };
  const { title, subTitle, image } = tdata.commonBanner;
  const {
    ourJourney,
    ourObjective,
    keyActivities,
    ourStatistics,
    ourStrategies,
  } = tdata.aboutUs;
  return (
    <Layout handleChange={handleData} path={path}>
      <div className={pageClass}>
        <FlipBannner
          aboutus
          pageClass={'about-flip'}
          classContent={'about-content'}
          title={title}
          subTitle={subTitle}
          bgImage={image}
        />
        <div className="dot-line about">
          <div className="our-story">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="our-story-wrap">
                    <span>{ourJourney.title}</span>
                    <h5>{ourJourney.subTitle}</h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: ourJourney.description,
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-4 order-first order-lg-last">
                  <div className="our-story-box">
                    {ourJourney.storyStats.map((item, index) => (
                      <div className="our-story-single-item" key={index}>
                        <p>{item.title}</p>
                        <h3>
                          <CountUp
                            decimal={1}
                            start={focus ? 1 : null}
                            end={item.subTitle}
                            duration={5}
                            suffix={item.suffix}
                          >
                            {({ countUpRef, start }) => (
                              <VisibilitySensor
                                onChange={(isVisible) => {
                                  if (isVisible) {
                                    setFocus(true);
                                  }
                                }}
                              >
                                <span ref={countUpRef} />
                              </VisibilitySensor>
                            )}
                          </CountUp>
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="place-area strategies">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="product-title">
                    <a href="#">{ourStrategies.title}</a>
                    <h3>{ourStrategies.subTitle}</h3>
                  </div>
                </div>
              </div>
              <div class="place-active">
                <div class="row">
                  <StrategiesSlider data={ourStrategies.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stats" style={{ margin: '65px 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sucess-wp">
                  <div className="product-title story">
                    <a href="#">{ourStrategies.title}</a>
                    <h3>{ourStrategies.subTitle}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {ourStatistics.content.map((item, index) => (
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <StatisticsCard
                    title={item.title}
                    logo={item.logo.sourceUrl}
                    icon={item.icon.sourceUrl}
                    ytd={item.ytd}
                    mtd={item.mtd}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="amen-area amen-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="amen-img">
                  <Image
                    src={'/assets/img/peo.png'}
                    width={643}
                    height={386}
                    layout="responsive"
                  />
                </div>
              </div>
              <div className="col-lg-5">
                <div className="amen-wrap">
                  <div className="product-title location amen">
                    <a href="#">{keyActivities.title}</a>
                    <h3>{keyActivities.subTitle}</h3>
                  </div>
                  <div className="amen-list">
                    <ul>
                      {keyActivities.keyHighlights.map((item, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {item.keys}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="skill-btn">
                    <div className="songle-lo-btn amebn">
                      <Link href={keyActivities?.button?.url}>
                        <a className="style-btn">
                          {keyActivities?.button?.title}
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="object-title aboutus">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product-title object-title">
                  <Link href="#">
                    <a>{ourObjective.title}</a>
                  </Link>
                  <h3>{ourObjective.subTitle}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="st-logo">
            <Image
              src="/assets/img/about-us/bird-logo.png"
              width={335}
              height={165}
            />
          </div>
        </div>

        <div className="container">
          {ourObjective.objectBox.map((item, index) => (
            <Partners
              icon
              key={index}
              class1={classes(index)}
              index={index}
              title={item.title}
              image={item.image.sourceUrl}
              description={item.description}
              button={item.button}
              partnerLength={ourObjective.objectBox.length - 1}
              btnIcon
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Aboutus;

export const getServerSideProps = async () => {
  const wpdata = await getAboutus();
  const wpdataKN = await getAboutusKN();
  return {
    props: {
      wpdata: wpdata.page,
      wpdataKN: wpdataKN.page,
    },
  };
};
