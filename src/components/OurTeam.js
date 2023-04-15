import React from 'react';
import Image from 'next/image';

const OurTeam = ({ data }) => {
  const wpdata = data.auLeadership;
  return (
    <>
      {wpdata?.category?.map((item, index) => (
        <div className="col-lg-3 col-md-4" key={index}>
          <div className="profi-wp">
            <Image
              src={item.image.sourceUrl}
              alt=""
              width={90}
              height={50}
              className="img"
            />
            <h5>{item.name}</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h5>${item.title}</h5>`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OurTeam;
