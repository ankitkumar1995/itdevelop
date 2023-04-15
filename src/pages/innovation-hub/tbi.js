import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PageBanner from '../../components/PageBanner';
import Popup from '../../components/Popup';
import {
  getInnovationHubList,
  getInnovationHubListKN,
  getTBI,
} from '../../lib/api';
import NainPopupBox from '../../components/pop-up/NainPopupBox';
import InnovationhubCard from '../../components/Cards/InnovationhubCard';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
import Loading from '../../components/CommonLoader/Loading';
const TBI = ({ wpdata, wpdataKN, tbiData }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/innovation-hub/tbi?en') {
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
        <div class="media-area tbi">
          <div class="container">
            <div class="row">
              {tbiData.tBIS.nodes.map((item, index) => {
                const {
                  cardTitle,
                  cardTitleKn,
                  cardDescription,
                  cardBtn,
                  cardBtnKn,
                  cardImage,
                  introTitle,
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
                } = item.tbi;

                return (
                  <>
                    <InnovationhubCard
                      title={path === 'kn' ? cardTitleKn : cardTitle}
                      description={cardDescription}
                      button={path === 'kn' ? cardBtnKn : cardBtn}
                      image={cardImage.sourceUrl}
                      handleClick={() => getModal(item.id)}
                    />
                    <Popup
                      show={showModal === item.id}
                      onHide={() => hideModal(item.id)}
                      content={
                        <NainPopupBox
                          cif
                          introTitle={introTitle}
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
    </Layout>
  );
};
export default TBI;
export const getServerSideProps = async (context) => {
  const wpdata = await getInnovationHubList();
  const wpdataKN = await getInnovationHubListKN();
  const tbiData = await getTBI();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      tbiData: tbiData,
    },
  };
};
