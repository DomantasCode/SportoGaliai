import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './src/lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Services from './components/Services';
import Trainers from './components/Trainers';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Sponsors from './components/Sponsors';
import FAQSection from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './src/pages/Admin/Login';
import AdminDashboard from './src/pages/Admin/Dashboard';
import TrainerForm from './src/pages/Admin/TrainerForm';


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

// Main Site Layout (with Navbar/Footer)
const MainLayout = () => (
  <div className="min-h-screen bg-white dark:bg-dark text-gray-900 dark:text-white selection:bg-secondary selection:text-primary transition-colors duration-300">
    <Navbar />
    <main>
      <Hero />
      <Benefits />
      <Services />
      <Trainers />
      <Process />
      <Testimonials />
      <FAQSection />
      <Contact />
      <Sponsors />
    </main>
    <Footer />
  </div>
);

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
    </Routes>
  );
}

export default App;