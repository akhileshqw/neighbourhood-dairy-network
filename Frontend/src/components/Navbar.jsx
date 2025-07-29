import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import Skeleton from "react-loading-skeleton";
import { UserCircleIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  let { LoginUser } = useContext(userContext);
  const [ready, setready] = useState(false);
  const handleClick = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });
    // LoginUser=null;
    navigate("/");
    window.location.reload();
  };
  // 1. Direct mutation of LoginUser is incorrect since it's from context
  // 2. The fetch call response is not being handled
  // Here's the corrected version:
  // const handleClick = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/logout`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       // Use context setter function instead of direct mutation
  //       // LoginUser should be updated through context
  //       navigate("/");
  //       window.location.reload();
  //     } else {
  //       console.error("Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //   }
  // };
  // Yes, there is an error in the onClick handler of the navbar-toggler button
  // The onClick={""} is invalid - it's trying to set an empty string as the handler
  // This state and handler are needed to make the mobile navigation toggle work properly
  // const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // const handleNavCollapse = () => {
  //   setIsNavCollapsed(!isNavCollapsed);
  // };

  // The isNavCollapsed state should be used in the navbar collapse div like:
  // <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`}>
  // This makes the mobile menu toggle work by adding/removing the 'show' class
  useEffect(() => {
    setTimeout(() => {
      setready(true);
    }, 200);
  }, []);

  console.log("navbar component", LoginUser);
  // console.log(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`)
  // console.log("Backend Base URL:", import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL);


  const isProductsActive =
    location.pathname === "/milk" ||
    location.pathname === "/ghee" ||
    location.pathname === "/curd";

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark smaller"
        data-bs-theme="dark"
        style={{
          position: "fixed",
          top: "0",
          height: "80px",
          width: "100%",
          backgroundColor: "#333",
          color: "white",
          zIndex: "1000",
        }}
      >
        <div
          className="container-fluid"
          style={{ zIndex: "100",backgroundColor: "rgb(43, 48, 51)" }}
        >
          <Link className="navbar-brand abc task_1" to="/">
            <img
              src="logo.png"
              alt="Logo"
              width={82}
              height={50}
              style={{borderRadius: "100%"}}
              className="d-inline-block align-text-center"
            />
            <div>Milk on the Way</div>
          </Link>
          <button
            id="nav-ref"
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className={({ isActive }) =>
                    isActive && isProductsActive
                      ? "nav-link active dropdown-toggle"
                      : "nav-link dropdown-toggle"
                  }
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </NavLink>
                <ul id="why" className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/milk"
                      onClick={(e) => {
                        e.target
                          .closest(".dropdown-menu")
                          .classList.remove("show");
                      }}
                    >
                      Milk
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/ghee"
                      onClick={(e) => {
                        e.target
                          .closest(".dropdown-menu")
                          .classList.remove("show");
                      }}
                    >
                      Ghee
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/curd"
                      onClick={(e) => {
                        e.target
                          .closest(".dropdown-menu")
                          .classList.remove("show");
                      }}
                    >
                      Curd
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/premium"
                >
                  Get Premium
                </NavLink>
              </li>
            </ul>

            {ready ? (
              <>
                {!!LoginUser ? (
                  <>
                    <div
                      className="dropdown justify-content-center"
                      style={{ position: "relative" }}
                    >
                      {/* Display Certified Icon if User is Certified */}

                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          border: "1px solid white",
                          padding: "5px",
                          borderRadius: "5px",
                          boxShadow: "2px 2px 5px black",
                          display: "flex",
                          gap: "10px",
                          color: "white",
                          fontWeight: "bold",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div>
                            <UserCircleIcon />
                          </div>
                          {LoginUser.isCertified && (
                            <div
                              style={{
                                // position: "absolute",
                                // top: "0px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                // right: "100px",
                                zIndex: "10",
                                height: "16px",
                                width: "14px",
                                backgroundColor: "gold",
                                borderRadius: "50%",
                                padding: "2px 2px",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                              }}
                              title="Certified Vendor"
                            >
                              <i
                                className="fas fa-check-circle"
                                style={{ color: "black", fontSize: "large" }}
                              >
                                c
                              </i>
                            </div>
                          )}
                        </div>

                        {LoginUser.username}
                      </button>

                      {/* Vendor Dropdown Menu */}
                      {LoginUser.isVendor && (
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/account">
                              My Account
                            </Link>
                          </li>
                          {!LoginUser.isCertified && (
                            <li>
                              <Link className="dropdown-item" to="/verify">
                                Get Verified
                              </Link>
                            </li>
                          )}
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/manage-products"
                              style={{ textWrap: "wrap" }}
                            >
                              Manage Products and Cost
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/premium">
                              Get Premium
                            </Link>
                          </li>
                          <li
                            onClick={handleClick}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginLeft: "18px",
                            }}
                          >
                            <div>Logout</div>
                          </li>
                        </ul>
                      )}

                      {/* Customer Dropdown Menu */}
                      {!LoginUser.isVendor && (
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/account">
                              My Account
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/rating">
                              Rate the Vendors
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/view-rating">
                              View Ratings
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/premium">
                              Get Premium
                            </Link>
                          </li>
                          <li
                            onClick={handleClick}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginLeft: "18px",
                            }}
                          >
                            <div>Logout</div>
                          </li>
                        </ul>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mx-2 nav-extra task_2">
                    <div
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Login
                    </div>

                    <div
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#signupModal"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
      </nav>

      <div id="loginModal" className="modal fade" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="box d-flex flex-direction-column justify-content-center gap-4">
                <button
                  type="button"
                  id="fn"
                  className="btn btn-success"
                  onClick={() => {
                    window.location.href = "/login-customer";
                  }}
                >
                  Login for Customer
                </button>
                <button
                  type="button"
                  id="sd"
                  className="btn btn-success"
                  onClick={() => {
                    window.location.href = "/login-vendor";
                  }}
                >
                  Login for Vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
