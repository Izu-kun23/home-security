import React from 'react';
import { Link } from 'react-router-dom';
import secureImage from '../src/assets/secure.png'; // adjust path if needed

const Header = () => {
  return (
    <header className="w-full h-14 bg-black flex justify-center items-center overflow-hidden">
      <Link to="/">
        <img
          src={secureImage}
          alt="Security"
          className="h-45 object-contain cursor-pointer"
        />
      </Link>
    </header>
  );
};

export default Header;