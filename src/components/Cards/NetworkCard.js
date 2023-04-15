import React from 'react';

const NetworkCard = (props) => {
  const { company, data } = props;
  return (
    <div className={`single-box mt-2`}>
      <div className="box-top-fx">
        {company.twitter || props.userType === 'mentor' ? (
          <div
            className={data.img_type === 'icon' ? 'box-logo' : 'mentor mx-auto'}
          >
            <a href="#">
              <img src={company.img} alt="Logo" />
            </a>
          </div>
        ) : (
          <div className={data.img_type === 'icon' ? 'box-logo' : 'mx-auto'}>
            <a href="#">
              <img src={company.img} style={{ width: '100px' }} alt="Logo" />
            </a>
          </div>
        )}
        {company.rating ? (
          <div className="box-sty">
            <img src="assets/img/badge.svg" />
            <span className="pr-1">Top 100, 2018</span>
          </div>
        ) : null}
      </div>
      <div
        className={
          data.align === 'center' ? 'box-content align-center' : 'box-content'
        }
      >
        <h3>{company.title} </h3>
        {data.align ? (
          <div className="social-links pb-3">
            <a href={company.twitter} target="_blank">
              <i className="fab fa-twitter twitter mr"></i>
            </a>
            <a href={company.linkedin} target="_blank">
              <i className="fab fa-linkedin linkedin"></i>
            </a>
          </div>
        ) : null}
        <p>{company.sub_line_1}</p>
        <span>{company.sub_line_2}</span>
        <h5>{company.tagline}</h5>
        <a href={company.profile}>
          View profile{' '}
          <i className="fas fa-arrow-right" style={{ fontSize: '16px' }}></i>
        </a>
      </div>
    </div>
  );
};

export default NetworkCard;
