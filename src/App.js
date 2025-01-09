import ReactDOM from "react-dom/client";
import "./App.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";
import LetsGetStarted from "./component/LetsGetStarted";
import Registration from "./component/Registration";
import Login from "./component/Login";
import WelcomeForm from "./component/Welcome";
import { UserProvider, useUser } from "./component/UserProvider";
import VerifyOtp from "./component/Verify";
import AboutUs from "./component/AboutUs";
import NavbarLayout from "./Layout/NavbarLayout";
import ErrorPage from "./component/404page";

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const {isAuthenticated} = useUser()
  const allowedPaths = [
    "/",
    "/registration",
    "/login",
    "/welcome",
    "/verify",

  ];
  const isFromRoot = location.state?.fromRoot;

  if (location.pathname === "/about-us") {
    return isAuthenticated ? element : <Navigate to='/' replace />;
  }

  if (
    (allowedPaths.includes(location.pathname) && isFromRoot) ||
    location.pathname === "/about-us"
  ) {
    return element;
  }

  if (allowedPaths.includes(location.pathname) && isFromRoot) {
    return element;
  }

  return <ErrorPage />;
};

export const App = () => {
  return (
    <UserProvider>
      <div id='root' className='App font-poppins'>
        <Outlet />
      </div>
    </UserProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LetsGetStarted />,
      },
      {
        path: "/registration",
        element: <ProtectedRoute element={<Registration />} />,
      },
      {
        path: "/login",
        element: <ProtectedRoute element={<Login />} />,
      },
      {
        path: "/welcome",
        element: <ProtectedRoute element={<WelcomeForm />} />,
      },
      {
        path: "/verify",
        element: <ProtectedRoute element={<VerifyOtp />} />,
      },
      {
        path: "/",
        element: <NavbarLayout />,
        children: [
          {
            path: "about-us",
            element: <ProtectedRoute element={<AboutUs />} />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
