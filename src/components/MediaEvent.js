const MediaEvent = ({ image, title, eventDate, description, slug, button }) => {
  return (
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="meadia-evant-wrap mt-3">
        <div
          class="media-event-img"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            height: '200px',
          }}
        >
          {/* <img src={image} alt="" /> */}
        </div>
        <div class="media-even-content">
          <h2>{title}</h2>
          <span>{eventDate}</span>
          <div
            dangerouslySetInnerHTML={{
              __html: description?.substr(0, 80) + '...',
            }}
          />
          <a href={`/events/${slug}`}>
            View details
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default MediaEvent;
