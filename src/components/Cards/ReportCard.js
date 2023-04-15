import React from 'react';

const ReportCard = ({ data }) => {
  const pdfLink = data.pdfLink?.pdf?.mediaItemUrl;
  return (
    <>
      <div className="report-single-box">
        <h5>{data.title}</h5>
        <p>{data.pdfLink.desc} </p>
        <a href={pdfLink} target="__blank">
          <i className="fas fa-download"></i>Download PDF
        </a>
      </div>
    </>
  );
};

export default ReportCard;
