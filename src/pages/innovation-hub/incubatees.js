import {
  getIncubateesList,
  getInnovationHubList,
  getInnovationHubListKN,
} from '../../lib/api';
import IncubateesCard from '../../components/Cards/IncubatessCard';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import _ from 'lodash';
import PageBanner from '../../components/PageBanner';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
import Loading from '../../components/CommonLoader/Loading';
const Incubatees = ({ wpdata, wpdataKN, incubateData }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/innovation-hub/incubatees?en') {
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

  const [currentCategory, setCurrentCategory] = useState(
    'GoK Nasscom Warehouse'
  );
  const [currentData, setData] = useState(incubateData);
  const categories = [
    'GoK Nasscom Warehouse',
    'C-Camp',
    '91 Springboard',
    'Bangalore Bioinnovation Centre',
    'Mobile 10X Startup Hub',
    'CoE-IoT',
  ];
  useEffect(() => {
    const filtered = filterItems(currentCategory);
    setData(filtered);
  }, [currentCategory]);
  function setCategory(name) {
    setCurrentCategory(name);
  }
  function filterItems(name) {
    return _.filter(incubateData, function (post) {
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
      <div className="download-area incubatees">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="download-wrap">
                <ul className="nav download-tabs mb-5">
                  {categories.map((item, index) => (
                    <li className="download-item" key={index}>
                      <div
                        className={
                          item === currentCategory
                            ? 'download-link active'
                            : 'download-link'
                        }
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            {currentData.map((item, index) => (
              <IncubateesCard
                title={item.incubateesDetail.cardTitle}
                image={item.incubateesDetail.icon.sourceUrl}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Incubatees;
export const getServerSideProps = async (context) => {
  const wpdata = await getInnovationHubList();
  const incubateData = await getIncubateesList();
  const wpdataKN = await getInnovationHubListKN();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      incubateData: incubateData.incubatees.nodes,
    },
  };
};
