import { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Link from 'next/link';
const OurConnection = (props) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      {props.data.map((item, index) => (
        <div className="single-conect-fx" key={index}>
          <div className="cnct-icn">
            <a href="#">
              <img src={item.image.sourceUrl} alt="" />
            </a>
          </div>
          <div className="contact-tx-fx">
            <div className="conect-tx">
              <h3>
                <CountUp
                  decimal={1}
                  start={focus ? 1 : null}
                  end={item.count}
                  duration={5}
                  suffix="+"
                  prefix={item.prefix+"-"}
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
              </h3>

              <p>{item.title}</p>
            </div>
            {item.button && (
              <div className="conect-btn">
                <Link href={item.button.url}>
                  <a>
                    {item.button.title}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default OurConnection;