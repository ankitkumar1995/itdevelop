import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PageBanner from '../../components/PageBanner';
import Popup from '../../components/Popup';
import {
  getCif,
  getInnovationHubList,
  getInnovationHubListKN,
} from '../../lib/api';
import NainPopupBox from '../../components/pop-up/NainPopupBox';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
import Loading from '../../components/CommonLoader/Loading';

const CIF = ({ wpdata, wpdataKN, cifData }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/innovation-hub/cif?en') {
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
  const { innovationNav } = tdata.page.innovationHub;
  const { title, subTitle, image } = tdata.page.commonBanner;
  const [showModal, setShowModal] = useState(0);
  const getModal = (value) => {
    setShowModal(value);
  };
  const hideModal = (value) => {
    setShowModal(0);
  };
  return (
    <Layout handleChange={handleData} path={path}>
      <Loading />
      <PageBanner
        className={path == 'en' ? 'hero-area' : 'hero-area kn'}
        bgImage={image.sourceUrl}
        title={title}
        desc={subTitle}
        nav={innovationNav}
        reports
      />
      <div className="ktech-hub-content">
        <div class="tab-content cif">
          <div class="tab-pane fade show active">
            <div class="media-area cif">
              <div class="container">
                <div class="row">
                  {cifData.cifs.nodes.map((item, index) => {
                    const {
                      cardTitle,
                      cardTitleKn,
                      cardDescription,
                      cardButton,
                      cardButtonKn,
                      cardImage,
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
                      costOfIncubationList,
                    } = item.cif;
                    return (
                      <>
                        <div class="col-lg-3 col-md-6 mt-3">
                          <div class="sucess-wrap">
                            <div class="single-box sucess-ss">
                              <div class="box-image suc-img">
                                <img src={cardImage.sourceUrl} alt="" />
                              </div>
                              <div class="box-content scs">
                                <div className="box-cotnt">
                                  <h3>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          path === 'kn'
                                            ? cardTitleKn
                                            : cardTitle,
                                      }}
                                    />
                                  </h3>
                                  <p>{cardDescription}</p>
                                </div>
                                <div className="cif-link">
                                  <Link href="#">
                                    <a onClick={() => getModal(item.id)}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            path === 'kn'
                                              ? cardButtonKn?.title
                                              : cardButton.title,
                                        }}
                                      />
                                      <i class="fas fa-arrow-right"></i>
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                              costOfIncubationList={costOfIncubationList}
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
    </Layout>
  );
};
export default CIF;
export const getServerSideProps = async (context) => {
  const wpdata = await getInnovationHubList();
  const wpdataKN = await getInnovationHubListKN();
  const cifData = await getCif();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      cifData: cifData,
    },
  };
};
