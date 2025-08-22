import React from "react";
import { motion } from "framer-motion";

const Lifestyle = () => {
  return (
    <section id="lifestyle" className="py-20 bg-white">
      <div className=" px-6">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-semibold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          A Healthy Lifestyle Starts with Smart Eating
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          The Low Carb Sugar Rice Cooker helps you enjoy your favorite meals
          while maintaining a healthy lifestyle — perfect for fitness lovers,
          families, and anyone mindful of their health.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Fitness Friendly",
              text: "Supports weight management with reduced starch rice that’s healthier for your body.",
              img: "/images/lifestyle1.png",
            },
            {
              title: "Perfect for Families",
              text: "Enjoy delicious meals together without compromising on health and taste.",
              img: "/images/lifestyle2.png",
            },
            {
              title: "Health Conscious Living",
              text: "Ideal for diabetics and health-conscious individuals who want controlled carb intake.",
              img: "/images/lifestyle3.png",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
