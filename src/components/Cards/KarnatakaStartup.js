import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const KarnatakaStartup = ({ storiesData }) => {
  return (
    <>
      {storiesData.map((item, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="plmp-box success">
            <div
              className="plmp-logo"
              style={{ height: '155px', width: '300px' }}
            >
              <Link href="#">
                <a>
                  <Image
                    src={item.acf_successStories.companyImage.sourceUrl}
                    alt="success stories company logo"
                    width={300}
                    height={150}
                    layout="responsive"
                  />
                </a>
              </Link>
            </div>
            <div className="plmp-content">
              <h5>{item.acf_successStories.companyName}</h5>
              <span>sector: {item.acf_successStories.sector}</span>
              <div className="plmp-list">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.acf_successStories.successContentList,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default KarnatakaStartup;
