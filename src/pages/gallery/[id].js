import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getGalleriesById } from '../../lib/api';
const GalleryDetails = ({ wpdata }) => {
  const { title, subTitle, gallery } = wpdata?.gallery?.gallery;
  return (
    <div style={{ margin: '2rem 0 2rem 2rem' }}>
      <div style={{ marginTop: '3rem' }}>
        <Link href="/gallery">
          <a>
            <i style={{ color: '#000' }} className="fa fa-angle-left fa-2x"></i>
          </a>
        </Link>
      </div>

      <div className="gal-det-heading">
        <p style={{ color: '#1F3C88', fontSize: '16px' }}>{title}</p>
        <h1>{subTitle}</h1>
      </div>

      <div style={{ margin: '0 auto' }} class="gallery-det-wrapper">
        {gallery?.map((item, index) => {
          if (index === 0 || index % 3 === 0) {
            return (
              <div>
                <Image src={item.images.sourceUrl} width="740" height="490" />
              </div>
            );
          } else {
            return (
              <div>
                <Image src={item.images.sourceUrl} width="365" height="240" />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default GalleryDetails;
export const getServerSideProps = async (context) => {
  const galleryId = context.query.id;
  const wpdata = await getGalleriesById(galleryId);
  return {
    props: {
      wpdata: wpdata ? wpdata : null,
    },
  };
};
