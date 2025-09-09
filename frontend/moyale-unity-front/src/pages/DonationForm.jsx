import React, { useState } from 'react'
import { submitDonation } from '../api/forms'

const DonationForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    donationType: 'one-time',
    program: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    paymentMethod: 'card',
    anonymous: false,
    newsletter: true,
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000]
  const programs = [
    { id: '', name: 'Where needed most' },
    { id: '1', name: 'Education Support Program' },
    { id: '2', name: 'Clean Water Initiative' },
    { id: '3', name: 'Women Empowerment Program' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({
      ...prev,
      amount: amount.toString(),
      customAmount: ''
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount
      
      if (!finalAmount || parseFloat(finalAmount) <= 0) {
        throw new Error('Please enter a valid donation amount')
      }

      const submissionData = {
        ...formData,
        amount: parseFloat(finalAmount)
      }

      const result = await submitDonation(submissionData)
      
      if (result.success) {
        setSuccess(true)
      } else {
        throw new Error(result.message || 'Donation failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-lg shadow-card border border-border p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Thank You for Your Donation!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your generous contribution will make a real difference in the lives of girls 
              in the Moyale region. We'll send you a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSuccess(false)
                  setFormData({
                    amount: '',
                    customAmount: '',
                    donationType: 'one-time',
                    program: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    paymentMethod: 'card',
                    anonymous: false,
                    newsletter: true,
                    message: ''
                  })
                }}
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth"
              >
                Make Another Donation
              </button>
              <a
                href="/programs"
                className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth text-center"
              >
                View Our Programs
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      {/* Header */}
      <section className="bg-gradient-hero py-16 mb-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Make a Donation
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Your contribution helps us create lasting change in the Moyale region. 
            Every shilling makes a difference in someone's life.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-card border border-border p-8">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Donation Amount */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Donation Amount</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-smooth ${
                    formData.amount === amount.toString()
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  ksh{amount}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleAmountSelect('custom')}
                className={`py-3 px-6 rounded-lg font-semibold transition-smooth ${
                  formData.amount === 'custom'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                Custom Amount
              </button>
              {formData.amount === 'custom' && (
                <input
                  type="number"
                  name="customAmount"
                  value={formData.customAmount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  min="1"
                  step="0.01"
                  required
                />
              )}
            </div>
          </div>

          {/* Donation Type */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Donation Type</h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="donationType"
                  value="one-time"
                  checked={formData.donationType === 'one-time'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>One-time</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="donationType"
                  value="monthly"
                  checked={formData.donationType === 'monthly'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>Monthly</span>
              </label>
            </div>
          </div>

          {/* Program Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Support a Program</h3>
            <select
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
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
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring mt-6"
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Message (Optional)</h3>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Share why you're supporting our cause..."
              rows="4"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            ></textarea>
          </div>

          {/* Checkboxes */}
          <div className="mb-8 space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-muted-foreground">Make this donation anonymous</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-muted-foreground">Subscribe to our newsletter for updates</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-secondary-hover disabled:bg-muted disabled:text-muted-foreground text-secondary-foreground py-4 px-6 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105 disabled:transform-none"
          >
            {loading ? 'Processing...' : `Donate ${formData.amount === 'custom' ? formData.customAmount : formData.amount ? '$' + formData.amount : ''}`}
          </button>

          <p className="text-center text-muted-foreground text-sm mt-4">
            Your donation is secure and will be processed safely. You'll receive a confirmation email shortly.
          </p>
        </form>
      </div>
    </div>
  )
}

export default DonationForm