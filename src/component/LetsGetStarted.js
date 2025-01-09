import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

const LetsGetStarted = () => {
  const [positions, setPositions] = useState([0, 1, 2]);
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  console.log("isAuthenticated",isAuthenticated)

  const cards = [
    {
      title: "Stay in the Loop, Always",
      src: "/svg/Card1.svg",
      description:
        "Track your application progress in real-time and never miss a single update",
      color: "bg-white",
    },
    {
      title: "Expert Support, Anytime",
      src: "/svg/Card2.svg",
      description:
        "Connect directly with admission experts through chats and calls, all within the app",
      color: "bg-white",
    },
    {
      title: "Find Your Perfect Match",
      src: "/svg/Card3.svg",
      description:
        "Instantly check your eligibility for top universities and courses tailored to your goals",
      color: "bg-white",
    },
  ];

  const getPositionStyle = (position) => {
    switch (position) {
      case 0:
        return {
          transform: "translateX(5vw) translateZ(20px) translateY(0) scale(1)",
          zIndex: 30,
          opacity: 1,
        };
      case 1:
        return {
          transform: "translateX(12vw) translateZ(-20px) translateY(20px) scale(0.95)",
          zIndex: 20,
          opacity: 0.95,
        };
      case 2:
        return {
          transform: "translateX(calc(65vw - 240px)) translateZ(0px) translateY(0) scale(1.2)",
          zIndex: 25,
          opacity: 1,
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setPositions((prev) => [prev[1], prev[2], prev[0]]);
    }, 3000);

    const navigationTimer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/login",{ state: { fromRoot: true } });
      } else {
        navigate("/registration", { state: { fromRoot: true } });
      }
    }, 10000);

    return () => {
      clearInterval(rotationInterval);
      clearTimeout(navigationTimer);
    };
  }, [navigate, isAuthenticated]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/login", {state: {fromRoot: true }});
    } else {
      navigate("/registration", {state: {fromRoot: true}});
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 via-white to-pink-200 flex items-center justify-center relative w-full min-h-screen bg-gray-100 rounded-lg perspective-1000">
      <div className="absolute left-0 top-0 w-full h-full px-4 md:px-12 lg:px-24 xl:px-60">
        {cards.map((card, index) => (
          <div
            key={card.title}
            style={{
              ...getPositionStyle(positions[index]),
              position: "absolute",
              top: "20%",
              transition: "all 2s cubic-bezier(0.4, 0, 0.2, 1)",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
            className={`
              w-[80vw] sm:w-[350px] md:w-[400px] lg:w-[300px] xl:w-[380px] py-5 md:py-10 px-3 md:px-5 rounded-2xl shadow-lg
              ${card.color}
              text-center border-[4px] md:border-[5px] border-[#d56be5]
            `}
          >
            <img
              src={card.src}
              alt={`${card.title}`}
              className="mx-auto w-1/2 md:w-3/4"
            />
            <div>
              <h3 className="text-black text-[16px] md:text-[26px] px-2 pt-6 leading-tight font-bold">
                {card.title}
              </h3>
              <p className="px-2 pt-5 text-[14px] md:text-[20px] leading-tight">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 md:bottom-20 w-full flex justify-center">
        <button
          onClick={handleGetStarted}
          className="text-[16px] md:text-[20px] px-4 md:px-5 py-2 md:py-3 rounded-lg leading-tight bg-gradient-to-r from-pink-500 to-purple-500 text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl hover:translate-y-[-5px] shadow-xl border-2"
        >
          Let's get started
        </button>
      </div>
    </div>
  );
};

export default LetsGetStarted;