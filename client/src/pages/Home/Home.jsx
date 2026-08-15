import Banner from '../../components/Banner/Banner';

const Home = () => {
  return (
    <div>
      <Banner />
      
      {/* Placeholder for other sections */}
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Premium Members</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Our top premium member profiles</p>
        <div style={{ padding: '40px', background: 'var(--gradient-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
           Component Coming Soon
        </div>
      </div>

      <div className="how-it-works" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div className="container">
          <h2>How It Works</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Get started in 4 easy steps</p>
          <div style={{ padding: '40px', background: 'var(--gradient-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            Component Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
