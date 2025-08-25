import React from "react";
import { Home, User, Cog, Star, MessageCircle, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <img src={logo} alt="Logo" className="h-14" />
            <p className="text-sm text-gray-400 leading-relaxed mt-2">
              A smarter way to cook healthy rice. Enjoy delicious, fluffy rice
              with reduced starch and more nutrition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white flex items-center gap-2"><Home size={16} /> Home</a></li>
              <li><a href="#problem" className="hover:text-white flex items-center gap-2"><User size={16} /> About</a></li>
              <li><a href="#how" className="hover:text-white flex items-center gap-2"><Cog size={16} /> How It Works</a></li>
              <li><a href="#reviews" className="hover:text-white flex items-center gap-2"><Star size={16} /> Reviews</a></li>
              <li><a href="#faq" className="hover:text-white flex items-center gap-2"><MessageCircle size={16} /> FAQ</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61574712373301" className="hover:text-white"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/glowglazofficial" className="hover:text-white"><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@glowglaz" className="hover:text-white"><Youtube size={20} /></a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Low Carb Rice Cooker. All rights reserved.</p>
          {/* <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
