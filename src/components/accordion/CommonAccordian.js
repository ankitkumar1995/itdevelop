import { useState } from 'react';
import Image from 'next/image';
import SITKTable from '../SITKTable';

const CommonAccordian = ({ data, multiple = false, aboutFaqs }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="custom-accordion">
      {data?.map((tab, index) => (
        <CommonAccordianItem
          key={index}
          tab={tab}
          active={active === index}
          multiple={multiple}
          onToggle={(e) => setActive((a) => (a === index ? '' : index))}
        />
      ))}
    </div>
  );
};
const CommonAccordianItem = ({ tab, active, multiple, onToggle }) => {
  const [visiblity, setVisiblity] = useState(false);
  const isActive = () => (multiple ? visiblity : active);
  const toggleVisiblity = () => {
    setVisiblity((v) => !v);
    onToggle();
  };
  return (
    <div className={`card ${isActive() ? 'accordion-active' : ''}`}>
      <div className="clps-header funding" onClick={toggleVisiblity}>
        <h5>
          <button className="clps-link">
            <div>
              <span>{tab?.experts} &nbsp;</span>
              <Image
                src="/assets/img/accord-logo.png"
                width={40}
                height={20}
                layout="fixed"
                alt="..."
              />
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
            <SITKTable data={tab.content} />
            {/* {tab?.content?.map((item, index) => (
              <>
                <div className="col-12 col-md-7">
                  <div key={index} className="accord__info">
                    <div>
                      <b>SDGs: </b>
                      {item.sdgs}
                    </div>
                    <div>
                      <b>Problem Statements/Challenges: </b>
                      <div
                        className="sitk-prob"
                        dangerouslySetInnerHTML={{
                          __html: item.problemStatment,
                        }}
                      />
                    </div>
                    <div>
                      <b>Targets to be achieved: </b>
                      <div
                        className="sitk-prob"
                        dangerouslySetInnerHTML={{
                          __html: item.targetToBeAchieved,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5 funding__img">
                  <Image
                    src={item?.image?.sourceUrl}
                    width={387}
                    height={388}
                  />
                </div>
              </>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommonAccordian;
