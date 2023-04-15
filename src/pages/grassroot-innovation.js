import React, { useEffect, useState } from 'react';
import FlipBannner from '../components/FlipBanner';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Partners from '../components/Partners';
import { getGrassroot, getGrassrootKN } from '../lib/api';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';

function GrassrootInnovation({ wpdata, wpdataKN }) {
  const [pageClass, setPageClass] = useState('grassroot-en');
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);

  const handleData = () => {
    if (router.asPath === '/grassroot-innovation#en') {
      setTData(wpdataKN);
      setPath('kn');
      setPageClass('grassroot-kn');
    } else {
      setTData(wpdata);
      setPath('en');
      setPageClass('grassroot-en');
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}#${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const { title, image } = tdata.page.commonBanner;
  const { bannerPdf, grassrootIntroduction, grassrootObjectives } =
    tdata.page.grassroot;
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
    <div className={pageClass}>
      <Header
        handleChange={handleData}
        path={path}
        headerClass="contact"
        headerMenu="contact_us"
      />
      <FlipBannner
        bgImage={image.sourceUrl}
        title={title}
        pdfUrl={bannerPdf.pdf.mediaItemUrl}
        menu
        flipMenu={[
          { key: '/', label: 'Home' },
          { key: '/grassroot-innovation', label: 'Grassroot' },
        ]}
        flipMenuClass="grassroot"
        classContent="grassroot"
        downloadBtn
        downBtnText={bannerPdf?.btnText}
        custPdfBtnClass="down__btn-we"
        acustPdfBtnClass="adown__btn-we"
        pageClass="grassroot"
      />
      <div className="tool-area grassroot">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tool-containt">
                <h5>{grassrootIntroduction.title}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: grassrootIntroduction.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {grassrootObjectives.content.map((item, index) => (
          <Partners
            grassroot
            key={index}
            pageClass="grassroot"
            class1={classes(index)}
            index={index}
            image={item.image.sourceUrl}
            description={item.description}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default GrassrootInnovation;
export async function getServerSideProps() {
  const res = await getGrassroot();
  const resKN = await getGrassrootKN();
  return {
    props: {
      wpdata: res,
      wpdataKN: resKN,
    },
  };
}
