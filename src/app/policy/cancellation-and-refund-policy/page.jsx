"use client";

import React from "react";

export default function CancellationAndRefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Cancellation & Refund Policy
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last updated on May 26th 2025
        </p>

        <div className="mt-10 prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            cravit believes in helping its customers as far as possible, and has
            therefore a liberal cancellation policy. Under this policy:
          </p>

          <ol className="list-decimal list-inside space-y-4 mt-6 text-gray-700 dark:text-gray-300">
            <li>
              Cancellations will be considered only if the request is made
              within 2-3 days of placing the order. However, the cancellation
              request may not be entertained if the orders have been
              communicated to the vendors/merchants and they have initiated
              the process of shipping them.
            </li>
            <li>
              cravit does not accept cancellation requests for perishable
              items like flowers, eatables etc. However, refund/replacement
              can be made if the customer establishes that the quality of
              product delivered is not good.
            </li>
            <li>
              In case of receipt of damaged or defective items please report
              the same to our Customer Service team. The request will,
              however, be entertained once the merchant has checked and
              determined the same at his own end. This should be reported
              within 2-3 days of receipt of the products.
            </li>
            <li>
              In case you feel that the product received is not as shown on the
              site or as per your expectations, you must bring it to the
              notice of our customer service within 2-3 days of receiving the
              product. The Customer Service Team after looking into your
              complaint will take an appropriate decision.
            </li>
            <li>
              In case of complaints regarding products that come with a
              warranty from manufacturers, please refer the issue to them.
            </li>
            <li>
              In case of any Refunds approved by the cravit, it’ll take 3-4
              days for the refund to be processed to the end customer.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}