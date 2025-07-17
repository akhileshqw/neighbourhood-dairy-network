import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "../src/pages/AboutUs.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import LoginForCustomer from "./pages/LoginForCustomer.jsx";
import LoginForVendor from "./pages/LoginForVendor.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import Milk from "./pages/Milk.jsx";
import Vendor from "./components/Vendor.jsx";
import Ghee from "./pages/Ghee.jsx";
import Curd from "./pages/Curd.jsx";
import Skeleton from "react-loading-skeleton";
import Navbar from "./components/Navbar.jsx";
import Premium from "./components/Premium.jsx";
import Layout from "./components/Layout.jsx";
import Rating from "./components/Rating.jsx";
import ViewRating from "./components/ViewRating.jsx";
import RatingList from "./components/RatingList.jsx";
import Verify from "./components/BecomeCertifiedVendor.jsx";
import Manage from "./components/Manage.jsx";
import AboutVendor from "./components/AboutVendor.jsx";
import Account from "./pages/Account.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/navbar", element: <Navbar /> },
      { path: "/contact", element: <Contact /> },
      { path: "/milk", element: <Milk /> },
      { path: "/register", element: <Register /> },
      { path: "/login-customer", element: <LoginForCustomer /> },
      { path: "/login-vendor", element: <LoginForVendor /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/vendor", element: <Vendor /> },
      { path: "/ghee", element: <Ghee /> },
      { path: "/curd", element: <Curd /> },
      { path: "/test", element: <Skeleton /> },
      {path:"/rating",element:<Rating />},
      {path:"/view-rating",element:<RatingList />},
      {path:"/verify",element:<Verify/>},
      {path:"/manage-products",element:<Manage/>},
      {path:"/aboutvendor",element:<AboutVendor/>},
      {path:"/premium",element:<Premium/>},
      {path:"/account",element:<Account/>},
      
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider>

<ToastContainer />
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
  </ToastProvider>
);
