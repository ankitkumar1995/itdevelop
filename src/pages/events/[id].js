import { Descriptions } from 'antd';
import FlipBannner from '../../components/FlipBanner';
import Layout from '../../components/Layout';
import { getEvent, getEventDetails } from '../../lib/api';

const EventsDetails = ({ wpdata, banner }) => {
  const { title } = wpdata?.event;

  const { commonBanner } = banner?.page;
  const {
    eventDescription,
    eventImage,
    eventDate,
    eventTheme,
    company,
    postEventReport,
  } = wpdata?.event?.acf_events;
  return (
    <Layout>
      <FlipBannner
        title={title}
        bgImage={commonBanner.image}
        eventClass="event"
        pageClass={'single-event'}
      />
      <div className="share-area">
        <div className="container">
          <Descriptions title="Event Details" bordered>
            <Descriptions.Item label="Company" span={3}>
              {company}
            </Descriptions.Item>
            <Descriptions.Item label="Event Date" span={3}>
              {eventDate}
            </Descriptions.Item>
            <Descriptions.Item label="Theme of the Event" span={3}>
              {eventTheme}
            </Descriptions.Item>
            <Descriptions.Item label="description" span={3}>
              <div dangerouslySetInnerHTML={{ __html: eventDescription }} />
            </Descriptions.Item>
            <Descriptions.Item label="Post event report">
              {postEventReport}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Layout>
  );
};
export default EventsDetails;

export const getServerSideProps = async (context) => {
  const wpdata = await getEventDetails(context.query.id);
  const banner = await getEvent();
  return {
    props: {
      wpdata: wpdata ? wpdata : null,
      banner,
    },
  };
};
