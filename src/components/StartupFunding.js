import Link from 'next/link';
import Image from 'next/image';
const StartupFunding = ({ data, title, applyLink, image }) => {
  return (
    <div className="startup__content">
      <div className="row">
        <div className="col-12 col-md-7">
          {data.information.map((item, index) => (
            <div key={index} className="accord__info">
              <h3>{item.title} : </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p>${item.description}</p>`,
                }}
              />
            </div>
          ))}
          {applyLink && (
            <div className="accord__info">
              <h3 className="accord__info-link">{'Where to apply:  '}</h3>
              <Link href={applyLink.url}>
                <a target={'_blank'}>{applyLink.title}</a>
              </Link>
            </div>
          )}
        </div>
        <div className="col-12 col-md-5 funding__img">
          <Image src={image} width={387} height={388} />
        </div>
      </div>
    </div>
  );
};

export default StartupFunding;
