import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useUser } from "./UserProvider";
import { handleNumericInput } from "../Function/Regex";

const WelcomeForm = () => {
  const navigate = useNavigate();
  const { currentUser, updateNumber } = useUser();
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName?.split(" ")[0] || "",
    lastName: currentUser.firstName?.split(" ")[1] || "",
    middleName: "",
    email: currentUser.email || "",
    number: "",
  });

  const [errors, setErrors] = useState({
    number: false,
  });

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.number) {
      setErrors({ number: true });
      const numberInput = document.querySelector('input[name="number"]');
      numberInput.classList.add('animate-jiggle');
      setTimeout(() => {
        numberInput.classList.remove('animate-jiggle');
      }, 500);

      return;
    }

    try {
      updateNumber(formData.number);
      setFormData({ number: "" });
    } catch (error) {
      console.error("Error updating mobile number:", error.message);
    }
    navigate("/verify", { state: { fromRoot: true } });
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div
      className='min-h-screen flex justify-center items-center bg-[#C5C5C54D]'
      style={{ backgroundImage: "url('/svg/Prefilled.svg')" }}
    >
      <div className='w-full max-w-2xl'>
        <p className='text-[48px] leading-tight font-semibold text-[#3777FF] text-center'>
          Hey, {currentUser.firstName || ""}
        </p>
        <p className='text-[32px] leading-tight font-semibold text-[#3777FF] text-center'>
          Let’s get to know you better so we can map out your perfect study
          journey
        </p>
        <form className='py-5 px-20' onSubmit={handleSubmit}>
          <div className='py-5'>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className={`px-4 py-3 text-[#709BF6] text-xl font-semibold bg-transparent rounded-lg w-full border-[1.5px] ${
                errors.firstName ? "border-red-500" : "border-black"
              } text-[#959595]`}
              placeholder='First Name'
            />
          </div>

          <div className='py-5'>
            <input
              type='text'
              name='middleName'
              value={formData.middleName}
              onChange={handleChange}
              className={`px-4 py-3 text-[#709BF6] text-xl font-semibold bg-transparent rounded-lg w-full border-[1.5px] ${
                errors.middleName ? "border-red-500" : "border-black"
              } text-[#959595]`}
              placeholder='Middle Name (optional)'
            />
          </div>

          <div className='py-5'>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className={`px-4 py-3 text-[#709BF6] text-xl font-semibold bg-transparent rounded-lg w-full border-[1.5px] ${
                errors.lastName ? "border-red-500" : "border-black"
              } text-[#959595]`}
              placeholder='Last Name'
            />
          </div>

          <div className='py-5'>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`px-4 py-3 text-[#709BF6] text-xl font-semibold bg-transparent rounded-lg w-full border-[1.5px] ${
                errors.email ? "border-red-500" : "border-black"
              } text-[#959595]`}
              placeholder='Email address'
            />
          </div>

          <div className='py-5'>
            <input
              type='tel'
              name='number'
              value={formData.number}
              onChange={(e) => handleNumericInput(e, setFormData)}
              className={`px-4 py-3 text-[#709BF6] text-xl bg-transparent rounded-lg w-full border font-semibold ${
                errors.number ? "border-red-500 animate-jiggle" : "border-black"
              } text-[#959595]`}
              placeholder='Primary Contact Number'
              maxLength={10}
            />
          </div>

          <div className='text-center py-3'>
            <Button
              text={"Verify"}
              isFormValid={isFormValid}
              isFirstLoad={isFirstLoad}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeForm;
