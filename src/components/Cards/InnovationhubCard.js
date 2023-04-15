import Link from 'next/link';
import Image from 'next/image';
const InnovationhubCard = ({
  image,
  title,
  description,
  button,
  handleClick,
}) => {
  return (
    <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt-3">
      <div class="meadia-evant-wrap mt-3">
        <div class="media-event-img">
          <Image src={image} layout="fill" alt="" />
        </div>
        <div class="media-even-content">
          {title.length > 20 ? (
            <h2 className="more-text-title">{title}</h2>
          ) : (
            <h2>{title}</h2>
          )}
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <div className="media-event-link">
            <Link href="#">
              <a onClick={handleClick}>
                <div dangerouslySetInnerHTML={{ __html: button.title }} />
              </a>
            </Link>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InnovationhubCard;
