const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerModel = require("../models/registerModel");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

// Step 1: Validate email/password and send OTP
router.post("/login/request-otp", async (req, res) => {
  const { email, password } = req.body;
  const user = await registerModel.findOne({ email });

  if (!user) return res.json("No record existed");
  if (!user.isVerified) return res.json("Please verify your email");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.json("Invalid credentials");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = otp;
  user.otpExpires = expiry;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`
  });

  return res.json("OTP sent to your email");
});

// Step 2: Verify OTP and login
router.post("/login/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await registerModel.findOne({ email });

  if (!user || !user.otp || user.otp !== otp || user.otpExpires < new Date()) {
    return res.json("Invalid or expired OTP");
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    "jwt-secret-key",
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax"
  });

  return res.json({ Status: "Success", role: user.role });
});

module.exports = router;
