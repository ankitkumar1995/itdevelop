import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const BoosterKitAccordian = ({
  data,
  multiple = false,
  pathProps,
  setShow,
  setMessage,
  setRedirect,
  handleClick,
  session,
}) => {
  const [active, setActive] = useState(0);
  return (
    <div className="custom-accordion">
      {data.map((tab, index) => (
        <BoosterKitAccordianItem
          key={index}
          data={tab.boosterKitPartner}
          pathProps={pathProps}
          active={active === index}
          multiple={multiple}
          onToggle={(e) => setActive((a) => (a === index ? '' : index))}
          setShow={setShow}
          setMessage={setMessage}
          setRedirect={setRedirect}
          handleClick={handleClick}
          session={session}
        />
      ))}
    </div>
  );
};
const BoosterKitAccordianItem = ({
  data,
  active,
  multiple,
  onToggle,
  setShow,
  setMessage,
  setRedirect,
  handleClick,
  session,
}) => {
  const [visiblity, setVisiblity] = useState(false);
  const isActive = () => (multiple ? visiblity : active);
  const toggleVisiblity = () => {
    setVisiblity((v) => !v);
    onToggle();
  };
  const { kitsEmail, partnerEmail, partnerDetails, partnerLogo, partnerName } =
    data?.content;
  return (
    <div className="startup__funding partner">
      <div className={`card ${isActive() ? 'accordion-active' : ''}`}>
        <div className="clps-header funding" onClick={toggleVisiblity}>
          <h5>
            <button className="clps-link">
              <div>
                <span>{partnerName} &nbsp;</span>
                {partnerLogo && (
                  <Image
                    src={partnerLogo.sourceUrl}
                    width={40}
                    height={20}
                    layout="fixed"
                    alt="..."
                  />
                )}
              </div>
              <span className="accordion-icon">
                <i className="fas fa-chevron-down"></i>
              </span>
            </button>
          </h5>
        </div>
        <div className="card-text">
          <div className="startup__content">
            <div className="row">
              <div className="col-12">
                <div>
                  <div dangerouslySetInnerHTML={{ __html: partnerDetails }} />
                </div>
                <div className="ip-link partner">
                  <Link href="#">
                    <a
                      onClick={() => {
                        if (!session) {
                          setShow(true);
                          setRedirect('/login');
                          setMessage('Login to apply for partners');
                        } else if (
                          session &&
                          session?.loginType === 'Startup'
                        ) {
                          handleClick(partnerEmail, kitsEmail);
                        } else {
                          setShow(true);
                          setMessage('Only startups can apply');
                          setRedirect('#');
                        }
                      }}
                    >
                      Apply Now
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoosterKitAccordian;
