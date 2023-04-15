import Layout from '../components/Layout';
import FlipBannner from '../components/FlipBanner';
import { getAllDepartments, getAllDepartmentsKN } from '../lib/api';
import IpCentreCard from '../components/Cards/IpCentreCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
const Departments = ({ wpdata, wpdataKN }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/department?en') {
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
  const { title, subTitle, image, bannerButton } = tdata.page.commonBanner;
  return (
    <Layout handleChange={handleData} path={path}>
      <FlipBannner
        menu
        flipMenu={[
          { key: '/', label: 'Home' },
          { key: '/department', label: 'Department' },
        ]}
        classflip="justify-content-center"
        classContent="text-center"
        pageClass="department"
        title={title}
        subTitle={subTitle}
        bgImage={image.sourceUrl}
        siglBtn
        btnText={bannerButton.title}
      />
      <div className="ip-area department">
        <div className="container-fluid">
          <div className="row">
            {tdata.departments.edges.map((item, index) => (
              <IpCentreCard
                class1={'department-card'}
                key={index}
                title={item.node.departments.departmentTitle}
                content={item.node.content}
                pdf={item.node.departments.departmentPdf.mediaItemUrl}
                image={item.node.departments.image.sourceUrl}
                langEn={path}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Departments;
export const getServerSideProps = async () => {
  const wpdata = await getAllDepartments();
  const wpdataKN = await getAllDepartmentsKN();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
    },
  };
};
