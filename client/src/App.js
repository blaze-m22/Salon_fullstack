import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import EditServiceForm from './pages/admin/edit_service_form';
import AvailableServices from './pages/customer/available_services';
import ServicesAdmin from './pages/admin/services_admin';
import Home from './pages/customer/home';
import CreateServiceForm from './pages/admin/create_service_form';
import AdminAuth from './pages/admin/admin_auth';
import UserAuth from './pages/customer/user_auth';
import UserProfile from './pages/customer/user_profile';
import PhotoAlbum from './pages/customer/photo_album';
import GalleryAdmin from './pages/admin/gallery_admin';

const App = () => {
  const adminProfile = JSON.parse(localStorage.getItem('adminProfile'));
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/adminAuth' element={adminProfile ? <Navigate to="/servicesAdmin" replace /> : <AdminAuth />} />
          <Route path='/userAuth' element={userProfile ? <Navigate to="/" replace /> : <UserAuth />} />

          <Route path='/services' element={<AvailableServices />} />
          <Route path='/servicesAdmin' element={  <ServicesAdmin />} />
          
          <Route path='/gallery' element={<PhotoAlbum />} />
          <Route path='/galleryAdmin' element={<GalleryAdmin />} />

          <Route path='/create' element={<CreateServiceForm />} />
          <Route path='/edit/:id' element={<EditServiceForm />} />

          <Route path='/userProfile' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
