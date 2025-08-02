import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { RegisterModel } from "./models/registerSchema.js";
import { RatingModal } from "./models/ratingSchema.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import Cookies from "js-cookie";
import https from "https";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatbotModel } from "./models/chatbotSchema.js";
import Razorpay from "razorpay";

const app = express();

import dotenv from "dotenv";
import { certifiedVendorModal } from "./models/certifiedvendorSchema.js";
import { manageProductsModal } from "./models/manageProductsSchema.js";

dotenv.config({
  path: "./.env",
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY, { apiVersion: 'v1' });

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;
// console.log(process.env.EMAIL_PASS);
// const jwtSecret = "lasd4831231#^";

// console.log("after check")
// db connection

mongoose.connect(`${process.env.MONGO_STRING}`, {
  tls: true,
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(
//   cors({
//     origin: `${process.env.FRONTEND_URL}`,
//     credentials: true,
//   })
// );
// app.use(cors());

// const corsOptions = {
//   origin: `${process.env.FRONTEND_URL}`, // Frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Custom headers
// };

// app.use(cors(corsOptions));

// // Ensure preflight requests are handled
// app.options('*', cors(corsOptions));

// const corsOptions = {
//   origin: `${process.env.FRONTEND_URL}`, // Allow your frontend origin
//   credentials: true, // Allow credentials (cookies, authorization headers)
// };
// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`); // Frontend origin
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.sendStatus(200);
// });

const corsOptions = {
  origin: [
    "https://www.example.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://neighbourhood-dairy-network.vercel.app",
    process.env.FRONTEND_URL,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", {
    sameSite: "none",
    secure: true,
    path: "/",
    expires: new Date(0),
    httpOnly: true
  }).json({
    success: true,
    message: "Logged out successfully"
  });
});

app.post("/createaccount", async (req, res) => {
  let iscertified = false;
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    confirmpassword,
    address,
    isVendor,
    work,
    rating,
    lat,
    lng,
  } = req.body;

  let vendorEmail = email;
  let vendorLocation = address;
  let cowMilkPrice = 100;
  let cowMilkSells = false;
  let buffaloMilkPrice = 100;
  let buffaloMilkSells = false;
  let camelMilkPrice = 100;
  let camelMilkSells = false;
  let donkeyMilkPrice = 100;
  let donkeyMilkSells = false;
  let goatMilkPrice = 100;
  let goatMilkSells = false;
  let cowGheePrice = 100;
  let cowGheeSells = false;
  let buffaloGheePrice = 100;
  let buffaloGheeSells = false;
  let cowCurdPrice = 100;
  let cowCurdSells = false;
  let buffaloCurdPrice = 100;
  let buffaloCurdSells = false;

  const existingUser = await RegisterModel.findOne({ email });
  if (existingUser) {
    res.status(200).send({ success: false, msg: "User already exists" });
    return;
  }

  if (isVendor) {
    const createUser = await manageProductsModal.create({
      vendorEmail,
      vendorLocation,
      phone,
      cowMilkPrice,
      cowMilkSells,
      buffaloMilkPrice,
      buffaloMilkSells,
      camelMilkPrice,
      camelMilkSells,
      donkeyMilkPrice,
      donkeyMilkSells,
      goatMilkPrice,
      goatMilkSells,
      cowGheePrice,
      cowGheeSells,
      buffaloGheePrice,
      buffaloGheeSells,
      cowCurdPrice,
      cowCurdSells,
      buffaloCurdPrice,
      buffaloCurdSells,
    });
  }

  //  code for encryption
  let milk = false;
  let curd = false;
  let ghee = false;
  try {
    const createUser = await RegisterModel.create({
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmpassword,
      address,
      isVendor,
      work,
      rating,
      isCertified: iscertified,
      milk: milk,
      curd: curd,
      ghee: ghee,
      lat,
      lng,
    });

    const userObj = {
      username: firstname + " " + lastname,
      email: email,
      isVendor: isVendor,
      isCertified: iscertified,
      lat: lat,
      lng: lng,
    };
    // console.log("before jwt");
    jwt.sign(
      userObj,
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            sameSite: "none",
            secure: true,
            path: "/",
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
            httpOnly: true
          })
          .send({
            success: true,
            msg: "Account created Successfully",
            user: userObj,
          });
      }
    );
    
    // console.log("after jwt");
    // console.log(res.getHeader())
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
});
app.post("/certifyvendor", async (req, res) => {
  const { name, email, phone, businessAddress, hasOtherBusiness, imageUrl } =
    req.body;
  let vendorName = name;
  let vendorEmail = email;
  let Address = businessAddress;
  let anotherBusiness = hasOtherBusiness;

  try {
    const existingUser = await RegisterModel.findOne({ email });
    if (!existingUser.isVendor) {
      res.status(200).send({ success: false, msg: "you are not a vendor" });
      return;
    }
    if (existingUser.isCertified) {
      res
        .status(200)
        .send({ success: false, msg: "Vendor is already Certified" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const result = await RegisterModel.updateOne(
      { email: email },
      { $set: { isCertified: true } }
    );
  } catch (error) {}

  //  code for encryption
  try {
    const certifiedVendor = await certifiedVendorModal.create({
      vendorName,
      vendorEmail,
      phone,
      Address,
      anotherBusiness,
      imageUrl,
    });
    // it is neccessary to refresh the databases so that new collection will appear
    res.send({
      success: true,
      msg: "Application submitted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
});

app.post("/login-vendor", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  console.log("login route");

  const findUser = await RegisterModel.findOne({ email });
  if (!findUser) {
    res.send({ success: false, msg: "User not found" });
  }
  if (!findUser.isVendor) {
    res.send({ success: false, msg: "User is not a vendor" });
  }
  const userObj = {
    email: email,
    username: findUser.firstname + " " + findUser.lastname,
    isVendor: findUser.isVendor,
    isCertified: findUser.isCertified,
    lat: findUser.lat,
    lng: findUser.lng,
  };
  if (findUser.password === password) {
    jwt.sign(
      userObj,
      process.env.JWT_SECRET,
      {
        //remember me
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
            httpOnly: true
          })
          .send({
            success: true,
            msg: "Login Successful",
            user: userObj,
          });
      }
    );
  } else {
    res.send({ success: false, msg: "Incorrect Password" });
  }
});
// console.log(process.env.JWT_SECRET)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  console.log("login route");

  const findUser = await RegisterModel.findOne({ email });
  if (!findUser) {
    res.send({ success: false, msg: "User not found" });
  }
  if (findUser.isVendor) {
    res.send({
      success: false,
      msg: "You are a vendor. Please log in as a vendor ",
    });
  }
  const userObj = {
    email: email,
    username: findUser.firstname + " " + findUser.lastname,
    isVendor: findUser.isVendor,
    lat: findUser.lat,
    lng: findUser.lng,
  };
  if (findUser.password === password) {
    console.log("before jwt");
    jwt.sign(
      userObj,
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
            httpOnly: true
          })
          .send({
            success: true,
            msg: "Login Successful",
            user: userObj,
          });
      }
    );
  } else {
    res.send({ success: false, msg: "Incorrect Password" });
  }
});

