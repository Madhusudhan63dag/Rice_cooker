import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  // useEffect(() => {
  //   if (location.state && location.state.orderData) {
  //     setOrderData(location.state.orderData);
  //   } else {
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 3000);
  //   }
  // }, [location.state, navigate]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-black font-sans">
      {/* Header Navigation */}
      <nav className="bg-white shadow px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-yellow-600">Low Carb Cooker</h1>
          <div className="flex items-center space-x-3">
            <span className="text-green-600 font-semibold">Order Confirmed</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Success Animation */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-3">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-1">Your order has been successfully placed 🎉</p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md mb-10">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 shadow">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-600 mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Order Number:</span>
                  {/* <span className="font-mono">#{orderData.orderNumber}</span> */}
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Product:</span>
                  {/* <span>{orderData.productName}</span> */}
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total Amount:</span>
                  {/* <span className="text-green-600 font-bold">₹{orderData.totalAmount}</span> */}
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Payment Method:</span>
                  {/* <span>{orderData.paymentMethod}</span> */}
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-600 mb-4">Delivery Details</h3>
              {/* <div className="space-y-2 text-gray-700">
                <p className="font-medium">{orderData.customerName}</p>
                <p>{orderData.customerEmail}</p>
                <p>{orderData.customerPhone}</p>
                <div className="mt-4">
                  <p className="text-sm">Delivery Address:</p>
                  <div className="bg-yellow-50 rounded-lg p-3 mt-2 border border-gray-200">
                    <p className="text-sm">{orderData.shippingAddress}</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleContinueShopping}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
