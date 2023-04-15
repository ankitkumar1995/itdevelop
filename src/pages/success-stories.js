import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import FlipBannner from '../components/FlipBanner';
import KarnatakaStartup from '../components/Cards/KarnatakaStartup';
import {
  getMoreSuccessStoriesKN,
  getSuccessStoriesPage,
  getSuccessStoriesPageKN,
} from '../lib/api';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import { getMoreSuccessStories } from '../lib/api';
import InfiniteScroll from 'react-infinite-scroll-component';

const BATCH_SIZE = 6;
const SuccesStories = ({ wpdata, data, dataKN, wpdataKN }) => {
  const router = useRouter();
  const [langSwitch, setLangSwitch] = useState(false);
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const [post, setPost] = useState(data.nodes);
  const [fetchMoreDetail, setFetchMoreDetail] = useState(data.pageInfo);
  const getMore = async () => {
    const newPost = await getMoreSuccessStories(
      BATCH_SIZE + post.length,
      fetchMoreDetail.endCursor
    );
    setPost((post) => [...post, ...newPost.successStories.nodes]);
    setFetchMoreDetail(newPost.successStories.pageInfo);
  };
  const getMoreKN = async () => {
    const newPost = await getMoreSuccessStoriesKN(
      BATCH_SIZE + post.length,
      fetchMoreDetail.endCursor
    );
    setPost((post) => [...post, ...newPost.successStories.nodes]);
    setFetchMoreDetail(newPost.successStories.pageInfo);
  };
  const handleData = () => {
    if (router.asPath === '/success-stories?en') {
      setTData(wpdataKN);
      setPost(dataKN.nodes);
      setFetchMoreDetail(dataKN.pageInfo);
      setLangSwitch(true);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPost(data.nodes);
      setFetchMoreDetail(data.pageInfo);
      setLangSwitch(false);
      setPath('en');
    }
  };
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  const { commonBanner, aboutusSuccessStories } = tdata.page;
  return (
    <Layout handleChange={handleData} path={path}>
      <div className="about__success">
        <FlipBannner
          classflip="justify-content-center"
          classContent="text-center"
          title={commonBanner.title}
          subTitle={commonBanner.subTitle}
          bgImage={commonBanner.image}
          classFlip="aboutus-faqs"
          faqs
        />
        <div className="our-story our-tory-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="our-story-wrap">
                  <span>{aboutusSuccessStories.introduction.title}</span>
                  <h5>{aboutusSuccessStories.introduction.subtitle}</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${aboutusSuccessStories.introduction.description}</p>`,
                    }}
                    style={{ textAlign: 'justify' }}
                  />
                </div>
              </div>
              <div className="col-lg-6 order-first order-lg-last">
                <div className="intru-image">
                  <Image
                    src={aboutusSuccessStories.introduction.image.sourceUrl}
                    alt=""
                    width={529}
                    height={672}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="suces-area" style={{ overflow: 'hidden' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product-title sucess-title">
                  <Link href="#">
                    <a>{aboutusSuccessStories.success.title}</a>
                  </Link>
                  <h3>{aboutusSuccessStories.success.subtitle}</h3>
                </div>
              </div>
            </div>
            <InfiniteScroll
              dataLength={post.length}
              next={langSwitch ? getMoreKN : getMore}
              hasMore={fetchMoreDetail.hasNextPage}
              scrollThreshold={0.5}
              loader={
                <div className="loding-wrap pb-3">
                  <p>
                    <i className="fas fa-spinner fa-pulse" />
                    <div>Hang on, loading content</div>
                  </p>
                </div>
              }
              endMessage={
                <div className="loding-wrap pb-3">
                  <p>
                    <div>You have seen it all!</div>
                  </p>
                </div>
              }
            >
              <div className="row">
                <KarnatakaStartup storiesData={post} />
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccesStories;

export const getServerSideProps = async (context) => {
  const wpdata = await getSuccessStoriesPage();
  const wpdataKN = await getSuccessStoriesPageKN();
  const successStoreisData = await getMoreSuccessStories(BATCH_SIZE, null);
  const successStoreisDataKN = await getMoreSuccessStoriesKN(BATCH_SIZE, null);
  return {
    props: {
      wpdata: wpdata,
      wpdataKN: wpdataKN,
      data: successStoreisData.successStories,
      dataKN: successStoreisDataKN.successStories,
    },
  };
};
