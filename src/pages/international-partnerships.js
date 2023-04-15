import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import FlipBannner from '../components/FlipBanner';
import {
  getInternationalPartnerPage,
  getInternationalPartnerPageKN,
} from '../lib/api';
import CommonModalStrap from '../components/CommonModalStrap';
import { slugify } from '../utils/slugify';
import { useRouter } from 'next/router';

const InternationalPartnerships = ({ wpdata, wpdataKN }) => {
  const [pageClass, setPageClass] = useState('international-en');
  const router = useRouter();
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/international-partnerships?en') {
      setPageClass('international-kn');
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setPageClass('international-en');
      setTData(wpdata);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const data = tdata.page.internationalPartnerships;
  const { title, subTitle, image, bannerButton } = tdata.page.commonBanner;
  const [show, setShow] = useState(false);
  return (
    <Layout handleChange={handleData} path={path}>
      <div className={pageClass}>
        <FlipBannner
          className="hie"
          classflip="justify-content-center"
          classContent="text-center"
          title={title}
          sub_title={subTitle}
          bgImage={image}
          btnText={bannerButton?.title}
          applyUrl={'#ip-area'}
          singleBtn
        />
        <div className="ip-area international" id={'ip-area'}>
          <div className="container">
            <div className="row">
              {data.interPartner.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="single-ip">
                    <div className="ip-img">
                      {item.image?.sourceUrl && (
                        <Image
                          src={item.image.sourceUrl}
                          alt=""
                          width={630}
                          height={290}
                        />
                      )}
                    </div>
                    <div className="ip-containt scroll international">
                      <div className="ip-top-containt-inter horiz">
                        <div className="interp-heading d-flex">
                          <h3>{item.heading.title}</h3>
                          <div style={{ height: '20px', padding: '3px 9px' }}>
                            <Image
                              src={item.heading.image?.sourceUrl}
                              width={80}
                              height={20}
                              layout="intrinsic"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="ip-text inter">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description?.substr(0, 600) + '...',
                          }}
                        />
                        <div className="downld interp">
                          <Link
                            href={
                              item.readPdf?.pdf
                                ? item.readPdf.pdf.mediaItemUrl
                                : '#'
                            }
                          >
                            <a target="_blank">
                              {item.readPdf?.title}
                              <i className="fas fa-download px-2"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="ip-link">
                      <Link href="#">
                        <a onClick={() => setShow(true)}>{data.enquireText}</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CommonModalStrap
        title={'Contact Details'}
        show={show}
        modalClass={'interp-page'}
        message={data.contactDetails}
        internationalPartnership
        startupLogo
        onClose={() => setShow()}
      />
    </Layout>
  );
};

export default InternationalPartnerships;

export const getServerSideProps = async (context) => {
  const wpdata = await getInternationalPartnerPage();
  const wpdataKN = await getInternationalPartnerPageKN();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
    },
  };
};
