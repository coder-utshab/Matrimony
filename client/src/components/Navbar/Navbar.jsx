import { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logOut().then(() => {}).catch(err => console.log(err));
  };

  const navLinks = (
    <>
      <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
      <NavLink to="/biodatas" onClick={() => setIsMobileMenuOpen(false)}>Biodatas</NavLink>
      <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
      <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</NavLink>
      {user && <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>}
    </>
  );

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">M</div>
          <span className="logo-text">Matrimony</span>
        </Link>

        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks}
          {!user ? (
            <Link to="/login" className="nav-btn" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          ) : (
            <div className="nav-user">
              <img 
                src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/avatar.png"} 
                alt="User Avatar" 
                className="nav-user-img" 
                title={user?.displayName}
              />
              <button onClick={handleLogout} className="btn-secondary" style={{padding: '8px 16px', fontSize: '0.85rem'}}>Logout</button>
            </div>
          )}
        </div>

        <div 
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
