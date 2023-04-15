import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const IpCardData = ({
  image,
  ipCenterContent,
  contactDetails,
  index,
  emails,
  websites,
  contactDetailsHeading,
}) => {
  return (
    <div className="col-md-6" key={index}>
      <div className="single-ip">
        <div className="ip-img">
          <Image src={image} alt="" width={630} height={290} />
        </div>
        <div className="ip-containt scroll ip-box">
          <div>
            <div className="ip-top-containt">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<h3>${ipCenterContent}</h3>`,
                }}
              ></div>
            </div>
            <div className="ip-text">
              <h3>{contactDetailsHeading.contactTitle}</h3>{' '}
              <div
                dangerouslySetInnerHTML={{
                  __html: contactDetails,
                }}
              />
              {emails && (
                <>
                  <h3 className="py-1">{contactDetailsHeading.emailTitle}</h3>
                  <div style={{ marginTop: '-10px' }}>
                    {emails.map((item, index) => (
                      <div key={index}>
                        <Link href={`mailto:${item.email}`}>
                          <a>{item.email}</a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {websites && (
                <>
                  <h3 className="py-1">{contactDetailsHeading.websiteTitle}</h3>
                  <div style={{ marginTop: '-10px' }}>
                    {websites.map((item, index) => (
                      <div key={index}>
                        <Link
                          href={item && item.website ? item.website.url : '#'}
                        >
                          <a target={'_blank'}>{item?.website?.title}</a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="ip-link">
          {emails && (
            <Link href={`mailto:${emails[0].email}`}>
              <a>{emails[0].email}</a>
            </Link>
          )}
          {emails === null && websites && (
            <Link href={websites[0].website.url}>
              <a target={'_blank'}>{websites[0].website?.title}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default IpCardData;
