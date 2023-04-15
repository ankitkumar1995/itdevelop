import CommonBanner from '../components/CommonBannner';
import Layout from '../components/Layout';
import Partners from '../components/Partners';
import Image from 'next/image';
import { getBoosterPage, getBoosterPageKN } from '../lib/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import Link from 'next/link';

const BoosterKit = ({ wpdata, wpdataKN }) => {
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/booster-kit#en') {
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}#${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const { partnerData, services } = tdata.boosterKit;
  const { title, subTitle, image } = tdata.commonBanner;
  const { btnTitle, pdf } = tdata.boosterKit.bannerPdf;
  const classes = (index) => {
    if (index == 1) {
      return 'color2';
    }
    if (index == 2) {
      return 'color3';
    }
    if (index == 3) {
      return 'color4';
    }
  };
  return (
    <Layout handleChange={handleData} path={path}>
      <CommonBanner
        boots
        pdfBtnTitle={btnTitle}
        pdfBtnUrl={pdf?.mediaItemUrl}
        image={image.sourceUrl}
        title={title}
        subTitle={subTitle}
      />
      <div className="tool-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tool-containt">
                <span>{services.title}</span>
                <h3>{services.subTitle}</h3>
                <p>{services.description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            {services.serviceBox.map((item, index) => (
              <>
                <div className="col-lg-4 col-md-6 apply-booster" key={index}>
                  <div className="single-tool">
                    {index === services.serviceBox.length - 1 ? (
                      <>
                        <Image
                          src={item.topImage.sourceUrl}
                          className="t-top"
                          width={16}
                          height={9}
                          layout="responsive"
                          quality={100}
                        />
                        <div className="apply-booster-content">
                          <Link
                            href={
                              services.applyBoosterBtnUrl
                                ? services.applyBoosterBtnUrl.url
                                : '#'
                            }
                          >
                            <a>
                              <h3
                                className="text-start"
                                dangerouslySetInnerHTML={{ __html: item.title }}
                              />
                              <i className="fas fa-arrow-right apply_booster_btn"></i>
                            </a>
                          </Link>
                        </div>
                        <Image
                          src={item.bottomImage.sourceUrl}
                          className="t-boot"
                          layout="fill"
                          quality={100}
                        />
                      </>
                    ) : (
                      <>
                        <div className="text1">{index + 1}</div>
                        <Image
                          className="t-top"
                          src={item.topImage.sourceUrl}
                          layout="fill"
                          quality={90}
                        />
                        <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                        <Image
                          className="t-boot"
                          src={item.bottomImage.sourceUrl}
                          width={800}
                          height={450}
                          layout="responsive"
                          quality={65}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        {partnerData.map((item, index) => (
          <Partners
            key={index}
            class1={classes(index)}
            index={index}
            title={item.title}
            image={item.image.sourceUrl}
            description={item.description}
            button={item.button}
            partnerLength={partnerData.length - 1}
          />
        ))}
      </div>
    </Layout>
  );
};
export default BoosterKit;

export const getServerSideProps = async (context) => {
  const wpdata = await getBoosterPage();
  const wpdataKN = await getBoosterPageKN();
  return {
    props: {
      wpdata: wpdata.page,
      wpdataKN: wpdataKN.page,
    },
  };
};
