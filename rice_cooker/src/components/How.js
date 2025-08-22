import React from "react";
import { motion } from "framer-motion";
import one from '../assets/1.mp4'
import two from '../assets/2.mp4'
import three from '../assets/3.webm'
import four from '../assets/4.webm'

const steps = [
  {
    title: "Step 1",
    text: "Measure rice and water, then place them into the inner pot.",
    video: one,
  },
  {
    title: "Step 2",
    text: "Select the cooking mode from the digital touch control panel.",
    video: two,
  },
  {
    title: "Step 3",
    text: "Let the cooker do its work — it removes excess starch naturally.",
    video: three,
  },
  {
    title: "Step 4",
    text: "Enjoy healthy, fluffy, low-carb rice—ready to serve.",
    video: four,
  },
];

const How = () => {
  return (
    <section id="how" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-semibold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How to Use the Low Carb Sugar Rice Cooker
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Cooking healthy rice is simple. Just follow these easy steps and enjoy
          perfectly cooked, low-carb meals every time.
        </motion.p>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Step Number Badge */}
              <div className="relative">
                
                {/* Video */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <video
                    src={step.video}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: Add a connecting line or arrow between steps */}
        <div className="hidden lg:flex justify-center items-center mt-8">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-green-600 font-semibold">That's it! Enjoy your healthy rice</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default How;
