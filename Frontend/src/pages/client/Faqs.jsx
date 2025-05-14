import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Faqs = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswer = (questionIndex) => {
    setActiveQuestion(activeQuestion === questionIndex ? null : questionIndex);
  };

  const faqs = [
    {
      question: "What is HomeSecure?",
      answer:
        "HomeSecure is a smart home company that offers smart lighting, security solutions, and home automation products to create safer and more efficient living environments.",
    },
    {
      question: "How do I install smart switches?",
      answer:
        "Installation typically requires replacing your existing switches with our smart switches. A qualified electrician should be consulted to ensure proper installation.",
    },
    {
      question: "Do I need a special hub for my smart devices?",
      answer:
        "Our products are compatible with popular hubs such as Google Home, Amazon Alexa, and Apple HomeKit. You may need to connect to one of these platforms for full functionality.",
    },
    {
      question: "Is HomeSecure compatible with other smart home ecosystems?",
      answer:
        "Yes, HomeSecure products work with multiple ecosystems such as Zigbee, Z-Wave, Google Assistant, Amazon Alexa, and Apple HomeKit for seamless integration.",
    },
    {
      question: "What kind of warranty do you offer?",
      answer:
        "We offer a 1-year warranty for most products. Please check our product pages for specific warranty details.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 pb-12">
      {/* Cover Image */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/75/55/fb/7555fb911271d17231ff6e90df416218.jpg"
          alt="FAQ Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-5 relative z-10">
        <h1 className="text-4xl font-bold text-center text-black mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all hover:shadow-lg"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {activeQuestion === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="px-5 pb-5 text-gray-600 overflow-hidden"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;