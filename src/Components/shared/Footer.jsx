import Image from "next/image";
import { Phone, Mail, Twitter, Instagram, Facebook } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          
          {/* Column 1: Branding and About */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src="/cravit-logo.jpg"
              alt="craVIT Logo"
              width={52}
              height={52}
              className="rounded-full"
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              The easiest way to discover and enjoy food at VIT. Join our
              community and never miss out on the best culinary experiences on campus.
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 tracking-wide">Contact Us</h3>
            <ul className="space-y-3 text-gray-500 dark:text-gray-400">
              <li className="flex items-center justify-center md:justify-start gap-3 group">
                <Mail size={18} className="text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:sp.cravit@gmail.com" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300">sp.cravit@gmail.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 group">
                <Phone size={18} className="text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+919555751574" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300">+91 95557 51574</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 tracking-wide">Follow Us</h3>
            <div className="flex space-x-2">
              <a href="#" aria-label="Twitter" className="text-gray-500 dark:text-gray-400 hover:text-white hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-500 dark:text-gray-400 hover:text-white hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 dark:text-gray-400 hover:text-white hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} craVIT. All Rights Reserved. Designed with an appetite for excellence. 🍕</p>
        </div>
      </div>
    </footer>
  );
}
