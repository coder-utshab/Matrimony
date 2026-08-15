import { useState, useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const GotMarried = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const story = {
      selfBiodataId: parseInt(form.selfBiodataId.value),
      partnerBiodataId: parseInt(form.partnerBiodataId.value),
      coupleImage: form.coupleImage.value,
      marriageDate: form.marriageDate.value,
      reviewStar: stars,
      successStory: form.successStory.value,
      userEmail: user.email,
    };

    axiosSecure.post('/success-stories', story)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('Success story submitted! Thank you 💕');
          form.reset();
          setStars(5);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to submit. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="dashboard-title" style={{ marginBottom: '8px' }}>
        💕 Got Married
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Found your partner through Matrimony? Share your love story with the community!
      </p>

      <div className="edit-biodata-form got-married-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Your Biodata ID *</label>
              <input type="number" name="selfBiodataId" placeholder="e.g. 101" required />
            </div>

            <div className="form-group">
              <label>Partner's Biodata ID *</label>
              <input type="number" name="partnerBiodataId" placeholder="e.g. 102" required />
            </div>

            <div className="form-group full-width">
              <label>Couple Image URL *</label>
              <input type="url" name="coupleImage" placeholder="https://example.com/couple.jpg" required />
            </div>

            <div className="form-group">
              <label>Marriage Date *</label>
              <input type="date" name="marriageDate" required />
            </div>

            <div className="form-group">
              <label>Review Stars</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStars(star)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '1.6rem',
                      color: star <= stars ? 'var(--accent)' : 'var(--text-muted)',
                      transition: 'transform 0.1s',
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Your Success Story *</label>
              <textarea
                name="successStory"
                rows="5"
                placeholder="Tell us how you found your perfect partner through Matrimony..."
                required
                style={{ resize: 'vertical', width: '100%', padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : '💕 Share Our Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GotMarried;
