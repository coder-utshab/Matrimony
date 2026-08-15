import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiUsers, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['allUsers', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    }
  });

  const handleMakeAdmin = (id, name) => {
    axiosSecure.patch(`/users/admin/${id}`).then(res => {
      if (res.data.modifiedCount > 0) {
        toast.success(`${name} is now an Admin!`);
        refetch();
      }
    });
  };

  const handleMakePremium = (id, name) => {
    axiosSecure.patch(`/users/premium/${id}`).then(res => {
      if (res.data.modifiedCount > 0) {
        toast.success(`${name} is now a Premium member!`);
        refetch();
      }
    });
  };

  const mockUsers = [
    { _id: '1', name: 'Ayesha Rahman', email: 'ayesha@email.com', role: 'user', isPremium: false },
    { _id: '2', name: 'Kabir Ahmed', email: 'kabir@email.com', role: 'user', isPremium: true },
    { _id: '3', name: 'Admin User', email: 'admin@matrimony.com', role: 'admin', isPremium: false },
  ];
  const displayUsers = users.length > 0 ? users : mockUsers;

  return (
    <div>
      <div className="dashboard-title"><FiUsers className="title-icon" /> Manage Users</div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Users ({displayUsers.length})</h3>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="table-search"
              style={{ paddingLeft: '36px' }}
              type="text"
              placeholder="Search by username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Premium</th>
                <th>Make Admin</th>
                <th>Make Premium</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`status-badge ${u.role === 'admin' ? 'status-approved' : 'status-pending'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${u.isPremium ? 'status-approved' : 'status-pending'}`}>
                      {u.isPremium ? 'Premium' : 'Normal'}
                    </span>
                  </td>
                  <td>
                    {u.role === 'admin' ? (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Already Admin</span>
                    ) : (
                      <button className="table-btn table-btn-primary" onClick={() => handleMakeAdmin(u._id, u.name)}>
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    {u.isPremium ? (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Already Premium</span>
                    ) : (
                      <button className="table-btn table-btn-secondary" onClick={() => handleMakePremium(u._id, u.name)}>
                        Make Premium
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

export default ManageUsers;
