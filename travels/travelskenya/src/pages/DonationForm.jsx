import React, { useState } from 'react';
import { submitDonation, registerUser, loginUser } from '../api/forms';

const DonationForm = () => {
  const [currentStep, setCurrentStep] = useState('register'); // register -> login -> donation
  const [formData, setFormData] = useState({
    // Registration fields
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Login fields
    loginUsername: '',
    loginPassword: '',
    
    // Donation fields
    amount: '',
    customAmount: '',
    donationType: 'one-time',
    program: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    paymentMethod: 'mpesa',
    anonymous: false,
    newsletter: true,
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000];
  const programs = [
    { id: '', name: 'Where needed most' },
    { id: '1', name: 'Education Support Program' },
    { id: '2', name: 'Clean Water Initiative' },
    { id: '3', name: 'Women Empowerment Program' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({
      ...prev,
      amount: amount.toString(),
      customAmount: ''
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const result = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      if (result.access_token) {
        setToken(result.access_token);
        setUser(result.user);
        setCurrentStep('login');
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser({
        username: formData.loginUsername,
        password: formData.loginPassword
      });
      
      if (result.access_token) {
        setToken(result.access_token);
        setUser(result.user);
        setCurrentStep('donation');
      } else {
        throw new Error(result.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount;
      
      if (!finalAmount || parseFloat(finalAmount) <= 0) {
        throw new Error('Please enter a valid donation amount');
      }

      const submissionData = {
        donor_name: `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.phone,
        amount: parseFloat(finalAmount),
        program_id: formData.program || null,
        user_id: user.id
      };

      const result = await submitDonation(submissionData, token);
      
      if (result.id) {
        setSuccess(true);
      } else {
        throw new Error(result.error || 'Donation failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="overflow-hidden">
        <section className="relative py-28 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Thank You for Your Donation!
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Your generous contribution will make a real difference in the lives of people 
              in the Moyale region. We'll send you a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    ...formData,
                    amount: '',
                    customAmount: '',
                    program: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    message: ''
                  });
                }}
                className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Make Another Donation
              </button>
              <a
                href="/programs"
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                View Our Programs
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="relative py-28 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Make a Difference
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Your contribution helps us create lasting change in the Moyale region. 
            Every donation makes a difference in someone's life.
          </p>
          <div className="mt-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-flex items-center text-white/90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {currentStep === 'register' && 'Create an account to get started'}
              {currentStep === 'login' && 'Login to continue your donation'}
              {currentStep === 'donation' && 'Complete your donation'}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-gray-700">
              {currentStep === 'register' && 'Step 1 of 3: Create Account'}
              {currentStep === 'login' && 'Step 2 of 3: Login'}
              {currentStep === 'donation' && 'Step 3 of 3: Donation Details'}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {currentStep === 'register' && '33% Complete'}
              {currentStep === 'login' && '66% Complete'}
              {currentStep === 'donation' && '100% Complete'}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-500" 
              style={{ 
                width: currentStep === 'register' ? '33%' : 
                       currentStep === 'login' ? '66%' : '100%' 
              }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        {currentStep === 'register' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
            <p className="text-gray-600 mb-8">
              Create an account to make a donation and track your contributions to our cause.
            </p>
            
            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    required
                    minLength="6"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account & Continue'
                )}
              </button>

              <p className="text-center text-gray-500 text-sm mt-6">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentStep('login')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        )}

        {/* Login Form */}
        {currentStep === 'login' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login to Your Account</h2>
            <p className="text-gray-600 mb-8">
              Welcome back! Please login to continue your donation process.
            </p>
            
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="loginUsername" className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                <input
                  type="text"
                  id="loginUsername"
                  name="loginUsername"
                  value={formData.loginUsername}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>

              <div className="mb-8">
                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Login & Continue to Donation'
                )}
              </button>

              <p className="text-center text-gray-500 text-sm mt-6">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentStep('register')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register here
                </button>
              </p>
            </form>
          </div>
        )}

        {/* Donation Form */}
        {currentStep === 'donation' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Donation</h2>
            <p className="text-gray-600 mb-8">
              Thank you for supporting our cause, {user?.username}! Please provide your donation details.
            </p>
            
            <form onSubmit={handleDonationSubmit}>
              {/* Donation Amount */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Amount (KES)</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        formData.amount === amount.toString()
                          ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      KES {amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleAmountSelect('custom')}
                    className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      formData.amount === 'custom'
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Custom Amount
                  </button>
                  {formData.amount === 'custom' && (
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">KES</span>
                      <input
                        type="number"
                        name="customAmount"
                        value={formData.customAmount}
                        onChange={handleInputChange}
                        placeholder="Enter amount"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        min="100"
                        step="100"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Program Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Support a Program</h3>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                >
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 254712345678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      required
                      pattern="254[0-9]{9}"
                      title="Please enter a valid Kenyan phone number starting with 254"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">M-Pesa</h4>
                      <p className="text-sm text-gray-600">You will receive a payment prompt on your phone</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="mb-8 space-y-4">
                <label className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    Make this donation anonymous
                  </span>
                </label>
                
                <label className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    Subscribe to our newsletter for updates on how your donation is making an impact
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Donation...
                  </>
                ) : (
                  `Donate KES ${formData.amount === 'custom' ? formData.customAmount : formData.amount ? formData.amount : ''}`
                )}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Your donation is secure and will be processed safely. You'll receive a confirmation message shortly.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationForm;