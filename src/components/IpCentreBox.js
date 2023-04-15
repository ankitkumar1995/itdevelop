import Image  from 'next/image';
import Link  from 'next/link';
const IpCentreBox = ({
  title,
  description,
  image,
  contact,
  location,
  contactName,
  email,
  handleClick,
}) => {
  const readText = description.slice(0, 200);
  return (
    <div className="col-md-6 mt-5">
      <div className="single-ip">
        <div className="ip-img">
          <Image src={image} alt="" width={630} height={290} />
        </div>
        <div className="ip-containt">
          <div className="ip-top-containt">
            <div
              dangerouslySetInnerHTML={{
                __html: `<h3>${title}</h3>`,
              }}
            ></div>
            {description ? (
              <div className="read_text">
                <div
                  className="flexible"
                  dangerouslySetInnerHTML={{
                    __html: `${readText}`,
                  }}
                ></div>
                <span className="read_more_text">
                  <a href="#" onClick={handleClick}>...Read more</a>
                </span>
              </div>
            ) : (
              <div
                className="flexible"
                dangerouslySetInnerHTML={{
                  __html: `<p$>${location}</p$>`,
                }}
              />
            )}
          </div>
          {contact && (
            <div className="ip-text">
              <h3>Contact:</h3> <span>{contact}</span>
              <p>{contactName}</p>
            </div>
          )}
        </div>
        <div className="ip-link">
          <Link href="mailto:${ipcentre_info.email}">
            <a>{email}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default IpCentreBox;
