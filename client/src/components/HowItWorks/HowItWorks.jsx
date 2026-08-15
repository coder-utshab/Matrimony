import { FiUserPlus, FiSearch, FiMessageCircle, FiHeart } from 'react-icons/fi';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-title">
          <span>Process</span>
          <h2>How It Works</h2>
          <p>Finding your life partner is easy and secure with our 4-step process.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">
              <FiUserPlus className="step-icon" style={{ marginBottom: 0 }} />
            </div>
            <h3>Create Profile</h3>
            <p>Register for free and setup your complete matrimony profile with details.</p>
          </div>

          <div className="step-card">
            <div className="step-number">
              <FiSearch className="step-icon" style={{ marginBottom: 0 }} />
            </div>
            <h3>Find Match</h3>
            <p>Search through thousands of verified profiles using advanced filters.</p>
          </div>

          <div className="step-card">
            <div className="step-number">
              <FiMessageCircle className="step-icon" style={{ marginBottom: 0 }} />
            </div>
            <h3>Connect</h3>
            <p>Send contact requests or upgrade to premium to view contact details.</p>
          </div>

          <div className="step-card">
            <div className="step-number">
              <FiHeart className="step-icon" style={{ marginBottom: 0 }} />
            </div>
            <h3>Get Married</h3>
            <p>Meet your perfect partner, tie the knot, and share your success story.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
