import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import one from '../assets/1.webp'
import two from '../assets/2.webp'
import three from '../assets/3.webp'
import four from '../assets/4.webp'
import five from '../assets/5.webp'
import six from '../assets/6.webp'
import seven from '../assets/7.webp'
import eight from '../assets/8.webp'
import nine from '../assets/9.webp'
import ten from '../assets/10.webp'

const Problem = () => {
  const problems = [
    {
      img: one,
      alt: "Low Sugar Cooking",
      title: "Health-Conscious Cooking",
      desc: "Conventional cookers can’t reduce sugar content—but this model features a low-sugar mode to support healthier meals.",
    },
    {
      img: two,
      alt: "Advance Scheduling",
      title: "Advance Scheduling",
      desc: "Pre-program cooking up to 12 hours in advance—perfect for busy mornings or meal prepping.",
    },
    {
      img: three,
      alt: "Warmth That Lasts",
      title: "Warmth That Lasts",
      desc: "Keeps food warm up to 4 hours without drying or overcooking.",
    },
    {
      img: four,
      alt: "Time Saving",
      title: "Save Time Daily",
      desc: "Multi-function modes let you cook rice, soup, or stew with just one touch—saving time in the kitchen.",
    },
    {
      img: five,
      alt: "Durable Design",
      title: "Durable Stainless Steel",
      desc: "Built with high-quality stainless steel for long-lasting performance and safe cooking.",
    },
    {
      img: six,
      alt: "Energy Efficient",
      title: "Energy Efficient",
      desc: "Smart heating ensures efficient cooking without wasting energy.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="problem" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          The Challenge with Traditional Rice Cookers
        </h2>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Most rice cookers leave you with high-sugar rice and no control over
          timing, making it hard to maintain a healthy lifestyle and plan meals
          conveniently.
        </p>

        <Slider {...settings}>
          {problems.map((item, idx) => (
            <div key={idx} className="px-4">
              <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center h-full">
                <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Problem;
