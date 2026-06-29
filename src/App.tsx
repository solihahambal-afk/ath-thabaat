/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import GlobalLoader from './components/GlobalLoader';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Campuses from './pages/Campuses';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import InstallPrompt from './components/InstallPrompt';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalLoader>
        <ScrollToTop />
        <InstallPrompt />
        <Routes>
          <Route path="/" element={<Layout />}>
             <Route index element={<Home />} />
             <Route path="about" element={<About />} />
             <Route path="academics" element={<Academics />} />
             <Route path="admissions" element={<Admissions />} />
             <Route path="campuses" element={<Campuses />} />
             <Route path="gallery" element={<Gallery />} />
             <Route path="news" element={<News />} />
             <Route path="contact" element={<Contact />} />
             <Route path="portal" element={<Portal />} />
          </Route>
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="*" element={<div className="p-6">Module coming soon</div>} />
          </Route>
        </Routes>
      </GlobalLoader>
    </BrowserRouter>
  );
}
