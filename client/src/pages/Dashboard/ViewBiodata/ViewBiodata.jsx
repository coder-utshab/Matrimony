import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEye } from 'react-icons/fi';
import { FiUser, FiBriefcase, FiMapPin, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ['myBiodata', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/email/${user.email}`);
      return res.data;
    }
  });

  const handleMakePremium = () => {
    Swal.fire({
      title: 'Make Biodata Premium?',
      text: 'Your request will be sent to the admin for approval.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Request Premium!',
      cancelButtonText: 'Cancel',
      background: '#12121F',
      color: '#F0F0F5',
      confirmButtonColor: '#E8366D',
      cancelButtonColor: '#6C63FF',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/premium-requests', {
          userEmail: user.email,
          name: biodata.name,
          biodataId: biodata.biodataId,
        }).then(res => {
          if (res.data.insertedId) {
            toast.success('Premium request sent to admin!');
          } else {
            toast('You already have a pending request.', { icon: 'ℹ️' });
          }
        });
      }
    });
  };

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>;

  if (!biodata || !biodata.biodataId) {
    return (
      <div>
        <div className="dashboard-title"><FiEye className="title-icon" /> My Biodata</div>
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--gradient-card)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>You haven't created a biodata yet.</p>
          <a href="/dashboard/edit-biodata" className="btn-primary">Create Biodata Now</a>
        </div>
      </div>
    );
  }

  const fields = [
    { label: 'Biodata ID', value: `#${biodata.biodataId}` },
    { label: 'Biodata Type', value: biodata.biodataType },
    { label: 'Date of Birth', value: biodata.dateOfBirth },
    { label: 'Age', value: `${biodata.age} Years` },
    { label: 'Height', value: biodata.height },
    { label: 'Weight', value: biodata.weight },
    { label: 'Occupation', value: biodata.occupation },
    { label: 'Race', value: biodata.race },
    { label: "Father's Name", value: biodata.fathersName },
    { label: "Mother's Name", value: biodata.mothersName },
    { label: 'Permanent Division', value: biodata.permanentDivision },
    { label: 'Present Division', value: biodata.presentDivision },
    { label: 'Expected Partner Age', value: `${biodata.expectedPartnerAge} Years` },
    { label: 'Expected Partner Height', value: biodata.expectedPartnerHeight },
    { label: 'Expected Partner Weight', value: biodata.expectedPartnerWeight },
    { label: 'Contact Email', value: biodata.contactEmail },
    { label: 'Mobile Number', value: biodata.mobileNumber },
  ];

  return (
    <div>
      <div className="dashboard-title"><FiEye className="title-icon" /> My Biodata</div>

      <div className="view-biodata">
        <div className="view-biodata-header">
          <img src={biodata.profileImage || user?.photoURL || 'https://i.ibb.co/ZYW3VTp/avatar.png'} alt={biodata.name} />
          <div>
            <h2>{biodata.name}</h2>
            <span className={`biodata-type-badge ${biodata.biodataType === 'Male' ? 'badge-male' : 'badge-female'}`}>
              {biodata.biodataType}
            </span>
            {biodata.isPremium && (
              <span className="premium-badge" style={{ position: 'static', marginLeft: '8px' }}><FaCrown /> Premium</span>
            )}
          </div>
        </div>

        <div className="view-info-grid">
          {fields.map((field) => (
            <div key={field.label} className="view-info-item">
              <div className="info-label">{field.label}</div>
              <div className="info-value">{field.value || '—'}</div>
            </div>
          ))}
        </div>

        {!biodata.isPremium && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleMakePremium} className="btn-primary">
              <FaCrown style={{ marginRight: '8px' }} /> Make Biodata Premium
            </button>
          </div>
        )}
        {biodata.isPremium && (
          <div style={{ marginTop: '20px', padding: '14px 20px', background: 'rgba(255,184,0,0.08)', border: '1px solid rgba(255,184,0,0.2)', borderRadius: '10px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaCrown /> Your biodata is a Premium profile!
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBiodata;
