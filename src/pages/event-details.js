import FlipBannner from '../components/FlipBanner';
import Layout from '../components/Layout';
import SocialIcon from '../components/SocialIcon';
import { getEventPage } from '../lib/api';

const EventsDetails = ({ wpdata }) => {
  const { title, subTitle, image } = wpdata.commonBanner;
  const { eventInfo, shareEvent, shareEventSocially, speakers, whatYouLearn } =
    wpdata.eventDetail;
  return (
    <Layout>
      <FlipBannner
        title={title}
        subTitle={subTitle}
        bgImage={image}
        menu
        flipMenu={['Media', 'Webinar', 'Webinar on Startup businss management']}
        registerBtn
        eventClass="event"
      />
      <div className="share-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="share-wrap">
                <div className="share-top-wrap">
                  <div className="share-imege">
                    <img src="assets/img/media-event/share.png" alt="" />
                  </div>
                  <div className="share-content">
                    <h4>{shareEvent.title}</h4>
                    <p>{shareEvent.description}</p>
                  </div>
                  <div className="share-this">
                    <h5>{shareEventSocially.title}</h5>
                    <div className="share-icon">
                      <SocialIcon data={shareEventSocially.socialIcon} />
                    </div>
                    <div className="learn-wrap">
                      <h4>{whatYouLearn.title}</h4>
                      <div className="learn-list-fx">
                        <div className="learn-list">
                          <ul>
                            {whatYouLearn.leftList.map((item, index) => (
                              <li key={index}>
                                <a href="#">
                                  <i className={item.icon.title}></i>
                                  {item.learnText}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="learn-list">
                          <ul>
                            {whatYouLearn.rightList.map((item, index) => (
                              <li key={index}>
                                <a href="#">
                                  <i className="fas fa-check"></i>{' '}
                                  {item.learnText}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="speakers-wrap">
                      <h4>{speakers.title}</h4>
                      <div className="speakers-inne">
                        {speakers.aboutSpeaker.map((item, index) => (
                          <div className="speakers-fx" key={index}>
                            <div className="speakers-img">
                              <img src={item.image.sourceUrl} alt="" />
                            </div>
                            <div className="speakers-content">
                              <h4>{item.name}</h4>
                              <span>{item.designation}</span>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="even-box">
                <div className="date-wrap">
                  <div className="date-heading">
                    <h4>{eventInfo.title}</h4>
                    <img src={eventInfo.image.sourceUrl} alt="..." />
                  </div>
                  <div className="date-inner-wrap">
                    {eventInfo.content.map((item, index) => (
                      <div
                        className={
                          eventInfo.content.length - 1 == index
                            ? 'date-inner-fx bdr'
                            : 'date-inner-fx'
                        }
                        key={index}
                      >
                        <div className="date-icon">
                          <a href="#">
                            <img src={item.image.sourceUrl} alt="" />
                          </a>
                        </div>
                        <div className="date-inner-text">
                          <h4>{item.heading}</h4>
                          <p>{item.subHeading}</p>
                        </div>
                      </div>
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
export default EventsDetails;

export const getServerSideProps = async (context) => {
  const wpdata = await getEventPage();
  return {
    props: {
      wpdata: wpdata.page,
    },
  };
};
