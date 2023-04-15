import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PageBanner from '../../components/PageBanner';
import Popup from '../../components/Popup';
import {
  getCOE,
  getInnovationHubList,
  getInnovationHubListKN,
} from '../../lib/api';
import IpCentreBox from '../../components/IpCentreBox';
import NainPopupBox from '../../components/pop-up/NainPopupBox';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
import Loading from '../../components/CommonLoader/Loading';
const COE = ({ wpdata, wpdataKN, coeData }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/innovation-hub/coe?en') {
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
        <div class="ip-area coe">
          <div class="container">
            <div class="row">
              {coeData.cOES.nodes.map((item, index) => {
                const {
                  cardTitle,
                  cardTitleKn,
                  cardDescription,
                  cardEmail,
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
                } = item.coe;
                return (
                  <>
                    <IpCentreBox
                      title={path === 'kn' ? cardTitleKn : cardTitle}
                      description={cardDescription}
                      image={cardImage.sourceUrl}
                      email={cardEmail}
                      index={index}
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
                          introSubTitle={introSubTitle}
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
export default COE;
export const getServerSideProps = async (context) => {
  const wpdata = await getInnovationHubList();
  const wpdataKN = await getInnovationHubListKN();
  const coeData = await getCOE();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      coeData: coeData,
    },
  };
};
