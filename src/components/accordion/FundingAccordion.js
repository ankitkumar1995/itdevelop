import Image from 'next/image';
import { useState } from 'react';
import StartupFunding from '../StartupFunding';
const FundingAccordion = ({ data, multiple = false, pathProps }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="custom-accordion">
      {data.map((tab, index) => (
        <FundingAccordionItem
          key={index}
          {...tab}
          pathProps={pathProps}
          active={active === index}
          multiple={multiple}
          onToggle={(e) => setActive((a) => (a === index ? '' : index))}
        />
      ))}
    </div>
  );
};
const FundingAccordionItem = ({
  accordTitle,
  accordContent,
  pathProps,
  active,
  multiple,
  onToggle,
}) => {
  const [visiblity, setVisiblity] = useState(false);
  const isActive = () => (multiple ? visiblity : active);

  const toggleVisiblity = () => {
    setVisiblity((v) => !v);
    onToggle();
  };
  return (
    <div className="startup__funding">
      <div className={`card ${isActive() ? 'accordion-active' : ''}`}>
        <div className="clps-header funding" onClick={toggleVisiblity}>
          <h5>
            <button className="clps-link">
              <div>
                <span>{accordTitle} &nbsp;</span>
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
          <StartupFunding
            data={accordContent}
            applyLink={accordContent.applyLink}
            image={accordContent.image.sourceUrl}
            pathProps={pathProps}
          />
        </div>
      </div>
    </div>
  );
};
export default FundingAccordion;
