import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProgramList from '../pages/ProgramList'

// Mock the API functions
jest.mock('../api/programs', () => ({
  getPrograms: jest.fn(),
  getMockPrograms: jest.fn()
}))

const { getPrograms, getMockPrograms } = require('../api/programs')

// Mock programs data
const mockPrograms = [
  {
    id: 1,
    title: 'Education Support Program',
    description: 'Providing quality education and school supplies to underprivileged children.',
    image: '/api/placeholder/400/300',
    category: 'Education',
    status: 'active',
    beneficiaries: 250,
    fundingGoal: 15000,
    currentFunding: 8500
  },
  {
    id: 2,
    title: 'Clean Water Initiative',
    description: 'Building wells and water purification systems for rural communities.',
    image: '/api/placeholder/400/300',
    category: 'Water & Sanitation',
    status: 'active',
    beneficiaries: 500,
    fundingGoal: 25000,
    currentFunding: 12000
  }
]

// Wrapper component for routing
const ProgramListWrapper = () => (
  <BrowserRouter>
    <ProgramList />
  </BrowserRouter>
)

describe('ProgramList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('displays loading state initially', () => {
    // Mock the API to return a pending promise
    getPrograms.mockImplementation(() => new Promise(() => {}))
    getMockPrograms.mockImplementation(() => new Promise(() => {}))

    render(<ProgramListWrapper />)
    
    expect(screen.getByText('Loading programs...')).toBeInTheDocument()
  })

  test('renders program cards when data is loaded', async () => {
    // Mock the API to fail first, then succeed with mock data
    getPrograms.mockRejectedValue(new Error('API Error'))
    getMockPrograms.mockResolvedValue(mockPrograms)

    render(<ProgramListWrapper />)

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading programs...')).not.toBeInTheDocument()
    })

    // Check that program titles are visible
    expect(screen.getByText('Education Support Program')).toBeInTheDocument()
    expect(screen.getByText('Clean Water Initiative')).toBeInTheDocument()

    // Check that descriptions are visible
    expect(screen.getByText(/Providing quality education and school supplies/)).toBeInTheDocument()
    expect(screen.getByText(/Building wells and water purification systems/)).toBeInTheDocument()

    // Check that beneficiary counts are visible
    expect(screen.getByText('250')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()

    // Check that funding information is visible
    expect(screen.getByText('$8,500')).toBeInTheDocument()
    expect(screen.getByText('$12,000')).toBeInTheDocument()
  })

  test('displays error message when API fails', async () => {
    // Mock both API calls to fail
    getPrograms.mockRejectedValue(new Error('API Error'))
    getMockPrograms.mockRejectedValue(new Error('Mock Error'))

    render(<ProgramListWrapper />)

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText('Unable to Load Programs')).toBeInTheDocument()
    })

    expect(screen.getByText(/We're having trouble connecting to our servers/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })

  test('displays correct program categories', async () => {
    getPrograms.mockRejectedValue(new Error('API Error'))
    getMockPrograms.mockResolvedValue(mockPrograms)

    render(<ProgramListWrapper />)

    await waitFor(() => {
      expect(screen.queryByText('Loading programs...')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Water & Sanitation')).toBeInTheDocument()
  })

  test('displays Learn More and Donate buttons for each program', async () => {
    getPrograms.mockRejectedValue(new Error('API Error'))
    getMockPrograms.mockResolvedValue(mockPrograms)

    render(<ProgramListWrapper />)

    await waitFor(() => {
      expect(screen.queryByText('Loading programs...')).not.toBeInTheDocument()
    })

    // Should have 2 "Learn More" buttons (one for each program)
    const learnMoreButtons = screen.getAllByText('Learn More')
    expect(learnMoreButtons).toHaveLength(2)

    // Should have 2 "Donate" buttons (one for each program)
    const donateButtons = screen.getAllByText('Donate')
    expect(donateButtons).toHaveLength(4) // 2 in cards + 2 in CTA section
  })

  test('calculates and displays correct funding progress', async () => {
    getPrograms.mockRejectedValue(new Error('API Error'))
    getMockPrograms.mockResolvedValue(mockPrograms)

    render(<ProgramListWrapper />)

    await waitFor(() => {
      expect(screen.queryByText('Loading programs...')).not.toBeInTheDocument()
    })

    // Education program: 8500/15000 = 56.67% ≈ 57%
    expect(screen.getByText('57%')).toBeInTheDocument()
    
    // Water program: 12000/25000 = 48%
    expect(screen.getByText('48%')).toBeInTheDocument()
  })
})