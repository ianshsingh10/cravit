import { Geist, Geist_Mono } from "next/font/google";
import DynamicHeader from "@/components/Navbar";
import HomeFooter from "@/components/Footer";
import "./globals.css";


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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DynamicHeader />
        <main>{children}</main>
        <HomeFooter />
      </body>
    </html>
  );
}
