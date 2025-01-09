import React from "react";
import RegistrationForm from "./RegistrationForm";

const Registration = () => {
  return (
    <div className='min-h-screen relative overflow-hidden bg-[#ffffff]'>
      <div className='flex'>
        <div className='relative w-[40%] h-full'>
          <div className='flex justify-center items-center w-full h-screen'>
            <img
              src='/svg/Rectangle.svg'
              alt='Background'
              className='w-full h-full object-cover'
              loading="lazy"
            />
          </div>

          <div className='absolute top-0 left-0 w-full h-full'>
            <img
              src='/svg/Stars.svg'
              alt='Stars'
              className='w-full h-full object-cover'
              loading="lazy"
            />
          </div>

          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <div className='text-3xl md:text-[56px] leading-tight font-bold text-white px-4 py-2 rounded-md text-center'>
              <p>Your Journey</p>
              <p>Abroad Starts Here!</p>
            </div>
            <div className='text-3xl md:text-[32px] leading-tight font-bold text-white px-4 py-10 rounded-md text-center'>
              <p>Join thousands of students</p>
              <p>who’ve found their dream</p>
              <p>universities with us.</p>
            </div>
          </div>
        </div>
        <div className='w-[60%]'>
          <div className=''>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
