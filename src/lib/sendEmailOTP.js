import nodemailer from "nodemailer";

export const sendEmailOtp = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Your OTP Code",
    text: `Your OTP to login to craVIT is ${otp}`,
  });

  return info;
};
