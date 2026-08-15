import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FiMapPin, FiBriefcase, FiUser } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const PremiumCards = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetching premium biodatas
  const { data: premiumBiodatas = [], isLoading, isError } = useQuery({
    queryKey: ['premiumBiodatas'],
    queryFn: async () => {
      const res = await axiosPublic.get('/biodatas/premium', { timeout: 3000 });
      return res.data;
    },
    retry: 1
  });

  // Mock data for preview if database is empty/not connected
  const mockData = [
    { biodataId: 101, biodataType: 'Female', name: 'Ayesha Rahman', age: 24, occupation: 'Software Engineer', permanentDivision: 'Dhaka', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isPremium: true },
    { biodataId: 102, biodataType: 'Male', name: 'Kabir Ahmed', age: 28, occupation: 'Doctor', permanentDivision: 'Chattagram', profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isPremium: true },
    { biodataId: 103, biodataType: 'Female', name: 'Sadia Islam', age: 26, occupation: 'Teacher', permanentDivision: 'Sylhet', profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isPremium: true },
    { biodataId: 104, biodataType: 'Male', name: 'Tanvir Hasan', age: 30, occupation: 'Businessman', permanentDivision: 'Khulna', profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isPremium: true },
    { biodataId: 105, biodataType: 'Female', name: 'Nusrat Jahan', age: 23, occupation: 'Student', permanentDivision: 'Rajshahi', profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isPremium: true },
    { biodataId: 106, biodataType: 'Male', name: 'Imran Khan', age: 32, occupation: 'Architect', permanentDivision: 'Barisal', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isPremium: true },
  ];

  const displayData = premiumBiodatas.length > 0 ? premiumBiodatas : mockData;

  // Sorting logic based on age
  const sortedData = [...displayData].sort((a, b) => {
    if (sortOrder === 'asc') return a.age - b.age;
    return b.age - a.age;
  });

  return (
    <section className="premium-section">
      <div className="container">
        <div className="section-title">
          <span>Featured Profiles</span>
          <h2>Premium Members</h2>
          <p>Discover our verified premium members who are actively looking for their perfect life partner.</p>
        </div>

        <div className="premium-sort">
          <select 
            className="sort-select" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Age (Ascending)</option>
            <option value="desc">Sort by Age (Descending)</option>
          </select>
        </div>

        {isLoading ? (
          <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>
        ) : (
          <div className="premium-grid">
            {sortedData.slice(0, 6).map((biodata) => (
              <div key={biodata.biodataId} className="biodata-card">
                <div className="card-image">
                  <img src={biodata.profileImage} alt="Profile" />
                  <span className={`card-badge ${biodata.biodataType === 'Male' ? 'badge-male' : 'badge-female'}`}>
                    {biodata.biodataType}
                  </span>
                  <span className="card-id">ID: {biodata.biodataId}</span>
                  {biodata.isPremium && (
                    <span className="premium-badge"><FaCrown /> Premium</span>
                  )}
                </div>
                
                <div className="card-body">
                  <h3>{biodata.name || 'Member'}</h3>
                  <div className="card-info">
                    <div className="card-info-item">
                      <FiUser className="icon" />
                      <span>Age: <strong>{biodata.age} Years</strong></span>
                    </div>
                    <div className="card-info-item">
                      <FiBriefcase className="icon" />
                      <span>Occupation: <strong>{biodata.occupation}</strong></span>
                    </div>
                    <div className="card-info-item">
                      <FiMapPin className="icon" />
                      <span>Division: <strong>{biodata.permanentDivision}</strong></span>
                    </div>
                  </div>
                  <Link to={`/biodata/${biodata.biodataId}`} className="card-btn">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PremiumCards;
