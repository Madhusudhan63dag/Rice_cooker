// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import one from '../assets/1.webp'
// import two from '../assets/2.webp'
// import three from '../assets/3.webp'
// import four from '../assets/4.webp'
// import five from '../assets/5.webp'
// import six from '../assets/6.webp'
// import video from '../assets/ad.mp4'

// const Problem = () => {
//   const problems = [
//     {
//       img: one,
//       alt: "Low Sugar Cooking",
//     },
//     {
//       img: two,
//       alt: "Advance Scheduling",
//     },
//     {
//       img: three,
//       alt: "Warmth That Lasts",
//     },
//     {
//       img: four,
//       alt: "Time Saving",
//     },
//     {
//       img: five,
//       alt: "Durable Design",
//     },
//     {
//       img: six,
//       alt: "Energy Efficient",
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 1500,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <section id="problem" className="py-16 bg-gray-50">
//       {/* Existing Image Slider */}
//       <div className="px-6 text-center mb-8">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//           A Glimpse of Healthy Cooking
//         </h2>
//         <Slider {...settings}>
//           {problems.map((item, idx) => (
//             <div key={idx} className="px-4">
//               <div className="bg-white rounded-lg shadow flex flex-col items-center h-full">
//                 <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center">
//                   <img
//                     src={item.img}
//                     alt={item.alt}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>

//        {/* Content and Video Section */}
//       <div className="px-6 mb-5">
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
    
//     {/* Content Side */}
//     <div className="flex flex-col justify-center">
//       <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
//         Transform Your Cooking with Smart Rice Technology
//       </h2>
//       <p className="text-base lg:text-lg text-gray-600 mb-6">
//         Experience the future of healthy cooking with our innovative Low Carb Sugar Rice Cooker. 
//         Designed to reduce excess starch and sugar while preserving the authentic taste, aroma, and texture of every grain. 
//         A healthier choice for you and your family—without compromising on flavor.
//       </p>
//       <ul className="space-y-3 text-gray-600">
//         <li className="flex items-center">
//           <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//           Reduces carbs and sugar content for healthier meals
//         </li>
//         <li className="flex items-center">
//           <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//           Ideal for diabetic, fitness-focused, and health-conscious families
//         </li>
//         <li className="flex items-center">
//           <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//           Preserves nutrients while removing excess starch
//         </li>
//         <li className="flex items-center">
//           <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//           Smart cooking modes for rice, porridge, soups, and more
//         </li>
//         <li className="flex items-center">
//           <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//           Automatic timer and keep-warm function for hassle-free meals
//         </li>
//         <li className="flex items-center">
//           <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//           Sleek, modern design that fits perfectly into any kitchen
//         </li>
//       </ul>
//       <p className="text-base lg:text-lg text-gray-600 mt-6">
//         Cook smarter, eat healthier, and enjoy delicious rice that supports your lifestyle—every single day.
//       </p>
//     </div>


//     {/* Video Side */}
//     <div className="flex items-center">
//       <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-lg overflow-hidden">
//         <video
//           className="w-full h-auto object-cover rounded-lg"
//           src={video}
//           playsInline
//           autoPlay
//           loop
//           muted
//           style={{ maxHeight: "500px", aspectRatio: "9/16" }} // reduced height
//         />
//       </div>
//     </div>

//   </div>
// </div>

//     </section>
//   );
// };

// export default Problem;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import one from "../assets/1.webp";
import two from "../assets/2.webp";
import three from "../assets/3.webp";
import four from "../assets/4.webp";
import five from "../assets/5.webp";
import six from "../assets/6.webp";
import video from "../assets/ad.mp4";

const Problem = () => {
  const problems = [
    { img: one, alt: "Low Sugar Cooking" },
    { img: two, alt: "Advance Scheduling" },
    { img: three, alt: "Warmth That Lasts" },
    { img: four, alt: "Time Saving" },
    { img: five, alt: "Durable Design" },
    { img: six, alt: "Energy Efficient" },
  ];

  // 3-2-1 layout with autoplay
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 1 },
    tablet:  { breakpoint: { max: 1024, min: 640 },  items: 2, slidesToSlide: 1 },
    mobile:  { breakpoint: { max: 640,  min: 0 },    items: 1, slidesToSlide: 1 },
  };

  return (
    <section id="problem" className="py-16 bg-gray-50">
      {/* Image Carousel */}
      <div className="px-6 text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          A Glimpse of Healthy Cooking
        </h2>

        <Carousel
          responsive={responsive}
          showDots
          infinite
          autoPlay
          autoPlaySpeed={1500}
          transitionDuration={600}
          arrows={false}
          dotListClass="custom-dot-list-style"
          containerClass="pb-4"  // spacing below dots
          itemClass="px-4"       // padding per slide
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {problems.map(({ img, alt }, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow flex flex-col items-center h-full">
              <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center">
                <img src={img} alt={alt} className="w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Content + Video Section */}
      <div className="px-6 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Transform Your Cooking with Smart Rice Technology
            </h2>
            <p className="text-base lg:text-lg text-gray-600 mb-6">
              Experience the future of healthy cooking with our innovative Low Carb Sugar Rice Cooker.
              Designed to reduce excess starch and sugar while preserving the authentic taste, aroma, and texture of every grain.
              A healthier choice for you and your family—without compromising on flavor.
            </p>
            <ul className="space-y-3 text-gray-600">
              {[
                "Reduces carbs and sugar content for healthier meals",
                "Ideal for diabetic, fitness-focused, and health-conscious families",
                "Preserves nutrients while removing excess starch",
                "Smart cooking modes for rice, porridge, soups, and more",
                "Automatic timer and keep-warm function for hassle-free meals",
                "Sleek, modern design that fits perfectly into any kitchen",
              ].map((text) => (
                <li key={text} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  {text}
                </li>
              ))}
            </ul>
            <p className="text-base lg:text-lg text-gray-600 mt-6">
              Cook smarter, eat healthier, and enjoy delicious rice that supports your lifestyle—every single day.
            </p>
          </div>

          {/* Video */}
          <div className="flex items-center">
            <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-lg overflow-hidden">
              <video
                className="w-full h-auto object-cover rounded-lg"
                src={video}
                playsInline
                autoPlay
                loop
                muted
                style={{ maxHeight: 500, aspectRatio: "9 / 16" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
