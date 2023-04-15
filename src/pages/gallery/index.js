import React, { useState } from 'react';
import { mediaNav } from '../news';
import Layout from '../../components/Layout';
import PageBanner from '../../components/PageBanner';
import { getGalleries } from '../../lib/api';
import Modal from '../../components/Modal';
import Image from 'next/image';
import Loading from '../../components/CommonLoader/Loading';
const Gallery = ({ wpdata }) => {
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
      {wpdata.galleries?.edges.reverse().map((item, index) => (
        <div className="event__gallery" style={{ margin: '50px' }}>
          <div className="container">
            <div className="event-g__title">
              <p style={{ color: '#1F3C88', fontSize: '16px' }}>
                {item.node.gallery?.title}
              </p>
              <h1>{item.node.gallery?.subTitle}</h1>
            </div>
            <div class="photoArray">
              <div>
                <Image
                  src={item.node.gallery?.gallery[0]?.images?.sourceUrl}
                  width={570}
                  height={571}
                />
              </div>
              <div>
                <Image
                  src={item.node.gallery?.gallery[1]?.images?.sourceUrl}
                  width={273}
                  height={273}
                />
              </div>
              <div>
                <div className="gallery__img-link">
                  <a href={`/gallery/${item.node.id}`}>
                    <div>
                      <Image
                        src={item.node.gallery?.gallery[2]?.images?.sourceUrl}
                        width={273}
                        height={273}
                      />
                    </div>
                    <div className="img-g-text">
                      <h3>{item.node.gallery?.gallery?.length} +</h3>
                      <p>View all photos</p>
                    </div>
                  </a>
                </div>
              </div>
              <div>
                <Image
                  src={item.node.gallery?.gallery[3]?.images?.sourceUrl}
                  width={571}
                  height={273}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};
export default Gallery;

export const getServerSideProps = async (context) => {
  const wpdata = await getGalleries();
  return {
    props: {
      wpdata: wpdata,
    },
  };
};
