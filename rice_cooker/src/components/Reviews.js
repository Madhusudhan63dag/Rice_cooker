import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <section id="reviews" className="bg-white pb-5">
      <div className="px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          What Our Customers Say
        </h2>
        
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {reviews.map((review, i) => (
            <div key={i} className="px-3 pb-4">
              <div className="bg-gray-50 shadow-lg rounded-2xl overflow-hidden h-full flex flex-col mx-2">
                {/* Image Section - Bigger on mobile */}
                <div className="w-full h-96 max-sm:h-[500px] bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={review.image}
                    alt={`${review.name}'s review`}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Product+Image";
                    }}
                  />
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="mb-4">
                    {/* Star Rating */}
                    <div className="flex items-center mb-3 justify-center max-sm:justify-center">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-5 h-5 max-sm:w-6 max-sm:h-6 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-gray-700 text-base max-sm:text-lg mb-4 italic leading-relaxed text-center max-sm:text-center">
                      "{review.text}"
                    </p>
                  </div>
                  
                  {/* Customer Name */}
                  <div className="flex items-center justify-between max-sm:justify-center">
                    <h4 className="text-gray-900 font-semibold max-sm:text-lg">– {review.name}</h4>
                    <div className="w-8 h-8 max-sm:w-10 max-sm:h-10 max-sm:ml-3 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 max-sm:w-5 max-sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
