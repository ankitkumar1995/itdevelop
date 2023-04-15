import FlipBannner from '../components/FlipBanner';
import Layout from '../components/Layout';
import CustomAccordion from '../components/accordion/CustomAccordion';
import { getFaqs, getFaqsKN } from '../lib/api';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
const AboutFAQ = ({ wpdata, wpdataKN }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(path === 'kn' ? wpdataKN : wpdata);
  const handleData = () => {
    if (router.asPath === '/faqs?en') {
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const { categories } = tdata.page.aboutusFaqs;
  const [currentCategory, setCurrentCategory] = useState(categories[0].item);
  const [currentData, setData] = useState(tdata.faqs.nodes);
  const { title, subTitle, image } = tdata.page.commonBanner;

  useEffect(() => {
    const filtered = filterItems(currentCategory);
    setData(filtered);
    // setCurrentCategory(categories[0].item);
  }, [currentCategory, path]);
  function setCategory(name) {
    setCurrentCategory(name);
  }
  function filterItems(name) {
    return _.filter(tdata.faqs.nodes, function (post) {
      return _.some(post.categories.nodes, { name: name });
    });
  }
  return (
    <Layout handleChange={handleData} path={path}>
      <FlipBannner
        classflip="justify-content-center"
        classContent="text-center"
        title={title}
        subTitle={subTitle}
        bgImage={image}
      />
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
                          item.item === currentCategory
                            ? 'download-link active'
                            : 'download-link'
                        }
                        onClick={() => setCategory(item.item)}
                      >
                        {item.item}
                      </div>
                    </li>
                  ))}
                </ul>
                <div class="faq-collaps">
                  <CustomAccordion aboutFaqs data={currentData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default AboutFAQ;
export const getServerSideProps = async (context) => {
  const wpdata = await getFaqs();
  const wpdataKN = await getFaqsKN();
  return {
    props: {
      wpdata: wpdata ? wpdata : null,
      wpdataKN: wpdataKN ? wpdataKN : null,
    },
  };
};
