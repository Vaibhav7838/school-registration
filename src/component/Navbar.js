import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {useUser} from "../component/UserProvider";

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
    <nav className='bg-white absolute top-0 right-0 left-0 shadow-md px-5 py-4 flex items-center justify-between'>
      <div>
        <button
          onClick={handleLogout}
          className={`font-bold px-4 md:px-5 py-2 md:py-1 rounded-lg w-full}`}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
      </div>

      <div className='flex-shrink-0'>
        {logo ? (
          <img src={logo} alt='Logo' className='h-8 w-auto' />
        ) : (
          <div className='text-black font-bold text-xl bg-black px-5 py-1'>
            Logo
          </div>
        )}
      </div>

      <ul className='hidden lg:flex space-x-8 text-[20px] text-gray-700'>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className={`${
                item.isActive && "text-[#ED407D] font-semibold"
              } transition duration-300`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className='flex items-center space-x-4'>
        <input
          type='text'
          placeholder='Search'
          className='hidden md:block border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-600'
        />

        <button className='bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition duration-300'>
          {ctaButton}
        </button>
      </div>

      <div className='lg:hidden'>
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
  );
};

export default Navbar;
