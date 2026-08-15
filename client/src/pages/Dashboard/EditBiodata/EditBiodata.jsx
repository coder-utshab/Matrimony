import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/biodatas/email/${user.email}`)
        .then(res => {
          if (res.data && Object.keys(res.data).length > 0) {
            setInitialData(res.data);
          }
        });
    }
  }, [user, axiosSecure]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const biodata = {
      biodataType: form.biodataType.value,
      name: form.name.value,
      profileImage: form.profileImage.value,
      dateOfBirth: form.dateOfBirth.value,
      height: form.height.value,
      weight: form.weight.value,
      age: parseInt(form.age.value),
      occupation: form.occupation.value,
      race: form.race.value,
      fathersName: form.fathersName.value,
      mothersName: form.mothersName.value,
      permanentDivision: form.permanentDivision.value,
      presentDivision: form.presentDivision.value,
      expectedPartnerAge: parseInt(form.expectedPartnerAge.value),
      expectedPartnerHeight: form.expectedPartnerHeight.value,
      expectedPartnerWeight: form.expectedPartnerWeight.value,
      contactEmail: user.email,
      mobileNumber: form.mobileNumber.value,
      userEmail: user.email
    };

    axiosSecure.put(`/biodatas/${user.email}`, biodata)
      .then(res => {
        toast.success('Biodata Saved & Published Successfully!');
        setLoading(false);
      })
      .catch(err => {
        toast.error('Failed to save biodata');
        setLoading(false);
      });
  };

  const divisions = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet'];
  const heights = ['5ft', '5ft 2in', '5ft 4in', '5ft 6in', '5ft 8in', '5ft 10in', '6ft', '6ft+'];
  const weights = ['40-50kg', '50-60kg', '60-70kg', '70-80kg', '80-90kg', '90kg+'];
  const occupations = ['Student', 'Job', 'House wife', 'Business', 'Doctor', 'Engineer', 'Other'];
  const races = ['Fair', 'Medium', 'Dark', 'Olive'];

  return (
    <div>
      <div className="dashboard-title">
        <FiSave className="title-icon" /> Create / Edit Biodata
      </div>

      <div className="edit-biodata-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            
            <div className="form-group">
              <label>Biodata Type *</label>
              <select name="biodataType" required defaultValue={initialData?.biodataType || ""}>
                <option value="" disabled>Select Type</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" required defaultValue={initialData?.name || user?.displayName || ""} />
            </div>

            <div className="form-group full-width">
              <label>Profile Image URL *</label>
              <input type="url" name="profileImage" required defaultValue={initialData?.profileImage || user?.photoURL || ""} />
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input type="date" name="dateOfBirth" required defaultValue={initialData?.dateOfBirth || ""} />
            </div>

            <div className="form-group">
              <label>Age *</label>
              <input type="number" name="age" min="18" required defaultValue={initialData?.age || ""} />
            </div>

            <div className="form-group">
              <label>Height *</label>
              <select name="height" required defaultValue={initialData?.height || ""}>
                <option value="" disabled>Select Height</option>
                {heights.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Weight *</label>
              <select name="weight" required defaultValue={initialData?.weight || ""}>
                <option value="" disabled>Select Weight</option>
                {weights.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Occupation *</label>
              <select name="occupation" required defaultValue={initialData?.occupation || ""}>
                <option value="" disabled>Select Occupation</option>
                {occupations.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Race / Complexion *</label>
              <select name="race" required defaultValue={initialData?.race || ""}>
                <option value="" disabled>Select Race</option>
                {races.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Father's Name *</label>
              <input type="text" name="fathersName" required defaultValue={initialData?.fathersName || ""} />
            </div>

            <div className="form-group">
              <label>Mother's Name *</label>
              <input type="text" name="mothersName" required defaultValue={initialData?.mothersName || ""} />
            </div>

            <div className="form-group">
              <label>Permanent Division *</label>
              <select name="permanentDivision" required defaultValue={initialData?.permanentDivision || ""}>
                <option value="" disabled>Select Division</option>
                {divisions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Present Division *</label>
              <select name="presentDivision" required defaultValue={initialData?.presentDivision || ""}>
                <option value="" disabled>Select Division</option>
                {divisions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Expected Partner Details */}
            <div className="form-group full-width">
              <h4 style={{ margin: '15px 0 5px', color: 'var(--primary)' }}>Expected Partner Preferences</h4>
              <hr style={{ borderColor: 'var(--border-color)', marginBottom: '15px' }} />
            </div>

            <div className="form-group">
              <label>Expected Partner Age *</label>
              <input type="number" name="expectedPartnerAge" required defaultValue={initialData?.expectedPartnerAge || ""} />
            </div>

            <div className="form-group">
              <label>Expected Partner Height *</label>
              <select name="expectedPartnerHeight" required defaultValue={initialData?.expectedPartnerHeight || ""}>
                <option value="" disabled>Select Height</option>
                {heights.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Expected Partner Weight *</label>
              <select name="expectedPartnerWeight" required defaultValue={initialData?.expectedPartnerWeight || ""}>
                <option value="" disabled>Select Weight</option>
                {weights.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            {/* Contact Details */}
            <div className="form-group full-width">
              <h4 style={{ margin: '15px 0 5px', color: 'var(--primary)' }}>Contact Details</h4>
              <hr style={{ borderColor: 'var(--border-color)', marginBottom: '15px' }} />
            </div>

            <div className="form-group">
              <label>Contact Email (Readonly)</label>
              <input type="email" readOnly value={user?.email || ""} />
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <input type="tel" name="mobileNumber" required defaultValue={initialData?.mobileNumber || ""} />
            </div>

          </div>

          <div className="form-submit">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save And Publish Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBiodata;
