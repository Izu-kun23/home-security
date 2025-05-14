import React from 'react';
import { Link } from 'react-router-dom';
import Homelogo from '../src/assets/Homelogo.png'; // Adjust the path as necessary
const Header = () => {
  return (
    <header className="w-full h-14 bg-black flex justify-center items-center overflow-hidden">
      <Link to="/">
        <img
          src={Homelogo}
          alt="logo"
          className="h-60 object-contain cursor-pointer"
        />
      </Link>
    </header>
  );
};

export default Header;