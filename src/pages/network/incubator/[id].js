import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FlipBanner from '../../../components/FlipBanner';
import IncubatorSlider from '../../../components/Sliders/IncubatorSlider';
import AboutOwner from '../../../components/AboutOwner';
import ContactMap from '../../../components/googlemap/ContactMap';
import _ from 'lodash';
import Modal from '../NetworkModal';
import React from 'react';
import { BASE_URL } from '../../api/url';

const renderList = (data) => {
  const [activeli, setActiveli] = useState(false);
  const [content, setContent] = useState(null);
  useEffect(() => {
    setContent(
      data && data.length ? (
        <ul className="px-3">
          {_.map(data, (item, index) => {
            if (index === 3 && !activeli) {
              return (
                <li>
                  {' '}
                  <a
                    target="_blank"
                    className="read-more"
                    onClick={() => setActiveli(true)}
                  >
                    Read More...
                  </a>
                </li>
              );
            } else if (index < 3 || (index >= 3 && activeli)) {
              return (
                <li>
                  <img src="/assets/img/check.svg" />
                  {item}
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <div>No data</div>
      )
    );
  }, [activeli]);
  return content;
};

const incubator = ({ incubData }) => {
  const [show, setShow] = useState(false);
  const info = {
    name: incubData.name,
    tagline: incubData.registeration?.intro.tagline,
    website: incubData.registeration?.intro.website,
    about: incubData.registeration?.intro.aboutIncubator,
    address: incubData.registeration?.intro.address,
    location: incubData.registeration?.intro.location,
    profile: incubData.registeration?.intro.website,
    linkedIn: incubData.registeration?.intro.linkedInUrl,
    twitter: incubData.registeration?.intro.twitterProfile,
    facebook: incubData.registeration?.intro.facebookUrl,
    totalSeats: incubData.registeration?.amenitiesOrEvents.totalSeats,
  };

  // const facilities = [
  //   'High-speed internet',
  //   'Electricity',
  //   'Water',
  //   'Server infra',
  //   'Testing labs',
  //   'Meeting rooms',
  // ];

  // const incubation_facility = [
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun',
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun',
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun',
  // ];
  const amenities_list = incubData?.registeration?.amenitiesOrEvents?.amenities;

  const contact_person = {
    name: incubData?.name,
    mobile1: incubData?.registeration?.intro?.number,
    mobile2: incubData?.registeration?.intro?.alternateNumber
      ? incubData.registeration.intro.alternateNumber
      : '',
    img: '/assets/img/commopn/s.png',
  };
  const data = incubData?.registeration?.intro?.photos?.map((item, index) => ({
    img: item,
    handler: item,
  }));
  return (
    <Layout>
      <FlipBanner
        flipMenu={[
          { key: '/', label: 'Home' },
          { key: '/network/incubator', label: 'Network' },
          { key: '/network/incubator', label: 'Incubators' },
          { key: '#', label: 'Test' },
        ]}
        menu
        network
        viewLocation
        setShow={() => setShow(true)}
        location={info?.location ? info.location : '#'}
        pageClass={'network-banner incub'}
        title={info.name}
        sub_title={info.tagline}
        bgImage={{ sourceUrl: '/assets/img/incubator-detail.jpg' }}
      />
      {/* <Modal show={show} onClose={() => setShow(!show)}></Modal> */}
      <div className="about-area cmn">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-wrap">
                <div className="about-link">
                  <a href="#">Introduction</a>
                </div>
                <AboutOwner
                  title={`About ${info.name}`}
                  description={info.about}
                  totalSeats={info.totalSeats}
                  links={{
                    profile: info.profile,
                    twitter: info.twitter,
                    linkedIn: info.linkedIn,
                    facebook: info.facebook,
                  }}
                  aboutBtn
                />
                <div className="pill-wrap pb-5">
                  <div className="pill-btn-fx">
                    {_.map(incubData.facilities, (item) => (
                      <div className="pill-single-btn">
                        <a href="#">{item}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <h3>Incubation facility</h3>
                </div>
                <div className="amen-list">
                  {renderList(incubData.facilities)}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <h3>Amenities</h3>
                </div>
                <div className="amen-list">{renderList(amenities_list)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="common-area incubator-slider">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <IncubatorSlider
                data={data}
                contactPerson={contact_person}
              ></IncubatorSlider>
            </div>
          </div>
        </div>
      </div>
      <div className="location-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="location-wrap">
                <div className="product-title location">
                  <a href="#">My Spotlight</a>
                  <h3>Investments</h3>
                  <p>{info.address}</p>
                  <div className="location-btn-fx">
                    <div className="songle-lo-btn">
                      <a className="style-btn" href="#">
                        Contact now
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </div>
                    <div className="songle-lo-btn">
                      <a className="style-btn btn2" href="#">
                        Google Map
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-map">
                <div id="test" className="gmap3">
                  <ContactMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="amen-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="amen-img">
                <img src="/assets/img/amen.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <a href="#">Your Needs</a>
                  <h3>Amenities</h3>
                </div>
                <div className="amen-list">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i>Enhanced cleaning services
                      - commitment to provide a healthy, comfortable workplace
                    </li>
                    <li>
                      <i className="fas fa-check"></i>Touch-free dispensers -
                      For your convenience and comfort, touch-free sanitisers
                      and wipe dispensers
                    </li>
                    <li>
                      <i className="fas fa-check"></i>Enhanced HVAC standards -
                      We have taken steps to bring clean, filtered air
                      circulation throughout our spaces
                    </li>
                    <li>
                      <i className="fas fa-check"></i>Parking - Life’s too short
                      to circle the block looking for a spot.
                    </li>
                    <li>
                      <i className="fas fa-check"></i>Event space - With a sound
                      system and lighting controls, lounges can be converted for
                      members’ meet-ups.
                    </li>
                    <li>
                      <i className="fas fa-check"></i>Showers - For those who
                      cycle to work or enjoy a morning workout,
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="place-area">
        <div className="container">
          <Heading heading="My Spotlight" sub_heading="Investments" />
          <div className="place-active">
            <div className="row">
              <InvestmentSlider data={data} />
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default incubator;

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  if (params.id) {
    const res = await fetch(
      `${BASE_URL}/api/v1/incubator/find?filter=` +
        JSON.stringify({ _id: params.id })
    );
    const post = await res.json();
    return {
      props: {
        incubData: post.data.incubatorData[0] ? post.data.incubatorData[0] : {},
      },
    };
  }
  return { props: {} };
}
export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
