import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const IncubatorSlider = (props) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const sliderOneSetting = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: false,
    draggable: false,
  };
  const sliderTwoSetting = {
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    autoplay: true,
    infinite: true,
  };
  return (
    <div className="inc-slider">
      <div className="inc-top-slider">
        <div className="slider-active">
          <Slider {...sliderOneSetting} ref={slider1} asNavFor={nav2}>
            {props.data.map((item, index) => (
              <div className="single-tb-img" key={index}>
                <img src={item.img} alt="" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="incsl-bt-wrap">
        <div className="inc-bottom-slider">
          <div className="slick-active">
            <Slider {...sliderTwoSetting} ref={slider2} asNavFor={nav1}>
              {props.data.map((item, index) => (
                <div className="single-tb-img" key={index}>
                  <img src={item.handler} alt="" />
                  <div className="current-progress"></div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="common-ri-wrap">
          <div className="common-proing">
            <img src={props.contactPerson.img} alt="" />
          </div>
          <div className="common-pro-content">
            <h5>{props.contactPerson.name}</h5>
            <a href="#">{`${props.contactPerson.mobile1}, ${props.contactPerson.mobile2}`}</a>
          </div>
          <div className="contact-person-brn">
            <a href="#">Contact Person</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncubatorSlider;
