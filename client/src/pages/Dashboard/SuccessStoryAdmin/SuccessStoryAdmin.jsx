import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const SuccessStoryAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['adminSuccessStories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/success-stories');
      return res.data;
    }
  });

  const mockStories = [
    { _id: '1', selfBiodataId: 101, partnerBiodataId: 102, marriageDate: '2024-02-14', reviewStar: 5, successStory: 'We found each other on Matrimony and it was love at first sight!', coupleImage: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=400&q=80' },
    { _id: '2', selfBiodataId: 103, partnerBiodataId: 104, marriageDate: '2023-11-20', reviewStar: 4, successStory: 'Thank you Matrimony for this beautiful journey. Highly recommended!', coupleImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80' },
  ];
  const displayStories = stories.length > 0 ? stories : mockStories;

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>;

  return (
    <div>
      <div className="dashboard-title"><FiStar className="title-icon" /> Success Stories</div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Success Stories ({displayStories.length})</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Male Biodata ID</th>
                <th>Female Biodata ID</th>
                <th>Marriage Date</th>
                <th>Stars</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayStories.map((story, i) => (
                <tr key={story._id}>
                  <td>{i + 1}</td>
                  <td>#{story.selfBiodataId}</td>
                  <td>#{story.partnerBiodataId}</td>
                  <td>{new Date(story.marriageDate).toLocaleDateString()}</td>
                  <td style={{ color: 'var(--accent)' }}>{'★'.repeat(story.reviewStar)}</td>
                  <td>
                    <button className="table-btn table-btn-secondary" onClick={() => setSelectedStory(story)}>
                      View Story
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedStory && (
        <div className="modal-overlay" onClick={() => setSelectedStory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={selectedStory.coupleImage}
                alt="Couple"
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', margin: '0 auto 12px' }}
              />
              <div style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>
                {'★'.repeat(selectedStory.reviewStar)}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Married on: {new Date(selectedStory.marriageDate).toLocaleDateString()}
              </p>
            </div>
            <h3 style={{ marginBottom: '12px' }}>Biodata #{selectedStory.selfBiodataId} & #{selectedStory.partnerBiodataId}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontStyle: 'italic', borderLeft: '3px solid var(--primary)', paddingLeft: '16px' }}>
              "{selectedStory.successStory}"
            </p>
            <div className="modal-actions" style={{ marginTop: '24px' }}>
              <button className="btn-primary" onClick={() => setSelectedStory(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStoryAdmin;
