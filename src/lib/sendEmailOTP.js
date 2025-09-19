// lib/sendEmailOTP.js

import nodemailer from "nodemailer";
import { createOtpEmailHtml } from "./createOtpEmailHtml";

export async function sendEmailOtp(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = createOtpEmailHtml(otp);

    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Verification",
      html: htmlContent,
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    
    console.log("OTP email sent successfully to:", email);
    return true;

  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
}