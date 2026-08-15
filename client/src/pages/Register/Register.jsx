import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    createUser(email, password)
      .then(result => {
        // Update Firebase profile
        updateUserProfile(name, photoURL)
          .then(() => {
            // Save user info in MongoDB
            const userInfo = {
              name,
              email,
              photoURL
            };
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId || res.data.message === 'User already exists') {
                  toast.success('Registration Successful!');
                  navigate('/');
                }
              });
          });
      })
      .catch(err => {
        setError(err.message);
        toast.error('Registration Failed!');
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create an Account</h2>
            <p>Join Matrimony and find your perfect match</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Enter your full name" required />
            </div>

            <div className="form-group">
              <label>Photo URL</label>
              <input type="url" name="photo" placeholder="Enter photo URL" required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Create a password" required />
              {error && <p className="error-text">{error}</p>}
            </div>

            <button type="submit" className="auth-btn">Register</button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
