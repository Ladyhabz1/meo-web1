import React from 'react'

const About = () => {
  const teamMembers = [
    {
      name: 'Habiba Hassan Guyo',
      role: 'Founder and Program Director',
      bio: 'With over 15 years in community development, Habiba Guyo leads our mission with passion and expertise.',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name: 'Hawa Hassan',
      role: 'Secretary',
      bio: 'Hawa coordinates communications, maintains records, and ensuring smooth administrative operations of the program.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Yedo Gale',
      role: 'Community Outreach Manager',
      bio: 'Yedo builds bridges between communities and coordinates our volunteer programs.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Yasmeen Ali',
      role: 'Finance & Operations',
      bio: 'Yasmeen ensures transparent financial management and efficient program operations.',
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
            Fostering equality in the Moyale region and beyond since 2022, building bridges across communities and creating equal opportunities for sustainable development
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
                A thriving North Eastern region where all communities have equal access to education, clean water, 
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
                Since 2022, we've impacted over 2,500 lives through 15 active programs, built lasting 
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
              to drive meaningful change in the Moyale aand north eastern region at large.
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
                  2012
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-foreground mb-3">Foundation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Moyale Equality Organization was founded by Habiba Hassan, who is passionate about empowering girls to pursue education and achieve success in any field of their choice, because passion, not gender, defines opportunity. 
                  She also recognized the importance of cross-border collaboration to tackle shared challenges in education, water access, and economic development.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-2xl font-bold">
                  2023
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-foreground mb-3">First Programs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Launched our first education support program, providing school supplies and 
                  scholarships to 30 students. Also initiated the clean water project that 
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