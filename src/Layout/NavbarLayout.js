import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const NavbarLayout = () => {
  return (
    <div>
      <Navbar logo={"/svg/logo.svg"} ctaButton={"Talk to experts"} />

      <Outlet />
    </div>
  );
};

export default NavbarLayout;
