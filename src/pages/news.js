import Loading from '../components/CommonLoader/Loading';
import Layout from '../components/Layout';
import MediaNews from '../components/MediaNews';
import PageBanner from '../components/PageBanner';
import { getAllNews } from '../lib/api';
export const mediaNav = [
  {
    route: '/news',
    title: 'News',
  },
  {
    route: '/events',
    title: 'Events',
  },
  {
    route: '/gallery',
    title: 'Gallery',
  },
];
const News = ({ wpdata }) => {
  const data = wpdata.newsItems.edges;
  return (
    <Layout>
      <PageBanner
        className="hero-area"
        title="Start Networking"
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
          <div class="media-area news">
            <div class="container">
              <div class="row">
                {data.map((item, index) => (
                  <div class="col-lg-6">
                    <MediaNews
                      image={item.node.acf_news?.newsImage?.sourceUrl}
                      title={item.node.title}
                      description={item.node.acf_news?.description}
                      date={item.node.acf_news?.publishedDate}
                      newsIcon={item.node.acf_news?.channelIcon?.sourceUrl}
                      newsLink={item.node.acf_news?.readMore?.url}
                      time={item.node.acf_news?.readTime}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default News;
export const getServerSideProps = async (context) => {
  const wpdata = await getAllNews();
  return {
    props: {
      wpdata: wpdata,
    },
  };
};
