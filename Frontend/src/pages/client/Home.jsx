import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "../../../components/ImageSlider"; 
import { FaHeadset, FaHome, FaPhone, FaShieldAlt } from "react-icons/fa"; 
import trustpilotLogo from "../../assets/trustpilot.svg"; 
import meterImage from "../../assets/meter.jpg"; 
import RoboImage from "../../assets/robo.jpg";

const Home = () => {
  const [inView1, setInView1] = useState(false);
  const [inView2, setInView2] = useState(false);

  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef1.current) setInView1(true);
            else if (entry.target === imageRef2.current) setInView2(true);
          }
        });
      },
      { threshold: 0.7 }
    );

    if (imageRef1.current) observer.observe(imageRef1.current);
    if (imageRef2.current) observer.observe(imageRef2.current);

    return () => {
      if (imageRef1.current) observer.unobserve(imageRef1.current);
      if (imageRef2.current) observer.unobserve(imageRef2.current);
    };
  }, []);

  return (
    <div>
      <div>
        <ImageSlider />
      </div>

      <section className="bg-white text-center py-10 px-4">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Trusted by Thousands</h2>
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

        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center px-4">
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

      <section className="bg-gray-100 py-10 px-4">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {/* First Image Block */}
          <div
            ref={imageRef1}
            className={`sec2_item s__bg lazy relative overflow-hidden transform transition-all duration-500 ease-in-out group hover:scale-105 rounded-lg shadow-lg
              ${inView1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{
              backgroundImage: `url(${meterImage})`,
              height: "400px",
              backgroundSize: "cover",
              backgroundPosition: "left center",
            }}
          >
            <p className="text-white text-lg font-semibold absolute bottom-16 left-6 z-10 sm:text-xl">
              Smart Central Control Panels
            </p>
            <div className="new_white_btn absolute bottom-8 left-6 z-10 opacity-0 transform transition-opacity duration-1000 group-hover:opacity-100">
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
            className={`sec2_item s__bg lazy relative overflow-hidden transform transition-all duration-500 ease-in-out group hover:scale-105 rounded-lg shadow-lg
              ${inView2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{
              backgroundImage: `url(${RoboImage})`,
              height: "400px",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          >
            <p className="text-white text-lg font-semibold absolute bottom-16 left-6 z-10 sm:text-xl">
              Smart Robot Solutions
            </p>
            <div className="new_white_btn absolute bottom-8 left-6 z-10 opacity-0 transform transition-opacity duration-800 group-hover:opacity-100">
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