import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import VideoMadals from './VideoModals';
const SpeakSliderBox = (props) => {
  const [isOpen, setOpen] = useState(false);
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    //originalSlides.removeAttr('style');
    customPaging: (i) => <div className="slick__dots--custom"></div>,
  };
  return (
    <div className="upcoming-active">
      <Slider {...settings}>
        {props.data.map((item, index) => (
          <div className={`row align-items-center d-lg-flex`} key={index}>
            <div className="col-lg-6">
              <div className="speak-content">
                <h4>{item.title}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${item.description}</p>`,
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="wrap">
                <div className="speak-img">
                  <img src={item.image.sourceUrl} alt="" />
                </div>
                <div className="spea-box mr-1">
                  <div className="spea-box-content">
                    <h5>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.congratsText }}
                      />
                    </h5>
                    <div dangerouslySetInnerHTML={{ __html: item.about }} />
                  </div>
                  <div className="spea-video">
                    <VideoMadals image="assets/img/start-up/you.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default SpeakSliderBox;
