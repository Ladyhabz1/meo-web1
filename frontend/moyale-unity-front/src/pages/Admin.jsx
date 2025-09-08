
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Admin = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = {
    totalDonations: 45650,
    activeDonors: 234,
    volunteers: 67,
    programs: 15,
    beneficiaries: 2500
  }

  const recentDonations = [
    { id: 1, donor: 'John Smith', amount: 250, program: 'Education Support', date: '2024-01-15' },
    { id: 2, donor: 'Sarah Johnson', amount: 500, program: 'Clean Water Initiative', date: '2024-01-14' },
    { id: 3, donor: 'Anonymous', amount: 100, program: 'Women Empowerment', date: '2024-01-13' },
    { id: 4, donor: 'Mike Wilson', amount: 750, program: 'General Fund', date: '2024-01-12' },
  ]

  const recentVolunteers = [
    { id: 1, name: 'Alice Brown', skills: 'Teaching, Community Outreach', status: 'Pending Review', date: '2024-01-16' },
    { id: 2, name: 'David Lee', skills: 'Water Systems, Engineering', status: 'Approved', date: '2024-01-15' },
    { id: 3, name: 'Emma Davis', skills: 'Healthcare, Nursing', status: 'Interview Scheduled', date: '2024-01-14' },
  ]

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'donations', label: 'Donations', icon: '💰' },
    { id: 'volunteers', label: 'Volunteers', icon: '👥' },
    { id: 'programs', label: 'Programs', icon: '📋' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ]

  const TabContent = ({ tab }) => {
    switch (tab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-card rounded-lg shadow-card border border-border p-6">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-secondary">${stats.totalDonations.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Donations</div>
              </div>
              <div className="bg-card rounded-lg shadow-card border border-border p-6">
                <div className="text-3xl mb-2">👤</div>
                <div className="text-2xl font-bold text-primary">{stats.activeDonors}</div>
                <div className="text-sm text-muted-foreground">Active Donors</div>
              </div>
              <div className="bg-card rounded-lg shadow-card border border-border p-6">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-accent">{stats.volunteers}</div>
                <div className="text-sm text-muted-foreground">Volunteers</div>
              </div>
              <div className="bg-card rounded-lg shadow-card border border-border p-6">
                <div className="text-3xl mb-2">📋</div>
                <div className="text-2xl font-bold text-primary">{stats.programs}</div>
                <div className="text-sm text-muted-foreground">Active Programs</div>
              </div>
              <div className="bg-card rounded-lg shadow-card border border-border p-6">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-secondary">{stats.beneficiaries.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Beneficiaries</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg shadow-card border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Donations</h3>
                <div className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div key={donation.id} className="flex justify-between items-center border-b border-border pb-2">
                      <div>
                        <div className="font-medium text-card-foreground">{donation.donor}</div>
                        <div className="text-sm text-muted-foreground">{donation.program}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-secondary">${donation.amount}</div>
                        <div className="text-sm text-muted-foreground">{donation.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-card border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Volunteer Applications</h3>
                <div className="space-y-4">
                  {recentVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="border-b border-border pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium text-card-foreground">{volunteer.name}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          volunteer.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : volunteer.status === 'Pending Review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {volunteer.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{volunteer.skills}</div>
                      <div className="text-sm text-muted-foreground">{volunteer.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'donations':
        return (
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Donation Management</h3>
            <p className="text-muted-foreground mb-4">
              Manage and track all donations received through the platform.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-card-foreground">Donor</th>
                    <th className="pb-2 text-card-foreground">Amount</th>
                    <th className="pb-2 text-card-foreground">Program</th>
                    <th className="pb-2 text-card-foreground">Date</th>
                    <th className="pb-2 text-card-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map((donation) => (
                    <tr key={donation.id} className="border-b border-border">
                      <td className="py-2 text-muted-foreground">{donation.donor}</td>
                      <td className="py-2 text-secondary font-semibold">${donation.amount}</td>
                      <td className="py-2 text-muted-foreground">{donation.program}</td>
                      <td className="py-2 text-muted-foreground">{donation.date}</td>
                      <td className="py-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Processed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'volunteers':
        return (
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Volunteer Management</h3>
            <p className="text-muted-foreground mb-6">
              Review and manage volunteer applications and assignments.
            </p>
            <div className="space-y-4">
              {recentVolunteers.map((volunteer) => (
                <div key={volunteer.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-card-foreground">{volunteer.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      volunteer.status === 'Approved' 
                        ? 'bg-green-100 text-green-800' 
                        : volunteer.status === 'Pending Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {volunteer.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">Skills: {volunteer.skills}</p>
                  <p className="text-muted-foreground text-sm mb-3">Applied: {volunteer.date}</p>
                  <div className="flex gap-2">
                    <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded-lg text-sm transition-smooth">
                      Review Application
                    </button>
                    <button className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-4 py-2 rounded-lg text-sm transition-smooth">
                      Schedule Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'programs':
        return (
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Program Management</h3>
            <p className="text-muted-foreground mb-6">
              Manage active programs, funding goals, and progress tracking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((program) => (
                <div key={program} className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-card-foreground mb-2">Program {program}</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Funding: 65% complete</p>
                    <p>Beneficiaries: 250+</p>
                    <p>Status: Active</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-3 py-1 rounded text-sm transition-smooth">
                      Edit
                    </button>
                    <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1 rounded text-sm transition-smooth">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'reports':
        return (
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Reports & Analytics</h3>
            <p className="text-muted-foreground mb-6">
              Generate reports and view analytics for organizational decision making.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-card-foreground mb-2">Financial Reports</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Generate comprehensive financial reports for donors and stakeholders.
                </p>
                <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded-lg text-sm transition-smooth">
                  Generate Report
                </button>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-card-foreground mb-2">Impact Analysis</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Analyze program effectiveness and community impact metrics.
                </p>
                <button className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-4 py-2 rounded-lg text-sm transition-smooth">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-gradient-hero py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-white/90">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <button
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 px-6 py-3 rounded-lg font-semibold transition-smooth"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="bg-card rounded-lg shadow-card border border-border mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-smooth whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <TabContent tab={activeTab} />
      </div>
    </div>
  )
}

export default Admin
