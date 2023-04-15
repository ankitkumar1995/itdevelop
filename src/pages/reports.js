import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PageBanner from '../components/PageBanner';
import { getPolicyPage, getPolicyPageKN, getReports } from '../lib/api';
import ReportCard from '../components/Cards/ReportCard';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import Loading from '../components/CommonLoader/Loading';
const reports = ({ wpdata, policyData, policyDataKN }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(policyData);

  const handleData = () => {
    if (router.asPath === '/reports?en') {
      setTData(policyDataKN);
      setPath('kn');
    } else {
      setTData(policyData);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  const [currentCategory, setCurrentCategory] = useState('General');
  const [currentData, setData] = useState(wpdata);
  const categories = ['General', 'Events', 'Funding', 'Incubation', 'Others'];

  useEffect(() => {
    const filtered = filterItems(currentCategory);
    setData(filtered);
  }, [currentCategory]);

  function setCategory(name) {
    setCurrentCategory(name);
  }

  function filterItems(name) {
    return _.filter(wpdata, function (post) {
      return _.some(post.categories.nodes, { name: name });
    });
  }

  const handleInputChange = (event) => {
    //setCurrentCategory('');
    const query = event.target.value;
    const posts = wpdata || [];
    const filteredData = posts.filter((post) => {
      const { title, categories } = post;
      return (
        categories.nodes[0].name === currentCategory &&
        title.toLowerCase().includes(query.toLowerCase())
      );
    });
    setData(filteredData);
  };
  return (
    <Layout handleChange={handleData} path={path}>
      <PageBanner
        reports
        className={'hero-area'}
        bgImage={tdata.page.commonBanner.image.sourceUrl}
        title={tdata.page.commonBanner.title}
        desc={tdata.page.commonBanner.subTitle}
        nav={tdata.page.governmentPolicy.policyNav}
      />
      <Loading />
      <div className="download-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
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
                <div className="polici-wrap">
                  <div className="report-search">
                    <input
                      type="text"
                      placeholder="Search for a report (eg: Elevate call 2)"
                      onChange={handleInputChange}
                    />
                    <span>
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                  <div className="repport-fx">
                    {currentData.map((item) => {
                      return <ReportCard data={item} key={item} />;
                    })}
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

export default reports;

export const getServerSideProps = async (context) => {
  const wpdata = await getReports();
  const policyData = await getPolicyPage();
  const policyDataKN = await getPolicyPageKN();
  return {
    props: {
      wpdata: wpdata.reports.nodes,
      policyData: policyData,
      policyDataKN: policyDataKN,
    },
  };
};
