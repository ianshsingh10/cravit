import Image from "next/image";
import {
  Phone,
  Mail,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

export default function HomeFooter() {
  return (
      <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <Image
                src="/cravit-logo.jpg"
                alt="craVIT Logo"
                width={120}
                height={40}
                className="mb-4 mx-auto md:mx-0"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors">
                  <Mail size={16} />
                  <a href="mailto:sp.cravit@gmail.com">sp.cravit@gmail.com</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors">
                  <Phone size={16} />
                  <a href="tel:+919555751574">+91 955557 51574</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-center">
            The easiest way to discover and enjoy food at VIT. Join our
            community and never miss out!
          </p>
          <div className="mt-3 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} craVIT. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
      </>
  );
}
