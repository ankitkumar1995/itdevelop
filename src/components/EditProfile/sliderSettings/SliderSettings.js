import React from 'react';

const PrevArrow = ({ onClick }) => {
  return (
    <div className="slider-rev prev-icon" onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div className="slider-rev next-icon" onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};
const sliderSettings = {
  dots: false,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500,
  nav: false,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default sliderSettings;