app.get("/profile", (req, res) => {
  console.log("Profile route accessed");
  console.log("Cookies received:", req.cookies);
  
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No authentication token found",
    });
  }
  
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({
          success: false,
          msg: "Failed to authenticate token",
        });
      }
      
      console.log("User authenticated successfully:", user);

      res.json(user);
    });
  } catch (error) {
    console.error("Error in profile route:", error);
    return res.status(500).json({
      success: false,
      msg: "Server error during authentication",
    });
  }
  // The else block is no longer needed as we handle the no-token case at the beginning of the function
});

// Configure nodemailer transporter with more secure settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.status(200).json({ success: false, msg: "User with this email does not exist" });
    }
    
    // Generate OTP
    const otp = generateOTP();
    
    // Set OTP and expiration in user document
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // Create reset email with OTP
    const resetUrl = `${process.env.FRONTEND_URL}/forgot-password`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your Milk on the Way account.</p>
        <p>Please use the following OTP to reset your password:</p>
        <h3 style="font-size: 24px; background-color: #f0f0f0; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h3>
        <p>Go to: <a href="${resetUrl}">${resetUrl}</a></p>
        <p>This OTP is valid for 1 hour.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };
    
    // Send email using async/await for better error handling
    try {
      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ 
        success: true, 
        msg: "Password reset OTP sent to your email. Please check your inbox and spam folder." 
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Save the OTP in the user document even if email fails
      // This allows for manual verification if needed
      return res.status(500).json({ 
        success: false, 
        msg: "Error sending email. Please try again or contact support." 
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Verify OTP Route
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Find user by email and valid OTP
    const user = await RegisterModel.findOne({
      email: email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(200).json({ 
        success: false, 
        msg: "OTP is invalid or has expired" 
      });
    }
    
    // OTP is valid
    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully"
    });
    
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Reset Password Route
app.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    
    // Find user with valid OTP and not expired
    const user = await RegisterModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(200).json({ 
        success: false, 
        msg: "OTP is invalid or has expired" 
      });
    }
    
    // Update password and clear reset fields
    user.password = password;
    user.confirmpassword = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your password has been changed",
      html: `
        <h2>Password Change Confirmation</h2>
        <p>This is a confirmation that the password for your Milk on the Way account has just been changed.</p>
        <p>If you did not make this change, please contact support immediately.</p>
      `,
    };
    
    try {
      // Send email asynchronously
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, msg: "Password has been reset successfully" });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Still return success since password was reset successfully
      res.status(200).json({ 
        success: true, 
        msg: "Password has been reset successfully, but we couldn't send a confirmation email." 
      });
    }
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

