const SlideTwoComponent = ({ slide }) => (
  <div className='lg:pl-10'>
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center pl-10 pb-10'>
      <div className='relative'>
        <div className='flex w-full gap-4 pt-10'>
          <div className='w-1/2'>
            <img
              src={slide.images[0]}
              alt={`Slide image 1`}
              className='w-full shadow-md'
              loading='lazy'
            />
          </div>
          <div className='w-1/2'>
            <div className=''>
              <h1 className='text-5xl font-bold mb-4'>Our Story</h1>
              <img
                src={slide.images[1]}
                alt={`Slide image 2`}
                className='w-full shadow-md'
                loading='lazy'
              />
            </div>
          </div>
        </div>
        <div className='absolute bottom-20 left-48'>
          <h2 className='text-7xl font-bold'>2023</h2>
        </div>
      </div>

      <div className='w-full md:pl-10'>
        <div className='md:px-0 lg:px-16'>
          <h2 className='text-2xl md:text-3xl lg:text-[54px] font-semibold mb-4 md:mb-6'>
            {slide.title}
          </h2>
          <p className='text-sm lg:text-[20px] leading-[2.5rem]'>
            {slide.text}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SlideTwoComponent;
