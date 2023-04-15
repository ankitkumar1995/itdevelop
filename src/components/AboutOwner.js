const AboutOwner = ({
  title,
  description,
  aboutBtn,
  links,
  totalSeats,
  website,
}) => {
  return (
    <>
      <div className="about-hdn-fx">
        {title && (
          <div className="about-title">
            <h2>{title}</h2>
          </div>
        )}
        {website && (
          <div className="about-link">
            <a
              style={{ fontSize: '23px', fontWeight: '500' }}
              href={website ? website : '#'}
              target="_blank"
            >
              {website}
            </a>
          </div>
        )}
        <div className="about-heding-icon">
          {aboutBtn && (
            <div className="about-btns">
              <a href="#">
                <img src="/assets/img/check.png" />
                <span>{totalSeats} Seats Available</span>
              </a>
            </div>
          )}
          {links && links.profile ? (
            <a href={links && links.profile} target="_blank">
              <i className="fa fa-external-link-alt"></i>
            </a>
          ) : null}
          {links && links.linkedIn ? (
            <a href={links.linkedIn} target="_blank">
              <i className="fab fa-linkedin"></i>
            </a>
          ) : null}
          {links && links.twitter ? (
            <a href={links.twitter} target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
          ) : null}
          {links && links.facebook ? (
            <a href={links.facebook} target="_blank">
              <i className="fab fa-facebook"></i>
            </a>
          ) : null}
        </div>
      </div>
      <div className="about-text">
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </>
  );
};
export default AboutOwner;
