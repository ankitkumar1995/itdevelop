import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PageBanner from '../components/PageBanner';
import ResourceCard from '../components/Cards/ResourceCard';
import OtherResourceCard from '../components/Cards/OtherResourceCard';
import { getResource, getResourceKn } from '../lib/api';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import ProgramSlider from '../components/Sliders/ProgramSlider';

const Resources = ({ wpdata, wpdatakn }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/resources?en') {
      setTData(wpdatakn);
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

  const { otherMaterial, program } = tdata.page.resourcePage;
  const { title, subTitle, image } = tdata.page.commonBanner;
  const otherItem = tdata.otherResourceItems?.edges;

  return (
    <Layout handleChange={handleData} path={path}>
      <PageBanner
        className={'hero-area resource'}
        bgImage={image.sourceUrl}
        title={title}
        desc={subTitle}
      />
      <div className="resource-area align-items-center">
        <div class="prog-area-active owl-carousel">
          <ProgramSlider data={program} />
        </div>
        <div className="other-resources">
          <div className="container" style={{ paddingBottom: '4rem' }}>
            <div className="py-5">
              <h5
                className="text-center resource-title"
                style={{ color: '#1F3C88' }}
              >
                {otherMaterial.title}
              </h5>
              <h2 className="text-center resource-subtitle">
                {otherMaterial.subTitle}
              </h2>
            </div>

            <div className="row align-items-center">
              {otherItem?.map((item, index) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3"
                  key={index}
                >
                  <OtherResourceCard
                    data={item}
                    pdfLogo={otherMaterial?.pdfLogo?.sourceUrl}
                    companyLogo={otherMaterial?.companyLogo?.sourceUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;

export const getServerSideProps = async (context) => {
  const wpdata = await getResource();
  const wpdatakn = await getResourceKn();
  return {
    props: {
      wpdata: wpdata,
      wpdatakn: wpdatakn,
    },
  };
};
