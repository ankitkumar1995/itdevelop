const OurSocialFeedsBox = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="social-wp">
            <div className="social-fx">
              <div className="social-icon">
                <a href="#">
                  <img src="assets/img/start-up/twi.png" alt="" />
                </a>
              </div>
              <div className="social-hdn-con">
                <h5>{item.title}</h5>
                <a href="#">{item.subTitle}</a>
              </div>
            </div>
            <div className="social-text">
              <p>{item.description} </p>
            </div>
            <div className="social-link">
              <div dangerouslySetInnerHTML={{ __html: item.socialLink }} />
            </div>
            <div className="social-img">
              <img src={item.image.sourceUrl} alt="" />
            </div>
            <div className="social-btm">
              <span>{item.date}</span>
            </div>
          </div>
          {/* {index === 0 || index === 2 ? (
            // <div className="social-last-img">
            //   <img src={item.lastImage && item.lastImage.sourceUrl} alt="" />
            // </div>
          ) : null} */}
        </div>
      ))}
    </>
  );
};
export default OurSocialFeedsBox;
