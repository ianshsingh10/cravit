export const createOrderStatusUpdateEmail = (userName, orderId, newStatus) => {
  const messages = {
    Accepted: "Your order has been confirmed by the seller and is now being prepared.",
    Preparing: "Good news! The seller has started preparing your order.",
    'Out for Delivery': "Your order is on its way! Our delivery partner will reach you soon.",
    Delivered: "Your order has been delivered. We hope you enjoy it!",
    Cancelled: "We're sorry to inform you that your order has been cancelled.",
    Refunded: "Your refund for this order has been processed successfully."
  };

  const message = messages[newStatus] || `Your order's status is now: ${newStatus}.`;
  const year = new Date().getFullYear();
  const shortOrderId = orderId.slice(-8).toUpperCase();

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status Updated</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding: 20px 0;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color: #4A90E2; color: #ffffff; padding: 30px 20px; font-size: 24px; font-weight: bold;">
                Your Order Status Has Been Updated!
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <h1 style="font-size: 22px; color: #333333; margin: 0 0 20px 0;">Hello, ${userName}</h1>
                <p style="font-size: 16px; color: #555555; line-height: 1.6; margin: 0 0 25px 0;">
                  This is an update regarding your order with ID: <strong>#${shortOrderId}</strong>.
                </p>

                <!-- Status Box -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0f5fa; border: 1px solid #d6e9fb; border-radius: 4px; text-align: center; margin-bottom: 25px;">
                  <tr>
                    <td style="padding: 20px;">
                      <p style="font-size: 16px; color: #555555; margin: 0 0 10px 0;">New Status:</p>
                      <span style="font-size: 24px; font-weight: bold; color: #4A90E2; letter-spacing: 1px;">${newStatus}</span>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 16px; color: #555555; line-height: 1.6; margin: 0 0 25px 0;">
                  ${message}
                </p>
                <p style="font-size: 16px; color: #555555; line-height: 1.6; margin: 0;">
                  Thank you for your order!
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #f4f4f4; color: #888888; font-size: 12px; padding: 20px 30px;">
                <p style="margin: 0;">&copy; ${year} Your Company Name. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
