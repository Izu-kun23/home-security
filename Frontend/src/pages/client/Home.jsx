import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "../../../components/ImageSlider"; // Make sure to adjust the path if necessary
import { FaHeadset, FaHome, FaPhone, FaShieldAlt } from "react-icons/fa"; // Importing icons for the features section
import trustpilotLogo from "../../assets/trustpilot.svg"; // Import the SVG file
import meterImage from "../../assets/meter.jpg"; // Import the image
import RoboImage from "../../assets/robo.jpg"; // Import the robot image

const Home = () => {
  // State for tracking whether the sections are in view
  const [inView1, setInView1] = useState(false);
  const [inView2, setInView2] = useState(false);

  // Ref for both image blocks
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);

  useEffect(() => {
    // Initialize the IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef1.current) {
              setInView1(true);
            } else if (entry.target === imageRef2.current) {
              setInView2(true);
            }
          }
        });
      },
      { threshold: 0.7 } // Trigger when 20% of the element is visible
    );

    // Observe both image blocks
    if (imageRef1.current) observer.observe(imageRef1.current);
    if (imageRef2.current) observer.observe(imageRef2.current);

    // Cleanup observer on component unmount
    return () => {
      if (imageRef1.current) observer.unobserve(imageRef1.current);
      if (imageRef2.current) observer.unobserve(imageRef2.current);
    };
  }, []);

  return (
    <div>
      {/* Image Slider Section */}
      <div>
        <ImageSlider />
      </div>

      {/* Combined Reviews + Features Section */}
      <section className="bg-white text-center py-10 px-4">
        {/* Reviews Block */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Trusted by Thousands</h2>

          {/* Horizontal rating info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-gray-600">Rated 4.8/5 on Trustpilot</p>
            <img
              src={trustpilotLogo}
              alt="Trustpilot Logo"
              className="w-32 h-auto"
            />
            <p className="text-gray-500">Over 10,000 verified reviews</p>
          </div>
        </div>

        {/* Features Icons Block */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <FaHeadset className="text-blue-600 text-4xl mx-auto mb-2" />
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <p className="text-sm text-gray-600">24/7 dedicated support</p>
          </div>
          <div>
            <FaHome className="text-green-600 text-4xl mx-auto mb-2" />
            <h3 className="font-semibold text-lg">Home Security</h3>
            <p className="text-sm text-gray-600">Smart and reliable systems</p>
          </div>
          <div>
            <FaPhone className="text-purple-600 text-4xl mx-auto mb-2" />
            <h3 className="font-semibold text-lg">Phone Support</h3>
            <p className="text-sm text-gray-600">Easy to reach anytime</p>
          </div>
          <div>
            <FaShieldAlt className="text-red-600 text-4xl mx-auto mb-2" />
            <h3 className="font-semibold text-lg">Protection</h3>
            <p className="text-sm text-gray-600">Complete peace of mind</p>
          </div>
        </div>
      </section>

      {/* New Section for Images with Learn More */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* First Image Block */}
          <div
            ref={imageRef1}
            className={`sec2_item s__bg lazy relative overflow-hidden transform transition-all duration-500 ease-in-out group hover:scale-105 ${inView1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{
              backgroundImage: `url(${meterImage})`,
              height: "600px", // Adjusted height for a larger image
              width: "100%", // Reduced width to 98% to give space for hover scale effect
              backgroundSize: "cover",
              backgroundPosition: "left center", // Positioned the background to the left
            }}
          >
            <p className="text-white text-lg font-semibold absolute bottom-16 left-8 z-10">
              Smart Central Control Panels
            </p>
            <div className="new_white_btn absolute bottom-8 left-8 z-10 opacity-0 transform transition-opacity duration-1000 group-hover:opacity-100">
              <a
                href="/learn-more"
                className="text-white text-lg font-semibold py-2 px-4 bg-black bg-opacity-70 rounded-full hover:bg-opacity-100 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Second Image Block */}
          <div
            ref={imageRef2}
            className={`sec2_item s__bg lazy relative overflow-hidden transform transition-all duration-1000 ease-in-out group hover:scale-105 ${inView2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{
              backgroundImage: `url(${RoboImage})`,
              height: "600px", // Adjusted height for a larger image
              width: "99%", // Reduced width to 98% to give space for hover scale effect
              backgroundSize: "cover",
              backgroundPosition: "right center", // Positioned the background to the right
            }}
          >
            <p className="text-white text-lg font-semibold absolute bottom-16 left-8 z-10">
              Smart Robot Solutions
            </p>
            <div className="new_white_btn absolute bottom-8 left-8 z-10 opacity-0 transform transition-opacity duration-800 group-hover:opacity-100">
              <a
                href="/learn-more"
                className="text-white text-lg font-semibold py-2 px-4 bg-black bg-opacity-70 rounded-full hover:bg-opacity-100 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;