import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        toast.success('Login Successful!');
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err.message);
        toast.error('Login Failed! Please check your credentials.');
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(result => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL
        };
        // Save user to database if not exists
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userInfo)
        });

        toast.success('Google Login Successful!');
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err.message);
        toast.error('Google Login Failed!');
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to Matrimony</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" required />
              {error && <p className="error-text">{error}</p>}
            </div>

            <button type="submit" className="auth-btn">Sign In</button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button onClick={handleGoogleLogin} className="google-btn">
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
