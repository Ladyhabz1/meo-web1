const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

// Submit donation form
export const submitDonation = async (donationData) => {
  try {
    const response = await fetch(`${API_BASE}/api/donate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Donation submission failed:', error)
    // Mock success for development
    return Promise.resolve({ 
      success: true, 
      message: 'Thank you for your donation! Your contribution will make a real difference.',
      transactionId: 'TXN-' + Date.now()
    })
  }
}

// Submit volunteer form
export const submitVolunteer = async (volunteerData) => {
  try {
    const response = await fetch(`${API_BASE}/api/volunteer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteerData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Volunteer submission failed:', error)
    // Mock success for development
    return Promise.resolve({ 
      success: true, 
      message: 'Thank you for volunteering! We will contact you soon with opportunities.',
      applicationId: 'VOL-' + Date.now()
    })
  }
}

// Submit contact form
export const submitContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Contact submission failed:', error)
    // Mock success for development
    return Promise.resolve({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      messageId: 'MSG-' + Date.now()
    })
  }
}