import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const StrategiesSlider = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerPadding: '33%',
    customPaging: (i) => <div className="slick__dots--custom"></div>,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
          centerPadding: '26%',
          infinite: true,
        },
      },
      {
        breakpoint: 600,
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
      {props.data.map((item, index) => (
        <div class="col-lg-4 col-md-6">
          <div class="place-wrap">
            <div class="place-image">
              <img src={item.image.sourceUrl} alt="" />
            </div>
            <div class="place-text">
              <h5>{item.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default StrategiesSlider;
