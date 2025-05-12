import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Rimbero</h3>
          <p className="text-sm text-gray-300">
            Providing trusted security and support services nationwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: support@example.com</p>
          <p className="text-sm text-gray-300">Phone: +1 234 567 890</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <FaFacebookF className="text-xl hover:text-blue-500" />
            <FaTwitter className="text-xl hover:text-blue-400" />
            <FaInstagram className="text-xl hover:text-pink-400" />
            <FaLinkedinIn className="text-xl hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} Rimbero. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;