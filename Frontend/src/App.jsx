import React, { useEffect } from "react";
import "./styles/homeStyles.css";
// import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


// Preload social media icons
const socialIcons = [
  'https://www.heritagefoods.in/static/images/fb.png',
  'https://www.heritagefoods.in/static/images/tw.png',
  'https://www.heritagefoods.in/static/images/lk.png',
  'https://www.heritagefoods.in/static/images/is.png',
  'https://www.heritagefoods.in/static/images/yt.png'
];

// Create preload function
function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

import { useState, useContext } from "react";
import { userContext } from "./context/userContext";
import { Trash, UserCircleIcon } from "lucide-react";
import Skeleton from "../src/components/Skeleton";
import Navbar from "../src/components/Navbar";
import { set } from "mongoose";
import { Link, useNavigate } from "react-router-dom";



function App() {
  const navigate = useNavigate();
  const [iconsLoaded, setIconsLoaded] = useState(false);

  // Preload social media icons when component mounts
  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(socialIcons.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        }));
        setIconsLoaded(true);
      } catch (error) {
        console.error('Failed to load some social icons:', error);
        setIconsLoaded(true); // Still set to true to show fallbacks
      }
    };
    
    loadImages();
  }, []);
  
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
      <div
        id="carouselExampleCaptions"
        className="carousel carousel-fade slide mycar smaller"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner smallimg">
          <div className="carousel-item active">
            <img
              src="cows.jpg"
              width="100%"
              height="700px"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-md-block black">
              <h5
                style={{
                  fontSize: 30,
                  textShadow: "4px -1px black",
                }}
              >
                Pure Milk,Anytime,Anywhere
              </h5>
              <p
                style={{
                  fontSize: 17,
                  textShadow: "0px 1px black",
                }}
              >
                Bringing you the freshest dairy products,sourced from local
                farms.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="milk.jpg"
              width="100%"
              height="700px"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption   d-md-block">
              <h5
                style={{
                  fontSize: 30,
                  textShadow: "4px -1px black",
                }}
              >
                Our Network of Trusted Vendors
              </h5>
              <p
                style={{
                  fontSize: 17,
                  textShadow: "0px 1px black",
                }}
              >
                We collaborate with reliable and certified vendors to bring you
                the finest dairy products.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="products.jpg"
              width="100%"
              height="700px"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-md-block">
              <h5
                style={{
                  fontSize: 30,
                  textShadow: "4px -1px black",
                }}
              >
                Stored with Care
              </h5>
              <p
                style={{
                  fontSize: 18,
                  textShadow: "2px 1px black",
                }}
              >
                Our milk products are carefully stored in state-of-the-art
                facilities to maintain freshness and ensure top quality from
                farm to table.
              </p>
            </div>
          </div>
        </div>
        {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
    </button> */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container-fluid flu">
        <div className="container heritage">
          <div className="row">
            <div className="col-md-7">
              <div className="testimonialcont text-center">
                <h2
                  className="iceprolargehead clrltbrwn mb0 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".2s"
                  style={{
                    visibility: "visible",
                    color: "green",
                    animationDuration: "1s",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  Milk on the Way limited
                </h2>
                <p
                  className="procont wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".4s"
                  style={{
                    visibility: "visible",
                    animationDuration: "1s",
                    animationDelay: "0.4s",
                    animationName: "fadeInUp",
                  }}
                >
                  The Milk on the Way limited was founded by group of Btech
                  students in the year 2024, which is one of the fastest growing
                  Public Listed Companies in India, with business division -
                  Dairy.{" "}
                </p>
              </div>
              <div
                className="col-md-6 col-md-offset-3 vm"
                onClick={() => navigate("/about")}
              >
              
                <div className="readmore-wraper text-center" style={{cursor:"pointer"}} onClick={()=>navigate("/about")}>
                  <span className="readmore-btn"  tabIndex={-1}>
                    <span style={{ color: "white" }}>View More</span>
                    <span className="middlebar" />
                    <span className="readmore-arrow">
                      <i className="fa fa-angle-right" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
                <img
                  src="./public/cowandcalf.png"
                  className="img-fluid"
                  alt="Cow and Calf"
                />
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-wrap abcdef justify-content-center align-items-center">
        <div
          className="footer-social-section clearfix"
          style={{ margin: "auto", opacity: iconsLoaded ? 1 : 0.5, transition: "opacity 0.3s ease" }}
        >
          <ul
            style={{
              display: "flex",
              gap: "22px 70px",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              margin: "20px 0",
              listStyle: "none"
            }}
          >
            <li
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".2s"
              style={{
                visibility: "visible",
                animationDuration: "1s",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <h3>Follow us :</h3>
            </li>
            <li
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
              style={{
                visibility: "visible",
                animationDuration: "1s",
                animationDelay: "0.4s",
                animationName: "fadeInUp",
              }}
            >
              <Link to="#">
                <img 
                  src="./public/fbb" 
                  width="30" 
                  height="30" 
                  alt="Facebook" 
                  style={{maxWidth: "100%"}} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>';
                  }}
                />
              </Link>
            </li>
            <li
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
              style={{
                visibility: "visible",
                animationDuration: "1s",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
              }}
            >
              <Link to="#">
                <img 
                  src="./public/twitter.svg" 
                  width="30" 
                  height="30" 
                  alt="Twitter" 
                  style={{maxWidth: "100%"}} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>';
                  }}
                />
              </Link>
            </li>
            <li
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".8s"
              style={{
                visibility: "visible",
                animationDuration: "1s",
                animationDelay: "0.8s",
                animationName: "fadeInUp",
              }}
            >
              <Link to="#">
                <img 
                  src="./public/insta.svg" 
                  width="30" 
                  height="30" 
                  alt="LinkedIn" 
                  style={{maxWidth: "100%"}} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>';
                  }}
                />
              </Link>
            </li>
            <li
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="1s"
              style={{
                visibility: "visible",
                animationDuration: "1s",
                animationDelay: "1s",
                animationName: "fadeInUp",
              }}
            >
              <Link to="#">
                <img 
                  src="./public/linkedin.svg" 
                  width="30" 
                  height="30" 
                  alt="Instagram" 
                  style={{maxWidth: "100%"}} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>';
                  }}
                />
              </Link>
            </li>
            <li
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="1.2s"
              style={{
                visibility: "visible",
                animationDuration: "1s",
                animationDelay: "1.2s",
                animationName: "fadeInUp",
              }}
            >
              <Link to="#">
                <img 
                  src="./public/yt.svg" 
                  width="30" 
                  height="30" 
                  alt="YouTube" 
                  style={{maxWidth: "100%"}} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>';
                  }}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyrightsec text-center">
        <p>
          Copyright © Milk on the Way Limited.{" "}
          <span>
            Designed by{" "}
            <Link style={{ fontSize: 20 }} to="#">
              abcd
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}

export default App;
// Trash
/*    <div id="loginModal" className="modal fade" tabIndex={-1}>
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
                  {/* <Link

                                            to={"/login-customer"}
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                            }}
                                        >
                                        </Link> *
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
                              </div>*/
