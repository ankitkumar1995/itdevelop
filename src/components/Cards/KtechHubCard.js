import Link from 'next/link';
const KtechHubCard = ({
  image,
  title,
  description,
  button,
  handleClick,
  path,
}) => {
  return (
    <div className="ktech-hub">
      <div class="custom-evant-wrap">
        <div class="custom-event-img">
          {image && <img src={image} alt="" />}
        </div>
        <div class="custom-even-content">
          <h2>
            {title?.length > 33 && path === 'kn'
              ? title.slice(0, 35) + ' ...'
              : title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="card-description"
          />
          <div className="custom-even-link" style={{ color: '#ee6f53' }}>
            <Link href="#">
              <a onClick={handleClick}>
                <div dangerouslySetInnerHTML={{ __html: button }} />
              </a>
            </Link>
            <i style={{ paddingLeft: '5px' }} class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KtechHubCard;
