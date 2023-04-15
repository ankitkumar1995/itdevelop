import {
  getInnovationHubList,
  getInnovationHubListKN,
  getPartnerCollege,
} from '../../lib/api';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import _ from 'lodash';
import PageBanner from '../../components/PageBanner';
import NainObjective from '../../components/Cards/NainObjective';
import PhaseBox from '../../components/PhaseBox';
import Popup from '../../components/Popup';
import NainPopupBox from '../../components/pop-up/NainPopupBox';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
import Loading from '../../components/CommonLoader/Loading';
const NAIN = ({ wpdata, wpdataKN, partnerCollege }) => {
  const [showModal, setShowModal] = useState(0);
  const getModal = (value) => {
    setShowModal(value);
  };
  const hideModal = (value) => {
    setShowModal(0);
  };
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/innovation-hub/nain?en') {
      setTData(wpdataKN);
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
  const { innovationNav, newAgeInnovationNetworks } = tdata.page.innovationHub;
  const { title, subTitle, image } = tdata.page.commonBanner;
  const [currentCategory, setCurrentCategory] = useState('Phase 1');
  const [currentData, setData] = useState(partnerCollege);
  useEffect(() => {
    const filtered = filterItems(currentCategory);
    setData(filtered);
  }, [currentCategory]);
  function setCategory(name) {
    setCurrentCategory(name);
  }
  function filterItems(name) {
    return _.filter(partnerCollege, function (post) {
      return _.some(post.categories.nodes, { name: name });
    });
  }
  return (
    <Layout handleChange={handleData} path={path}>
      <PageBanner
        className={'hero-area'}
        bgImage={image.sourceUrl}
        title={title}
        desc={subTitle}
        nav={innovationNav}
        reports
      />
      <Loading />
      <div className="ktech-hub-content">
        <div class="tab-content nain">
          <div class="tab-pane fade show active">
            <div class="media-area">
              <div class="container">
                <div class="row">
                  <div className="nain__content">
                    <span>Introduction</span>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: newAgeInnovationNetworks.content,
                      }}
                    />
                  </div>
                </div>
                <div className="nain__objective">
                  <NainObjective
                    item={newAgeInnovationNetworks.nainObjective}
                  />
                </div>

                <div className="partner_colleges">
                  <div className="container mt-5">
                    <div className="partner_college_head">
                      <h2>Partner Colleges</h2>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="download-wrap nain">
                          <ul className="nav download-tabs mb-5">
                            {newAgeInnovationNetworks?.partnerCollegeCategory?.map(
                              (item, index) => (
                                <li className="download-item" key={index}>
                                  <div
                                    className={
                                      item.category === currentCategory
                                        ? 'download-link active'
                                        : 'download-link'
                                    }
                                    onClick={() => setCategory(item.category)}
                                  >
                                    {item.category}
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="nain-table responsive">
                      <div className="our_table">
                        {currentData.map((item, index) => {
                          const {
                            collegeCity,
                            collegeName,
                            collegeWebsite,
                            introTitle,
                            introSubTitle,
                            introduction,
                            sectorAndTechSupport,
                            address,
                            howToApply,
                            duration,
                            website,
                            selectionCriteria,
                            supportProvidedList,
                            gallery,
                            topLogo,
                            costOfIncubation,
                          } = item.partnerCollege;

                          return (
                            <>
                              <PhaseBox
                                city={collegeCity}
                                college={collegeName}
                                website={collegeWebsite.url}
                                handleClick={() => getModal(item.id)}
                              />
                              <Popup
                                show={showModal === item.id}
                                onHide={() => hideModal(item.id)}
                                content={
                                  <NainPopupBox
                                    cif
                                    introTitle={introTitle}
                                    introSubTitle={introSubTitle}
                                    introduction={introduction}
                                    sectorAndTechSupport={sectorAndTechSupport}
                                    address={address}
                                    howToApply={howToApply}
                                    duration={duration}
                                    website={website}
                                    selectionCriteria={selectionCriteria}
                                    supportProvidedList={supportProvidedList}
                                    gallery={gallery}
                                    topLogo={topLogo}
                                    costOfIncubation={costOfIncubation}
                                  />
                                }
                              />
                            </>
                          );
                        })}
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
export default NAIN;
export const getServerSideProps = async (context) => {
  const partnerCollegeData = await getPartnerCollege();
  const wpdata = await getInnovationHubList();
  const wpdataKN = await getInnovationHubListKN();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      partnerCollege: partnerCollegeData.partnerColleges.nodes,
    },
  };
};
