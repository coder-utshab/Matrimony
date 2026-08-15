import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['allContactRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/contact-requests/admin');
      return res.data;
    }
  });

  const handleApprove = (id) => {
    axiosSecure.patch(`/contact-requests/approve/${id}`).then(res => {
      if (res.data.modifiedCount > 0) {
        toast.success('Contact request approved!');
        refetch();
      }
    });
  };

  const mockRequests = [
    { _id: '1', requesterName: 'Tanvir Hasan', requesterEmail: 'tanvir@email.com', biodataId: 101, status: 'pending', biodata: { name: 'Ayesha Rahman' } },
    { _id: '2', requesterName: 'Imran Khan', requesterEmail: 'imran@email.com', biodataId: 105, status: 'approved', biodata: { name: 'Nusrat Jahan' } },
  ];
  const displayRequests = requests.length > 0 ? requests : mockRequests;

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>;

  return (
    <div>
      <div className="dashboard-title"><FiCheckCircle className="title-icon" /> Approve Contact Requests</div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Contact Requests ({displayRequests.length})</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Requester Name</th>
                <th>Requester Email</th>
                <th>Biodata ID</th>
                <th>Profile Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayRequests.map((req, i) => (
                <tr key={req._id}>
                  <td>{i + 1}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{req.requesterName}</td>
                  <td>{req.requesterEmail}</td>
                  <td>#{req.biodataId}</td>
                  <td>{req.biodata?.name || '—'}</td>
                  <td>
                    <span className={`status-badge ${req.status === 'approved' ? 'status-approved' : 'status-pending'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'approved' ? (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Approved ✓</span>
                    ) : (
                      <button className="table-btn table-btn-success" onClick={() => handleApprove(req._id)}>
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovedContactRequest;
