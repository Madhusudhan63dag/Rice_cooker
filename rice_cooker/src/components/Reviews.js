import React from "react";
import Slider from "react-slick";

const reviews = [
  {
    name: "Ananya",
    text: "The rice cooker works amazingly well. Rice feels lighter and healthier!",
  },
  {
    name: "Ravi Kumar",
    text: "Super easy to use, and the taste is just like regular rice but guilt-free.",
  },
  {
    name: "Meera",
    text: "Great for my diabetic parents, they love it!",
  },
  {
    name: "Arjun",
    text: "Stylish, modern, and really effective at removing starch.",
  },
  {
    name: "Priya",
    text: "Best purchase for my family’s health. Highly recommended!",
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
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          What Our Customers Say
        </h2>
        <Slider {...settings}>
          {reviews.map((review, i) => (
            <div key={i} className="px-3">
              <div className="bg-gray-50 shadow-lg rounded-2xl p-6 h-full flex flex-col justify-between">
                <p className="text-gray-700 text-lg mb-4 italic">“{review.text}”</p>
                <h4 className="text-gray-900 font-semibold text-right">– {review.name}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;
