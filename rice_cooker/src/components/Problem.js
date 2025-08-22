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

const Problem = () => {
  const problems = [
    {
      img: one,
      alt: "Low Sugar Cooking",
    },
    {
      img: two,
      alt: "Advance Scheduling",
    },
    {
      img: three,
      alt: "Warmth That Lasts",
    },
    {
      img: four,
      alt: "Time Saving",
    },
    {
      img: five,
      alt: "Durable Design",
    },
    {
      img: six,
      alt: "Energy Efficient",
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
      {/* Existing Image Slider */}
      <div className="px-6 text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          A Glimpse of Healthy Cooking
        </h2>
        <Slider {...settings}>
          {problems.map((item, idx) => (
            <div key={idx} className="px-4">
              <div className="bg-white rounded-lg shadow flex flex-col items-center h-full">
                <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

       {/* Content and Video Section */}
      <div className=" px-6 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Side */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Transform Your Cooking with Smart Rice Technology
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Experience the future of healthy cooking with our innovative 3L Low Carb Sugar Rice Cooker. 
              Designed to reduce carbs and sugar while maintaining the authentic taste and texture you love.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Reduces carbs by up to 35%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Perfect for diabetic and health-conscious families
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                3L capacity serves 4-6 people
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Smart timer and keep warm function
              </li>
            </ul>
          </div>

          {/* Video Side */}
          <div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Rice Cooker Product Usage Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ aspectRatio: '16/9', minHeight: '300px' }}
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Problem;
