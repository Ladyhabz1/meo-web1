import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProgram, getMockProgram } from '../api/programs'

const ProgramDetail = () => {
  const { id } = useParams()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true)
        setError(null)
        // Try real API first, fallback to mock data
        try {
          const data = await getProgram(id)
          setProgram(data)
        } catch (apiError) {
          console.log('Using mock data for development')
          const mockData = await getMockProgram(id)
          setProgram(mockData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProgram()
  }, [id])

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100)
  }

  if (loading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-muted h-64 rounded-lg mb-8"></div>
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Program Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The program you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link
              to="/programs"
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="relative h-96 mb-16">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {program.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  program.status === 'active' 
                    ? 'bg-green-500/20 text-green-100' 
                    : 'bg-yellow-500/20 text-yellow-100'
                }`}>
                  {program.status}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl">{program.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Program Details */}
            <div className="bg-card rounded-lg shadow-card border border-border p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Program Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {program.fullDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">📍 Location</h4>
                  <p className="text-muted-foreground">{program.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">📅 Start Date</h4>
                  <p className="text-muted-foreground">
                    {new Date(program.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-card-foreground mb-4">Program Objectives</h3>
              <ul className="space-y-2">
                {program.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Section */}
            <div className="bg-card rounded-lg shadow-card border border-border p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Expected Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{program.beneficiaries}</div>
                  <div className="text-sm text-muted-foreground">Direct Beneficiaries</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏘️</span>
                  </div>
                  <div className="text-2xl font-bold text-secondary">5+</div>
                  <div className="text-sm text-muted-foreground">Communities Served</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="text-2xl font-bold text-accent">Long-term</div>
                  <div className="text-sm text-muted-foreground">Sustainable Impact</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Funding Progress */}
            <div className="bg-card rounded-lg shadow-card border border-border p-6 mb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Funding Progress</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">
                    {getProgressPercentage(program.currentFunding, program.fundingGoal).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-cta h-3 rounded-full transition-smooth"
                    style={{
                      width: `${getProgressPercentage(program.currentFunding, program.fundingGoal)}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Raised:</span>
                  <span className="font-semibold text-secondary">
                    ${program.currentFunding.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Goal:</span>
                  <span className="font-semibold text-foreground">
                    ${program.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-semibold text-primary">
                    ${(program.fundingGoal - program.currentFunding).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/donate"
                  className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground text-center py-3 px-4 rounded-lg font-semibold transition-smooth transform hover:scale-105 block"
                >
                  Donate Now
                </Link>
                <Link
                  to="/volunteer"
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground text-center py-3 px-4 rounded-lg font-semibold transition-smooth transform hover:scale-105 block"
                >
                  Volunteer
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Share This Program</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Help us spread the word about this important initiative.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-2 px-3 rounded-lg text-sm transition-smooth">
                  Facebook
                </button>
                <button className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-2 px-3 rounded-lg text-sm transition-smooth">
                  Twitter
                </button>
                <button className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-2 px-3 rounded-lg text-sm transition-smooth">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramDetail