import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import PageBanner from '../components/PageBanner';
import { getIncentives, getPolicyPage, getPolicyPageKN } from '../lib/api';
import IncentiveCard from '../components/Cards/IncentiveCard';
import _ from 'lodash';
import TabIncentive from '../components/custom-tab/TabIncentive';

import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import Loading from '../components/CommonLoader/Loading';
import { getSession } from 'next-auth/client';
import { BASE_URL } from './api/url';

const policy = ({ wpdata, policyData, policyDataKN, registerData }) => {
  const { certificateStatus } = registerData || {};
  const router = useRouter();
  const [incentivePath, setIncentivePath] = useState(
    router.asPath?.split('?')[1] === slugify(wpdata?.category[0]?.label)
      ? slugify(wpdata?.category[0]?.label)
      : router.asPath?.split('?')[1]
  );
  console.log(registerData);
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(policyData);
  const handleData = () => {
    if (router.asPath === `/incentives?${incentivePath}?en`) {
      setTData(policyDataKN);
      setPath('kn');
    } else {
      setTData(policyData);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(
      `${router.pathname}?${slugify(incentivePath)}?${slugify(path)}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [path, incentivePath]);

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
                <TabIncentive setIncentivePath={setIncentivePath} path={path}>
                  {wpdata.category.map((item, index) => (
                    <div label={item.label} key={index}>
                      <div className="download-tab-content-area">
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            <IncentiveCard
                              data={item.content}
                              key={index}
                              certificateStatus={certificateStatus}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabIncentive>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default policy;

export const getServerSideProps = async (context) => {
  const wpdata = await getIncentives();
  const policyData = await getPolicyPage();
  const policyDataKN = await getPolicyPageKN();
  const session = await getSession({ req: context.req });
  const { accessToken } = session || {};

  const response = session
    ? await fetch(`${BASE_URL}/api/v1/startup/${session?.id}`, {
        headers: { Authorization: 'Bearer ' + accessToken },
      })
    : {};

  const registerData = session ? await response.json() : {};
  return {
    props: {
      wpdata: wpdata.page.incentives,
      policyData: policyData,
      policyDataKN: policyDataKN,
      registerData: registerData?.data || {},
    },
  };
};
