import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.jpg';
import { MdSchool, MdWaterDrop, MdVolunteerActivism, MdGroups } from 'react-icons/md';

const Home = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: '2,500+', label: 'Lives Impacted' },
    { number: '15', label: 'Active Programs' },
    { number: '8', label: 'Years of Service' },
    { number: '50+', label: 'Community Partners' },
  ];

  const features = [
    {
      title: 'Education Support',
      description: 'Providing quality education and learning resources to children in need.',
      icon: MdSchool,
    },
    {
      title: 'Clean Water Access',
      description: 'Building sustainable water systems for rural communities.',
      icon: MdWaterDrop,
    },
    {
      title: 'Economic Empowerment',
      description: 'Supporting women and youth through skills training and microfinance.',
      icon: MdVolunteerActivism,
    },
    {
      title: 'Community Development',
      description: 'Strengthening local communities through collaborative initiatives.',
      icon: MdGroups,
    },
  ];

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-blue-900/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-green-400/20 text-green-400 rounded-full text-sm font-medium mb-4">
              Transforming Lives Since 2016
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building Bridges to
            <span className="block text-green-400 mt-2"> Equality & Hope</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Moyale Equality Organization is dedicated to creating lasting positive change 
            in the Moyale region through education, clean water access, and economic empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/donate"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Volunteer With Us
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100/50 relative">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">For over 8 years, we've been making a measurable difference in the lives of people across the Moyale region.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50 transition-all duration-500 transform hover:-translate-y-2 ${index === currentStat ? 'ring-2 ring-green-400/30 scale-105' : 'opacity-90'}`}
              >
                <div className="text-4xl lg:text-5xl font-bold text-blue-700 mb-2 transition-all duration-1000">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission & Vision */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            {/* Left Column */}
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400/10 to-blue-700/10 rounded-3xl transform -skew-y-3"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                    Our Mission & Vision
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    To promote equality, foster community development, and create sustainable opportunities 
                    for growth in the Moyale region by bridging cultural divides and empowering local communities.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We envision a future where every person in the Moyale region has access to education, 
                    clean water, economic opportunities, and can live with dignity and hope.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-700/5 to-blue-700/20 rounded-2xl p-6 h-40 flex flex-col justify-center hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                  <p className="text-gray-600">Empowering communities through sustainable development initiatives.</p>
                </div>
                <div className="bg-gradient-to-br from-green-400/5 to-green-400/20 rounded-2xl p-6 h-40 flex flex-col justify-center mt-8 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
                  <p className="text-gray-600">A world where equality and opportunity exist for all people.</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/20 rounded-2xl p-6 h-40 flex flex-col justify-center -mt-8 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Approach</h3>
                  <p className="text-gray-600">Community-led development that creates lasting change.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-700/5 to-green-400/20 rounded-2xl p-6 h-40 flex flex-col justify-center hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Values</h3>
                  <p className="text-gray-600">Equity, sustainability, transparency, and community partnership.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Focus Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We address the most critical needs of communities in the Moyale region through these key programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-green-500"></div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-green-100 transition-colors duration-300">
                      <Icon className="h-12 w-12 text-blue-700 group-hover:text-green-600 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Link */}
                  <div className="mt-6 text-center">
                    <Link 
                      to="/programs" 
                      className="inline-flex items-center text-sm font-medium text-blue-700 group-hover:text-green-600 transition-colors duration-300"
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join Us in Creating Lasting Change
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Your support enables us to continue our vital work in the Moyale region. 
            Together, we can build a future where every community thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/programs"
              className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              View Our Programs
            </Link>
            <Link
              to="/about"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;