import React from "react";
import Slider from "react-slick";
import one from '../assets/15.webp'
import two from '../assets/16.webp'
import three from '../assets/17.webp'
import four from '../assets/18.webp'
import five from '../assets/19.webp'

const reviews = [
  {
    name: "Ananya",
    text: "The rice cooker works amazingly well. Rice feels lighter and healthier!",
    image: one,
  },
  {
    name: "Ravi Kumar",
    text: "Super easy to use, and the taste is just like regular rice but guilt-free.",
    image: two,
  },
  {
    name: "Meera",
    text: "Great for my diabetic parents, they love it!",
    image: three,
  },
  {
    name: "Arjun",
    text: "Stylish, modern, and really effective at removing starch.",
    image: four,
  },
  {
    name: "Priya",
    text: "Best purchase for my family's health. Highly recommended!",
    image: five,
  },
];

const Reviews = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // continuous
    speed: 5000, // smooth speed
    cssEase: "linear", // seamless scroll
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="reviews" className="bg-white pb-5">
      <div className="px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          What Our Customers Say
        </h2>
        <Slider {...settings}>
          {reviews.map((review, i) => (
            <div key={i} className="px-3 pb-4">
              <div className="bg-gray-50 shadow-lg rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Image Section */}
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={review.image}
                    alt={`${review.name}'s review`}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.src = "https://via.placeholder.com/300x200?text=Product+Image";
                    }}
                  />
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="mb-4">
                    {/* Star Rating */}
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-gray-700 text-base mb-4 italic leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                  
                  {/* Customer Name */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-900 font-semibold">– {review.name}</h4>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;
