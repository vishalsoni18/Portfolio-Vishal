import React from 'react';
import DashboardLayout from './components/DashboardLayout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Resume from './components/Resume';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import SmoothScroll from './components/SmoothScroll';

function App() {
  const location = useLocation();

  return (
    <DashboardLayout>
      <SmoothScroll />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Hero /><About /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
          <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
          <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </DashboardLayout>
  );
}

export default App;
// Force deployment rebuild

