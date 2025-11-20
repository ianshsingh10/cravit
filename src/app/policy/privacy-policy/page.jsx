"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last updated on May 26th 2025
        </p>

        <div className="mt-10 prose prose-lg dark:prose-invert max-w-none">
          <p>
            This Privacy Policy describes how <strong>cravit</strong> ("we", "us", or
            "our") collects, uses, and discloses your personal information when
            you visit our website, use our services, or make a purchase.
          </p>

          <h2 className="text-2xl font-bold mt-8">1. Information We Collect</h2>
          <p>
            We may collect personal information that you provide directly to us,
            such as when you create an account, place an order, or contact
            customer support. This information may include:
          </p>
          <ul>
            <li>
              <strong>Contact Information:</strong> Your name, email address,
              phone number, and delivery address.
            </li>
            <li>
              <strong>Account Information:</strong> Your username, password, and
              profile details.
            </li>
            <li>
              <strong>Order Information:</strong> Details about the products you
              purchase, payment information, and transaction history.
            </li>
          </ul>
          <p>
            We also automatically collect certain information when you visit our
            website, such as your IP address, browser type, operating system,
            and browsing behavior through cookies and similar technologies.
          </p>

          <h2 className="text-2xl font-bold mt-8">2. How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including to:
          </p>
          <ul>
            <li>Process and fulfill your orders, including processing payments.</li>
            <li>Communicate with you about your orders, account, and promotions.</li>
            <li>Provide customer support and respond to your inquiries.</li>
            <li>
              Improve and personalize your experience on our website.
            </li>
            <li>
              Prevent fraudulent transactions and enhance the security of our
              site.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">3. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally
            identifiable information to outside parties. This does not include
            trusted third parties who assist us in operating our website,
            conducting our business, or servicing you (e.g., payment gateways
            and delivery partners), so long as those parties agree to keep this
            information confidential.
          </p>

          <h2 className="text-2xl font-bold mt-8">4. Cookies</h2>
          <p>
            Our website uses "cookies" to enhance your experience. Cookies are
            small files that a site or its service provider transfers to your
            computer's hard drive through your Web browser (if you allow) that
            enables the site's systems to recognize your browser and capture
            and remember certain information. We use cookies to help us
            remember and process the items in your shopping cart.
          </p>

          <h2 className="text-2xl font-bold mt-8">5. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information when you place an order or enter,
            submit, or access your personal information.
          </p>

          <h2 className="text-2xl font-bold mt-8">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information that we hold. You can update your account information
            at any time by logging into your profile or by contacting us.
          </p>

          <h2 className="text-2xl font-bold mt-8">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the "Last updated" date at the top.
          </p>

          <h2 className="text-2xl font-bold mt-8">8. Contact Us</h2>
          <p>
            If you have any questions regarding this privacy policy, you may
            contact us using the information below:
          </p>
          <ul className="list-none p-0">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:shadowansh1@gmail.com"
                className="text-orange-600 dark:text-orange-400 no-underline hover:underline"
              >
                sp.cravit@gmail.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:9555751574"
                className="text-orange-600 dark:text-orange-400 no-underline hover:underline"
              >
                9555751574
              </a>
            </li>
            <li>
              <strong>Address:</strong> VIT Bhopal University
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}