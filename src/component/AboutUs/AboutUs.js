import React, { useState, useRef } from "react";
import SlideOneComponent from "./OurCompany";
import SlideTwoComponent from "./OurMission";
import SlideThreeComponent from "./OurVision";

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
      title: "",
      text: "Founded in April 2023, Daltin aims to transform education by blending global best practices with cutting-edge technology. Partnering with over 500 institutions worldwide, we provide innovative, tech-driven study options that meet the evolving needs of students. Our AI-based portal combines traditional teaching with advanced tools, including virtual assistants and chatbots, for real-time support, creating a dynamic and interactive learning experience. Daltin is pioneering a new era in international education.",
      images: ["/svg/Ourmission98.png", "/svg/Ourmission97.png"],
    },
    {
      title: "Our Mission & Vision",
      text: "We seek to simplify the educational landscape using technology. We are empowering students to make more informed decisions about their educational paths. Everything is right here, with us, right now.We seek to simplify the educational landscape using technology. We are empowering students to make more informed decisions about their educational paths. Everything is right here, with us, right now.",
      images: ["/svg/Rectangle 124.png", "/svg/Rectangle 123.png"],
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
    const walk = x - startX;
    const threshold = 200;
    if (walk < -threshold && activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
      setIsDragging(false);
    } else if (walk > threshold && activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
      setIsDragging(false);
    }
  };

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onMouseMove={handleDragMove}
      className='min-h-screen bg-gradient-to-r from-purple-100 via-white to-pink-100 flex items-center justify-center'
    >
      <div className='w-full mx-auto'>
        <div className='relative select-none'>
          <div>
            <div className='w-full'>
              {activeSlide === 0 && (
                <SlideOneComponent slide={slides[activeSlide]} />
              )}
              {activeSlide === 1 && (
                <SlideTwoComponent slide={slides[activeSlide]} />
              )}
              {activeSlide === 2 && (
                <SlideThreeComponent slide={slides[activeSlide]} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-10 left-0 right-0 flex justify-center px-4'>
        <div className='flex justify-between w-full cursor-grab items-center'>
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className={`w-[2px] ${
                i % 2 === 0 ? "h-10 md:h-12 bg-black" : "h-4 md:h-5 bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
