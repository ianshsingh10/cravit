export const createOtpEmailHtml = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP Code</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .header { background-color: #4A90E2; color: #ffffff; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; text-align: center; }
        .content p { font-size: 16px; color: #333333; line-height: 1.5; }
        .otp-code { font-size: 36px; font-weight: bold; color: #4A90E2; margin: 20px 0; letter-spacing: 4px; padding: 10px; background-color: #f0f5fa; border-radius: 4px; display: inline-block; }
        .footer { background-color: #f4f4f4; color: #888888; font-size: 12px; text-align: center; padding: 15px; }
        .footer p { margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your One-Time Password (OTP)</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Please use the following code to complete your verification. This code is valid for 10 minutes.</p>
          <div class="otp-code">${otp}</div>
          <p>If you did not request this code, please ignore this email or contact our support team.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};