import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FiMapPin, FiBriefcase, FiUser, FiFilter } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const Biodatas = () => {
  const axiosPublic = useAxiosPublic();
  
  // Filters state
  const [filters, setFilters] = useState({
    biodataType: '',
    division: '',
    ageMin: '',
    ageMax: ''
  });
  
  const [page, setPage] = useState(1);
  const limit = 20;

  // Fetching biodatas with filters
  const { data, isLoading } = useQuery({
    queryKey: ['biodatas', filters, page],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      
      const res = await axiosPublic.get(`/biodatas?${queryParams}`);
      return res.data;
    }
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setPage(1); // Reset to first page on filter change
  };

  const handleResetFilters = () => {
    setFilters({
      biodataType: '',
      division: '',
      ageMin: '',
      ageMax: ''
    });
    setPage(1);
  };

  // Mock data for preview
  const mockData = Array.from({ length: 12 }).map((_, i) => ({
    biodataId: 200 + i,
    biodataType: i % 2 === 0 ? 'Female' : 'Male',
    name: i % 2 === 0 ? 'Female Name' : 'Male Name',
    age: 22 + (i % 10),
    occupation: ['Engineer', 'Doctor', 'Teacher', 'Business', 'Student'][i % 5],
    permanentDivision: ['Dhaka', 'Chattagram', 'Sylhet', 'Rajshahi'][i % 4],
    profileImage: i % 2 === 0 
      ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' 
      : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    isPremium: i % 4 === 0
  }));

  const biodatasList = data?.biodatas?.length > 0 ? data.biodatas : mockData;
  const totalPages = data?.totalPages || 5; // Default to 5 for mock visualization

  return (
    <div className="biodatas-page">
      <div className="container">
        <div className="section-title">
          <span>Search</span>
          <h2>Find Your Match</h2>
          <p>Use our advanced filters to find profiles that match your preferences perfectly.</p>
        </div>

        <div className="biodatas-layout">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar">
            <h3><FiFilter /> Filter Profiles</h3>
            
            <div className="filter-group">
              <label>Biodata Type</label>
              <select name="biodataType" value={filters.biodataType} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Division</label>
              <select name="division" value={filters.division} onChange={handleFilterChange}>
                <option value="">All Divisions</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Maymansign">Maymansign</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Age Range</label>
              <div className="range-inputs">
                <input 
                  type="number" 
                  name="ageMin" 
                  placeholder="Min" 
                  value={filters.ageMin}
                  onChange={handleFilterChange}
                  min="18"
                />
                <input 
                  type="number" 
                  name="ageMax" 
                  placeholder="Max" 
                  value={filters.ageMax}
                  onChange={handleFilterChange}
                  max="80"
                />
              </div>
            </div>

            <button className="filter-reset" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </aside>

          {/* Main Content Area */}
          <div className="biodatas-content">
            {isLoading ? (
              <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>
            ) : (
              <>
                <div className="biodatas-grid">
                  {biodatasList.map((biodata) => (
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

                {/* Pagination */}
                {biodatasList.length > 0 && (
                  <div className="pagination">
                    <button 
                      disabled={page === 1} 
                      onClick={() => setPage(page - 1)}
                    >
                      Prev
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button 
                        key={index} 
                        className={page === index + 1 ? 'active' : ''}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button 
                      disabled={page === totalPages} 
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
                
                {biodatasList.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                    <p>No profiles found matching your filters.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
