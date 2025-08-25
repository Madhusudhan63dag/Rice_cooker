import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/1.webp';


const url = "https://razorpaybackend-wgbh.onrender.com"

// https://razorpaybackend-wgbh.onrender.com

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('full');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize selected product based on URL parameters
  const initializeProduct = () => {
    const productId = searchParams.get('product');
    const price = searchParams.get('price');
    const quantity = searchParams.get('quantity');
    const name = searchParams.get('name');

    if (productId && price && quantity && name) {
      return {
        id: parseInt(productId),
        name: decodeURIComponent(name),
        price: parseInt(price),
        quantity: parseInt(quantity),
        description: decodeURIComponent(name)
      };
    }
    
    // Default product if no parameters are provided
    return {
      id: 2, 
      name: 'Buy 1 Get 1 Free Pack', 
      price: 750,
      quantity: 2, 
      description: 'Low Carb Sugar Rice Cooker - Buy 1 Get 1 Free Pack'
    };
  };

  const [selectedProduct, setSelectedProduct] = useState(initializeProduct());

  // Calculate order totals
  const subtotal = selectedProduct.price * selectedProduct.quantity;
  const discountAmount = 0;
  const totalAmount = subtotal - discountAmount;

  // Get payment amount based on selected payment method
  const getPaymentAmount = () => {
    return paymentMethod === 'full' ? totalAmount : 0;
  };

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!customerDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerDetails.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(customerDetails.email)) newErrors.email = 'Email is invalid';
    if (!customerDetails.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(customerDetails.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    if (!customerDetails.address.trim()) newErrors.address = 'Address is required';
    if (!customerDetails.city.trim()) newErrors.city = 'City is required';
    if (!customerDetails.state.trim()) newErrors.state = 'State is required';
    if (!customerDetails.zip.trim()) newErrors.zip = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create Razorpay order (only for full payment)
  const createRazorpayOrder = async () => {
    try {
      const paymentAmount = getPaymentAmount();
      const response = await fetch(`${url}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentAmount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
            customerEmail: customerDetails.email,
            customerPhone: customerDetails.phone,
            productName: selectedProduct.name,
            totalAmount: totalAmount,
            paymentType: paymentMethod,
            paidAmount: paymentAmount
          }
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async (orderData) => {
    const options = {
      key: orderData.key,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: 'Low Carb Sugar Rice Cooker',
      description: `${selectedProduct.name} Purchase`,
      order_id: orderData.order.id,
      handler: async function (response) {
        try {
          // Verify payment
          const verifyResponse = await fetch(`${url}/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            await handleSuccessfulPayment(response);
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          alert('Payment verification failed. Please contact support.');
          setIsProcessing(false);
        }
      },
      prefill: {
        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
        email: customerDetails.email,
        contact: customerDetails.phone,
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle successful payment
  const handleSuccessfulPayment = async (paymentResponse = null) => {
    try {
      const orderNumber = `ORD${Date.now()}`;
      
      // Send confirmation email
      await sendOrderConfirmation(orderNumber, paymentResponse);
      
      // Create shipping address with payment note
      const baseAddress = `${customerDetails.address}${customerDetails.apartment ? ', ' + customerDetails.apartment : ''}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.zip}, ${customerDetails.country}`;
      const shippingAddressWithNote = paymentMethod === 'cod' 
        ? `${baseAddress} [COD - PAY ON DELIVERY: ₹${totalAmount}]`
        : `${baseAddress} [FULL PAYMENT COMPLETED]`;
      
      // Navigate to thank you page with order data
      navigate('/thank-you', {
        state: {
          orderData: {
            orderNumber: orderNumber,
            productName: selectedProduct.name,
            totalAmount: totalAmount,
            paymentType: paymentMethod,
            paidAmount: getPaymentAmount(),
            paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Razorpay',
            paymentId: paymentResponse ? paymentResponse.razorpay_payment_id : 'COD',
            customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
            customerEmail: customerDetails.email,
            customerPhone: customerDetails.phone,
            shippingAddress: shippingAddressWithNote
          }
        }
      });
      
    } catch (error) {
      console.error('Post-payment processing error:', error);
      alert('Order placed successfully! Our team will contact you shortly.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Send order confirmation email - FIXED TO WORK WITH YOUR API
  const sendOrderConfirmation = async (orderNumber, paymentResponse) => {
    try {
      // Prepare email data matching the API structure
      const emailData = {
        customerEmail: customerDetails.email,
        orderDetails: {
          orderNumber: orderNumber,
          productName: selectedProduct.name,
          quantity: selectedProduct.quantity,
          totalAmount: totalAmount,
          currency: '₹',
          paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Razorpay',
          paymentId: paymentResponse ? paymentResponse.razorpay_payment_id : 'COD - Pay on Delivery',
          // For multiple products structure (required by your API)
          products: [{
            name: selectedProduct.name,
            quantity: selectedProduct.quantity,
            price: selectedProduct.price
          }]
        },
        customerDetails: {
          firstName: customerDetails.firstName,
          lastName: customerDetails.lastName,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          apartment: customerDetails.apartment,
          city: customerDetails.city,
          state: customerDetails.state,
          zip: customerDetails.zip,
          country: customerDetails.country
        }
      };

      // Always use the same endpoint for both COD and online payments
      const apiEndpoint = `${url}/send-order-confirmation`;

      console.log('Sending order confirmation email...', emailData);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Order confirmation email sent successfully');
      } else {
        console.error('Email sending failed:', data);
      }
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'cod') {
        // For COD, just process the order without payment
        await handleSuccessfulPayment();
      } else {
        // For full payment, use Razorpay
        const orderData = await createRazorpayOrder();
        await handleRazorpayPayment(orderData);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white text-gray-900">
      <div className="px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <span className="ml-2 text-blue-600 font-medium">Checkout</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">2</div>
              <span className="ml-2 text-gray-600">Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">3</div>
              <span className="ml-2 text-gray-600">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Customer Information</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerDetails.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter your first name"
                      required
                    />
                    {errors.firstName && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerDetails.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter your last name"
                      required
                    />
                    {errors.lastName && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerDetails.email}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                    {errors.phone && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="House number, street name"
                    required
                  />
                  {errors.address && (
                    <span className="text-red-600 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.address}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="apartment" className="block text-sm font-semibold text-gray-700 mb-2">
                    Apartment, Suite, etc. (Optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={customerDetails.apartment}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Apartment, floor, building"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Your city"
                      required
                    />
                    {errors.city && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.city}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={customerDetails.state}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Your state"
                      required
                    />
                    {errors.state && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.state}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="zip" className="block text-sm font-semibold text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={customerDetails.zip}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.zip ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="123456"
                      required
                    />
                    {errors.zip && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.zip}
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                </div>
                
                {/* Products */}
                <div className="space-y-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="text-gray-900 font-semibold text-lg">{selectedProduct.name}</h4>
                        <p className="text-gray-600 text-sm">{selectedProduct.description}</p>
                        <p className="text-gray-600 text-sm">Price per item: ₹{selectedProduct.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-600 font-bold text-lg">₹{subtotal.toLocaleString()}</p>
                        <p className="text-gray-500 text-sm">Qty: {selectedProduct.quantity}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 text-sm">Total for {selectedProduct.quantity} item{selectedProduct.quantity > 1 ? 's' : ''}</span>
                      <div className="bg-gray-200 rounded-lg px-3 py-1">
                        <span className="text-gray-900 font-semibold">
                          Package Deal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Totals */}
                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  
                  {paymentMethod === 'cod' && (
                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                      <div className="flex justify-between text-orange-700 font-bold text-xl">
                        <span>Pay on Delivery:</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-orange-600 text-xs mt-1">Full amount to be paid on delivery</p>
                    </div>
                  )}
                  
                  {paymentMethod === 'full' && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="flex justify-between text-green-700 font-bold text-xl">
                        <span>Pay Now:</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-green-600 text-xs mt-1">Complete payment now</p>
                    </div>
                  )}
                </div>
                
                {/* Payment Method Options */}
                <div className="mb-6">
                  <h4 className="text-gray-900 font-semibold mb-3 text-lg">Payment Options</h4>
                  <div className="space-y-3">
                    {/* COD Option */}
                    <div className={`bg-white rounded-xl p-4 border-2 transition-colors duration-300 ${
                      paymentMethod === 'cod' ? 'border-orange-500' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-orange-600 border-gray-400 focus:ring-orange-500 focus:ring-2"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <span className="text-gray-900 font-medium">Cash on Delivery</span>
                              <p className="text-gray-600 text-sm">Pay full amount when delivered</p>
                            </div>
                          </div>
                          <div className="text-orange-600 font-bold">₹0 now</div>
                        </div>
                      </label>
                    </div>

                    {/* Full Payment Option */}
                    <div className={`bg-white rounded-xl p-4 border-2 transition-colors duration-300 ${
                      paymentMethod === 'full' ? 'border-green-500' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="full"
                          checked={paymentMethod === 'full'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-green-600 border-gray-400 focus:ring-green-500 focus:ring-2"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <span className="text-gray-900 font-medium">Pay Online</span>
                              <p className="text-gray-600 text-sm">Pay complete amount now</p>
                            </div>
                          </div>
                          <div className="text-green-600 font-bold">₹{totalAmount.toLocaleString()}</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {paymentMethod === 'full' && (
                    <div className="mt-3 bg-gray-100 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center text-gray-600 text-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="w-4 h-4 mr-2" />
                        Secure payment via Cards, UPI, Net Banking
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full ${
                    paymentMethod === 'full'
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600'
                      : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600'
                  } text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform ${
                    isProcessing 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing Order...
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {paymentMethod === 'full' 
                          ? `Pay Now - ₹${totalAmount.toLocaleString()}`
                          : `Place COD Order`
                        }
                      </div>
                    </>
                  )}
                </button>
                
                {/* Payment Note */}
                <div className="mt-4 bg-gray-100 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Secure payment powered by Razorpay'}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {paymentMethod === 'full' 
                      ? 'Complete payment now - no amount due on delivery'
                      : `Pay ₹${totalAmount.toLocaleString()} when your order is delivered`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
