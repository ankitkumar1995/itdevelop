import { useState } from 'react';

const CustomAccordion = ({ data, multiple = false, aboutFaqs }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="custom-accordion">
      {aboutFaqs ? (
        <>
          {' '}
          {data?.map((tab, index) => (
            <CustomAccordionItem
              key={index}
              {...tab.faqs}
              active={active === index}
              multiple={multiple}
              onToggle={(e) => setActive((a) => (a === index ? '' : index))}
            />
          ))}
        </>
      ) : (
        <>
          {data?.map((tab, index) => (
            <CustomAccordionItem
              key={index}
              {...tab}
              active={active === index}
              multiple={multiple}
              onToggle={(e) => setActive((a) => (a === index ? '' : index))}
            />
          ))}
        </>
      )}
    </div>
  );
};

const CustomAccordionItem = ({
  question,
  answer,
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
    <div className={`card ${isActive() ? 'accordion-active' : ''}`}>
      <div className="clps-header" onClick={toggleVisiblity}>
        <h5>
          <button className="clps-link">
            {question}
            <span className="accordion-icon">
              <i className="fas fa-chevron-down"></i>
            </span>
          </button>
        </h5>
      </div>
      <div
        className="card-text"
        dangerouslySetInnerHTML={{
          __html: `${answer}`,
        }}
      ></div>
    </div>
  );
};
export default CustomAccordion;
