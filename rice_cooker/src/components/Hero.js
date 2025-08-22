import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.webp';

import Slider from 'react-slick';


const Hero = () => {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };
  
  return (
       <section className="relative w-full overflow-hidden">
                      {/* Mobile Banner - Only visible on small screens */}
                      {/* <div className="mobile-banner-container">
                          <Slider {...settings}>
                              <div className="banner-slide">
                                  <img src={banner1} alt="Mobile Banner 1" className="w-full" />
                              </div>
                              <div className="banner-slide">
                                  <img src={banner1} alt="Mobile Banner 2" className="w-full" />
                              </div>
                              <div className="banner-slide">
                                  <img src={banner1} alt="Mobile Banner 3" className="w-full" />
                              </div>
                              <div className="banner-slide">
                                  <img src={banner1} alt="Mobile Banner 4" className="w-full" />
                              </div>
                          </Slider>
                      </div> */}
                      
                      {/* Desktop Slider - Hidden on small screens */}
                      <div className="desktop-banner-container">
                          <Slider {...settings}>
                              <div className="banner-slide">
                                  <img src={banner1} alt="Banner 1" />
                              </div>
                              <div className="banner-slide">
                                  <img src={banner1} alt="Banner 2" />
                              </div>
                              <div className="banner-slide">
                                  <img src={banner1} alt="Banner 3" />
                              </div>
                          </Slider>
                      </div>            
                  </section>
  );
};

export default Hero;
