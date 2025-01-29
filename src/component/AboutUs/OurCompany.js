const SlideOneComponent = ({ slide }) => (
  <div className='lg:pl-10'>
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center pl-10 pb-10'>
      <div className='w-full md:pl-10'>
        <div className='md:px-0 lg:px-24'>
          <h2 className='text-2xl md:text-3xl lg:text-[54px] font-semibold mb-4 md:mb-6'>
            {slide.title}
          </h2>
          <p className='text-sm lg:text-[20px] leading-[2.5rem]'>
            {slide.text}
          </p>
        </div>
      </div>

      <div className='relative w-full'>
        <img
          src={slide.images[0]}
          alt={`Slide image 1`}
          className='w-[full] pl-28 h-auto max-w-full'
          loading='lazy'
        />
        <img
          src={slide.images[1]}
          alt={`Slide image 2`}
          className='absolute w-1/2 h-auto shadow-lg -bottom-16 left-2 sm:left-20 md:left-0'
          loading='lazy'
        />
      </div>
    </div>
  </div>
);

export default SlideOneComponent;
