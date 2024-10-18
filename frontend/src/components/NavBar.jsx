import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext"; // Adjust the import path as necessary
import { FaUserCircle } from "react-icons/fa"; // Using an icon for the user
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons

const NavBar = () => {
  const { user, logoutUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl md:text-4xl font-extrabold tracking-wide hover:opacity-90 transition-opacity duration-300"
        >
          Analyzer
        </Link>

        {/* Hamburger Icon (visible on small screens) */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-white text-3xl" />
          ) : (
            <FaBars className="text-white text-3xl" />
          )}
        </div>

        {/* Desktop Navigation Links */}
        <div className={`hidden md:flex items-center space-x-6 md:space-x-10`}>
          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center text-white">
                <FaUserCircle className="mr-2 text-3xl" />
                <span className="font-medium text-lg">Hi, {user.name}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logoutUser}
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Register Button */}
              <Link
                to="/register"
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
              >
                Register
              </Link>

              {/* Login Link */}
              <Link
                to="/login"
                className="text-white font-semibold hover:underline transition-opacity duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (visible on small screens) */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden flex flex-col items-center mt-4 space-y-4`}
      >
        {user ? (
          <>
            <div className="flex items-center text-white">
              <FaUserCircle className="mr-2 text-3xl" />
              <span className="font-medium text-lg">Hi, {user.name}</span>
            </div>

            <button
              onClick={logoutUser}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="text-white font-semibold hover:underline transition-opacity duration-300"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
