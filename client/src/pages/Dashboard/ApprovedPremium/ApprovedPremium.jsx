import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['premiumRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/premium-requests');
      return res.data;
    }
  });

  const handleApprove = (id, name) => {
    axiosSecure.patch(`/premium-requests/approve/${id}`).then(res => {
      if (res.data.modifiedCount > 0) {
        toast.success(`${name}'s biodata is now Premium!`);
        refetch();
      }
    });
  };

  const mockRequests = [
    { _id: '1', name: 'Ayesha Rahman', userEmail: 'ayesha@email.com', biodataId: 101, status: 'pending' },
    { _id: '2', name: 'Nusrat Jahan', userEmail: 'nusrat@email.com', biodataId: 105, status: 'pending' },
  ];
  const displayRequests = requests.length > 0 ? requests : mockRequests;

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>;

  return (
    <div>
      <div className="dashboard-title"><FiShield className="title-icon" /> Approve Premium Requests</div>

      <div className="table-container">
        <div className="table-header">
          <h3>Pending Premium Requests ({displayRequests.length})</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Biodata ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayRequests.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No pending premium requests.</td></tr>
              ) : (
                displayRequests.map((req, i) => (
                  <tr key={req._id}>
                    <td>{i + 1}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{req.name}</td>
                    <td>{req.userEmail}</td>
                    <td>#{req.biodataId}</td>
                    <td>
                      <button className="table-btn table-btn-primary" onClick={() => handleApprove(req._id, req.name)}>
                        Make Premium
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovedPremium;
