import { mediaNav } from '../news';
import Layout from '../../components/Layout';
import PageBanner from '../../components/PageBanner';
import { getAllEvents } from '../../lib/api';
import MediaEvent from '../../components/MediaEvent';
import Loading from '../../components/CommonLoader/Loading';

const Events = ({ wpdata }) => {
  return (
    <Layout>
      <PageBanner
        className="hero-area"
        title="Latest updates & events"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        bgImage="assets/img/media/hero.png"
        nav={mediaNav}
      />
      <Loading />
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div class="media-area events">
            <div class="container">
              <div class="row">
                {wpdata?.events?.nodes?.map((item, index) => (
                  <MediaEvent
                    key={index}
                    title={item?.title}
                    description={item.acf_events?.eventDescription}
                    eventDate={item.acf_events?.eventDate}
                    eventType={item.acf_events?.eventType}
                    image={item.acf_events?.eventImage?.sourceUrl}
                    slug={item.id}
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
