import { FiHeart, FiUsers, FiShield, FiStar, FiMessageCircle } from 'react-icons/fi';

const AboutUs = () => {
  const values = [
    { icon: '🛡️', title: 'Privacy First', desc: 'Your personal information is always safe and only shared with your permission.' },
    { icon: '✅', title: 'Verified Profiles', desc: 'Every profile goes through a manual verification process for authenticity.' },
    { icon: '💞', title: 'Serious Matchmaking', desc: 'We focus on long-term relationships and helping people find life partners.' },
    { icon: '🌍', title: 'Nationwide Coverage', desc: 'Connect with potential matches across all 7 divisions of Bangladesh.' },
    { icon: '📱', title: '24/7 Support', desc: 'Our dedicated support team is always available to assist you.' },
    { icon: '🎯', title: 'Smart Matching', desc: 'Our smart filters help you narrow down the most compatible profiles.' },
  ];

  const team = [
    { name: 'Dr. Rahman Ali', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
    { name: 'Fatema Begum', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Kabir Hossain', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="banner-tag" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>
            <span>About Our Platform</span>
          </div>
          <h1>Connecting Hearts,<br />Building Families</h1>
          <p>Matrimony is Bangladesh's most trusted online matrimony platform, helping thousands of families find their perfect match since 2018.</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          {/* Story Section */}
          <div className="about-grid" style={{ marginBottom: '80px' }}>
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Matrimony was founded with one simple mission — to make the search for a life partner easier, safer, and more meaningful for Bangladeshi families. We understand that finding the right match is one of the most important decisions in life.
              </p>
              <p>
                Since our founding, we have helped over <strong style={{ color: 'var(--primary)' }}>1,250+</strong> individuals create biodatas and facilitated <strong style={{ color: 'var(--primary)' }}>145+</strong> successful marriages. Our platform bridges the gap between tradition and technology.
              </p>
              <p>
                We believe that every person deserves to find love and companionship, and our platform provides the tools, privacy, and security to make that journey comfortable and joyful.
              </p>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" alt="Wedding" />
            </div>
          </div>

          {/* Values Grid */}
          <div className="section-title">
            <span>Why Choose Us</span>
            <h2>Our Core Values</h2>
            <p>We are built on trust, transparency, and a genuine desire to help people find happiness.</p>
          </div>
          <div className="values-grid" style={{ marginBottom: '80px' }}>
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="section-title">
            <span>The People Behind</span>
            <h2>Meet Our Team</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {team.map((member, i) => (
              <div key={i} className="value-card" style={{ textAlign: 'center' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid var(--primary)' }}
                />
                <h3 style={{ marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '600' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
