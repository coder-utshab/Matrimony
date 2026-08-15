import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import usePremium from '../../hooks/usePremium';
import { FiMapPin, FiBriefcase, FiUser, FiHeart, FiLock, FiPhone, FiMail } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const BiodataDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isPremium] = usePremium();

  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ['biodata', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas/${id}`);
      return res.data;
    }
  });

  // Fetch similar biodatas
  const { data: similarBiodatas = [] } = useQuery({
    queryKey: ['similarBiodatas', biodata.biodataType],
    enabled: !!biodata.biodataType,
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas/similar/${biodata.biodataType}?excludeId=${id}`);
      return res.data;
    }
  });

  // Mock data for when database is empty
  const mockBiodata = {
    biodataId: parseInt(id) || 101,
    biodataType: 'Female',
    name: 'Ayesha Rahman',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    dateOfBirth: '2000-03-15',
    height: '5ft 4in',
    weight: '50-60kg',
    age: 24,
    occupation: 'Software Engineer',
    race: 'Fair',
    fathersName: 'Rahim Rahman',
    mothersName: 'Fatema Begum',
    permanentDivision: 'Dhaka',
    presentDivision: 'Dhaka',
    expectedPartnerAge: 28,
    expectedPartnerHeight: '5ft 8in',
    expectedPartnerWeight: '60-70kg',
    contactEmail: 'ayesha@example.com',
    mobileNumber: '+880 1712-345678',
    isPremium: true,
  };

  const displayBiodata = biodata && biodata.biodataId ? biodata : mockBiodata;

  const handleAddToFavourites = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    axiosSecure.post('/favourites', {
      userEmail: user.email,
      biodataId: displayBiodata.biodataId,
      name: displayBiodata.name,
    }).then(res => {
      if (res.data.insertedId) {
        toast.success('Added to Favourites!');
      } else {
        toast.error('Already in your Favourites!');
      }
    });
  };

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
    </div>
  );

  return (
    <div className="details-page">
      <div className="container">

        <div className="details-card">
          <div className="details-header">
            <div className="details-image">
              <img src={displayBiodata.profileImage} alt={displayBiodata.name} />
            </div>

            <div className="details-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1>{displayBiodata.name}</h1>
                {displayBiodata.isPremium && (
                  <span className="premium-badge" style={{ position: 'static' }}><FaCrown /> Premium</span>
                )}
              </div>
              <span className={`details-type ${displayBiodata.biodataType === 'Male' ? 'badge-male' : 'badge-female'}`}>
                {displayBiodata.biodataType} | Biodata ID: {displayBiodata.biodataId}
              </span>

              <div className="details-grid" style={{ marginTop: '20px' }}>
                <div className="detail-item">
                  <span className="detail-label">Age</span>
                  <span className="detail-value">{displayBiodata.age} Years</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Occupation</span>
                  <span className="detail-value">{displayBiodata.occupation}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Height</span>
                  <span className="detail-value">{displayBiodata.height}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Weight</span>
                  <span className="detail-value">{displayBiodata.weight}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Race</span>
                  <span className="detail-value">{displayBiodata.race}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">{displayBiodata.dateOfBirth}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Father's Name</span>
                  <span className="detail-value">{displayBiodata.fathersName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mother's Name</span>
                  <span className="detail-value">{displayBiodata.mothersName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Permanent Division</span>
                  <span className="detail-value">{displayBiodata.permanentDivision}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Present Division</span>
                  <span className="detail-value">{displayBiodata.presentDivision}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Expected Partner Age</span>
                  <span className="detail-value">{displayBiodata.expectedPartnerAge} Years</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Expected Partner Height</span>
                  <span className="detail-value">{displayBiodata.expectedPartnerHeight}</span>
                </div>
              </div>

              {/* Contact Info — only for premium members */}
              {isPremium ? (
                <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,200,83,0.07)', border: '1px solid rgba(0,200,83,0.2)', borderRadius: '12px' }}>
                  <p style={{ color: '#00C853', fontWeight: '600', marginBottom: '10px' }}>✓ Premium Member — Contact Info Unlocked</p>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                      <FiPhone style={{ color: 'var(--primary)' }} /> {displayBiodata.mobileNumber}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                      <FiMail style={{ color: 'var(--primary)' }} /> {displayBiodata.contactEmail}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="contact-locked">
                  <FiLock />
                  <span>Contact info is locked. Upgrade to Premium or request access below.</span>
                </div>
              )}

              <div className="details-actions">
                <button onClick={handleAddToFavourites} className="btn-secondary">
                  <FiHeart /> Add to Favourites
                </button>
                {!isPremium && (
                  <Link to={`/checkout/${displayBiodata.biodataId}`} className="btn-primary">
                    Request Contact Info ($5)
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Biodatas */}
        {similarBiodatas.length > 0 && (
          <div className="similar-section">
            <div className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Similar Profiles</h2>
            </div>
            <div className="similar-grid">
              {similarBiodatas.map(b => (
                <div key={b.biodataId} className="biodata-card">
                  <div className="card-image">
                    <img src={b.profileImage} alt={b.name} />
                    <span className={`card-badge ${b.biodataType === 'Male' ? 'badge-male' : 'badge-female'}`}>{b.biodataType}</span>
                    <span className="card-id">ID: {b.biodataId}</span>
                  </div>
                  <div className="card-body">
                    <h3>{b.name}</h3>
                    <div className="card-info">
                      <div className="card-info-item"><FiUser className="icon" /><span>Age: <strong>{b.age}</strong></span></div>
                      <div className="card-info-item"><FiBriefcase className="icon" /><span>{b.occupation}</span></div>
                      <div className="card-info-item"><FiMapPin className="icon" /><span>{b.permanentDivision}</span></div>
                    </div>
                    <Link to={`/biodata/${b.biodataId}`} className="card-btn">View Profile</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiodataDetails;
