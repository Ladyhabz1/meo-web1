import React, { useState } from 'react'
import { submitVolunteer } from '../api/forms'

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    city: '',
    country: '',
    occupation: '',
    availability: '',
    interests: [],
    skills: '',
    experience: '',
    languages: '',
    motivation: '',
    references: '',
    newsletter: true,
    agreement: false
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const availabilityOptions = [
    'Weekends only',
    'Weekday evenings',
    'Full-time during holidays',
    'Flexible schedule',
    'One-time projects',
    'Long-term commitment'
  ]

  const interestOptions = [
    'Education & Teaching',
    'Water & Sanitation',
    'Women Empowerment',
    'Community Development',
    'Healthcare Support',
    'Administrative Support',
    'Fundraising',
    'Marketing & Communications',
    'Technical Support',
    'Event Organization'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!formData.agreement) {
        throw new Error('Please agree to the terms and conditions')
      }

      const result = await submitVolunteer(formData)
      
      if (result.success) {
        setSuccess(true)
      } else {
        throw new Error(result.message || 'Application submission failed')
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
              Thank You for Volunteering!
            </h2>
            <p className="text-muted-foreground mb-6">
              We've received your volunteer application and are excited about your interest 
              in joining our mission. Our team will review your application and contact you 
              within 5-7 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSuccess(false)
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    age: '',
                    address: '',
                    city: '',
                    country: '',
                    occupation: '',
                    availability: '',
                    interests: [],
                    skills: '',
                    experience: '',
                    languages: '',
                    motivation: '',
                    references: '',
                    newsletter: true,
                    agreement: false
                  })
                }}
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth"
              >
                Submit Another Application
              </button>
              <a
                href="/programs"
                className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth text-center"
              >
                Learn About Our Programs
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
            Become a Volunteer
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Join our community of dedicated volunteers making a real difference in the Moyale region. 
            Your time and skills can help create lasting positive change.
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

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name *"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name *"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address *"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number *"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                min="16"
                max="100"
              />
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                placeholder="Current Occupation"
                className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

          {/* Availability */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Availability</h3>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select your availability *</option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Areas of Interest */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Areas of Interest (Select all that apply)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    className="mr-3"
                  />
                  <span className="text-muted-foreground">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Skills & Experience</h3>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="List your relevant skills and expertise..."
              rows="4"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring mb-4"
            ></textarea>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Describe any previous volunteer or related experience..."
              rows="4"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring mb-4"
            ></textarea>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              placeholder="Languages you speak (e.g., English, Swahili, Amharic)"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Motivation */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Why do you want to volunteer with us? *
            </h3>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              placeholder="Share your motivation for volunteering with Moyale Equality Organization..."
              rows="5"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              required
            ></textarea>
          </div>

          {/* References */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">References (Optional)</h3>
            <textarea
              name="references"
              value={formData.references}
              onChange={handleInputChange}
              placeholder="Please provide contact information for 1-2 references (name, relationship, phone/email)..."
              rows="4"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            ></textarea>
          </div>

          {/* Checkboxes */}
          <div className="mb-8 space-y-3">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="mr-3 mt-1"
              />
              <span className="text-muted-foreground">
                Subscribe to our newsletter to receive updates about volunteer opportunities and impact stories
              </span>
            </label>
            <label className="flex items-start">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                className="mr-3 mt-1"
                required
              />
              <span className="text-muted-foreground">
                I agree to undergo a background check if required and commit to the organization's 
                values of equality, respect, and community development. I understand that volunteering 
                is unpaid and I am applying of my own free will. *
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-secondary-hover disabled:bg-muted disabled:text-muted-foreground text-secondary-foreground py-4 px-6 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105 disabled:transform-none"
          >
            {loading ? 'Submitting Application...' : 'Submit Volunteer Application'}
          </button>

          <p className="text-center text-muted-foreground text-sm mt-4">
            We'll review your application and contact you within 5-7 business days. Thank you for your interest in volunteering!
          </p>
        </form>
      </div>
    </div>
  )
}

export default VolunteerForm