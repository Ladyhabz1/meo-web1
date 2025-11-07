import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Amina Hassan',
      role: 'Executive Director',
      bio: 'With over 15 years in community development, Dr. Hassan leads our mission with passion and expertise.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'John Kipkoech',
      role: 'Program Coordinator',
      bio: 'John oversees our educational programs and has helped implement water projects across 20 villages.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Sarah Dida',
      role: 'Community Outreach Manager',
      bio: 'Sarah builds bridges between communities and coordinates our volunteer programs.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Mohamed Ali',
      role: 'Finance & Operations',
      bio: 'Mohamed ensures transparent financial management and efficient program operations.',
      image: '/api/placeholder/300/300'
    }
  ];

  const values = [
    {
      title: 'Equality',
      description: 'We believe in equal opportunities for all, regardless of background, ethnicity, or gender.',
      icon: EqualityIcon,
    },
    {
      title: 'Community',
      description: 'We work hand-in-hand with local communities to create sustainable solutions.',
      icon: CommunityIcon,
    },
    {
      title: 'Transparency',
      description: 'We maintain open communication and accountability in all our operations.',
      icon: TransparencyIcon,
    },
    {
      title: 'Innovation',
      description: 'We embrace creative approaches to solve complex community challenges.',
      icon: InnovationIcon,
    },
    {
      title: 'Sustainability',
      description: 'We focus on long-term solutions that communities can maintain and grow.',
      icon: SustainabilityIcon,
    },
    {
      title: 'Respect',
      description: 'We honor local cultures, traditions, and the wisdom of community members.',
      icon: RespectIcon,
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Header Section */}
      <section className="relative py-28 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            About Moyale Equality Organization
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Building bridges across communities, creating opportunities for sustainable development, 
            and fostering equality in the Moyale region since 2016.
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            {/* Mission */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <div className="text-blue-700 text-3xl">🎯</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To promote equality, foster community development, and create sustainable opportunities 
                for growth in the Moyale region by bridging cultural divides and empowering local communities.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <div className="text-green-700 text-3xl">👁️</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A thriving Moyale region where all communities have equal access to education, clean water, 
                economic opportunities, and where cultural diversity is celebrated as a source of strength.
              </p>
            </div>

            {/* Impact */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                <div className="text-purple-700 text-3xl">💫</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Since 2016, we've impacted over 2,500 lives through 15 active programs, built lasting 
                partnerships with 50+ community organizations, and created sustainable change.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-gray-600">These principles guide everything we do and shape how we work with communities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                  <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-green-100 transition-colors duration-300">
                      {value.icon()}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 text-center group-hover:text-blue-700 transition-colors duration-300">{value.title}</h4>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600">
              Our dedicated team brings together diverse expertise and deep community knowledge 
              to drive meaningful change in the Moyale region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <div className="h-56 bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                    <div className="text-5xl text-white">👤</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex space-x-3">
                      <button className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </button>
                      <button className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h4>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/team"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
            >
              View Full Team
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600">From humble beginnings to making a significant impact across the Moyale region.</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-green-400 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0">
              {/* 2016 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Foundation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Moyale Equality Organization was founded by a group of passionate community leaders 
                    who recognized the need for cross-border collaboration to address shared challenges 
                    in education, water access, and economic development.
                  </p>
                </div>
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 text-2xl font-bold border-4 border-white shadow-lg">
                    2016
                  </div>
                </div>
                <div className="md:w-1/4 md:pl-12 md:text-left md:hidden">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-5xl">🚀</div>
                  </div>
                </div>
              </div>

              {/* 2018 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/4 md:pr-12 md:text-right md:hidden">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-5xl">📚</div>
                  </div>
                </div>
                <div className="md:w-1/4 flex justify-center order-2">
                  <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 text-2xl font-bold border-4 border-white shadow-lg">
                    2018
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left order-3">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">First Programs</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Launched our first education support program, providing school supplies and 
                    scholarships to 100 children. Also initiated the clean water project that 
                    has since provided access to clean water for over 1,000 people.
                  </p>
                </div>
                <div className="md:w-1/4 md:pr-12 md:text-right order-1 hidden md:block">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-5xl">📚</div>
                  </div>
                </div>
              </div>

              {/* 2024 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Expanding Impact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Today, we operate 15 active programs, have impacted over 2,500 lives, and continue 
                    to grow our community partnerships. Our focus remains on sustainable, community-led 
                    development that creates lasting change.
                  </p>
                </div>
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 text-2xl font-bold border-4 border-white shadow-lg">
                    2024
                  </div>
                </div>
                <div className="md:w-1/4 md:pl-12 md:text-left">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-5xl">🌍</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join Us in Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Whether through volunteering, partnerships, or donations, your support helps us create 
            lasting change in the Moyale region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Involved
            </Link>
            <Link
              to="/donate"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// SVG Icons as React components
const EqualityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CommunityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const TransparencyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const InnovationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const SustainabilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const RespectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

export default About;