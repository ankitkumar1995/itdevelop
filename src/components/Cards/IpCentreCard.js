import Link from 'next/link';
import Image from 'next/image';
const IpCentreCard = ({
  title,
  content,
  pdf,
  image,
  contact,
  location,
  contactName,
  email,
  icon,
  langEn,
  class1,
}) => {
  return (
    <div className="col-md-6">
      <div className={`single-ip ${class1}`}>
        <div className="ip-img">
          {image && <Image src={image} alt="" width={680} height={330} />}
        </div>
        <div className="ip-containt">
          <div className="ip-top-containt">
            <div
              dangerouslySetInnerHTML={{
                __html: `<h3>${title}</h3>`,
              }}
            />
            {content ? (
              <div
                className="flexible"
                dangerouslySetInnerHTML={{
                  __html: `${content}`,
                }}
              ></div>
            ) : (
              <div
                className="flexible"
                dangerouslySetInnerHTML={{
                  __html: `<p$>${location}</p$>`,
                }}
              ></div>
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
          {pdf ? (
            <Link href={pdf}>
              <a target="_blank" download>
                {icon && (
                  <Image className="px-2" src={icon} width={30} height={30} />
                )}
                {langEn == 'en' ? `Download Pdf` : `ಪಿಡಿಎಫ್ ಡೌನ್ ಲೋಡ್ಮಾಡಿ`}
              </a>
            </Link>
          ) : (
            <Link href="mailto:${ipcentre_info.email}">
              <a>{email}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default IpCentreCard;
