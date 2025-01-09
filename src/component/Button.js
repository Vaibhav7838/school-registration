import React from "react";

const Button = (props) => {
  const { isFormValid = true, isFirstLoad, text } = props;
  
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={!isFormValid && !isFirstLoad}
        className={`text-[16px] font-bold md:text-[20px] px-4 md:px-5 py-2 md:py-3 rounded-lg leading-tight w-full transform transition-all duration-200 ease-in-out ${
          isFormValid || isFirstLoad
            ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg active:shadow-inner active:scale-105"
            : "bg-gray-300 text-white cursor-not-allowed"
        } 
        shadow-lg shadow-gray-500/50 active:shadow-md active:scale-105
        border-2 border-gray-500
        border-opacity-30`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
