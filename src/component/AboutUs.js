import React, { useState, useRef } from "react";

const AboutUs = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      title: "About The Company",
      text: "At Daltin, we connect students with universities worldwide through our innovative all-in-one platform, streamlining the student recruiting process. We empower students with educational opportunities that enhance their quality of life and promote global betterment. By bridging international education providers and recruiting partners, we provide students access to diverse study options from anywhere in the world, transforming lives through education.",
      images: ["/svg/Rectangle 97.png", "/svg/Rectangle 98.png"],
    },
    {
      title: "Our Mission",
      text: "We strive to make quality education accessible globally through innovative technology solutions.",
      images: ["/api/placeholder/500/300"],
    },
    {
      title: "Our Impact",
      text: "Connecting thousands of students with their dream universities across continents.",
      images: ["/api/placeholder/500/300"],
    },
  ];

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (walk < -50 && activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
      setIsDragging(false);
    } else if (walk > 50 && activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
      setIsDragging(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-100 via-white to-pink-100 flex items-center justify-center'>
      <div className='w-full mx-auto'>
        <div
          ref={sliderRef}
          className='relative select-none'
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onMouseMove={handleDragMove}
        >
          <div className='lg:pl-10'>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center pl-10 pb-10'>
              <div className='w-full md:pl-10'>
                <div className='md:px-0 lg:px-24'>
                  <h2 className='text-2xl md:text-3xl lg:text-[54px] font-semibold mb-4 md:mb-6 '>
                    {slides[activeSlide].title}
                  </h2>
                  <p className='text-sm lg:text-[20px] leading-[2.5rem]'>
                    {slides[activeSlide].text}
                  </p>
                </div>
              </div>

              <div className='relative w-full'>
                <img
                  src={slides[activeSlide].images[0]}
                  alt={`Slide ${activeSlide + 1} image 1`}
                  className='w-[full] pl-28 h-auto max-w-full'
                  loading="lazy"
                />
                <img
                  src={slides[activeSlide].images[1]}
                  alt={`Slide ${activeSlide + 1} image 2`}
                  className='absolute w-1/2 h-auto shadow-lg -bottom-16 left-2 sm:left-20 md:left-0'
                  loading="lazy"
                />
              </div>
            </div>
          </div>
            <div className='absolute -bottom-24 left-0 right-0 flex justify-between px-2 md:px-4'>
              <div className='flex justify-between w-full gap-1  cursor-grab'>
                {Array.from({ length: 50 }, (_, i) => (
                  <div key={i} className='flex flex-col items-center'>
                    <div
                      className={`${
                        i % 5 === 0 ? "h-8 md:h-10" : "h-2 md:h-3"
                      } w-[2px] bg-[#000000]`}
                    />
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;