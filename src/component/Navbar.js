import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../component/UserProvider";

const Navbar = ({ logo, ctaButton }) => {
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/", { state: { fromRoot: true } });
  };

  const menuItems = [
    { label: "About Us", isActive: true },
    { label: "Destinations", isActive: false },
    { label: "Universities", isActive: false },
    { label: "Our Products", isActive: false },
    { label: "Our Services", isActive: false },
  ];

  return (
    <>
      <nav className='bg-white absolute top-0 right-0 left-0 shadow-md px-3 md:px-10 py-4 flex items-center justify-between'>
        <div>
          <button
            onClick={handleLogout}
            className='font-bold px-2 md:px-4 py-2 md:py-1 rounded-lg'
          >
            <FontAwesomeIcon icon={faBackward} />
          </button>
        </div>

        <div className='flex-shrink-0'>
          {logo ? (
            <img src={logo} alt='Logo' className='h-6 md:h-8 w-auto' />
          ) : (
            <div className='text-black font-bold text-lg md:text-xl bg-black px-3 md:px-5 py-1'>
              Logo
            </div>
          )}
        </div>

        <ul className='hidden xl:flex space-x-4 lg:space-x-6 text-base lg:text-lg text-gray-700'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className={`${
                  item.isActive && "text-[#ED407D] font-semibold"
                } transition duration-300 whitespace-nowrap`}
              >
                <span className='cursor-pointer'>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex items-center space-x-2 md:space-x-4'>
          <input
            type='text'
            placeholder='Search'
            className='hidden md:block w-24 lg:w-32 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-600'
          />

          <button className='bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-medium shadow hover:opacity-90 transition duration-300 whitespace-nowrap'>
            {ctaButton}
          </button>
        </div>

        <div className='xl:hidden'>
          <button className='text-gray-700 focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
        </div>
      </nav>
      <div className='absolute top-[4.2rem] left-1/2 transform -translate-x-1/2 z-10'>
        <button
          className='bg-gradient-to-r from-pink-400 to-orange-400 text-white font-medium px-4 md:px-6 py-2 rounded-b-2xl transition-colors duration-200 shadow-md text-sm md:text-base'
          onClick={() => {
            console.log("Hi About us");
          }}
        >
          Explore AI Course Finder
        </button>
      </div>
    </>
  );
};

export default Navbar;