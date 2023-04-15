import React, { useState, useEffect } from 'react';
import AboutOwner from '../../../components/AboutOwner';
import IndustryTypeBox from '../../../components/IndustryTypeBox';
import Layout from '../../../components/Layout';
import FlipBanner from '../../../components/FlipBanner';
import Modal from '../NetworkModal';
import _ from 'lodash';
import { BASE_URL } from '../../api/url';
import CommonModalStrap, {
  ModalExample,
} from '../../../components/CommonModalStrap';

const renderList = (data) => {
  const [activeli, setActiveli] = useState(false);
  const [content, setContent] = useState(null);
  useEffect(() => {
    setContent(
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
    );
  }, [activeli]);
  return content;
};

const NetworkStartUpPage = ({ partnersData }) => {
  const [show, setShow] = useState(false);
  const data = {
    name: partnersData?.registration?.partnerInfo?.companyName,
    website: partnersData?.registration?.partnerInfo?.companyWebsite,
    logo: partnersData?.registration?.partnerInfo?.comapnyLogo,
    about: partnersData?.registration?.partnerInfo?.aboutCompany,
    profile: partnersData?.registration?.partnerInfo?.companyWebsite,
    linkedIn: partnersData?.registration?.partnerInfo.comapnyLinkedInUrl,
    twitter: partnersData?.registration?.partnerInfo.comapnyTwitterUrl,
    facebook: partnersData?.registration?.partnerInfo.companyFacebookUrl,
  };

  const partnerData = [
    {
      label: 'Partner Type',
      text: partnersData?.registration?.partnerInfo?.partneringType || 'N/A',
    },
    {
      label: 'Location',
      text:
        (partnersData?.registration?.partnerContactInfo?.cityTown,
        partnersData?.registration?.partnerContactInfo?.state) || 'N/A',
    },
  ];
  const spocDetails = {
    name: partnersData?.registration?.partnerContactInfo?.spocName,
    designation:
      partnersData?.registration?.partnerContactInfo?.contactPersoneDesignation,
    email: partnersData?.registration?.partnerContactInfo?.spocEmail,
    phone: partnersData?.registration?.partnerContactInfo?.spocNumber,
    partnerAddress:
      partnersData?.registration?.partnerContactInfo?.registeredPartnerAddress,
  };
  const services = partnersData?.registration?.partnerInfo?.serviceOffers || [];
  return partnersData.registration ? (
    <Layout
      data={footerData}
      headerData={headerData}
      megaMenuData={megaMenuData}
    >
      <FlipBanner
        flipMenu={[
          { key: '/', label: 'Home' },
          { key: '/network/partner', label: 'Network' },
          { key: '/network/Partner', label: 'Partner' },
          { key: '#', label: data.name },
        ]}
        menu
        pageclassName={'network-banner'}
        bgImage={{ sourceUrl: '/assets/img/st-detail.png' }}
        network
        title={data.name}
        setShow={() => setShow(true)}
        img
        image={data.logo}
        logoClass="partner--logo"
      />
      <CommonModalStrap />
      {/* <Modal
        show={show}
        onClose={() => setShow(!show)}
        //email={data.email}
      ></Modal> */}
      <div className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-wrap">
                <div className="about-link">
                  <a href={data.website ? data.website : '#'} target="_blank">
                    About Partner
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
                      <table className="table table-bordered partner">
                        <tbody>
                          <IndustryTypeBox data={partnerData} />
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
                    <h2>SPOC Details</h2>
                  </div>
                </div>
                <div className="spoc__detail">
                  <div className="spoc_details">
                    <div>
                      <p>
                        <b
                          style={{
                            textTransform: 'capitalize',
                            fontSize: '20px',
                          }}
                        >
                          {spocDetails.name}
                        </b>
                      </p>
                      <p> {spocDetails.designation}</p>
                      <p> {spocDetails.phone}</p>
                      <p> {spocDetails.email}</p>
                    </div>
                    <p style={{ paddingLeft: '10px', paddingBottom: '20px' }}>
                      <b>Address:</b>
                      {spocDetails.partnerAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="amen-wrap">
                <div className="product-title location amen">
                  <h3>Service Offering</h3>
                </div>
                <div className="amen-list">{renderList(services)}</div>
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
      `${BASE_URL}/api/v1/partner/find?filter=` +
        JSON.stringify({ _id: params.id })
    );
    const post = await res.json();
    return {
      props: {
        partnersData: post.data.partnerData[0] ? post.data.partnerData[0] : {},
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
