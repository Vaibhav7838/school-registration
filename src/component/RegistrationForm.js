import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useUser } from "./UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegistrationForm = () => {
  const { registerUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmEmail: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    password: false,
    confirmEmail: false,
    registrationError: "",
  });

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
      registrationError: "",
    }));
    setIsFirstLoad(false);
  };

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordVisible(false);

    const newErrors = {
      firstName: !formData.firstName,
      email: !formData.email,
      password: !formData.password,
      confirmEmail:
        !formData.confirmEmail || formData.email !== formData.confirmEmail,
      registrationError: "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.log("Form has errors. Please fill out all fields correctly.");
      return;
    }

    try {
      const savedUser = registerUser({
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", savedUser);
      setFormData({
        firstName: "",
        email: "",
        password: "",
        confirmEmail: "",
      });

      navigate("/login", { state: { fromRoot: true } });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        registrationError: error.message,
      }));
    }
  };

  const isFormValid =
    formData.firstName &&
    formData.email &&
    formData.password &&
    formData.confirmEmail &&
    formData.email === formData.confirmEmail;

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-lg'>
        <p className='text-[48px] leading-tight font-semibold text-[#3777FF] text-center'>
          Create an account
        </p>
        <form className='py-5' onSubmit={handleSubmit}>
          {errors.registrationError && (
            <p className='text-red-500 text-sm text-center mb-4'>
              {errors.registrationError}
            </p>
          )}

          <div className='py-5'>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg w-full border font-semibold ${
                errors.firstName
                  ? "border-red-500 animate-jiggle"
                  : "border-black"
              } text-[#959595]`}
              placeholder='First Name'
            />
          </div>

          <div className='py-5'>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg w-full border font-semibold ${
                errors.email ? "border-red-500 animate-jiggle" : "border-black"
              } text-[#959595]`}
              placeholder='Email Address'
            />
          </div>

          <div className='py-5 relative'>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg w-full border font-semibold ${
                errors.password
                  ? "border-red-500 animate-jiggle"
                  : "border-black"
              } text-[#959595]`}
              placeholder='Password'
            />
            <button
              type='button'
              onClick={handlePasswordVisibilityToggle}
              className='absolute right-4 top-1/2 transform -translate-y-1/2'
            >
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEye : faEyeSlash}
                className='text-gray-400'
              />
            </button>
          </div>

          <div className='py-5'>
            <input
              type='email'
              name='confirmEmail'
              value={formData.confirmEmail}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg w-full border font-semibold ${
                errors.confirmEmail
                  ? "border-red-500 animate-jiggle"
                  : "border-black"
              } text-[#959595]`}
              placeholder='Confirm Email Address'
            />
          </div>

          <div className='text-center py-3'>
            <Button
              text={"Register Now"}
              isFormValid={isFormValid}
              isFirstLoad={isFirstLoad}
            />
          </div>

          <p className='text-center leading-tight py-5'>
            Already have an account?{" "}
            <span className='text-[#3777FF] font-semibold'>
              <Link to={"/login"} state={{ fromRoot: true }}>
                Login Now
              </Link>
            </span>
          </p>

          <div className='content'>
            <p className='or text-[#6c85bb]'>OR</p>
          </div>

          <div className='grid grid-cols-2 gap-5 py-5'>
            <div className='border border-[#4D4D4D] px-10 py-2 rounded cursor-pointer'>
              <img src='/svg/Google.svg' alt='Google' className='mx-auto' />
            </div>
            <div className='border border-[#4D4D4D] px-10 py-2 rounded cursor-pointer'>
              <img src='/svg/Apple.svg' alt='Apple' className='mx-auto' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
