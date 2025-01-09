import React from "react";
import LoginForm from "./LoginForm";
const Login = () => {
  return (
    <div className='min-h-screen relative overflow-hidden bg-[#ffffff]'>
      <div className='flex'>
        <div className='relative w-[40%] h-full order-2'>
          <div className='flex justify-center items-center w-full h-screen'>
            <img
              src='/svg/Rectangle.svg'
              alt='Background'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='absolute top-0 right-0 w-full h-full'>
            <img
              src='/svg/Stars.svg'
              alt='Stars'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <div className='text-3xl md:text-[56px] leading-tight font-bold text-white px-4 py-2 rounded-md text-center'>
              <p>Welcome Back,</p>
              <p>Future Achiever!</p>
            </div>
            <div className='text-3xl md:text-[32px] leading-tight font-bold text-white px-4 py-10 rounded-md text-center'>
              <p>We're excited to continue where</p>
              <p>you left off.</p>
            </div>
          </div>
        </div>
        <div className='w-[60%] order-1'>
          <div className=''>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
