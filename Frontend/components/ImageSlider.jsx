import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    arrows: false,
    fade: true, // Optional: creates a smooth fade effect between slides
  };

  return (
    <div className="w-full max-h-[800px] overflow-hidden">
      <Slider {...settings}>
        <div>
          <img
            src="https://img.freepik.com/premium-photo/room-with-tv-wall-windows-screen-that-says-home_962508-62084.jpg?w=996"
            alt="Slide 1"
            loading="lazy"
            className="w-full h-[800px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-photo/smart-home-innovation-technology-with-woman-using-control-panel_53876-124638.jpg?t=st=1746920946~exp=1746924546~hmac=dae595017ba5e0f9e85b40000ce863900a164594962ced81d66c45dec15c15f5&w=996"
            alt="Slide 2"
            loading="lazy"
            className="w-full h-[800px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://img.freepik.com/premium-photo/portable-sleep-monitoring-device-with-connected-features_980928-106441.jpg?w=1060"
            alt="Slide 3"
            loading="lazy"
            className="w-full h-[800px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;