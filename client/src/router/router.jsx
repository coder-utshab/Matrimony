import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home/Home';
import Biodatas from '../pages/Biodatas/Biodatas';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import BiodataDetails from '../pages/BiodataDetails/BiodataDetails';
import Checkout from '../pages/Checkout/Checkout';
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs';
import EditBiodata from '../pages/Dashboard/EditBiodata/EditBiodata';
import ViewBiodata from '../pages/Dashboard/ViewBiodata/ViewBiodata';
import MyContactRequest from '../pages/Dashboard/MyContactRequest/MyContactRequest';
import FavouritesBiodata from '../pages/Dashboard/FavouritesBiodata/FavouritesBiodata';
import GotMarried from '../pages/Dashboard/GotMarried/GotMarried';
import AdminDashboard from '../pages/Dashboard/AdminDashboard/AdminDashboard';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import ApprovedPremium from '../pages/Dashboard/ApprovedPremium/ApprovedPremium';
import ApprovedContactRequest from '../pages/Dashboard/ApprovedContactRequest/ApprovedContactRequest';
import SuccessStoryAdmin from '../pages/Dashboard/SuccessStoryAdmin/SuccessStoryAdmin';
import PrivateRoute from '../components/Shared/PrivateRoute';
import AdminRoute from '../components/Shared/AdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/biodatas', element: <Biodatas /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/contact', element: <ContactUs /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/biodata/:id',
        element: <PrivateRoute><BiodataDetails /></PrivateRoute>
      },
      {
        path: '/checkout/:biodataId',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: '/dashboard', element: <EditBiodata /> },
      { path: '/dashboard/edit-biodata', element: <EditBiodata /> },
      { path: '/dashboard/view-biodata', element: <ViewBiodata /> },
      { path: '/dashboard/contact-request', element: <MyContactRequest /> },
      { path: '/dashboard/favourites', element: <FavouritesBiodata /> },
      { path: '/dashboard/got-married', element: <GotMarried /> },
      {
        path: '/dashboard/admin',
        element: <AdminRoute><AdminDashboard /></AdminRoute>
      },
      {
        path: '/dashboard/manage-users',
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: '/dashboard/approved-premium',
        element: <AdminRoute><ApprovedPremium /></AdminRoute>
      },
      {
        path: '/dashboard/approved-contact-request',
        element: <AdminRoute><ApprovedContactRequest /></AdminRoute>
      },
      {
        path: '/dashboard/success-story',
        element: <AdminRoute><SuccessStoryAdmin /></AdminRoute>
      },
    ]
  }
]);

export default router;
