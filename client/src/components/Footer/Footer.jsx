import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="nav-logo" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <div className="logo-icon">M</div>
              <span className="logo-text">Matrimony</span>
            </Link>
            <p>
              We are dedicated to helping you find your perfect life partner. With thousands of verified profiles, your search for true love is secure, private, and successful.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/biodatas">Biodatas</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><Link to="#">Terms of Service</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Cookie Policy</Link></li>
              <li><Link to="#">Refund Policy</Link></li>
              <li><Link to="#">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <FiMapPin style={{ color: 'var(--primary)', marginTop: '4px' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  123 Wedding Avenue, Love City, BD 12345
                </span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FiPhone style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  +880 1234-567890
                </span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FiMail style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  support@matrimony.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Matrimony Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
