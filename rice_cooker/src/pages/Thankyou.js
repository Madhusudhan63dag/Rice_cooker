import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // If no order data, redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [location.state, navigate]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  // Loading state when no order data
  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting to home page...</p>
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
          <p className="text-sm text-gray-500">Order #{orderData.orderNumber}</p>
        </div>

        {/* Payment Status Alert */}
        {orderData.paymentMethod === 'COD' && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-orange-800 font-semibold">Cash on Delivery Order</h3>
                <p className="text-orange-700 text-sm">Please keep ₹{orderData.totalAmount.toLocaleString()} ready for payment upon delivery</p>
              </div>
            </div>
          </div>
        )}

        {orderData.paymentMethod === 'Razorpay' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Payment Completed Successfully</h3>
                <p className="text-green-700 text-sm">Your payment of ₹{orderData.totalAmount.toLocaleString()} has been processed</p>
                {orderData.paymentId && orderData.paymentId !== 'COD' && (
                  <p className="text-green-600 text-xs mt-1">Payment ID: {orderData.paymentId}</p>
                )}
              </div>
            </div>
          </div>
        )}

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
                  <span className="font-mono">#{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Product:</span>
                  <span className="text-right">{orderData.productName}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total Amount:</span>
                  <span className="text-green-600 font-bold">₹{orderData.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Payment Method:</span>
                  <span className={`font-semibold ${
                    orderData.paymentMethod === 'COD' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {orderData.paymentMethod}
                  </span>
                </div>
                {orderData.paymentMethod === 'COD' && (
                  <div className="flex justify-between text-gray-700">
                    <span>Amount Paid:</span>
                    <span className="text-blue-600 font-semibold">₹0 (Pay on Delivery)</span>
                  </div>
                )}
                {orderData.paymentMethod === 'Razorpay' && (
                  <div className="flex justify-between text-gray-700">
                    <span>Amount Paid:</span>
                    <span className="text-green-600 font-semibold">₹{orderData.paidAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Payment Status Badge */}
              <div className="mt-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  orderData.paymentMethod === 'COD' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    orderData.paymentMethod === 'COD' ? 'bg-orange-500' : 'bg-green-500'
                  }`}></div>
                  {orderData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid Online'}
                </div>
              </div>
            </div>

            {/* Customer & Delivery Details */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-600 mb-4">Customer & Delivery Details</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-medium text-gray-900">{orderData.customerName}</p>
                  <p className="text-sm text-blue-600">{orderData.customerEmail}</p>
                  <p className="text-sm text-gray-600">{orderData.customerPhone}</p>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Delivery Address:</p>
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{orderData.shippingAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="bg-blue-50 rounded-3xl p-6 border border-blue-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-800">What's Next?</h3>
          </div>
          <div className="space-y-2 text-blue-700 text-sm">
            <p>✅ Your order has been confirmed and we've sent you a confirmation email</p>
            <p>📦 We'll start preparing your order for shipment</p>
            <p>🚚 You'll receive tracking information once your order ships</p>
            {orderData.paymentMethod === 'COD' && (
              <p className="font-semibold text-orange-700">💰 Please keep ₹{orderData.totalAmount.toLocaleString()} ready for cash payment on delivery</p>
            )}
            <p>📞 Our team will contact you if we need any additional information</p>
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
          
          <button
            onClick={() => window.print()}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Print Order Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
