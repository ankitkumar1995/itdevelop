import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';

const ProgramSlider = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    customPaging: (i) => <div className="slick__dots--custom"></div>,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 868,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div class="prog-area" key={index}>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-title">
                  <span>{item.introTitle}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="prog-containt">
                  <div class="reg-containt">
                    <h3>{item.cardTitle}</h3>
                    <p>{item.cardSubtitle}</p>
                    <div class="prog-list">
                      <ul>
                        {item.cardList.map((items, index) => (
                          <li key={index}>
                            <i class="fas fa-check"></i>
                            <span>{items.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div class="reg-btn prog">
                      <Link href="#">
                        <a class="theme-btn">
                          {item.button.title}
                          <i class="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="prog-fl-img">
                  <div class="prog-single-img">
                    <Image
                      width="540"
                      height="287"
                      src={item.cardImage.topImage.sourceUrl}
                      alt="program winner"
                    />
                  </div>
                  <div class="prog-single-img">
                    <div className="row">
                      <div className="col-6">
                        <Image
                          src={item.cardImage.bottomImage.image1.sourceUrl}
                          width="256"
                          height="245"
                          alt="program winner"
                        />
                      </div>
                      <div className="col-6">
                        <Image
                          src={item.cardImage.bottomImage.image2.sourceUrl}
                          width="256"
                          height="245"
                          alt="program winner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProgramSlider;
