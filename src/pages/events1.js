import { mediaNav } from './news';
import Layout from '../components/Layout';
import PageBanner from '../components/PageBanner';
import { getAllEvents } from '../lib/api';
import MediaEvent from '../components/MediaEvent';

const Events = ({ wpdata }) => {
  const data = wpdata.events.edges;
  return (
    <Layout>
      <PageBanner
        className="hero-area"
        title="Latest updates & events"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        bgImage="assets/img/media/hero.png"
        nav={mediaNav}
      />
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div class="media-area">
            <div class="container">
              <div class="row">
                {data.map((item, index) => (
                  <MediaEvent
                    title={item.node.title}
                    description={item.node.content}
                    currentDate={item.node.acf_events.currentDate}
                    eventDate={item.node.acf_events.eventDate}
                    eventType={item.node.acf_events.eventType}
                    image={
                      item.node.acf_events.eventImage &&
                      item.node.acf_events.eventImage.sourceUrl
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Events;
export const getServerSideProps = async (context) => {
  const wpdata = await getAllEvents();
  return {
    props: {
      wpdata: wpdata,
    },
  };
};
