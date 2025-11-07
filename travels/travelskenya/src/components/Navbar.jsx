import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout, user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/donate', label: 'Donate' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-1' : 'shadow-sm py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-md group-hover:shadow-lg">
              <span className="text-white font-bold text-xl">ME</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-blue-800">Moyale Equality</div>
              <div className="text-xs text-blue-500 -mt-1">Empowering Communities</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 ${
                  isActive(link.path)
                    ? 'text-blue-700 bg-blue-50 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center ml-4 pl-4 border-l border-gray-200">
                <div className="mr-4 text-sm text-gray-600">
                  Welcome, {user?.name || 'Admin'}
                </div>
                <Link
                  to="/admin"
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg mr-2 hover:bg-blue-100 hover:text-blue-700 ${
                    isActive('/admin')
                      ? 'text-blue-700 bg-blue-100 font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center ml-4 pl-4 border-l border-gray-200">
            
          
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 p-2 rounded-lg hover:bg-blue-50"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                    isActive(link.path)
                      ? 'text-blue-700 bg-blue-50 font-semibold'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-100 mt-2">
                    Welcome, {user?.name || 'Admin'}
                  </div>
                  <Link
                    to="/admin"
                    className={`block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                      isActive('/admin')
                        ? 'text-blue-700 bg-blue-50 font-semibold'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* <div className="border-t border-gray-100 pt-2 mt-2">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-base font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </div> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar