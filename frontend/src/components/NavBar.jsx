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
          className="text-white text-4xl font-extrabold tracking-wide hover:opacity-90 transition-opacity duration-300"
        >
          Analyzer
        </Link>

        {/* Hamburger Icon */}
        <div
          className="md:hidden  flex  ml-32  items-center"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <FaTimes className="text-white text-3xl" />
          ) : (
            <FaBars className="text-white text-3xl" />
          )}
        </div>

        {/* Navigation Links */}
        <div
          className={`flex items-center space-x-6 md:space-x-10 ${
            isOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {user ? (
            <>
              {/* User Info */}
              <div className=" items-center hidden md:flex text-white">
                <FaUserCircle className="mr-2 text-3xl" />
                <span className="font-medium text-lg">Hi {user.name}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logoutUser}
                className="bg-white hidden md:block text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
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

      {/* Mobile Menu for Small Screens */}
      <div
        className={`md:hidden flex flex-col ml-40   items-center mt-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {user ? (
          <>
            <div className="flex items-center text-white mb-4">
              <FaUserCircle className="mr-2 text-3xl" />
              <span className="font-medium text-lg">Hi {user.name}</span>
            </div>

            <button
              onClick={logoutUser}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300 mb-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300 mb-2"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="text-white font-semibold hover:underline transition-opacity duration-300 mb-2"
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
