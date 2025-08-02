import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../context/userContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Spinner from "react-spinners/ClipLoader";
// import { RegisterModel } from "../models/registerSchema";

const RatingForm = () => {
  const notify = (msg) =>
    toast(msg, {
      position: "top-center",
    });
  const [rating, setRating] = useState(0); // For storing the selected rating
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const { LoginUser } = useContext(userContext);

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUpload = (event) => {
    console.log("in method want");

    const file = event.target.files[0];
    console.log("file", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // console.log(base64String);
        setImageUrl(base64String); // Store the Base64 string in state
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Messages corresponding to each rating
  const ratingMessages = [
    "",
    "Poor",
    "Satisfactory",
    "Average",
    "Good",
    "Excellent",
  ];

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true); // Set loading state to true when form is submitted
    
    let givenby = LoginUser.email;
    console.log(givenby);
    let findata = { ...data, rating, imageUrl, givenby };
    
    try {
      let response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(findata),
      });
      let content = await response.json();
      console.log("Server response:", content);

      if (content.success) {
        reset();
        notify(content.msg);
      } else {
        notify(content.msg);
      }
    } catch (error) {
      console.error("Error during API request:", error);
      notify("An error occurred while submitting your rating");
    } finally {
      setIsLoading(false); // Set loading state back to false when done
    }
  };

  // Function to set the rating when a star is clicked
  const handleStarClick = (index) => {
    setRating(index);
    setValue("rating", index); // Sync rating with react-hook-form
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
    <ToastContainer position="top-center" transition={Bounce} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          maxWidth: "1000px", // Increased max width for the form
          backgroundColor: "#ffffff",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#d9534f" }}>
          Vendor Rating Form
        </h2>
        <p className="text-center" style={{ fontSize: "18px", color: "#333" }}>
          Share your experience with the vendor
        </p>

        {/* Vendor Name */}
        <div className="mb-3">
          <label htmlFor="vendorName" className="form-label">
            <strong>Vendor Name</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="vendorName"
            placeholder="Enter the vendor's name"
            {...register("vendorName", {
              required: "Vendor name is required",
            })}
          />
          {errors.vendorName && (
            <div className="text-danger mt-1">
              <small>{errors.vendorName.message}</small>
            </div>
          )}
        </div>

        {/* Vendor Email */}
        <div className="mb-3">
          <label htmlFor="vendorEmail" className="form-label">
            <strong>Vendor Email</strong>
          </label>
          <input
            type="email"
            className="form-control"
            id="vendorEmail"
            placeholder="Enter the vendor's email"
            {...register("vendorEmail", {
              required: "Vendor email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.vendorEmail && (
            <div className="text-danger mt-1">
              <small>{errors.vendorEmail.message}</small>
            </div>
          )}
        </div>

        {/* Star Rating */}
        <div className="mb-3">
          <label className="form-label">
            <strong>Rating</strong>
          </label>
          <div className="d-flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleStarClick(star)}
                style={{
                  cursor: "pointer",
                  fontSize: "48px", // Larger stars
                  color: star <= rating ? "#FFD700" : "#ddd",
                  marginRight: "10px",
                }}
              >
                ★
              </span>
            ))}
          </div>
          {/* Message Below Stars */}
          {rating > 0 && (
            <p className="mt-2" style={{ fontSize: "16px", color: "#555" }}>
              <strong>{ratingMessages[rating]}</strong>
            </p>
          )}
          {/* Validation Error */}
          {rating === 0 && (
            <div className="text-danger mt-1">
              <small>Please select a rating</small>
            </div>
          )}
        </div>

        {/* Comments Field */}
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">
            <strong>Comments</strong>
          </label>
          <textarea
            className="form-control"
            id="comments"
            rows="4"
            placeholder="Share your experience with the vendor"
            {...register("comments", {
              required: "Comments are required",
              minLength: {
                value: 10,
                message: "Comments should be at least 10 characters long",
              },
            })}
          ></textarea>
          {errors.comments && (
            <div className="text-danger mt-1">
              <small>{errors.comments.message}</small>
            </div>
          )}
        </div>

        {/* Payment Proof Field */}
        {/* remember me */}
        <div className="mb-3">
          <label htmlFor="paymentProof" className="form-label">
            <strong>Payment Proof</strong>
          </label>
          <input
            type="file"
            className="form-control"
            id="paymentProof"
            accept="image/*"
            required="true"
            onChange={(e) => handleImageUpload(e)}
            // {...register("paymentProof", {
            //   required: "Payment proof is required",
            // })}
          />
          {errors.paymentProof && (
            <div className="text-danger mt-1">
              <small>{errors.paymentProof.message}</small>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-danger w-100"
          style={{
            fontWeight: 600,
            fontSize: "16px",
            borderRadius: "8px",
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                size={15}
                color={"#ffffff"}
                loading={true}
                className="me-2"
              />
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
