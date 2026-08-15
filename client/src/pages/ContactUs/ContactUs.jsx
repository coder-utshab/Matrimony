import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      e.target.reset();
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: <FiMapPin />, title: 'Our Address', info: '123 Wedding Avenue, Gulshan, Dhaka — 1212, Bangladesh', color: 'var(--primary)' },
    { icon: <FiPhone />, title: 'Phone Number', info: '+880 1234-567890', color: 'var(--secondary)' },
    { icon: <FiMail />, title: 'Email Address', info: 'support@matrimony.com', color: 'var(--accent)' },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="banner-tag" style={{ display: 'inline-flex', margin: '0 auto 20px' }}>
            <span>Get In Touch</span>
          </div>
          <h1>We'd Love To<br />Hear From You</h1>
          <p>Have questions about our platform? Want to report an issue? We're here to help you 24/7.</p>
        </div>
      </div>

      <div className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form">
              <h2 style={{ marginBottom: '6px' }}>Send Us a Message</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="What is this about?" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '0.95rem', resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
                  <FiSend style={{ marginRight: '8px' }} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="contact-info-cards">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-info-card">
                  <div className="info-icon" style={{ background: `${item.color}18`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.info}</p>
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div style={{
                background: 'var(--gradient-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '30px',
                textAlign: 'center',
                flex: 1
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🗺️</div>
                <h4>Office Hours</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
                  Sunday – Thursday<br />
                  <strong style={{ color: 'var(--text-primary)' }}>9:00 AM – 6:00 PM</strong>
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '12px' }}>
                  Friday – Saturday<br />
                  <strong style={{ color: 'var(--text-primary)' }}>Closed</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
