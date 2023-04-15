import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ElevateCard = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    customPaging: (i) => <div className="slick__dots--custom"></div>,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data?.map((item, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
          <div class="card elevate" style={{ width: '256px' }}>
            <img src={item.item.sourceUrl} class="card-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-intro elevate">{item.text}</h4>
              <h5 class="card-title elevate">{item.title}</h5>
              {/* <p class="card-desc elevate">{item.subTitle}</p> */}
              {/* <div className="elevate-link">
                <a href="#">
                  {item.button.title} <i className="fas fa-arrow-right"></i>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default ElevateCard;
