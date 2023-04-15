const MediaNews = ({
  image,
  title,
  description,
  date,
  time,
  newsIcon,
  newsLink,
}) => {
  return (
    <div class="media-wrap mx-4">
      <div className="media-fx">
        <div className="media-image media-mobile-img">
          <img src={newsIcon} alt="" />
        </div>
        <div className="media-content">
          <a href={'#'} target="__blank">
            <h2>{title}</h2>
          </a>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <span>
            Published on {date} {time && <span className="mda">{time}</span>}
          </span>
        </div>
        <div className="media-image">
          <img src={newsIcon} alt="" />
        </div>
      </div>
    </div>
  );
};
export default MediaNews;
