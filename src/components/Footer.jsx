import React from 'react';
import { useLocation } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  
  if (location.pathname === '/') return null;

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Building2 className="h-6 w-6 text-black" />
          <span className="font-serif text-xl font-semibold text-black">Esthete.</span>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Esthete Luxury Real Estate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
