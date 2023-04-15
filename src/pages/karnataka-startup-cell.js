import React, { useEffect, useState } from 'react';
import {
  getKstartupCell,
  getContactusKN,
  getContactus,
  getKstartupCellKN,
} from '../lib/api';
import Layout from '../components/Layout';
import FlipBanner from '../components/FlipBanner';
import CustomTabs from '../components/CustomTabs';
import MemberBox from '../components/MemberBox';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Link from 'next/link';
import ContactusOffice from '../components/Cards/ContactusOffice';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';

const KarnatakStartupCell = ({
  wpdata,
  wpdataKN,
  contactdata,
  contactdataKN,
}) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const [pageClass, setPageClass] = useState('kcell');
  const [kcontactdata, setContactData] = useState(contactdata);

  const [focus, setFocus] = useState(false);
  const { officeLocations } = kcontactdata;
  const { title, subTitle, image, bannerButton } = tdata?.commonBanner;
  const { toolContent, objectContent } = tdata.karnatakStartupCell.objective;
  const { startupKarnatakaCell, monitoringAndReviewCommittie, startupCouncil } =
    tdata.karnatakStartupCell.startupCellPanel;
  const { pdfContent } =
    tdata.karnatakStartupCell.startupCellPanel.monitoringAndReviewCommittie
      .content;
  const { content } =
    tdata.karnatakStartupCell.startupCellPanel.startupKarnatakaCell;
  const { ourCommitment } = tdata.karnatakStartupCell;
  const cardContent =
    tdata.karnatakStartupCell.startupCellPanel.startupCouncil.content;

  const handleData = () => {
    if (
      router.asPath === '/karnataka-startup-cell?en' ||
      router.asPath === '/karnataka-startup-cell?karnataka-startup-cell'
    ) {
      setPageClass('kcellkn');
      setTData(wpdataKN);
      setContactData(contactdataKN);
      setPath('kn');
    } else if (
      router.asPath === `/karnataka-startup-cell?startup-karnataka-cell`
    ) {
      setPageClass('kcellkn');
      setTData(wpdataKN);
      setContactData(contactdataKN);
      setPath('kn');
    } else if (
      router.asPath ===
      `/karnataka-startup-cell?monitoring-and-review-committie`
    ) {
      setPageClass('kcellkn');
      setTData(wpdataKN);
      setContactData(contactdataKN);
      setPath('kn');
    } else if (router.asPath === `/karnataka-startup-cell?startup-council`) {
      setPageClass('kcellkn');
      setTData(wpdataKN);
      setContactData(contactdataKN);
      setPath('kn');
    } else {
      setPageClass('kcell');
      setTData(wpdata);
      setContactData(contactdata);
      setPath('en');
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  return (
    <Layout handleChange={handleData} path={path}>
      <FlipBanner
        title={title}
        subTitle={subTitle}
        bgImage={image}
        singleBtn
        btnText={bannerButton.title}
        targetHtmlEle="#ourcommittee"
        eduClass="eduClassK"
      />
      <div className={`${pageClass}`}>
        <div class="obj-area">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="tool-containt">
                  <span>{toolContent.title}</span>
                  <h3>{toolContent.subTitle}</h3>
                  <p>{toolContent.description}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-7">
                <div class="obj-img">
                  <img src={objectContent.image.sourceUrl} alt="" />
                </div>
              </div>
              <div class="col-lg-5">
                <div class="obj-containt">
                  <span>{objectContent.title}</span>
                  <h3>{objectContent.subTitle}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${objectContent.description}</p>`,
                    }}
                  ></div>
                  <Link href={objectContent.button.url}>
                    <a class="theme-btn">
                      {objectContent.button.title}{' '}
                      <i class="fas fa-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pla-map-area">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="map-k-img">
                  <img src={ourCommitment.image.sourceUrl} alt="" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k-map-containt">
                  <div class="section-title">
                    <span>{ourCommitment.title}</span>
                    <h3>{ourCommitment.subTitle}</h3>
                  </div>
                  <div class="all-pla">
                    {ourCommitment.counterContent.map((item, index) => (
                      <div class="single-pla">
                        <div class="pla-left">
                          <div class="pla-icon">
                            <Link href="#">
                              <a>
                                <img
                                  src={item?.icon?.sourceUrl}
                                  alt="k-cell commitment"
                                />
                              </a>
                            </Link>
                          </div>
                          <div class="pla-text">
                            <h3>
                              <CountUp
                                decimal={1}
                                start={focus ? 1 : null}
                                end={' ' + item.countData}
                                duration={5}
                                suffix={item.postfix}
                                prefix={item.prefix + '-'}
                              >
                                {({ countUpRef, start }) => (
                                  <VisibilitySensor
                                    onChange={(isVisible) => {
                                      if (isVisible) {
                                        setFocus(true);
                                      }
                                    }}
                                  >
                                    <span ref={countUpRef} />
                                  </VisibilitySensor>
                                )}
                              </CountUp>
                            </h3>
                            <p>{item.title}</p>
                          </div>
                        </div>
                        <div class="pla-right">
                          <Link href={item.linBtn.url}>
                            <a>
                              {item?.linBtn?.title}
                              <i class="fas fa-arrow-right"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div class="pla-btn">
                    <Link href={ourCommitment.button.url}>
                      <a class="theme-btn">
                        {ourCommitment.button.title}{' '}
                        <i class="fas fa-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel_content" id="ourcommittee">
          <div className="container">
            <div className="content_wrapper">
              <span>{tdata.karnatakStartupCell.startupCellPanel.title}</span>
              <h1>{tdata.karnatakStartupCell.startupCellPanel.subtitle}</h1>
            </div>

            <div class="moni-area">
              <div class="container">
                <CustomTabs className="k-startup-cell">
                  <div label={startupKarnatakaCell.label}>
                    <div className="row moni_tab_content">
                      <MemberBox
                        contactDetails
                        allData={startupKarnatakaCell}
                        tab={'startup-karnataka-cell'}
                      />
                    </div>
                    <div className="horiz-line">
                      <hr style={{ opacity: '1', color: '#F2F2F2' }} />
                    </div>
                    <div className="office-area k-startup-cell">
                      <div className="container" style={{ maxWidth: '1140px' }}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="office-fl">
                              <ContactusOffice data={officeLocations} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div label={monitoringAndReviewCommittie.label}>
                    <div className="download-pdf">
                      <Link
                        href={`${
                          monitoringAndReviewCommittie.pdf
                            ? monitoringAndReviewCommittie.pdf.mediaItemUrl
                            : '#'
                        }`}
                      >
                        <a>
                          <i className={`fas fa-file-download pdf`}></i>
                          {monitoringAndReviewCommittie.title}
                        </a>
                      </Link>
                    </div>
                    <div className="row moni_tab_content">
                      <MemberBox
                        data={pdfContent}
                        tab={'monitoring and review'}
                      />
                    </div>
                    <div className="horiz-line">
                      <hr style={{ opacity: '1', color: '#F2F2F2' }} />
                    </div>
                    <div className="office-area k-startup-cell">
                      <div className="container" style={{ maxWidth: '1140px' }}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="office-fl">
                              <ContactusOffice data={officeLocations} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div label={startupCouncil.label}>
                    <div className="download-pdf">
                      <Link
                        href={`${
                          startupCouncil.pdf
                            ? startupCouncil.pdf.mediaItemUrl
                            : '#'
                        }`}
                      >
                        <a>
                          <i className={`fas fa-file-download pdf`}></i>
                          {startupCouncil.title}
                        </a>
                      </Link>
                    </div>
                    <div className="row moni_tab_content">
                      <MemberBox data={cardContent} tab={'startup-council'} />
                    </div>
                  </div>
                </CustomTabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KarnatakStartupCell;

export const getServerSideProps = async (context) => {
  const wpdata = await getKstartupCell();
  const wpdataKN = await getKstartupCellKN();
  const contactdata = await getContactus();
  const contactdataKN = await getContactusKN();
  return {
    props: {
      wpdata: wpdata.page,
      wpdataKN: wpdataKN.page,
      contactdata: contactdata.page.contactus,
      contactdataKN: contactdataKN.page.contactus,
    },
  };
};