import React, { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import { useUser } from "./UserProvider";
import { maskPhoneNumber, generateOtp } from "../Function";

const Verify = () => {
  const { currentUser } = useUser();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isExpired, setIsExpired] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const tempOtp = generateOtp();
    setOtp(tempOtp);

    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(id);
          setIsExpired(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  const handleResend = () => {
    setIsExpired(false);
    setTimer(30);

    if (intervalId) {
      clearInterval(intervalId);
    }

    const newOtp = generateOtp();
    setOtp(newOtp);
    console.log("New OTP sent:", newOtp);

    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(id);
          setIsExpired(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  if (!currentUser) {
    return (
      <div className="text-center text-red-500">
        <p>Error: User not found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-100 via-white to-pink-200 flex items-center justify-center w-full min-h-screen bg-gray-100 md:px-0 px-5">
      <div>
        <div className="text-center">
          <h1 className="text-[#3777FF] text-[24px] md:text-[48px] font-semibold py-2">
            Verify Your Code
          </h1>
          <p className="text-[18px] md:text-[24px] md:leading-[3rem] font-semibold">
            Enter the code you just received on your mobile number <br />
            ending with {maskPhoneNumber(currentUser.number)}.
          </p>
        </div>
        <div className="pt-10 py-2">
          <OtpInput verifyOtp={otp} />
          <div className="text-center mt-4 text-lg">
            <p>
              Your OTP: <strong>{otp}</strong>
            </p>
          </div>
        </div>

        <div className="text-center text-lg">
          {!isExpired ? (
            <p className={"text-rose-400"}>Time remaining: {timer} seconds</p>
          ) : (
            <button className="text-[#3777FF] underline" onClick={handleResend}>
              Resend OTP
            </button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 py-5">
          <p className="text-center underline text-[18px]">Contact Support</p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
