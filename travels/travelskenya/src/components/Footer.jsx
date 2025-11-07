import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/donate', label: 'Donate' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/contact', label: 'Contact' },
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: 'https://facebook.com/moyaleequality',
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      href: 'https://twitter.com/moyaleequality',
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.443-3.378-1.18L7.54 13.34c.513.395 1.153.628 1.849.628 1.663 0 3.01-1.347 3.01-3.01S10.052 7.948 8.389 7.948 5.379 9.295 5.379 10.958c0 .696.233 1.336.628 1.849l-2.468 2.469C2.782 14.346 2.34 13.195 2.34 11.898c0-3.123 2.537-5.66 5.66-5.66s5.66 2.537 5.66 5.66-2.537 5.66-5.66 5.66z"/>
        </svg>
      ),
      href: 'https://instagram.com/moyaleequality',
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mb-6 text-center md:text-left">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-lg">
                <span className="text-secondary-foreground font-extrabold text-2xl">ME</span>
              </div>
              <div className="mt-3 md:mt-0">
                <div className="text-xl font-bold">Moyale Equality Organization</div>
                <div className="text-sm opacity-80">Building bridges, creating opportunities</div>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-6 max-w-md mx-auto md:mx-0 leading-relaxed">
              Promoting equality, education, and economic development across the Moyale region. 
              Together, we bridge communities and create lasting positive change.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition transform hover:scale-110"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-secondary inline-block pb-1">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-secondary inline-block pb-1">Contact</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>📍 Moyale Town, Kenya-Ethiopia Border</p>
              <p>📞 +254 700 123 456</p>
              <p>✉️ info@moyaleequality.org</p>
              <p>🕒 Mon - Fri: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center">
          <p className="text-sm opacity-80">
            © {currentYear} Moyale Equality Organization. All rights reserved. <br className="md:hidden" />
            <span className="md:ml-1 block md:inline">Making a difference, one community at a time.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
