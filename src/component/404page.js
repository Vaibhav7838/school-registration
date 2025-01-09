import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className='min-h-screen flex justify-center py-10 bg-white font-serif'>
      <div className='container mx-auto'>
        <div className='flex justify-center'>
          <div className='text-center'>
            <div
              className='bg-center bg-cover h-[400px]'
              style={{
                backgroundImage:
                  "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
              }}
            >
              <h1 className='text-[80px]'>404</h1>
            </div>

            <div className='mt-[-50px]'>
              <h3 className='text-[80px]'>Look like you're lost</h3>
              <p className='mt-4'>
                The page you are looking for is not available!
              </p>
              <button
                href='/'
                className='inline-block mt-5 px-5 py-2 cursor-pointer text-white bg-[#39ac31] rounded hover:opacity-90'
              >
                <Link to='/' state={""}>
                  Go to Home
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
