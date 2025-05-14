import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Cover Image */}
      <div className="w-full md:h-[300px] overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/00/fd/20/00fd20be4ea87e7b752a250d2fb18561.jpg"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Framer Content */}
      <motion.div
        className="max-w-7xl mx-auto py-16 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover who we are, what we stand for, and why we build smart,
          secure, and seamless living environments.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At HomeSecure, our mission is to empower homeowners and businesses
              with intelligent, connected technology that enhances convenience,
              comfort, and safety.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Cutting-edge smart home products</li>
              <li>Seamless integration with top ecosystems</li>
              <li>Customer-centric service & support</li>
              <li>Trusted by thousands of households</li>
            </ul>
          </motion.div>

          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src="https://i.pinimg.com/736x/3f/87/0f/3f870f1b0c9ef129ea1a32318a290c01.jpg"
              alt="Smart Home"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;