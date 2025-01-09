import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useUser } from "./UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const { loginUser, rememberedEmail } = useUser();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!rememberedEmail);

  const [formData, setFormData] = useState({
    email: rememberedEmail || "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    loginError: "",
  });

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
      loginError: "",
    }));
    setIsFirstLoad(false);
  };

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked && rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: !formData.email,
      password: !formData.password,
      loginError: "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.log("Form has errors. Please fill out all fields correctly.");
      return;
    }

    try {
      await loginUser(formData.email, formData.password, rememberMe);

      if (rememberedEmail) {
        navigate("/verify", { state: { fromRoot: true } });
      } else {
        navigate("/welcome", { state: { fromRoot: true } });
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        loginError: error.message,
      }));
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-md'>
        <p className='text-[48px] leading-tight font-semibold text-[#3777FF] text-center'>
          Login To Daltin
        </p>
        <form className='py-5' onSubmit={handleSubmit}>
          {errors.loginError && (
            <p className='text-red-500 text-sm text-center mb-4'>
              {errors.loginError}
            </p>
          )}

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

          <div className='flex justify-between py-5'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className='peer hidden'
              />
              <label
                htmlFor='rememberMe'
                className='w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500'
              >
                <img src='/svg/rightIcon.svg' alt='checkmark' />
              </label>
              <span className='px-2'>Remember me</span>
            </div>
            <div>
              <span className='cursor-pointer'>Forgot your password?</span>
            </div>
          </div>

          <div className='text-center py-3'>
            <Button
              text={"Login"}
              isFormValid={isFormValid}
              isFirstLoad={isFirstLoad}
            />
          </div>

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

          <div>
            <p className='text-center leading-tight py-5'>
              Don't have an account yet?{" "}
              <span className='text-[#3777FF] font-semibold'>
                <Link to={"/registration"} state={{ fromRoot: true }}>
                  Register
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
