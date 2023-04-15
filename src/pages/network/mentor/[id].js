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

const NetworkStartUpPage = ({ mentorData }) => {
  const [show, setShow] = useState(false);
  const data = {
    name: mentorData.registeration?.intro.name,
    tagline: mentorData.registeration?.intro?.tagline,
    aboutMentor: mentorData.registeration?.intro.aboutMentor,
    linkedIn: mentorData.registeration?.intro.linkedInUrl,
    twitter: mentorData.registeration?.intro.twitterProfile,
    facebook: mentorData.registeration?.intro.facebookUrl,
    youtubeUrl: mentorData.registeration?.intro.inductionYoutubeVideo,
    profilePhoto: mentorData.registeration?.intro.profilePhoto,
    email: mentorData.registeration?.intro.email,
  };

  const skills = mentorData?.registeration?.experience?.skills;
  const vertical = mentorData?.registeration?.experience?.vertical;
  const companyMentoring =
    mentorData?.registeration?.experience?.companiesMentor;
  const industryData = [
    {
      label: 'Industry',
      text: mentorData.registeration.experience.industry,
    },
    {
      label: 'Location',
      text:
        mentorData.registeration.intro.city +
        ', ' +
        mentorData.registeration.intro.state,
    },
    {
      label: 'Experience',
      text: mentorData.registeration.experience.totalWorkExp,
    },
    {
      label: 'Specialization',
      text: mentorData.registeration.experience.specialization,
    },
    {
      label: 'Mentored',
      text: mentorData.registeration.experience.companiesMentor,
    },
  ];
  return (
    <Layout>
      <FlipBanner
        flipMenu={[
          { key: '/', label: 'Home' },
          { key: '/network/mentor', label: 'Network' },
          { key: '/network/mentor', label: 'Mentors' },
          { key: '#', label: data.name },
        ]}
        network
        menu
        setShow={() => setShow(true)}
        pageClass={'network-banner sigle-mentor'}
        title={data.name}
        watchVideo={data?.youtubeUrl ? true : false}
        videoLink={data.youtubeUrl}
        sub_title={data.tagline}
        bgImage={{ sourceUrl: '/assets/img/mentor-detail.png' }}
        img
        image={mentorData.registeration.intro.profilePhoto}
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
                  <a href="#">Introduction</a>
                </div>
                <AboutOwner
                  title={`About ${data.name}`}
                  description={data.aboutMentor}
                  links={{
                    profile: data.profile,
                    twitter: data.twitter,
                    linkedIn: data.linkedIn,
                    facebook: data.facebook,
                  }}
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
                <div className="about-hdn-fx mentors">
                  <div className="about-title">
                    <h2>Skills</h2>
                  </div>
                </div>
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
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div class="about-wrap">
                <div className="about-hdn-fx mentors">
                  <div className="about-title">
                    <h2>Vertical</h2>
                  </div>
                </div>

                <div className="pill-wrap pb-5">
                  <div class="pill-btn-fx">
                    {_.map(vertical, (item) => (
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
              <div class="amen-wrap">
                <div class="product-title location amen">
                  <h3 style={{ fontWeight: '500' }}>
                    Top problems I help with
                  </h3>
                </div>
                <div class="amen-list  pb-5">
                  {renderList(mentorData.topMentorsGuidance)}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div class="about-wrap">
                  <div className="about-hdn-fx mentors">
                    <div className="about-title">
                      <h2>K-Startups I’m mentoring</h2>
                    </div>
                  </div>

                  <div className="pill-wrap pb-5">
                    <div class="pill-btn-fx">
                      {_.map(companyMentoring, (item) => (
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
                <div class="amen-wrap">
                  <div class="product-title location amen">
                    <h3 style={{ fontWeight: '500' }}>My availability</h3>
                  </div>
                  <div class="amen-list">
                    {renderList(
                      mentorData?.registeration?.availability?.daysInWeek
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 px-5">
                <div class="amen-wrap">
                  <div class="product-title location amen">
                    <h3 style={{ fontWeight: '500' }}>Mentoring mode</h3>
                  </div>
                  <div class="amen-list">
                    <ul className="px-3">
                      <li>
                        <img src="/assets/img/check.svg" />
                        {
                          mentorData.registeration.availability
                            .preferredWorkMode
                        }
                      </li>
                    </ul>
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
export default NetworkStartUpPage;

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${BASE_URL}/api/v1/mentor/find?filter=` +
      JSON.stringify({ _id: params.id })
  );
  const post = await res.json();
  // Pass post data to the page via props
  return {
    props: {
      mentorData: post.data.mentorData[0],
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
