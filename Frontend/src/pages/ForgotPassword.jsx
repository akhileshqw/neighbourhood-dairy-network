import React, { useState, useEffect, useRef } from "react";
import "../styles/loginstyle.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import "bootstrap-icons/font/bootstrap-icons.css";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const successToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const failureToast = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    watch,
    formState: { errors: resetErrors },
  } = useForm();

  // Start resend timer when OTP is sent
  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTimer]);

  const startResendTimer = () => {
    setResendTimer(60); // 60 seconds timer
    setCanResend(false);
  };

  const onSubmitEmail = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setUserEmail(data.email); // Store the email for later use
        setEmailSent(true);
        successToast(result.msg);
        startResendTimer(); // Start the resend timer
      } else {
        failureToast(result.msg);
      }
    } catch (error) {
      failureToast("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const result = await response.json();

      if (result.success) {
        successToast("OTP resent successfully");
        startResendTimer(); // Restart the timer
      } else {
        failureToast(result.msg);
      }
    } catch (error) {
      failureToast("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitToken = async (data) => {
    try {
      setVerifyLoading(true);
      // Verify the OTP with the backend
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail, // Use the stored email
            otp: data.token
          }),
        }
      );

      
      const result = await response.json();

      if (result.success) {
        setResetToken(data.token);
        setShowResetForm(true);
        successToast(result.msg || "OTP verified successfully");
      } else {
        failureToast(result.msg || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      failureToast("Invalid OTP. Please try again.");
      console.error(error);
    } finally {
      setVerifyLoading(false);
    }
  };

  const onSubmitReset = async (data) => {
    try {
      setResetLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: resetToken,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        successToast(result.msg);
        setTimeout(() => {
          navigate("/login-customer");
        }, 3000);
      } else {
        failureToast(result.msg);
      }
    } catch (error) {
      failureToast("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <ToastContainer position="top-center" transition={Bounce} />
      <div className="row w-100 d-flex flex-column-reverse flex-md-row">
        {/* Form (Left Side) */}
        <div
          className="col-12 col-md-5 p-4 shadow rounded"
          style={{
            backgroundColor: "#ffff",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#d9534f" }}>
                Neighbourhood Diary Network
          </h2>
          <p
            className="text-center"
            style={{ fontSize: "18px", color: "#333" }}
          >
            Password Recovery
          </p>

          {!emailSent ? (
            <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <strong>Email Address</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  {...registerEmail("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {emailErrors.email && (
                  <div className="text-danger mt-1">
                    <small>{emailErrors.email.message}</small>
                  </div>
                )}
              </div>

              <div className="d-flex flex-column mb-4">
                <Link
                  to="/login-customer"
                  className="text-primary text-decoration-none mb-2"
                >
                  Back to Login
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100"
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  borderRadius: "8px",
                }}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color={"#ffffff"} loading={loading} />
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          ) : !showResetForm ? (
            <form onSubmit={handleSubmitEmail(onSubmitToken)}>
              <div className="mb-3">
                <label htmlFor="token" className="form-label">
                  <strong>Enter OTP</strong>
                </label>
                <p className="text-muted small mb-2">
                  OTP sent to: {userEmail}
                </p>
                <input
                  type="text"
                  className="form-control"
                  id="token"
                  placeholder="Enter the OTP sent to your email"
                  {...registerEmail("token", {
                    required: {
                      value: true,
                      message: "Token is required",
                    },
                  })}
                />
                {emailErrors.token && (
                  <div className="text-danger mt-1">
                    <small>{emailErrors.token.message}</small>
                  </div>
                )}
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                  type="button"
                  className="btn btn-link text-primary p-0"
                  onClick={() => {
                    setEmailSent(false);
                    setUserEmail("");
                  }}
                >
                  Change Email
                </button>
                
                <button
                  type="button"
                  className={`btn btn-link text-${canResend ? "primary" : "secondary"} p-0`}
                  onClick={handleResendOTP}
                  disabled={!canResend}
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100"
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  borderRadius: "8px",
                }}
                disabled={verifyLoading}
              >
                {verifyLoading ? (
                  <ClipLoader size={20} color={"#ffffff"} loading={verifyLoading} />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitReset(onSubmitReset)}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <strong>New Password</strong>
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Enter new password"
                    {...registerReset("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 7,
                        message: "Password must be at least 7 characters",
                      },
                    })}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
                {resetErrors.password && (
                  <div className="text-danger mt-1">
                    <small>{resetErrors.password.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  <strong>Confirm Password</strong>
                </label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    {...registerReset("confirmPassword", {
                      required: {
                        value: true,
                        message: "Please confirm your password",
                      },
                      validate: (value) =>
                        value === watch("password") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
                {resetErrors.confirmPassword && (
                  <div className="text-danger mt-1">
                    <small>{resetErrors.confirmPassword.message}</small>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100"
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  borderRadius: "8px",
                }}
                disabled={resetLoading}
              >
                {resetLoading ? (
                  <ClipLoader size={20} color={"#ffffff"} loading={resetLoading} />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Image Section (Right Side) */}
        <div className="col-12 col-md-7 d-flex justify-content-center align-items-center">
          <img
            src="/customer.jpg"
            alt="Password recovery"
            className="img-fluid"
            style={{
              width: "65%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;