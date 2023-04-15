import Image from 'next/image';
import Link from 'next/link';
const NainPopupBox = (props) => {
  return (
    <div className="popup_wrap">
      <div className="popup__content">
        <div className="popup__logo">
          {props.topLogo &&
            props.topLogo.map((item, index) => (
              <div className="imag">
                <img src={item.image.sourceUrl} width={200} height={200} />
              </div>
            ))}
        </div>
        <div className="popup__intro">
          <div className="header__popup">
            <div>
              <h1>{props.introTitle}</h1>
            </div>
            <div className="co_incubation">
              <span>
                {props.costOfIncubation && props.costOfIncubation.title}:{' '}
                {props.costOfIncubation && props.costOfIncubation.cost}
              </span>
            </div>
          </div>
          <div className="popup_subtitle">
            <p>{props.introSubTitle}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: props.introduction }} />
        </div>
        <div className="popup__labels">
          <h3>
            {props.sectorAndTechSupport && props.sectorAndTechSupport.title}
          </h3>
          <div className="labl">
            {props.sectorAndTechSupport &&
              props.sectorAndTechSupport.label &&
              props.sectorAndTechSupport.label.map((items, index) => (
                <div className="labl__box">
                  <p style={{ color: '#fff' }}>{items.item}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="popup__list">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="main__info__wrap">
                <div>
                  <h3>Address :</h3>
                  <div dangerouslySetInnerHTML={{ __html: props.address }} />
                </div>
                <div>
                  <h3>How To Apply:</h3>
                  <div dangerouslySetInnerHTML={{ __html: props.howToApply }} />
                </div>
                <div>
                  <h3>Duration</h3>
                  <p>{props.duration}</p>
                </div>
                {props.website && (
                  <div className="cif__web-link">
                    <h3>Website</h3>
                    {props.website.map((item, index) => (
                      <Link href={item.webLink.url} key={index}>
                        <a>{item.webLink.title}</a>
                      </Link>
                    ))}
                  </div>
                )}
                {props.contactPerson && (
                  <div className="cif__web-link">
                    <h3>Contact Person</h3>
                    <p>{props.contactPerson.title}</p>
                    <Link href={props.contactPerson.email.url}>
                      <a>{props.contactPerson.email.title}</a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="lst">
                <h3>
                  {props.supportProvidedList && props.supportProvidedList.title}
                </h3>
                <div className="amen-list">
                  <ul>
                    {props.supportProvidedList.listItems &&
                      props.supportProvidedList.listItems.map((item, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {item.item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="lst">
                <h3>
                  {props.selectionCriteria && props.selectionCriteria.title}
                </h3>
                <div className="amen-list">
                  <ul>
                    {props.selectionCriteria.listItems &&
                      props.selectionCriteria.listItems.map((item, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {item.item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popup__gallery">
          <h3>Gallery :</h3>
          <div className="gallery__img">
            {props.gallery &&
              props.gallery.map((item, inde) => (
                <div className="imag">
                  <Image src={item.image.sourceUrl} width={238} height={235} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NainPopupBox;
