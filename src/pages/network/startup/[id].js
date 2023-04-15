import React, { useState, useEffect } from 'react';
import AboutOwner from '../../../components/AboutOwner';
import IndustryTypeBox from '../../../components/IndustryTypeBox';
import Layout from '../../../components/Layout';
import FlipBanner from '../../../components/FlipBanner';
import _ from 'lodash';
import { BASE_URL } from '../../api/url';
import Link from 'next/link';
const renderList = (data) => {
  const [activeli, setActiveli] = useState(false);
  const [content, setContent] = useState(null);
  useEffect(() => {
    setContent(
      <>
        {data && data.length === 0 ? (
          <div>
            <p>Data is not available</p>
          </div>
        ) : (
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
        )}
      </>
    );
  }, [activeli]);
  return content;
};

const NetworkStartUpPage = ({ startupData }) => {
  const [show, setShow] = useState(false);
  const data = {
    name: startupData?.registeration?.nameAndIntro.incorporatedCompanyName,
    tagline: startupData?.registeration?.nameAndIntro.companyTagLine,
    website: startupData?.registeration?.nameAndIntro?.companyWebsiteUrl,
    logo: startupData?.registeration?.nameAndIntro.companyLogo,
    about: startupData?.registeration?.industryInfo.aboutCompanyProfile,
    productOrServiceDescription:
      startupData?.registeration?.industryInfo.productOrServiceDescription,
    profile: startupData?.registeration?.nameAndIntro.companyWebsiteUrl,
    youtubeUrl: startupData?.registeration?.nameAndIntro?.youtubeUrl,
    linkedIn: startupData?.registeration?.nameAndIntro.linkedInUrl,
    twitter: startupData?.registeration?.nameAndIntro.twitterUrl,
    facebook: startupData?.registeration?.nameAndIntro.facebookUrl,
    hiring: startupData?.registeration?.employeeInfo?.stillHiring,
    rating: false,
    email: startupData.registeration.nameAndIntro.email,
  };

  const founders = [];
  _.forEach(
    startupData?.registeration?.companyFounderDetail?.founderDetails,
    (founder) => {
      founders.push({
        name: founder.founderName,
        designation: founder.founderDesignation,
        linkedIn: founder.founderLinkedIn,
        twitter: founder.founderTwitter,
        image: founder.founderProfileImage,
      });
    }
  );

  const industryData = [
    {
      label: 'Industry',
      text: startupData.registeration
        ? startupData.registeration.industryInfo?.industrySectorType
        : 'N/A',
    },
    {
      label: 'Location',
      text: 'N/A',
    },
    {
      label: 'Experience',
      text: 'N/A',
    },
    {
      label: 'Employee size',
      text: startupData.registeration
        ? startupData.registeration.employeeInfo?.permanantWorkers
        : 'N/A',
    },
    {
      label: 'Funding',
      text: startupData.registeration
        ? startupData.registeration.fundingInfo?.fundingType
        : 'N/A',
    },
  ];

  const market_needs = startupData.marketNeeds ? startupData.marketNeeds : [];
  const accomplishments_list = startupData.accomplishments
    ? startupData.accomplishments
    : [];
  const funding_list = startupData.funding ? startupData.funding : [];
  const people_list = startupData.people ? startupData.people : [];
  return startupData.registeration ? (
    <Layout>
      <FlipBanner
        flipMenu={[
          { key: '/', label: 'Home' },
          { key: '/network/startup', label: 'Network' },
          { key: '/network/startup', label: 'Startups' },
          { key: '#', label: data.name },
        ]}
        menu
        rating={data.rating}
        hiring={data.hiring}
        network
        pageClass={'network-banner startup'}
        setShow={() => setShow(true)}
        title={data.name}
        sub_title={data.tagline}
        bgImage={{ sourceUrl: '/assets/img/st-detail.png' }}
        watchVideo={data?.youtubeUrl ? true : false}
        videoLink={data.youtubeUrl ? data.youtubeUrl : '#'}
        image={'/assets/img/Bitmap-1.png'}
        img
        image={startupData?.registeration?.nameAndIntro?.companyLogo}
      />
      {/* <Modal
        show={show}
        onClose={() => setShow(!show)}
        email={data.email}
      ></Modal> */}
      <div className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-wrap">
                <div className="about-title">
                  <Link href="#">
                    <a>{`About ${data.name}`}</a>
                  </Link>
                </div>
                <AboutOwner
                  links={{
                    profile: data.profile,
                    twitter: data.twitterUrl,
                    linkedIn: data.linkedIn,
                    facebook: data.facebook,
                  }}
                  website={data?.website ? data.website : '#'}
                  description={data.about ? data.about : 'N/A'}
                />
                <div className="table-wrap">
                  <div className="tabl-wd">
                    <div className="tabl-sc">
                      <table className="table table-bordered">
                        <tbody>
                          <IndustryTypeBox data={industryData} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="about-wrap">
                <div className="about-hdn-fx">
                  <div className="about-title">
                    <h2>Key product/service</h2>
                  </div>
                </div>
                <div className="about-text">
                  <p>{data.productOrServiceDescription}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <h3>Market needs</h3>
                </div>
                <div className="amen-list">{renderList(market_needs)}</div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <h3>Accomplishments</h3>
                </div>
                <div className="amen-list">
                  {renderList(accomplishments_list)}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="about-wrap">
                <div className="about-hdn-fx">
                  <div className="about-title">
                    <h2>Founders & advisors</h2>
                  </div>
                </div>
                {/*<div className="about-text">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Adipiscing commodo elit at imperdiet dui accumsan. Vulputate enim nulla aliquet porttitor. Ut porttitor leo a diam sollicitudin.
        Imperdiet proin</p>
                  </div>*/}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="vox-wrap fnder-lt display-flex">
                {founders.map((founder) => (
                  <div className="single-box">
                    <div className="box-top-fx">
                      <div className="mx-auto">
                        <a href="#">
                          <img src={founder.image} alt="Profile" />
                        </a>
                      </div>
                    </div>
                    <div className="box-content align-center">
                      <h3>{founder.name}</h3>
                      <p>{founder.designation}</p>
                      <div className="social-links pb-3">
                        <a href={founder.twitter} target="_blank">
                          <i className="fab fa-twitter twitter mr"></i>
                        </a>
                        <a href={founder.linkedIn} target="_blank">
                          <i className="fab fa-linkedin linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <h3>Funding</h3>
                </div>
                <div className="amen-list">
                  <ul className="px-3">{renderList(funding_list)}</ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <h3>People</h3>
                </div>
                <div className="amen-list">
                  <ul className="px-3">{renderList(people_list)}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <h1>No user</h1>
  );
};
export default NetworkStartUpPage;

export async function getStaticProps({ params }) {
  if (params.id) {
    const res = await fetch(
      `${BASE_URL}/api/v1/startup/find?filter=` +
        JSON.stringify({ _id: params.id })
    );
    // const res = await fetch(`${BASE_URL}/api/v1/startup/find?`)
    const post = await res.json();
    return {
      props: {
        startupData: post.data.startupData[0] ? post.data.startupData[0] : {},
      },
    };
  }
  return { props: null };
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
