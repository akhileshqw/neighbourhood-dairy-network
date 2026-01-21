import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../context/userContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {   useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";
import { ClipLoader } from "react-spinners";
import "bootstrap-icons/font/bootstrap-icons.css";







const Register = () => {
  const ttoast = useToast();
  const [spinner,setSpinner]=useState(false);
  const [stopSpinner,setStopSpinner]=useState(false);
  const [isVendor, SetIsVendor] = useState(false);
    const navigate = useNavigate();

  const [resMessage, setresMessage] = useState({});
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setLoginUser } = useContext(userContext);
  const [lat,setLat]=useState(0);
  const [long,setLong]=useState(0);
  const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GEMINI_API_KEY}`);

  // console.log(import.meta.env.GEMINI_API_KEY)
  // console.log

  const showWelcomeToast = () => {
    setTimeout(() => {
      toast.success("Welcome to !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }, 500); // Small delay to ensure toast shows after redirect
  };
  // console.log("api key",import.meta.env.VITE_GEMINI_API_KEY)




  const accountCreatedd = () => {
    // Show success toast first
    ttoast.success("Account Created Successfully...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      onClose: () => {
        // Only navigate after toast is closed
        // setTimeout(() => {
          // }, 1500); // Small delay to ensure toast is visible
        },
      });
      navigate("/");
  };
  const failedd = (msg) => {
    setSpinner((prev) => !prev);
    toast.error(msg || "Registration failed", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();
  const accountCreated = () => {

    
  alert("Account Created Successfully...");
  navigate("/");
  

    
  };
  const failed = () => {
    setSpinner((prev)=>!prev)

    alert("Failed to create an account...");
  };

  // async function giveCoordinates(location) {
  //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  //   const prompt = `What are the latitude and longitude coordinates for the location: ${location}? If the location cannot be found, provide the coordinates of the nearest identifiable location. Ensure accuracy and clarity in your response.`;
  
  //   try {
  //     const result = await model.generateContent(prompt);
  //     const response = await result.response;
  //     const text = await response.text();
  
      
  //     const regex = /([\d.-]+)°/g;
    
  //     const matches = [...text.matchAll(regex)];
      
  //     if (matches.length === 2) {
  //       const latitude = parseFloat(matches[0][1]);
  //       const longitude = parseFloat(matches[1][1]);
        
  //       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //     let ob=[]
  //     ob.push(latitude)
  //     ob.push(longitude)
  //     return ob
  //     } else {
  //       console.error("Could not extract coordinates from the response.");
  //     }
      
  //   } catch (error) {
  //     console.error(" parsing response:", error);
  //     throw new Error("Failed to retrieve coordinates");
  //   }
  // }
  async function giveCoordinates(location) {
    try {
      // Try getting coordinates via Geocoding API
      const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json&limit=1`;

      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);

        // Validate coordinates
        if (
          !isNaN(latitude) &&
          !isNaN(longitude) &&
          latitude >= -90 &&
          latitude <= 90 &&
          longitude >= -180 &&
          longitude <= 180
        ) {
          console.log(
            `Found coordinates for ${location}: ${latitude}, ${longitude}`
          );
          return [latitude, longitude];
        }
      }

      // If OpenStreetMap fails, try Google Geocoding API as backup
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Give me ONLY the exact latitude and longitude coordinates for ${location} in decimal degrees format (e.g. 12.9716° N, 77.5946° E). Provide coordinates for the nearest identifiable location if exact match not found.`;

      const result = await model.generateContent(prompt);
      const response2 = await result.response;
      const text = await response2.text();

      // Parse coordinates from response
      const cardinalRegex = /([\d.-]+)°\s*[NSns],\s*([\d.-]+)°\s*[EWew]/i;
      const cardinalMatch = text.match(cardinalRegex);

      if (cardinalMatch) {
        const latitude = parseFloat(cardinalMatch[1]);
        const longitude = parseFloat(cardinalMatch[2]);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          console.log(
            `Found coordinates via Gemini for ${location}: ${latitude}, ${longitude}`
          );
          return [latitude, longitude];
        }
      }

      // Final attempt to extract any valid looking coordinates
      const numberRegex = /([-+]?\d+\.?\d*)/g;
      const matches = text.match(numberRegex);

      if (matches && matches.length >= 2) {
        const latitude = parseFloat(matches[0]);
        const longitude = parseFloat(matches[1]);

        if (
          !isNaN(latitude) &&
          !isNaN(longitude) &&
          latitude >= -90 &&
          latitude <= 90 &&
          longitude >= -180 &&
          longitude <= 180
        ) {
          console.log(
            `Extracted coordinates for ${location}: ${latitude}, ${longitude}`
          );
          return [latitude, longitude];
        }
      }

      throw new Error("Could not find valid coordinates for the location");
    } catch (error) {
      console.error(`Error finding coordinates for ${location}:`, error);
      throw error; // Propagate error to caller instead of returning default coordinates
    }
  }

  useEffect(() => {
    if (lat !== 0 && long !== 0) {
      console.log("Coordinates updated:", lat, long);
    }
  }, [lat, long]);





  const onSubmit = async (data) => {
    // Always include rating, default to null if not a vendor
    setSpinner(true);
    data.rating = isVendor ? 1 : null;

    try {
      // Get coordinates from address
      let ob = await giveCoordinates(data.address).catch(error => {
        console.error("Error getting coordinates:", error);
        return null;
      });
      
      // If coordinates were found, add them to data
      if (ob) {
        data.lat = ob[0];
        data.lng = ob[1];
      } else {
        // Use default coordinates if none found
        data.lat = 0;
        data.lng = 0;
      }
      
      console.log("Data to be sent:", data);
      
      // Ensure password and confirmpassword match
      if (data.password !== data.confirmpassword) {
        failedd("Passwords do not match");
        setSpinner(false);
        return;
      }
      
      // Send registration request
      let response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/createaccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      
      let content = await response.json();
      console.log("Server response:", content);
      
      setStopSpinner(true);
      setresMessage(content);
      setSpinner(false);

      if (content.success) {
        accountCreatedd();
        setLoginUser(content.user);
      } else {
        failedd(content.msg || "Failed to create account");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      failedd(error.message || "An error occurred during registration");
      setSpinner(false);
    }
    
    SetIsVendor(false);
  };

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {resMessage.success ? (
        <>
          {/* <Navigate to={"/"} /> */}
          {/* {setSpinner(false)} */}
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="container">
              <h3 style={{ textAlign: "center", fontSize: "35px" }}>
                  Register on Neighbourhood Diary Network
              </h3>
              <div className="container my-4">
                <div className="mb-3 qaz">
                  <div className="ver">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Enter your first Name
                    </label>
                    <input
                      {...register("firstname", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "The firstname must consist of at least 3 characters.",
                        },
                      })}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                    {errors.firstname && (
                      <span className="  text-danger text-danger">
                        {errors.firstname.message}
                      </span>
                    )}
                  </div>
                  <div className="ver">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Enter your last Name
                    </label>
                    <input
                      {...register("lastname", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "The lastname must consist of at least 3 characters.",
                        },
                      })}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                    {errors.lastname && (
                      <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                        {errors.lastname.message}
                      </span>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "The username must consist of at least 3 characters.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="container">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder={+91}
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/i,
                      message: "Please enter a valid phone number.",
                    },
                  })}
                />
                {errors.phone && (
                  <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                    {errors.phone.message}
                  </span>
                )}
                <div></div>

                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Enter your password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 7,
                        message:
                          "The password must consist of at least 7 characters.",
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
                {errors.password && (
                  <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                    {errors.password.message}
                  </span>
                )}
                <div></div>

                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Confirm your password
                </label>

                <div className="input-group">
                  <input
                    {...register("confirmpassword", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 7,
                        message:
                          "The password must consist of at least 7 characters.",
                      },
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder=""
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
                {errors.confirmpassword && (
                  <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                    {errors.confirmpassword.message}
                  </span>
                )}

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "The address must consist of at least 3 characters.",
                      },
                    })}
                  />
                  {errors.address && (
                    <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      {...register("isVendor")}
                      onClick={() => SetIsVendor(!isVendor)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor="gridCheck"
                      style={{ fontSize: "larger" }}
                    >
                      Are you a vendor?
                    </label>
                  </div>
                </div>

                {isVendor && (
                  <div id="show">
                    <p>Select your Work</p>
                    <select
                      {...register("work", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected="" value={"cow and buffalo milk"}>
                        sells cow and buffalo milk
                      </option>
                      <option value={"all types of animal milk"}>
                        sells any type of animal milk
                      </option>
                      <option value={"milk and curd"}>
                        sells Fresh Cow Milk and Curd
                      </option>
                      <option value={"butter and curd"}>
                        sells butter and cream
                      </option>
                    </select>
                  </div>
                )}
                <fieldset className="row mb-3"></fieldset>
                <button
                  className="btn btn-primary"
                  style={{ margin: "inherit", minWidth: "120px" }}
                  type="submit"
                  disabled={spinner && !stopSpinner}
                >
                  {spinner && !stopSpinner ? (
                    <>
                      <ClipLoader size={15} color={"#ffffff"} loading={spinner && !stopSpinner} />
                      <span className="ml-2"> Submitting...</span>
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
               
                <div
                  className="container mb-4 d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="footer" style={{ marginTop: 15 }}>
                    © 2024-2026 Neighbourhood Diary Network, Inc.{" "}
                    <span>
                      <a href="#" style={{ fontSize: 20 }}>
                        .Privacy
                      </a>
                    </span>
                    <span>
                      <a href="#" style={{ fontSize: 20 }}>
                        · Terms
                      </a>
                    </span>
                  </div>
                  <a href="register.html">Back to top</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Register;
