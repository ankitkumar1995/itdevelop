import { useEffect, useState } from 'react';
import AboutOwner from '../../../components/AboutOwner';
import IndustryTypeBox from '../../../components/IndustryTypeBox';
import Layout from '../../../components/Layout';
import FlipBanner from '../../../components/FlipBanner';
import Modal from '../NetworkModal';
import _ from 'lodash';
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
const NetworkStartUpPage = (props) => {
  const [show, setShow] = useState(false);
  const data = {
    name: props.props?.registeration?.investorIntro.fullName,
    tagline: props.props?.registeration?.investorIntro.tagline,
    website: props.props?.registeration?.investorIntro.firmWebsiteUrl,
    logo: props.props?.registeration?.investorIntro.logo,
    about: props.props?.registeration?.investorIntro.aboutInvestor,
    profile: props.props?.registeration?.investorIntro.companyWebsiteUrl,
    youtubeUrl: props.props?.registeration?.investorIntro.youtubeUrl,
    linkedIn: props.props?.registeration?.investorIntro.linkedInUrl,
    twitter: props.props?.registeration?.investorIntro.twitterUrl,
    facebook: props.props?.registeration?.investorIntro.facebookUrl,
    email: props.props?.registeration?.investorIntro.email,
  };

  const industryData = [
    {
      label: 'Type',
      text: props.props?.registeration?.investorIntro?.investorType,
    },
    {
      label: 'Location',
      text: `${props.props?.registeration?.investorIntro?.cityTown}, ${props.props?.registeration?.investorIntro?.state}`,
    },
    {
      label: 'Investment Range',
      text: props.props?.registeration?.investmentDetails?.investmentRange,
    },
    {
      label: 'Portfolio',
      text: props.props?.registeration?.investmentDetails?.presentPortfolio,
    },
    {
      label: 'Funded',
      text: props.props?.registeration?.investmentDetails?.totalAmoutFunded,
    },
  ];
  const skills =
    props.props?.registeration?.investmentDetails?.preferredTechnology;

  const industryOrSector =
    props.props?.registeration?.investmentDetails?.preferredIndustrySector;
  const companyData = [];
  _.forEach(props.props?.registeration?.portfolioCompanies, (company) => {
    companyData.push({
      name: company.name,
      tagline: company.type,
      tagline1: company.type,
      about: company.aboutCompnay,
      viewProfile: '/network/startups/' + company.id,
      image: company.logo,
    });
  });
  return (
    <Layout>
      <FlipBanner
        flipMenu={[
          { key: '/', label: 'Home' },
          { key: '/network/investor', label: 'Network' },
          { key: '/network/investor', label: 'Investors' },
          { key: '#', label: data.name },
        ]}
        menu
        setShow={() => setShow(true)}
        network
        pageClass={'network-banner investor'}
        title={data.name}
        sub_title={data.tagline}
        bgImage={{ sourceUrl: '/assets/img/network-list.png' }}
        img
        image={data.logo}
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
                <div className="about-link">
                  <a href={data.website ? data.website : '#'} target="_blank">
                    Introduction
                  </a>
                </div>
                <AboutOwner
                  links={{
                    profile: data.profile,
                    twitter: data.twitterUrl,
                    linkedIn: data.linkedIn,
                    facebook: data.facebook,
                  }}
                  title={`About ${data.name}`}
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
              <div class="about-wrap">
                <div className="about-hdn-fx">
                  <div className="about-title">
                    <h2>What I look for in startups</h2>
                  </div>
                </div>
                <div className="about-text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Adipiscing commodo elit at imperdiet dui accumsan.
                    Vulputate enim nulla aliquet porttitor. Ut porttitor leo a
                    diam sollicitudin. Imperdiet proin
                  </p>
                </div>
                <div style={{ paddingLeft: '11px' }}>
                  <h5>1. Technology</h5>
                  <div className="pill-wrap pb-5">
                    <div class="pill-btn-fx">
                      {_.map(skills, (item) => (
                        <div className="pill-single-btn">
                          <a href="#">{item}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ paddingLeft: '11px' }}>
                  <h5>2. Industry/Sectors</h5>
                  <div className="pill-wrap pb-5">
                    <div class="pill-btn-fx">
                      {_.map(industryOrSector, (item) => (
                        <div className="pill-single-btn">
                          <a href="#">{item}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div class="amen-wrap">
                <div class="product-title location amen">
                  <h3>Investment criteria</h3>
                </div>
                <div class="amen-list">
                  {renderList(
                    props.props.registeration.investment_criteria
                      ? props.props.registeration.investment_criteria
                      : []
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="amen-wrap">
                <div class="product-title location amen">
                  <h3>How to pitch</h3>
                </div>
                <div class="amen-list">
                  {renderList(props.props.registeration.howToPitch)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {companyData && companyData.length ? (
        <div className="investor-row ">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-12">
                <div class="about-wrap pt-3">
                  <h2>Portfolio companies</h2>
                </div>
                <div className="vox-wrap fnder-lt display-flex pb-5">
                  {_.map(companyData, (item) => (
                    <div className="single-box mt-2">
                      <div className="box-top-fx">
                        <div className="box-logo">
                          <a href="#">
                            <img src="/assets/img/f.png" alt="" />
                          </a>
                        </div>
                        <div className="box-sty">
                          <img src="/assets/img/badge.svg" />
                          <span className="pr-1">{item.badge_text}</span>
                        </div>
                      </div>
                      <div className="box-content">
                        <h3>{item.name}</h3>
                        <p>{item.tagline}</p>
                        <span>{item.tagline1}</span>
                        <h5>{item.about}</h5>
                        <a href={item.viewProfile}>
                          View profile <img src="/assets/img/left-arrow.svg" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className=" mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div class="amen-wrap">
                <div class="product-title location amen">
                  <h3>Whom to reach</h3>
                </div>
                <div class="amen-list">
                  {renderList(props.props.registeration.whomToReach)}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="amen-wrap">
                <div class="product-title location amen">
                  <h3>How to apply</h3>
                </div>
                <div class="amen-list">
                  {renderList(props.props.registeration.howToApply)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NetworkStartUpPage;

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${BASE_URL}/api/v1/investor/find?filter=` +
      JSON.stringify({ _id: params.id })
  );
  const post = await res.json();
  // Pass post data to the page via props
  return {
    props: {
      props: post.data.investorData[0] ? post.data.investorData[0] : {},
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