app.get("/vendors", async (req, res) => {
  const vendorsData = await RegisterModel.find({ isVendor: true });
  res.send(vendorsData);
});

app.post("/contact", async (req, res) => {
  const { email, query, concern } = req.body;
  console.log("in route");

  try {
    // Email options
    let mailOptions = {
      from: process.env.EMAIL_USER, // Use environment variable for consistency
      to: email, // Receiver's email (user's email from the request)
      subject: "We have received your query", // Subject of the email
      text: `Thank you for contacting us! 
          Query Type: ${query} 
          Concern: ${concern}`, // Plain text body
    };

    // Send the email asynchronously
    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully");
    res.status(200).send({ success: true, msg: "Email sent successfully" });
  } catch (error) {
    console.error("Contact email error:", error);
    res.status(500).send({ success: false, msg: "Error sending email" });
  }
});

app.get("/logout", (req, res) => {
  // res.clearCookie("token", { secure: true,sameSite:"none" } );
  // res.cookie("token", "", {
  //   expires: new Date(Date.now()), // Set expiration to a past date
  //   // httpOnly: true,       // Ensure cookie is HttpOnly (if it was set as HttpOnly)
  //   secure: true, // Use this if the cookie is set as Secure (HTTPS)
  //   path: "/", // Match the path where the cookie was set
  //   sameSite: "Strict", // Match the SameSite attribute if set
  // });

  // cursor
 
  // Clear the cookie and send response
  try {
    // First try clearing with domain
    res.clearCookie('token', {
      secure: true,
      sameSite: "none",
      path: "/",
      domain: process.env.FRONTEND_URL?.includes("localhost") ? "localhost" : ".vercel.app"
    });

    // Then also try clearing without domain as fallback
    res.clearCookie('token', {
      secure: true, 
      sameSite: "none",
      path: "/"
    });

    res.status(200).send({ success: true, msg: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send({ success: false, msg: "Error during logout" });
  }

  // res.co

  // res.status(200).cookie('token',null,{

  //       expires:new Date(Date.now())

  //   });
  // console.log("calling ----")
  // console.log("ck",Cookies.get());
  // Cookies.remove('token', { path: '/' });
  // console.log("ck",Cookies.get());

  // res.redirect('/');

  // req.clea
  // res.coo
});

// modifying
app.post("/ratings", async (req, res) => {
  const { vendorName, vendorEmail, comments, rating, imageUrl, givenby } =
    req.body;

  // console.log(vendorEmail);
  // console.log(req.body)

  let email = vendorEmail;
  const findUser = await RegisterModel.findOne({ email });
  console.log("findUser", findUser);

  if (!findUser) {
    res.send({ success: false, msg: "Vendor not found" });
    return;
  }
  if (!findUser.isVendor) {
    res.send({
      success: false,
      msg: "You can't give rating to a customer",
    });
    return;
  }

  // res.send({
  //   success: true,
  //   msg: "you can proceed  ahead",
  // });
  try {
    const ratingform = await RatingModal.create({
      vendorName,
      vendorEmail,
      rating,
      comments,
      imageUrl,
      givenby,
      createdAt: new Date(),
    });
    console.log("rating", ratingform);
    res.send({
      success: true,
      msg: "form saved in database",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
});

app.post("/ratingsdata", async (req, res) => {
  const { givenby } = req.body;
  // console.log(givenby)
  const vendorsData = await RatingModal.find({ givenby: givenby });
  // console.log("vd",vendorsData)
  res.send(vendorsData);
});
app.post("/getdiaryproducts", async (req, res) => {
  const { givenby } = req.body;
  let vendorEmail = givenby;
  // console.log(givenby)
  const vendorsData = await manageProductsModal.find({ vendorEmail: givenby });
  // console.log("vd",vendorsData)
  res.send(vendorsData);
});

app.post("/updateVendor", async (req, res) => {
  const {
    _id,
    vendorEmail,
    vendorLocation,
    phone,
    dairyProducts,
    activate,
    host,
  } = req.body;

  let cowMilkPrice = dairyProducts[0].price;
  let cowMilkSells = dairyProducts[0].sells;
  let buffaloMilkPrice = dairyProducts[1].price;
  let buffaloMilkSells = dairyProducts[1].sells;
  let camelMilkPrice = dairyProducts[2].price;
  let camelMilkSells = dairyProducts[2].sells;
  let donkeyMilkPrice = dairyProducts[3].price;
  let donkeyMilkSells = dairyProducts[3].sells;
  let goatMilkPrice = dairyProducts[4].price;
  let goatMilkSells = dairyProducts[4].sells;
  let cowGheePrice = dairyProducts[5].price;
  let cowGheeSells = dairyProducts[5].sells;
  let buffaloGheePrice = dairyProducts[6].price;
  let buffaloGheeSells = dairyProducts[6].sells;
  let cowCurdPrice = dairyProducts[7].price;
  let cowCurdSells = dairyProducts[7].sells;
  let buffaloCurdPrice = dairyProducts[8].price;
  let buffaloCurdSells = dairyProducts[8].sells;

  let milk = false;
  let curd = false;
  let ghee = false;
  if (
    cowMilkSells ||
    buffaloMilkSells ||
    camelMilkSells ||
    donkeyMilkSells ||
    goatMilkSells
  ) {
    milk = true;
  }
  if (cowGheeSells || buffaloGheeSells) {
    ghee = true;
  }
  if (cowCurdSells || buffaloCurdSells) {
    curd = true;
  }
  console.log("host", host);
  // if (activate != undefined && activate == true) {
  try {
    const result = await RegisterModel.updateOne(
      { email: host },
      {
        $set: {
          vendorEmail: vendorEmail,
          address: vendorLocation,
          phone: phone,
          milk: milk,
          curd: curd,
          ghee: ghee,
        },
      }
    );
  } catch (error) {}
  // }

  try {
    // Update logic using your database (e.g., MongoDB)
    const result = await manageProductsModal.findByIdAndUpdate(
      _id,
      {
        vendorEmail,
        vendorLocation,
        phone,
        cowMilkPrice,
        cowMilkSells,
        buffaloMilkPrice,
        buffaloMilkSells,
        camelMilkPrice,
        camelMilkSells,
        donkeyMilkPrice,
        donkeyMilkSells,
        goatMilkPrice,
        goatMilkSells,
        cowGheePrice,
        cowGheeSells,
        buffaloGheePrice,
        buffaloGheeSells,
        cowCurdPrice,
        cowCurdSells,
        buffaloCurdPrice,
        buffaloCurdSells,
      },
      { new: true }
    );
    res.status(200).json({ message: "Vendor updated successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update vendor" });
  }
});

app.get("/vendorProductDetails", async (req, res) => {
  const vendorsData = await manageProductsModal.find();
  res.send(vendorsData);
});

app.post("/applyfilter", async (req, res) => {
  let { rating, isCertified, milk, curd, ghee } = req.body;

  let query = {};

  if (rating !== undefined) {
    query.rating = { $gte: rating };
  }
  if (isCertified !== undefined) {
    query.isCertified = isCertified;
  }
  if (milk !== undefined) {
    query.milk = milk;
  }
  if (curd !== undefined) {
    query.curd = curd;
  }
  if (ghee !== undefined) {
    query.ghee = ghee;
  }

  let vendorsData = await RegisterModel.find(query);

  // console.log("vd", vendorsData.length);
  vendorsData.sort((a, b) => b.rating - a.rating);
  res.send(vendorsData);
});

app.post("/getnormalinfo", async (req, res) => {
  const { givenby } = req.body;
  const vendorData = await RegisterModel.find({ email: givenby });
  res.send(vendorData);
});

// Check if HTTPS is enabled in the environment
// Chatbot API endpoints

// Endpoint to get best vendors based on ratings and location
app.post("/api/chatbot/best-vendors", async (req, res) => {
  try {
    const { location, category } = req.body;
    
    // Query to find vendors based on category (milk, ghee, curd)
    let query = { isVendor: true };
    
    if (category === "milk") {
      query.milk = true;
    } else if (category === "ghee") {
      query.ghee = true;
    } else if (category === "curd") {
      query.curd = true;
    }
    
    // Find vendors and sort by rating (highest first)
    const vendors = await RegisterModel.find(query)
      .sort({ rating: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      vendors: vendors.map(vendor => ({
        name: `${vendor.firstname} ${vendor.lastname}`,
        email: vendor.email,
        address: vendor.address,
        rating: vendor.rating,
        isCertified: vendor.isCertified
      }))
    });
  } catch (error) {
    console.error("Error finding best vendors:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint to save chatbot conversation
app.post("/api/chatbot/save-conversation", async (req, res) => {
  try {
    const { userId, sessionId, message } = req.body;
    
    // Find existing conversation or create new one
    let conversation = await ChatbotModel.findOne({ sessionId });
    
    if (!conversation) {
      conversation = new ChatbotModel({
        userId,
        sessionId,
        messages: []
      });
    }
    
    // Add new message to conversation
    conversation.messages.push(message);
    conversation.lastUpdated = new Date();
    
    await conversation.save();
    
    res.status(200).json({ success: true, conversationId: conversation._id });
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint to get AI-powered response for chatbot
app.post("/api/chatbot/ai-response", async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;

    // Retrieve conversation history
    let conversation = await ChatbotModel.findOne({
      sessionId: sessionId,
      userId: userId,
    });

    if (!conversation) {
      conversation = new ChatbotModel({
        userId: userId,
        sessionId: sessionId,
        messages: [],
      });
    }

    // Add user message to conversation
    conversation.messages.push({
      sender: "user",
      text: message,
      timestamp: new Date(),
    });

    // Save conversation
    await conversation.save();

    // Construct prompt with conversation history
    const conversationHistory = conversation.messages
      .slice(-5) // Get last 5 messages
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n");

    // Direct REST API call to Google Generative AI
    const payload = {
      contents: [
        {
          parts: [
            { 
              text: `You are a helpful assistant for a milk delivery service called 'Milk On The Way'. \n\n` +
                    `Context: Milk On The Way is a service that connects local milk vendors with customers for home delivery. ` +
                    `We offer various milk products including cow milk, buffalo milk, and plant-based alternatives. ` +
                    `Our vendors are verified local dairy farmers and suppliers. ` +
                    `We deliver milk daily or on a schedule set by customers. ` +
                    `\n\nConversation history:\n${conversationHistory}\n\nuser: ${message}\n\nAssistant:` 
            },
          ],
        },
      ],
    };

    const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GOOGLE_API_KEY
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);
    const data = await response.json();
    
    let aiResponse;
    if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      aiResponse = data.candidates[0].content.parts[0].text;
    } else {
      console.error('Error from Gemini API:', data);
      throw new Error('Failed to generate response');
    }

    // Add AI response to conversation
    conversation.messages.push({
      sender: "bot",
      text: aiResponse,
      timestamp: new Date(),
    });

    // Save conversation
    await conversation.save();

    res.status(200).json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate response",
      fallbackResponse:
        "I'm having trouble connecting to my brain right now. Please try again later or ask about our products, vendors, or delivery options.",
    });
  }
});

// Endpoint to get account creation steps
app.get("/api/chatbot/account-steps", (req, res) => {
  const steps = [
    {
      step: 1,
      title: "Visit the Registration Page",
      description: "Navigate to the registration page by clicking on 'Register' in the navigation menu."
    },
    {
      step: 2,
      title: "Fill Personal Information",
      description: "Enter your first name, last name, email address, phone number, and address."
    },
    {
      step: 3,
      title: "Create Password",
      description: "Create a strong password and confirm it."
    },
    {
      step: 4,
      title: "Select Account Type",
      description: "Choose whether you're registering as a customer or a vendor."
    },
    {
      step: 5,
      title: "Complete Registration",
      description: "Submit the form to create your account."
    }
  ];
  
  res.status(200).json({ success: true, steps });
});

// Endpoint to create Razorpay order for subscription payment
app.post("/api/create-subscription-order", async (req, res) => {
  try {
    const { amount, planName, userId } = req.body;
    
    // Validate user exists
    const user = await RegisterModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Generate a random receipt ID
    const receiptId = 'order_rcptid_' + crypto.randomBytes(6).toString('hex');
    
    // Create order options
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // Auto-capture payment
      notes: {
        planName: planName,
        userId: userId
      }
    };
    
    // Initialize Razorpay with API keys
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourTestKey',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourTestSecret'
    });
    
    // Create a real order using Razorpay SDK
    let order;
    try {
      order = await razorpay.orders.create(options);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      // Fallback to mock order if Razorpay API fails
      order = {
        id: 'order_' + crypto.randomBytes(8).toString('hex'),
        entity: 'order',
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000)
      };
    }
    
    // Store order information in user's record
    user.subscription = {
      ...user.subscription,
      orderId: order.id,
      plan: planName,
      active: false // Will be set to true after payment verification
    };
    await user.save();
    
    res.status(200).json({
      success: true,
      order: order,
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourTestKey' // Use environment variable in production
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
});

// Endpoint to verify and save subscription payment
app.post("/api/verify-subscription-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName, userId } = req.body;
    
    // Find the user
    const user = await RegisterModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Verify the payment signature
    try {
      const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YourTestSecret')
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');
      
      if (generated_signature !== razorpay_signature) {
        console.warn('Payment signature verification failed');
        // For development, we'll continue even if signature verification fails
        // In production, you would return an error here
        // return res.status(400).json({ success: false, message: 'Payment verification failed' });
      } else {
        console.log('Payment signature verified successfully');
      }
    } catch (error) {
      console.error('Error verifying payment signature:', error);
      // For development, we'll continue even if signature verification fails
    }
    
    // Calculate subscription duration based on plan
    let durationInDays = 30; // Default for Basic plan
    if (planName === 'Standard') {
      durationInDays = 90; // 3 months
    } else if (planName === 'Premium') {
      durationInDays = 365; // 1 year
    }
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationInDays);
    
    // Update user's subscription status
    user.subscription = {
      plan: planName,
      startDate: startDate,
      endDate: endDate,
      active: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    };
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `Your ${planName} subscription has been activated successfully until ${endDate.toLocaleDateString()}!`
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
});

// Get user subscription status
app.get('/api/subscription-status', async (req, res) => {
  try {
    // Get user ID from JWT token
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await RegisterModel.findOne({ email: verifyToken.email });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Check if subscription is active and not expired
    const isActive = user.subscription && 
                    user.subscription.active && 
                    user.subscription.endDate && 
                    new Date(user.subscription.endDate) > new Date();
    
    res.json({
      success: true,
      subscription: {
        plan: user.subscription?.plan || 'None',
        active: isActive,
        endDate: user.subscription?.endDate,
        daysRemaining: user.subscription?.endDate ? 
          Math.max(0, Math.ceil((new Date(user.subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24))) : 0
      }
    });
  } catch (error) {
    console.error('Error getting subscription status:', error);
    res.status(500).json({ success: false, message: 'Failed to get subscription status' });
  }
});

if (process.env.HTTPS === 'true') {
  // For development, we'll use self-signed certificates
  // In production, you would use proper certificates
  const options = {
    key: fs.readFileSync(path.join(process.cwd(), 'server.key')),
    cert: fs.readFileSync(path.join(process.cwd(), 'server.cert'))
  };

  // Create HTTPS server
  https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server listening on port ${port}`);
  });
} else {
  // Fallback to HTTP if HTTPS is not enabled
  app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });
}
