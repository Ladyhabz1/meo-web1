import React, { useState } from 'react'
import { submitContact } from '../api/forms'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await submitContact(formData)
      
      if (result.success) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          contactMethod: 'email'
        })
      } else {
        throw new Error(result.message || 'Message submission failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: ['Moyale Town', 'Kenya-Ethiopia Border', 'P.O. Box 7860-00610 Moyale']
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+254 113 825 645', '+254 747 825 645                                                                                                                                                                    ..................']
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['moyaleequalityorganisation@gmail.com', 'habibahassanguyo10@gmail.com']
    },
    {
      icon: '🕒',
      title: 'Office Hours',
      details: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed']
    }
  ]

  return (
    <div className="py-20">
      {/* Header */}
      <section className="bg-gradient-hero py-16 mb-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Get in touch with our team. We'd love to hear from you and 
            answer any questions you may have about our programs and initiatives.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Get in Touch</h2>
            
            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-muted-foreground">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Moyale Town, Kenya-Ethiopia Border</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/moyaleequality" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-hover transition-smooth"
                >
                  f
                </a>
                <a 
                  href="https://twitter.com/moyaleequality" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-hover transition-smooth"
                >
                  t
                </a>
                <a 
                  href="https://instagram.com/moyaleequality" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-hover transition-smooth"
                >
                  i
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-card rounded-lg shadow-card border border-border p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Send us a Message</h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email *"
                    className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="email">Contact by Email</option>
                    <option value="phone">Contact by Phone</option>
                    <option value="both">Either Email or Phone</option>
                  </select>
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject *"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring mb-6"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message *"
                  rows="6"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring mb-6"
                  required
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover disabled:bg-muted disabled:text-muted-foreground text-primary-foreground py-4 px-6 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105 disabled:transform-none"
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 mt-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                How can I get involved with your programs?
              </h3>
              <p className="text-muted-foreground">
                There are many ways to get involved! You can volunteer your time, make a donation, 
                sponsor a specific program, or help spread awareness about our work. Visit our 
                Volunteer and Donate pages to learn more about specific opportunities.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                Where exactly do you operate?
              </h3>
              <p className="text-muted-foreground">
                We operate primarily in the Moyale region, which straddles the Kenya-Ethiopia border. 
                Our programs serve communities on both sides of the border, focusing on areas with 
                the greatest need for educational, water, and economic development support.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                How do I know my donation is being used effectively?
              </h3>
              <p className="text-muted-foreground">
                Transparency is one of our core values. We provide regular updates to donors, 
                publish annual reports, and maintain detailed records of how funds are used. 
                Donors receive updates on the specific programs they support, including photos 
                and stories from beneficiaries.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                Can I visit your projects in person?
              </h3>
              <p className="text-muted-foreground">
                Yes! We welcome visitors who want to see our work firsthand. We can arrange 
                site visits for donors, potential volunteers, and partner organizations. 
                Please contact us in advance to coordinate visits and ensure the safety 
                and security of all participants.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact