import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/milkpage.css";
import { userContext } from "../context/userContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Spinner from "react-spinners/ClipLoader";

export default function FreshMilkPage() {
  const { LoginUser } = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMilkType, setLoadingMilkType] = useState(null);
  
  const notifyAndRedirect = (msg, redirectPath) => {
    // Show the toast and use the onClose callback for navigation
    toast(msg, {
      position: "top-center",
      onClose: () => navigate(redirectPath), // Navigate after toast is closed
    });
  };

  const tovendor = (milkType) => {
    setLoadingMilkType(milkType);
    setLoading(true);
    
    setTimeout(() => {
      if (!!LoginUser) {
        navigate("/vendor");
      } else {
        notifyAndRedirect("You need to login first", "/login-customer");
      }
      setLoading(false);
      setLoadingMilkType(null);
    }, 1000); // Simulate loading for 1 second
  };

  return (
    <>
      <center>
        <h3>From Cow to Camel: Discover Unique Animal Milks</h3>
      </center>
      <ToastContainer position="top-center" transition={Bounce} />
      <div className="container d-flex gap-4 flex-wrap">
        <div className="card">
          <img src="/cow456.jpeg.jpg" alt="Cow Milk Image" />
          <div className="card-content">
            <h2>Cow Milk</h2>
            <p>
              Experience the goodness of pure cow milk, carefully sourced and
              processed to retain its natural flavor and nutritional benefits.
            </p>
            <button 
              className="btn-milk" 
              onClick={() => tovendor('Cow Milk')} 
              disabled={loading}
            >
              {loadingMilkType === 'Cow Milk' ? (
                <>
                  <Spinner
                    size={15}
                    color={"#ffffff"}
                    loading={true}
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Contact Vendor"
              )}
            </button>
          </div>
        </div>
        <div className="card">
          <img src="/buffalo123.png" alt="Buffalo Milk Image" />
          <div className="card-content">
            <h2>Buffalo Milk</h2>
            <p>
              Experience the goodness of pure Buffalo milk, carefully sourced
              and processed to retain its natural flavor and nutritional
              benefits.
            </p>
            <button 
              className="btn-milk" 
              onClick={() => tovendor('Buffalo Milk')} 
              disabled={loading}
            >
              {loadingMilkType === 'Buffalo Milk' ? (
                <>
                  <Spinner
                    size={15}
                    color={"#ffffff"}
                    loading={true}
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Contact Vendor"
              )}
            </button>
          </div>
        </div>
        <div className="card">
          <img src="/camel123.jpeg.jpg" alt="Camel Milk Image" />
          <div className="card-content">
            <h2>Camel Milk</h2>
            <p>
              Experience the goodness of pure camel milk, carefully sourced and
              processed to retain its natural flavor and nutritional benefits.
            </p>
            <button 
              className="btn-milk" 
              onClick={() => tovendor('Camel Milk')} 
              disabled={loading}
            >
              {loadingMilkType === 'Camel Milk' ? (
                <>
                  <Spinner
                    size={15}
                    color={"#ffffff"}
                    loading={true}
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Contact Vendor"
              )}
            </button>
          </div>
        </div>
        <div className="card">
          <img src="/goat123.jpeg.jpg" alt="Goat Milk Image" />
          <div className="card-content">
            <h2>Goat Milk</h2>
            <p>
              Experience the goodness of pure goat milk, carefully sourced and
              processed to retain its natural flavor and nutritional benefits.
            </p>
            <button 
              className="btn-milk" 
              onClick={() => tovendor('Goat Milk')} 
              disabled={loading}
            >
              {loadingMilkType === 'Goat Milk' ? (
                <>
                  <Spinner
                    size={15}
                    color={"#ffffff"}
                    loading={true}
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Contact Vendor"
              )}
            </button>
          </div>
        </div>
        <div className="card">
          <img src="/donkey.jpeg.jpg" alt="Donkey Milk Image" />
          <div className="card-content">
            <h2>Donkey Milk</h2>
            <p>
              Experience the goodness of pure Donkey milk, carefully sourced and
              processed to retain its natural flavor and nutritional benefits.
            </p>
            <button 
              className="btn-milk" 
              onClick={() => tovendor('Donkey Milk')} 
              disabled={loading}
            >
              {loadingMilkType === 'Donkey Milk' ? (
                <>
                  <Spinner
                    size={15}
                    color={"#ffffff"}
                    loading={true}
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Contact Vendor"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
