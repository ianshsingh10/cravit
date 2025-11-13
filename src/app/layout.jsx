import { Geist, Geist_Mono } from "next/font/google";
import DynamicHeader from "@/Components/shared/Navbar";
import HomeFooter from "@/Components/shared/Footer";
import "./globals.css";
import{ Providers } from "@/Components/shared/Provider";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CraVIT",
  description: "Fuel Your Cravings at VIT!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DynamicHeader />
        <Providers>
          {children}
        </Providers>
        <HomeFooter />
        <Script src="https://checkout.razorpay.com/v1/checkout.js"/>     
      </body>
    </html>
  );
}
