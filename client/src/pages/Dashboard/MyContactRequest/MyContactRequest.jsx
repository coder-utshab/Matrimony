import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiMail, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyContactRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['myContactRequests', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contact-requests?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Request?',
      text: 'Are you sure you want to delete this contact request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      background: '#12121F',
      color: '#F0F0F5',
      confirmButtonColor: '#E8366D',
      cancelButtonColor: '#6C63FF',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contact-requests/${id}`).then(() => {
          toast.success('Request deleted successfully!');
          refetch();
        });
      }
    });
  };

  // Mock data
  const mockRequests = [
    { _id: '1', biodataId: 101, status: 'approved', biodata: { name: 'Ayesha Rahman', mobileNumber: '+880 1712-345678', contactEmail: 'ayesha@email.com' } },
    { _id: '2', biodataId: 102, status: 'pending', biodata: { name: 'Kabir Ahmed', mobileNumber: '+880 1812-987654', contactEmail: 'kabir@email.com' } },
  ];
  const displayRequests = requests.length > 0 ? requests : mockRequests;

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>;

  return (
    <div>
      <div className="dashboard-title"><FiMail className="title-icon" /> My Contact Requests</div>

      <div className="table-container">
        <div className="table-header">
          <h3>Requested Contacts ({displayRequests.length})</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Biodata ID</th>
                <th>Status</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayRequests.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No contact requests yet.</td></tr>
              ) : (
                displayRequests.map((req, index) => (
                  <tr key={req._id}>
                    <td>{index + 1}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{req.biodata?.name || '—'}</td>
                    <td>#{req.biodataId}</td>
                    <td>
                      <span className={`status-badge ${req.status === 'approved' ? 'status-approved' : 'status-pending'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>{req.status === 'approved' ? req.biodata?.mobileNumber : <span style={{ color: 'var(--text-muted)' }}>🔒 Pending</span>}</td>
                    <td>{req.status === 'approved' ? req.biodata?.contactEmail : <span style={{ color: 'var(--text-muted)' }}>🔒 Pending</span>}</td>
                    <td>
                      <button className="table-btn table-btn-danger" onClick={() => handleDelete(req._id)}>
                        <FiTrash2 />
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

export default MyContactRequest;
