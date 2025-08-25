import { Link } from "react-router-dom";
import { Home, HelpCircle, ShoppingCart, Info, Star, List } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  const basePrice = 10000; // Base price in rupees

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-amber-600 flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-14" />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition">
            <Home size={18} /> Home
          </Link>

          <a href="#problem" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition">
            <HelpCircle size={18} /> About
          </a>

          <a href="#how" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition">
            <Info size={18} /> How It Works
          </a>

          <a href="#reviews" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition">
            <Star size={18} /> Reviews
          </a>


          <a href="#faq" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition">
            <List size={18} /> FAQ
          </a>
        </div>

        {/* Buy Button */}
        <Link
          to={`/checkout?product=1&price=${basePrice}&quantity=1&name=${encodeURIComponent("3L Low Carb Sugar Rice Cooker")}`}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-700 transition flex items-center gap-2"
        >
          <ShoppingCart size={18} /> Buy Now
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
