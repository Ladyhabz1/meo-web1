import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-image.jpg'

const Home = () => {
  const stats = [
    { number: '1,000+', label: 'Lives Impacted' },
    { number: '15', label: 'Active Programs' },
    { number: '3', label: 'Years of Service' },
    { number: '50+', label: 'Community Partners' },
  ]

  const features = [
    {
      title: 'Education Support',
      description: 'Providing quality education and learning resources to children in need.',
      icon: '📚',
    },
    {
      title: 'Clean Water Access',
      description: 'Building sustainable water systems for rural communities.',
      icon: '💧',
    },
    {
      title: 'Economic Empowerment',
      description: 'Supporting women and youth through skills training and microfinance.',
      icon: '💼',
    },
    {
      title: 'Community Development',
      description: 'Strengthening local communities through collaborative initiatives.',
      icon: '🤝',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building Bridges to
            <span className="block text-secondary"> Equality & Hope</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Moyale Equality Organization is dedicated to creating lasting positive change 
            in the Moyale region through education, clean water access, and economic empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/donate"
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105 shadow-lifted"
            >
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-105 transition-smooth">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To promote equality, foster community development, and create sustainable opportunities 
              for growth in the Moyale region by bridging cultural divides and empowering local communities 
              through education, infrastructure development, and economic empowerment initiatives.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-card hover:shadow-lifted transition-smooth transform hover:-translate-y-1 border border-border"
              >
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join us in our mission to create positive change in the Moyale region. 
            Every contribution counts, every volunteer matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/programs"
              className="bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105"
            >
              View Our Programs
            </Link>
            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home