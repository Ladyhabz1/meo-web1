import React from 'react'

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
  ]

  const values = [
    {
      title: 'Equality',
      description: 'We believe in equal opportunities for all, regardless of background, ethnicity, or gender.',
      icon: '⚖️'
    },
    {
      title: 'Community',
      description: 'We work hand-in-hand with local communities to create sustainable solutions.',
      icon: '🤝'
    },
    {
      title: 'Transparency',
      description: 'We maintain open communication and accountability in all our operations.',
      icon: '🔍'
    },
    {
      title: 'Innovation',
      description: 'We embrace creative approaches to solve complex community challenges.',
      icon: '💡'
    },
    {
      title: 'Sustainability',
      description: 'We focus on long-term solutions that communities can maintain and grow.',
      icon: '🌱'
    },
    {
      title: 'Respect',
      description: 'We honor local cultures, traditions, and the wisdom of community members.',
      icon: '🙏'
    }
  ]

  return (
    <div className="py-20">
      {/* Header Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About Moyale Equality Organization
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Building bridges across communities, creating opportunities for sustainable development, 
            and fostering equality in the Moyale region since 2016.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Mission */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-primary-foreground">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To promote equality, foster community development, and create sustainable opportunities 
                for growth in the Moyale region by bridging cultural divides and empowering local communities.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-secondary-foreground">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A thriving Moyale region where all communities have equal access to education, clean water, 
                economic opportunities, and where cultural diversity is celebrated as a source of strength.
              </p>
            </div>

            {/* Impact */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-accent-foreground">💫</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Impact</h3>
              <p className="text-muted-foreground leading-relaxed">
                Since 2016, we've impacted over 2,500 lives through 15 active programs, built lasting 
                partnerships with 50+ community organizations, and created sustainable change.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 shadow-card hover:shadow-lifted transition-smooth border border-border"
                >
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-3">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our dedicated team brings together diverse expertise and deep community knowledge 
              to drive meaningful change in the Moyale region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-lifted transition-smooth transform hover:-translate-y-1"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-card-foreground mb-2">{member.name}</h4>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  2016
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-foreground mb-3">Foundation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Moyale Equality Organization was founded by a group of passionate community leaders 
                  who recognized the need for cross-border collaboration to address shared challenges 
                  in education, water access, and economic development.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-2xl font-bold">
                  2018
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-foreground mb-3">First Programs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Launched our first education support program, providing school supplies and 
                  scholarships to 100 children. Also initiated the clean water project that 
                  has since provided access to clean water for over 1,000 people.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-2xl font-bold">
                  2024
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-foreground mb-3">Expanding Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we operate 15 active programs, have impacted over 2,500 lives, and continue 
                  to grow our community partnerships. Our focus remains on sustainable, community-led 
                  development that creates lasting change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About