import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'properties') {
      navigate('/properties');
      return;
    }
    
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navItems = [
    { name: 'Τα Ακίνητά μας', id: 'properties' },
    { name: 'Η Φιλοσοφία μας', id: 'about' },
    { name: 'Επικοινωνία', id: 'contact' }
  ];

  const isSolid = scrolled || location.pathname !== '/';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isSolid ? 'bg-white/90 backdrop-blur-md border-slate-200 shadow-sm py-2' : 'bg-transparent border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative w-full">
          {/* Left Side - Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" onClick={() => { sessionStorage.removeItem('homeScroll'); window.scrollTo(0,0); setMobileMenuOpen(false); }} className="flex items-center space-x-2 group z-50">
              <Building2 className={`h-8 w-8 transition-colors duration-500 ${(isSolid || mobileMenuOpen) ? 'text-black' : 'text-white'}`} />
              <span className={`font-serif text-2xl font-semibold tracking-tight transition-colors duration-500 ${(isSolid || mobileMenuOpen) ? 'text-black' : 'text-white'}`}>
                Esthete.
              </span>
            </Link>
          </div>
          
          {/* Center - Nav Items */}
          <div className="hidden md:flex space-x-10 flex-none justify-center">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavClick(item.id)}
                className={`relative font-medium transition-colors duration-500 ${isSolid ? 'text-slate-600 hover:text-black' : 'text-white/80 hover:text-white'} group cursor-pointer bg-transparent border-none p-0`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isSolid ? 'bg-gold' : 'bg-white'}`}></span>
              </button>
            ))}
          </div>
          
          {/* Right Side - Empty on desktop, Hamburger on mobile */}
          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden z-50 p-2 -mr-2 text-current"
            >
              {mobileMenuOpen ? (
                <X className={`h-6 w-6 transition-colors duration-500 text-black`} />
              ) : (
                <Menu className={`h-6 w-6 transition-colors duration-500 ${isSolid ? 'text-black' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-xl flex flex-col items-start justify-start pt-32 px-8 space-y-8 z-40"
          >
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavClick(item.id)}
                className="text-2xl font-serif font-semibold text-slate-800 hover:text-gold transition-colors text-left"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
