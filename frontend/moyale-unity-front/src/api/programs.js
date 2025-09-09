const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Get all programs
export const getPrograms = async () => {
  return apiCall('/programs')
}

// Get single program by ID
export const getProgram = async (id) => {
  return apiCall(`/programs/${id}`)
}

// Mock data fallback for development
export const getMockPrograms = () => {
  return Promise.resolve([
    {
      id: 1,
      title: 'Education Support Program',
      description: 'Providing quality education and school supplies to underprivileged children in Moyale region.',
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
      description: 'Building wells and water purification systems to provide clean drinking water to rural communities.',
      image: '/api/placeholder/400/300',
      category: 'Water & Sanitation',
      status: 'active',
      beneficiaries: 500,
      fundingGoal: 25000,
      currentFunding: 12000
    },
    {
      id: 3,
      title: 'Women Empowerment Program',
      description: 'Skills training and microfinance support for women entrepreneurs in local communities.',
      image: '/api/placeholder/400/300',
      category: 'Economic Development',
      status: 'active',
      beneficiaries: 150,
      fundingGoal: 10000,
      currentFunding: 7500
    }
  ])
}

export const getMockProgram = (id) => {
  const programs = [
    {
      id: 1,
      title: 'Education Support Program',
      description: 'Providing quality education and school supplies to underprivileged children in Moyale region.',
      fullDescription: 'Our Education Support Program aims to bridge the educational gap in the Moyale region by providing comprehensive support to underprivileged children. We supply essential school materials, sponsor school fees, and provide nutritional support to ensure children can focus on their studies. The program also includes teacher training workshops and infrastructure improvements to create a better learning environment.',
      image: '/api/placeholder/600/400',
      category: 'Education',
      status: 'active',
      beneficiaries: 250,
      fundingGoal: 15000,
      currentFunding: 8500,
      startDate: '2024-01-15',
      location: 'Moyale District, Kenya-Ethiopia Border',
      objectives: [
        'Provide school supplies to 250 children',
        'Sponsor education fees for 100 children',
        'Train 15 local teachers',
        'Build 3 new classrooms'
      ]
    },
    {
      id: 2,
      title: 'Clean Water Initiative',
      description: 'Building wells and water purification systems to provide clean drinking water to rural communities.',
      fullDescription: 'The Clean Water Initiative addresses the critical need for safe drinking water in rural Moyale communities. Our comprehensive approach includes drilling boreholes, installing solar-powered water pumps, constructing water storage tanks, and establishing community-managed water points. We also provide training on water system maintenance and hygiene practices to ensure long-term sustainability.',
      image: '/api/placeholder/600/400',
      category: 'Water & Sanitation',
      status: 'active',
      beneficiaries: 500,
      fundingGoal: 25000,
      currentFunding: 12000,
      startDate: '2024-02-01',
      location: 'Rural Moyale Communities',
      objectives: [
        'Install 5 solar-powered water pumps',
        'Build 10 community water points',
        'Train 20 community water managers',
        'Provide hygiene education to 500 families'
      ]
    },
    {
      id: 3,
      title: 'Women Empowerment Program',
      description: 'Skills training and microfinance support for women entrepreneurs in local communities.',
      fullDescription: 'Our Women Empowerment Program focuses on economic empowerment through skills development and financial inclusion. We provide vocational training in tailoring, handicrafts, and small business management. The program includes microfinance support, business mentorship, and market linkage facilitation to help women establish sustainable income-generating activities.',
      image: '/api/placeholder/600/400',
      category: 'Economic Development',
      status: 'active',
      beneficiaries: 150,
      fundingGoal: 10000,
      currentFunding: 7500,
      startDate: '2024-03-01',
      location: 'Moyale Town and Surrounding Areas',
      objectives: [
        'Train 150 women in vocational skills',
        'Provide microloans to 100 women',
        'Establish 3 women\'s cooperatives',
        'Create market linkages for women\'s products'
      ]
    }
  ]
  
  return Promise.resolve(programs.find(p => p.id === parseInt(id)))
}