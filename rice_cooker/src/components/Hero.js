import React from 'react';
import banner1 from '../assets/banner1.webp';
import banner2 from '../assets/banner2.webp';
import banner3 from '../assets/banner3.webp';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    cssEase: 'ease-in-out',
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section className="relative w-full overflow-hidden pt-20 md:pt-24"> {/* Added padding-top to clear fixed navbar */}
      <div className="w-full">
        <Slider {...settings}>
          <div className="relative w-full">
            <div className="w-full h-full overflow-hidden">
              <img 
                src={banner1} 
                alt="Low Carb Rice Cooker Banner 1" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="relative w-full">
            <div className="w-full h-full overflow-hidden">
              <img 
                src={banner2} 
                alt="Low Carb Rice Cooker Banner 2" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="relative w-full">
            <div className="w-full h-full overflow-hidden">
              <img 
                src={banner3} 
                alt="Low Carb Rice Cooker Banner 3" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Slider>
      </div>

      <style jsx>{`
        .custom-dots {
          bottom: 25px;
        }
        .custom-dots li button:before {
          color: white;
          font-size: 12px;
          opacity: 0.7;
        }
        .custom-dots li.slick-active button:before {
          opacity: 1;
          color: #fbbf24;
        }
        .slick-prev,
        .slick-next {
          z-index: 10;
        }
        .slick-prev {
          left: 25px;
        }
        .slick-next {
          right: 25px;
        }
        .slick-prev:before,
        .slick-next:before {
          color: white;
          font-size: 24px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
