import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPrograms, getMockPrograms } from '../api/programs'

const ProgramList = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true)
        setError(null)
        // Try real API first, fallback to mock data
        try {
          const data = await getPrograms()
          setPrograms(data)
        } catch (apiError) {
          console.log('Using mock data for development')
          const mockData = await getMockPrograms()
          setPrograms(mockData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const retry = () => {
    setError(null)
    setLoading(true)
    // Retry logic would go here
    setTimeout(() => {
      getMockPrograms().then(setPrograms).finally(() => setLoading(false))
    }, 1000)
  }

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100)
  }

  if (loading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Programs</h1>
            <p className="text-lg text-muted-foreground">Loading programs...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow-card border border-border p-6">
                <div className="animate-pulse">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Unable to Load Programs
            </h2>
            <p className="text-muted-foreground mb-6">
              We're having trouble connecting to our servers. Please try again.
            </p>
            <button
              onClick={retry}
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      {/* Header */}
      <section className="bg-gradient-hero py-20 mb-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Programs
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Discover the initiatives that are creating lasting change in the Moyale region. 
            Each program is designed with community input and sustainable impact in mind.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-card rounded-lg shadow-card hover:shadow-lifted transition-smooth transform hover:-translate-y-1 border border-border overflow-hidden"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {program.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    program.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {program.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {program.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {program.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{program.beneficiaries}</div>
                    <div className="text-xs text-muted-foreground">Beneficiaries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary">
                      ${program.currentFunding.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Raised</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-foreground">
                      {getProgressPercentage(program.currentFunding, program.fundingGoal).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-cta h-2 rounded-full transition-smooth"
                      style={{
                        width: `${getProgressPercentage(program.currentFunding, program.fundingGoal)}%`
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Goal: ${program.fundingGoal.toLocaleString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/programs/${program.id}`}
                    className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground text-center py-2 px-4 rounded-lg font-medium text-sm transition-smooth"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/donate"
                    className="bg-secondary hover:bg-secondary-hover text-secondary-foreground py-2 px-4 rounded-lg font-medium text-sm transition-smooth"
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {programs.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No programs available at the moment.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 mt-16 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Want to Get Involved?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every contribution makes a difference. Whether through donations, volunteering, 
            or spreading awareness, you can help us create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105"
            >
              Make a Donation
            </Link>
            <Link
              to="/volunteer"
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-smooth transform hover:scale-105"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgramList