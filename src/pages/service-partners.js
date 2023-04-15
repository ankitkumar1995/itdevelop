import React, { useState } from 'react';
import FlipBannner from '../components/FlipBanner';
import Layout from '../components/Layout';
import { getBoosterKitPartnerMore } from '../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import { BASE_URL } from './api/url';
import CommonModalStrap from '../components/CommonModalStrap';
import FundingAccordion from '../components/accordion/FundingAccordion';
import BoosterKitAccordian from '../components/accordion/BoosterKitAccordian';
const BATCH_SIZE = 4;
const ServicePartners = ({ data, page, session }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('');
  const [post, setPost] = useState(data.nodes);
  const [fetchMoreDetail, setFetchMoreDetail] = useState(data.pageInfo);
  const getMore = async () => {
    const newPost = await getBoosterKitPartnerMore(
      BATCH_SIZE + post.length,
      fetchMoreDetail.endCursor
    );
    setPost((post) => [...post, ...newPost.boosterKitPartners.nodes]);
    setFetchMoreDetail(newPost.boosterKitPartners.pageInfo);
  };
  const { title, subTitle, image } = page.commonBanner;
  const handleClick = async (em1, em2) => {
    const res = await axios
      .post(
        `${BASE_URL}/api/v1/boosterkit/create`,
        {
          startupId: session?.id,
          startupName: session?.user?.name,
          startupLogo: 'img url',
          startupFullName: 'kits@gmail.com',
          startupPhone: 9999999999,
          startupEmail: session?.user?.email,
        },
        {
          headers: {
            Authorization: 'Bearer ' + session.accessToken,
          },
        }
      )
      .then(async (res) => {
        if (res) {
          await setShow(true);
          await setMessage('You have successfully apply for partner');
        }
      })
      .catch(async (err) => {
        await setShow(true);
        await setMessage('Some Api issue');
      });
  };
  return (
    <div>
      <Layout>
        <FlipBannner
          aboutuspageClass={'about-flip'}
          classContent={'service__partner'}
          title={title}
          subTitle={subTitle}
          bgImage={image}
        />
        <div>
          <InfiniteScroll
            dataLength={post.length}
            next={getMore}
            hasMore={fetchMoreDetail.hasNextPage}
            scrollThreshold={0.6}
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
            <div className="ip-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <BoosterKitAccordian
                      data={post}
                      setShow={setShow}
                      setMessage={setMessage}
                      setRedirect={setRedirect}
                      session={session}
                      handleClick={handleClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </Layout>
      <CommonModalStrap
        modalClass="service-partner"
        title="Service Partners"
        servicePartner
        show={show}
        message={message}
        redirect={redirect}
        onClose={() => setShow(false)}
      />
    </div>
  );
};

export default ServicePartners;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const res = await getBoosterKitPartnerMore(BATCH_SIZE, null);
  return {
    props: {
      page: res.page,
      data: res.boosterKitPartners,
      session,
    },
  };
}
