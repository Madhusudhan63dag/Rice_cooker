import React, { useState } from "react";

const faqs = [
  {
    question: "How does the Low Carb Sugar Rice Cooker work?",
    answer:
      "It removes excess starch from rice using a smart water-draining technology, making the rice healthier and lighter.",
  },
  {
    question: "Is it suitable for diabetic patients?",
    answer:
      "Yes, it is especially helpful for people managing blood sugar levels, as it reduces the carbohydrate content in rice.",
  },
  {
    question: "Can I cook normal rice in this cooker?",
    answer:
      "Absolutely! You can cook both normal and low-carb rice by selecting the appropriate cooking mode.",
  },
  {
    question: "How many cups of rice can it cook at once?",
    answer:
      "The cooker can prepare up to 3 liters of rice, making it suitable for small to medium families.",
  },
  {
    question: "Is it easy to clean?",
    answer:
      "Yes, the detachable inner pot and starch collector make cleaning very convenient.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-5 bg-gray-50">
      <div className=" px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-3">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="text-gray-800 font-medium">{faq.question}</span>
                <span className="ml-2 text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="p-4 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
