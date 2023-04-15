import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import {
  getInnovationHubList,
  getInnovationHubListKN,
  getKTECHHUB,
} from '../../lib/api';
import Popup from '../../components/Popup';
import NainPopupBox from '../../components/pop-up/NainPopupBox';
import _ from 'lodash';
import PageBanner from '../../components/PageBanner';
import KtechHubCard from '../../components/Cards/KtechHubCard';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
import Loading from '../../components/CommonLoader/Loading';

const KTechHub = ({ wpdata, wpdataKN, ktechhubData }) => {
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
    if (router.asPath === '/innovation-hub/k-tech-hub?en') {
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const { innovationNav, newAgeInnovationNetworks } = tdata.page.innovationHub;
  const { title, subTitle, image } = tdata.page.commonBanner;
  return (
    <>
      {pageLoading === true ? (
        'loading'
      ) : (
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
            <div class="tab-content ktech">
              <div class="tab-pane fade show active">
                <div class="media-area">
                  <div class="container">
                    <div class="row k-tech">
                      {ktechhubData.kTechHubs.nodes.map((item, index) => {
                        const {
                          cardTitle,
                          cardTitleKn,
                          cardDescription,
                          cardBtn,
                          cardBtnKn,
                          cardImage,
                          introTitle,
                          introSubTitle,
                          introduction,
                          sectorAndTechSupport,
                          address,
                          howToApply,
                          duration,
                          website,
                          contactPerson,
                          selectionCriteria,
                          supportProvidedList,
                          gallery,
                          topLogo,
                          costOfIncubation,
                          addressAndMainInfo,
                        } = item.kTech;
                        return (
                          <>
                            <div className="col-lg-3 col-md-4 col-sm-6 mt-3">
                              <KtechHubCard
                                image={cardImage && cardImage.sourceUrl}
                                title={path === 'kn' ? cardTitleKn : cardTitle}
                                description={cardDescription}
                                button={
                                  path === 'kn'
                                    ? cardBtnKn?.title
                                    : cardBtn.title
                                }
                                path={path}
                                handleClick={() => getModal(item.id)}
                              />
                            </div>
                            {
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
                                    contactPerson={contactPerson}
                                    selectionCriteria={selectionCriteria}
                                    supportProvidedList={supportProvidedList}
                                    gallery={gallery}
                                    topLogo={topLogo}
                                    costOfIncubation={costOfIncubation}
                                    addressAndMainInfo={addressAndMainInfo}
                                  />
                                }
                              />
                            }
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};
export default KTechHub;
export const getServerSideProps = async (context) => {
  const wpdata = await getInnovationHubList();
  const wpdataKN = await getInnovationHubListKN();
  const ktechhubData = await getKTECHHUB();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      ktechhubData: ktechhubData,
    },
  };
};
