import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1",
    text: "Measure rice and water, then place them into the inner pot.",
    img: "/images/step1.png",
  },
  {
    title: "Step 2",
    text: "Select the cooking mode from the digital touch control panel.",
    img: "/images/step2.png",
  },
  {
    title: "Step 3",
    text: "Let the cooker do its work — it removes excess starch naturally.",
    img: "/images/step3.png",
  },
  {
    title: "Step 4",
    text: "Enjoy healthy, fluffy, low-carb rice—ready to serve.",
    img: "/images/step4.png",
  },
];

const How = () => {
  return (
    <section id="how" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
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
          className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Cooking healthy rice is simple. Just follow these easy steps and enjoy
          perfectly cooked, low-carb meals every time.
        </motion.p>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center md:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-72 h-72 object-contain rounded-xl shadow-lg bg-white p-6"
                />
              </div>

              {/* Text */}
              <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How;
