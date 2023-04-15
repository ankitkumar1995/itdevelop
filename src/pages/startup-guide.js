import React, { useEffect, useState } from 'react';
import StartNetworking from '../components/Cards/StartNetworking';
import Layout from '../components/Layout';
import FlipBannner from '../components/FlipBanner';
import { getStatrtupGuidePage, getStatrtupGuidePageKN } from '../lib/api';
import CustomAccordion from '../components/accordion/CustomAccordion';
import IncorporateCompany from '../components/IncorporateCompany';
import Link from 'next/link';
import Image from 'next/image';
import ProgramSlider from '../components/Sliders/ProgramSlider';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import ResourceCard from '../components/Cards/ResourceCard';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  alert: {
    backgroundColor: '#120F2D',
    color: '#FFFFFF',
    fontFamily: 'Manrope',
    fontSize: 14,
    letterSpacing: 0.4,
  },
}));
const startupguide = ({ wpdata, wpdataKN }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const [pageClass, setPageClass] = useState('startup-guide');
  const handleData = () => {
    if (router.asPath === '/startup-guide?en') {
      setPageClass('startup-guidekn');
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setPageClass('startup-guide');
      setTData(wpdata);
      setPath('en');
    }
  };
  const router = useRouter();
  const classes = useStyles();
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  const {
    boosterKit,
    contactUs,
    faqs,
    introduction,
    network,

    registerCompany,
    incorporate,
    registrationProcess,
    policyPdf,
    operationalPdf,

    ourMaterials,

    disclaimer,
  } = tdata.page.startupGuide;
  const { title, subTitle, image } = tdata.page.commonBanner;
  return (
    <Layout
      handleChange={handleData}
      path={path}
      pageTitle={'Mission Startup Karnataka - Startup Guide'}
      metaDescription={'This page for Guide startups in karnataka'}
    >
      <div className={`page__overflow ${pageClass}`}>
        <FlipBannner
          startupGuide
          pageClass={`hi startup-guide-page-banner`}
          bgImage={image}
          title={title}
          subTitle={subTitle}
          startupguide
          uploadPdf
          policyPdf={policyPdf}
          operationalPdf={operationalPdf}
          elevate={'startup-guide-btn'}
        />

        <div className="intro-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="intro-containt startup-guide">
                  <span>{introduction.title}</span>
                  <h3>{introduction.subTitle}</h3>
                  <div className="prog-list mt-2">
                    <ul>
                      {introduction.introData.map((item, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          <span>{item.list}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Image
                    src={introduction.brandImage.sourceUrl}
                    layout="fill"
                    alt="bird image"
                    className="intro-bird"
                  />
                </div>
                <Link href={introduction.operationButton.pdf.mediaItemUrl}>
                  <a target="_blank" className="ddf">
                    <Image
                      src={introduction.operationButton.icon.sourceUrl}
                      width="24"
                      height="24"
                      alt="download icon"
                      className="upload__img"
                      style={{ marginRight: '10px' }}
                    />{' '}
                    &nbsp;
                    {introduction.operationButton.title}
                  </a>
                </Link>
              </div>
              <div className="col-lg-6 order-first order-lg-last">
                <div className="intro-img">
                  <Image
                    src={introduction.introImage.sourceUrl}
                    width="480"
                    height="431"
                    alt="Guide image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="over-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <span>{registrationProcess.title}</span>
                  <h3>{registrationProcess.subTitle}</h3>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="over-fl">
                  {registrationProcess.content.map((item, index) => (
                    <div className="single-over" key={index}>
                      <div className="over-icon">
                        <a href="#">
                          <img
                            src={item.image.sourceUrl}
                            // width={60}
                            // height={60}
                            // layout="intrinsic"
                            alt="step images"
                          />
                          <span>
                            <i className="fas fa-chevron-right"></i>
                          </span>
                        </a>
                      </div>
                      <div
                        className="over-text"
                        dangerouslySetInnerHTML={{
                          __html: `<h3>${item.heading}</h3>`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fab-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <span>{incorporate.title}</span>
                  <h3>{incorporate.subTitle}</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 startup">
                <div className="feb-fl incorporate">
                  <IncorporateCompany data={incorporate.content} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reg-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="reg-img">
                  <Image
                    src={registerCompany.image.sourceUrl}
                    width="541"
                    height="432"
                    alt="register company"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="reg-containt">
                  <span>{registerCompany.title}</span>
                  <h3>{registerCompany.subTitle}</h3>
                  <p>{registerCompany.description}</p>
                  <div className="reg-btn">
                    <Link href={registerCompany.policyButton.pdf.mediaItemUrl}>
                      <a className="ddf" target={'_blank'}>
                        <Image
                          src={registerCompany.policyButton.icon.sourceUrl}
                          width="24"
                          height="24"
                          alt="download icon"
                        />
                        &nbsp;{registerCompany.policyButton.title}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="net-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <span>{network.title}</span>
                  <h3>{network.subTitle}</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <StartNetworking data={network.content} />
            </div>
          </div>
        </div>
        <div className="resource-area align-items-center">
          <div className="resource-header">
            <h5 className="text-center resource-title">{ourMaterials.title}</h5>
            <h2 className="text-center resource-subtitle">
              {ourMaterials.subTitle}
            </h2>
          </div>
          <div className="container">
            <div className="row">
              {ourMaterials.contentBox.map((item, index) => (
                <div className="col-lg-6 p-3" key={index}>
                  <ResourceCard
                    title={item?.title}
                    description={item?.description}
                    applyButton={item?.buttonLink?.applyBtn}
                    visitButton={item?.buttonLink?.websiteBtn}
                    pdf={item?.buttonLink?.pdfBtn}
                  />
                </div>
              ))}
            </div>

            <div className="alert-container py-5  ">
              <Card variant="filled" className={classes.alert}>
                <CardContent>
                  <Typography gutterBottom variant="caption">
                    <div
                      style={{ paddingTop: '12px', marginBottom: '-6px' }}
                      dangerouslySetInnerHTML={{ __html: disclaimer }}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="boost-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="reg-containt wd2">
                  <span>{boosterKit.introTitle}</span>
                  <h3>{boosterKit.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: boosterKit.description }}
                  />
                  <div className="reg-btn">
                    <Link href="#">
                      <a className="theme-btn">
                        {boosterKit.button.title}
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 order-first order-lg-last">
                <div class="boost-img">
                  <Image
                    src={boosterKit.image.sourceUrl}
                    width="489"
                    height="369"
                    alt="booster kit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-area">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-title">
                  <span>{faqs.introTitle}</span>
                  <h3>{faqs.title}</h3>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="faq-collaps">
                  <CustomAccordion data={tdata.faqs.nodes} aboutFaqs />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="faq-btn">
                  <Link href={faqs?.button?.url ? faqs.button.url : '#'}>
                    <a class="theme-btn">
                      {faqs?.button?.title}
                      <i class="fas fa-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="toll-area"
          style={{ backgroundImage: `url(${contactUs.image.sourceUrl})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="toll-fl">
                  <div className="toll-containt">
                    <h3>{contactUs.title}</h3>
                    <Link href="#">
                      <a className="theme-btn">{contactUs.button.title}</a>
                    </Link>
                  </div>
                  <div className="toll-btn">
                    {contactUs.tollButton.map((item, index) => (
                      <Link href={`tel:item.button.title`} key={index}>
                        <a>
                          <Image
                            src={item.image.sourceUrl}
                            width={'19'}
                            height={'19'}
                            layout="intrinsic"
                            alt="phone icon"
                          />
                          &nbsp;{item.button.title}
                        </a>
                      </Link>
                    ))}
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

export default startupguide;

export async function getServerSideProps(context) {
  const wpdata = await getStatrtupGuidePage();
  const wpdataKN = await getStatrtupGuidePageKN();
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
    },
  };
}
