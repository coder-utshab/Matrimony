import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiHeart, FiTrash2, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const FavouritesBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: favourites = [], isLoading, refetch } = useQuery({
    queryKey: ['myFavourites', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favourites?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Remove from Favourites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove!',
      background: '#12121F',
      color: '#F0F0F5',
      confirmButtonColor: '#E8366D',
      cancelButtonColor: '#6C63FF',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/favourites/${id}`).then(() => {
          toast.success('Removed from Favourites!');
          refetch();
        });
      }
    });
  };

  const mockFavourites = [
    { _id: '1', biodataId: 101, biodata: { name: 'Ayesha Rahman', permanentDivision: 'Dhaka', occupation: 'Engineer' } },
    { _id: '2', biodataId: 105, biodata: { name: 'Nusrat Jahan', permanentDivision: 'Sylhet', occupation: 'Student' } },
  ];
  const displayFavourites = favourites.length > 0 ? favourites : mockFavourites;

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>;

  return (
    <div>
      <div className="dashboard-title"><FiHeart className="title-icon" /> My Favourite Biodatas</div>

      <div className="table-container">
        <div className="table-header">
          <h3>Saved Profiles ({displayFavourites.length})</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Biodata ID</th>
                <th>Permanent Division</th>
                <th>Occupation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayFavourites.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No favourites yet.</td></tr>
              ) : (
                displayFavourites.map((fav, index) => (
                  <tr key={fav._id}>
                    <td>{index + 1}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{fav.biodata?.name || '—'}</td>
                    <td>#{fav.biodataId}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiMapPin style={{ color: 'var(--primary)' }} /> {fav.biodata?.permanentDivision || '—'}
                      </span>
                    </td>
                    <td>{fav.biodata?.occupation || '—'}</td>
                    <td>
                      <button className="table-btn table-btn-danger" onClick={() => handleDelete(fav._id)}>
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

export default FavouritesBiodata;
