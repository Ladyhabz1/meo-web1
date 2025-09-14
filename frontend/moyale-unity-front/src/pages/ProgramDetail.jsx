import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProgram, getMockProgram } from '../api/programs';

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError(null);
        // Try real API first, fallback to mock data
        try {
          const data = await getProgram(id);
          setProgram(data);
        } catch (apiError) {
          console.log('Using mock data for development');
          const mockData = await getMockProgram(id);
          setProgram(mockData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  if (loading) {
    return (
      <div className="overflow-hidden">
        <section className="relative py-28 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-800 rounded mb-4 w-3/4 mx-auto"></div>
              <div className="h-4 bg-blue-800 rounded mb-2 w-1/2 mx-auto"></div>
              <div className="h-4 bg-blue-800 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </section>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded mb-3"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="overflow-hidden">
        <section className="relative py-28 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Program Not Found</h1>
          </div>
        </section>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Program Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The program you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link
              to="/programs"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-2/3 text-center lg:text-left">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {program.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  program.status === 'active' 
                    ? 'bg-green-500/20 text-green-100' 
                    : 'bg-yellow-500/20 text-yellow-100'
                }`}>
                  {program.status}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {program.title}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                {program.description}
              </p>
            </div>
            <div className="lg:w-1/3">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-64 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Program Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Program Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {program.fullDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">📍</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Location</h4>
                  </div>
                  <p className="text-gray-600">{program.location}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">📅</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Start Date</h4>
                  </div>
                  <p className="text-gray-600">
                    {new Date(program.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Program Objectives</h3>
              <div className="space-y-4">
                {program.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <p className="text-gray-600">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Expected Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl text-blue-600">👥</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700 mb-2">{program.beneficiaries}</div>
                  <div className="text-sm text-gray-600">Direct Beneficiaries</div>
                </div>
                <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl text-green-600">🏘️</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700 mb-2">5+</div>
                  <div className="text-sm text-gray-600">Communities Served</div>
                </div>
                <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl text-purple-600">📈</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-700 mb-2">Long-term</div>
                  <div className="text-sm text-gray-600">Sustainable Impact</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Funding Progress */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Funding Progress</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-800">
                    {getProgressPercentage(program.currentFunding, program.fundingGoal).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${getProgressPercentage(program.currentFunding, program.fundingGoal)}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Raised:</span>
                  <span className="font-semibold text-green-600">
                    ${program.currentFunding.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal:</span>
                  <span className="font-semibold text-gray-800">
                    ${program.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-semibold text-blue-600">
                    ${(program.fundingGoal - program.currentFunding).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/donate"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 block shadow-lg"
                >
                  Donate Now
                </Link>
                <Link
                  to="/volunteer"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 block shadow-lg"
                >
                  Volunteer
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Share This Program</h3>
              <p className="text-gray-600 text-sm mb-4">
                Help us spread the word about this important initiative.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-xl text-sm transition-colors duration-300 transform hover:scale-105 shadow-md">
                  Facebook
                </button>
                <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-3 rounded-xl text-sm transition-colors duration-300 transform hover:scale-105 shadow-md">
                  Twitter
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-xl text-sm transition-colors duration-300 transform hover:scale-105 shadow-md">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;