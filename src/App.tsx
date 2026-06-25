/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Campuses from './pages/Campuses';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import Portal from './pages/Portal';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
      </Routes>
    </BrowserRouter>
  );
}
