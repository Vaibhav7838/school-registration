import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OtpInput = (props) => {
  const navigate = useNavigate();
  const { verifyOtp } = props;
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);

  useEffect(() => {
    const firstInput = document.getElementById("otp-input-0");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^\d]/g, "").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    document.getElementById(`otp-input-${focusIndex}`).focus();
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue === verifyOtp) {
      navigate("/about-us", { state: { fromRoot: true } });
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div>
      <div
        className={`flex justify-center items-center space-x-2 lg:space-x-4 mb-4 ${
          error ? "animate-jiggle" : ""
        }`}
      >
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`md:w-16 w-10 h-10 md:h-16 text-center border ${
              error ? "border-red-500" : "border-[#4D4D4D]"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-custom-focus text-lg`}
            maxLength={1}
            autoComplete="off"
          />
        ))}
      </div>
      <div className="text-center py-16 md:py-10">
        <button
          onClick={handleSubmit}
          className="text-[16px] font-bold md:text-[20px] px-4 md:px-5 py-2 md:py-3 rounded-lg leading-tight w-[70%] bg-gradient-to-r from-orange-300  to-pink-400 text-white 
            shadow-lg shadow-gray-500/50 active:shadow-md active:scale-105
            border-2 border-gray-500 border-opacity-30
            transform transition-all duration-200 ease-in-out"
        >
          Verify Now
        </button>
      </div>
    </div>
  );
};

export default OtpInput;