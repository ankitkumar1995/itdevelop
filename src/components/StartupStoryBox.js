import { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
const StartupStoryBox = (props) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="story-box">
      <div className="story-fx">
        {props.data.map((item, index) => (
          <div className="single-story" key={index}>
            <a href="#" style={{ alignItems: 'center' }}>
              <img src={item.icon.sourceUrl} alt="" />
              <CountUp
                decimal={1}
                start={focus ? 1 : null}
                end={item.count}
                duration={5}
                suffix={' ' + item.heading}
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor
                    onChange={(isVisible) => {
                      if (isVisible) {
                        setFocus(true);
                      }
                    }}
                  >
                    <span ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StartupStoryBox;
