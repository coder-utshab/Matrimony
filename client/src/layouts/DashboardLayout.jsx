import { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../components/Navbar/Navbar';
import { FiEdit, FiEye, FiMail, FiHeart, FiLogOut, FiUsers, FiShield, FiCheckCircle, FiBarChart2, FiMenu, FiStar } from 'react-icons/fi';
import { GiLovers } from 'react-icons/gi';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully');
        navigate('/');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="user-info">
              <img
                src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/avatar.png'}
                alt={user?.displayName}
                className="user-avatar"
              />
              <div>
                <div className="user-name">{user?.displayName}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {!isAdmin && (
              <>
                <span className="sidebar-section-title">My Profile</span>
                <NavLink to="/dashboard/edit-biodata" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiEdit /></span> Edit Biodata
                </NavLink>
                <NavLink to="/dashboard/view-biodata" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiEye /></span> View Biodata
                </NavLink>

                <div className="sidebar-divider"></div>
                <span className="sidebar-section-title">Activity</span>

                <NavLink to="/dashboard/contact-request" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiMail /></span> My Contact Request
                </NavLink>
                <NavLink to="/dashboard/favourites" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiHeart /></span> Favourites Biodata
                </NavLink>
                <NavLink to="/dashboard/got-married" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><GiLovers /></span> Got Married
                </NavLink>
              </>
            )}

            {isAdmin && (
              <>
                <span className="sidebar-section-title">Admin Panel</span>
                <NavLink to="/dashboard/admin" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiBarChart2 /></span> Admin Dashboard
                </NavLink>
                <NavLink to="/dashboard/manage-users" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiUsers /></span> Manage Users
                </NavLink>
                <NavLink to="/dashboard/approved-premium" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiShield /></span> Approved Premium
                </NavLink>
                <NavLink to="/dashboard/approved-contact-request" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiCheckCircle /></span> Approved Contact Request
                </NavLink>
                <NavLink to="/dashboard/success-story" onClick={() => setSidebarOpen(false)}>
                  <span className="nav-icon"><FiStar /></span> Success Story
                </NavLink>
              </>
            )}

            <div className="sidebar-divider"></div>
            <button onClick={handleLogout}>
              <span className="nav-icon"><FiLogOut /></span> Logout
            </button>
          </nav>
        </aside>

        <div className="dashboard-content">
          <Outlet />
        </div>

        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu />
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
