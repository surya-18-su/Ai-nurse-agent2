import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Placeholder components for other routes
const About = () => <div className="pt-32 pb-32 text-center text-white h-screen flex items-center justify-center font-serif text-3xl">Our Story (Coming Soon)</div>;
const Gallery = () => <div className="pt-32 pb-32 text-center text-white h-screen flex items-center justify-center font-serif text-3xl">Gallery (Coming Soon)</div>;
const Contact = () => <div className="pt-32 pb-32 text-center text-white h-screen flex items-center justify-center font-serif text-3xl">Contact (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;