import React, { useState } from "react";
import { ShoppingCart, CheckCircle, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import seven from '../assets/7.webp'
import eight from '../assets/8.webp'
import nine from '../assets/9.webp'
import ten from '../assets/10.webp'

const Product = () => {
  // Replace with your real product images
  const images = [
    seven,
    eight,
    nine,
    ten,
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const basePrice = 10000; // Base price in rupees
  const totalPrice = basePrice * quantity;

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < 10) {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <section id="product" className="py-14 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Product Gallery */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <div className="w-full">
            <img
              src={selectedImage}
              alt="Low Carb Sugar Rice Cooker"
              className="rounded-xl shadow-lg w-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-lg border-2 ${
                  selectedImage === img ? "border-amber-600" : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`Rice Cooker ${index + 1}`}
                  className="w-full h-full object-contain rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            3L Low Carb Sugar Rice Cooker
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Enjoy delicious rice without compromising your health. This smart rice cooker
            uses innovative sugar-removal technology to reduce starch content, while
            maintaining taste, texture, and nutrition.
          </p>

          {/* Price */}
          <div className="mb-6">
            <p className="text-2xl font-semibold text-amber-600">
              ₹{totalPrice.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-amber-600 hover:text-amber-600 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-amber-600 hover:text-amber-600 transition-colors"
                disabled={quantity >= 10}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-amber-600 mt-1" size={18} />
              <span>Removes excess starch for healthier, low-carb rice</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-amber-600 mt-1" size={18} />
              <span>Multi-functional: cook rice, soup, stew, and grains</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-amber-600 mt-1" size={18} />
              <span>Digital touch control with easy presets</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-amber-600 mt-1" size={18} />
              <span>Keep-warm function for up to 4 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-amber-600 mt-1" size={18} />
              <span>Durable stainless steel inner pot (3L capacity)</span>
            </li>
          </ul>

          {/* CTA Button */}
          <Link
            to={`/checkout?product=1&price=${basePrice}&quantity=${quantity}&name=${encodeURIComponent("3L Low Carb Sugar Rice Cooker")}`}
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg shadow hover:bg-amber-700 transition-colors"
          >
            <ShoppingCart size={18} />
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
