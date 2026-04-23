import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './src/lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Services from './components/Services';
import Camps from './components/Camps';
import Trainers from './components/Trainers';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Sponsors from './components/Sponsors';
import News from './components/News';
import FAQSection from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './src/pages/Admin/Login';
import AdminDashboard from './src/pages/Admin/Dashboard';
import TrainerForm from './src/pages/Admin/TrainerForm';
import NewsForm from './src/pages/Admin/NewsForm';
import Popup from './components/Popup';


// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check our simple local storage auth
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  if (isAuthenticated === null) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  return <>{children}</>;
};

// Scroll to hash target after content loads (async components like News can shift layout)
const useHashScroll = () => {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Multiple attempts to catch both fast initial render and after async content loads
    const timers = [
      setTimeout(scrollToHash, 300),
      setTimeout(scrollToHash, 900),
      setTimeout(scrollToHash, 1800)
    ];

    window.addEventListener('hashchange', scrollToHash);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);
};

// Main Site Layout (with Navbar/Footer)
const MainLayout = () => {
  useHashScroll();
  return (
  <div className="min-h-screen bg-white dark:bg-dark text-gray-900 dark:text-white selection:bg-secondary selection:text-primary transition-colors duration-300">
    <Navbar />
    <main>
      <Hero />
      <Benefits />
      <Services />
      <Camps />
      <Trainers />
      <Process />
      <News />
      <Testimonials />
      <FAQSection />
      <Contact />
      <Sponsors />
    </main>
    <Footer />
    <Popup />
  </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/trainers/new"
        element={
          <ProtectedRoute>
            <TrainerForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/trainers/:id"
        element={
          <ProtectedRoute>
            <TrainerForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/news/new"
        element={
          <ProtectedRoute>
            <NewsForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/news/:id"
        element={
          <ProtectedRoute>
            <NewsForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;