import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getOldEvents, getOldEventsKN } from '../../lib/api';
import { Box, FormControl, MenuItem, Select } from '@material-ui/core';
import ChallengeDetails from '../../components/ChallengeDetails';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
const Idea2POC = ({ wpdata, wpdataKN }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/idea2Poc?en') {
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
  const [label, setLabel] = useState(wpdata[0].title);
  const handleChange = (e) => {
    setLabel(e.target.value);
  };
  return (
    <Layout handleChange={handleData} path={path}>
      <div
        className={`flip-area old-evnt`}
        style={{
          backgroundImage: `url(${tdata[0].commonBanner.image.sourceUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={`flip-fx`}>
                <div className="flip-wrap">
                  <div className={`flip-content`}>
                    <div className="flip-select">
                      <div className="old-event-title">
                        <h2 className="event-heading">
                          'Old Events Check Here' - &nbsp;
                        </h2>
                      </div>
                      <div className="input-select-box">
                        <Box style={{ minWidth: '369px' }}>
                          <FormControl fullWidth>
                            <Select
                              value={label}
                              onChange={handleChange}
                              defaultValue={'about'}
                            >
                              {tdata.map((item, index) => (
                                <MenuItem value={item.title} key={index}>
                                  {item.title}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                    {tdata.map((item, index) => (
                      <>
                        {label === item.title && (
                          <p key={index}>{item.commonBanner.subTitle}</p>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="old-event-area">
        <div className="container">
          <div className="old-event">
            {tdata.map((items, index) => (
              <>
                {label === items.title && (
                  <div className="row">
                    <div className="col-lg-8" key={index}>
                      <div className="share-wrap">
                        <div className="share-top-wrap">
                          <div className="share-imege">
                            <span>
                              <h2>{items.title}</h2>
                            </span>
                            <span className="image-margin">
                              {/* <Image
                        src={challenge.image1?.sourceUrl}
                        alt=""
                        height={180}
                        width={350}
                        /> */}
                            </span>
                          </div>

                          <div>
                            <div className="event-detail-area">
                              <h2>About :</h2>
                              <div className="event-about-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: items.oldEvents.aboutEvent,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="event-detail-area">
                              <h2>Selection Process :</h2>
                              <div className="event-select-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: items.oldEvents.selectionProcess,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {items?.oldEvents?.challengeDetails?.title &&
                      items?.oldEvents?.challengeDetails?.logo &&
                      items?.oldEvents?.challengeDetails?.content && (
                        <div className="col-lg-4">
                          <ChallengeDetails
                            title={items?.oldEvents?.challengeDetails?.title}
                            logo={
                              items?.oldEvents?.challengeDetails?.logo
                                ?.sourceUrl
                            }
                            data={items?.oldEvents?.challengeDetails?.content}
                          />
                        </div>
                      )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="winner-list-area">
        <div className="container">
          <div className="row">
            {wpdata?.map((items, index) => (
              <>
                {items?.title === label && (
                  <div class="col-lg-12" key={index}>
                    <div class="product-title">
                      <a href="#">The Winners</a>
                      <h3>Winners of {items.title}</h3>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="row winner-wrap">
            {wpdata.map((items, index) => (
              <React.Fragment key={index}>
                {items.title === label &&
                  items?.oldEvents?.winnerList?.map((item, index) => (
                    <div
                      className="col-sm-6 col-md-4 col-lg-3 px-2 py-3"
                      key={index}
                    >
                      <div className="winners_box">
                        <div className="winners_content">
                          <h5 className="title-text">{item?.winnerName}</h5>
                          <p className="desc-text">{item?.eventId}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Idea2POC;
export async function getServerSideProps(context) {
  const wpdata = await getOldEvents();
  const wpdataKN = await getOldEventsKN();
  return {
    props: {
      wpdata: wpdata.posts?.nodes?.reverse(),
      wpdataKN: wpdataKN.posts?.nodes?.reverse(),
    },
  };
}
