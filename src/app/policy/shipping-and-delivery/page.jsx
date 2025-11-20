"use client";

import React from "react";

export default function ShippingAndDeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Shipping & Delivery Policy
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last updated on May 26th 2025
        </p>

        <div className="mt-10 prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For International buyers, orders are shipped and delivered through
            registered international courier companies and/or International
            speed post only. For domestic buyers, orders are shipped through
            registered domestic courier companies and /or speed post only.
            Orders are shipped within 0-7 days or as per the delivery date
            agreed at the time of order confirmation and delivering of the
            shipment subject to Courier Company / post office norms.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            <strong>cravit</strong> is not liable for any delay in delivery by
            the courier company / postal authorities and only guarantees to
            hand over the consignment to the courier company or postal
            authorities within 0-7 days from the date of the order and payment
            or as per the delivery date agreed at the time of order
            confirmation. Delivery of all orders will be to the address
            provided by the buyer.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Delivery of our services will be confirmed on your mail ID as
            specified during registration. For any issues in utilizing our
            services you may contact our helpdesk on{" "}
            <a
              href="tel:9555751574"
              className="text-orange-600 dark:text-orange-400 no-underline hover:underline"
            >
              +919555751574
            </a>{" "}
            or{" "}
            <a
              href="mailto:shadowansh1@gmail.com"
              className="text-orange-600 dark:text-orange-400 no-underline hover:underline"
            >
              sp.cravit@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}