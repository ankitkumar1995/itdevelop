import React from 'react';

const ChallengeDetails = ({ title, logo, data }) => {
  return (
    <div className="even-box">
      <div className="date-wrap">
        <div className="date-heading">
          <h4>{title}</h4>
          <img src={logo} alt="..." />
        </div>
        <div className="date-inner-wrap">
          {data?.map((item, index) => (
            <div
              className={
                data.length - 1 == index ? 'date-inner-fx bdr' : 'date-inner-fx'
              }
              key={index}
            >
              <div className="date-icon">
                <img src={item?.img?.sourceUrl} alt="" />
              </div>
              <div className="date-inner-text">
                <h4>{item?.heading}</h4>
                <p>{item?.subHeading}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
