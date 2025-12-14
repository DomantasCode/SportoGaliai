import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Benefits from './components/Benefits';
import Trainers from './components/Trainers';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Sponsors from './components/Sponsors';
import FAQSection from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-neutral text-textDark selection:bg-secondary selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Services />
        <Trainers />
        <Process />
        <Testimonials />
        <Sponsors />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;