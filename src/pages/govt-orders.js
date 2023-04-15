import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PageBanner from '../components/PageBanner';
import { getGovtOrders, getPolicyPage, getPolicyPageKN } from '../lib/api';
import PolicyCard from '../components/Cards/PolicyCard';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import Loading from '../components/CommonLoader/Loading';

const govtorders = ({ wpdata, policyData, policyDataKN }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(policyData);
  const handleData = () => {
    if (router.asPath === '/govt-orders#en') {
      setTData(policyDataKN);
      setPath('kn');
    } else {
      setTData(policyData);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}#${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  const [currentData, setData] = useState(wpdata);

  const handleInputChange = (event) => {
    //setCurrentCategory('');
    const query = event.target.value;
    const posts = wpdata || [];
    const filteredData = posts.filter((post) => {
      const { title } = post;
      return title.toLowerCase().includes(query.toLowerCase());
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
                <div className="polici-wrap">
                  <div className="report-search">
                    <input
                      type="text"
                      placeholder="Search for a Government order (eg: Policy Updates)"
                      onChange={handleInputChange}
                    />
                    <span>
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                  <div className="polici-fx">
                    {currentData.map((item) => {
                      return <PolicyCard data={item} key={item} />;
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

export default govtorders;

export const getServerSideProps = async (context) => {
  const wpdata = await getGovtOrders();
  const policyData = await getPolicyPage();
  const policyDataKN = await getPolicyPageKN();
  return {
    props: {
      wpdata: wpdata.governmentOrders.nodes,
      policyData: policyData,
      policyDataKN: policyDataKN,
    },
  };
};
