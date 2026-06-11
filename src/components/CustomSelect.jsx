import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ value, onChange, options, placeholder, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-transparent text-slate-900 px-0 py-0 outline-none cursor-pointer font-medium text-sm lg:text-base`}
      >
        <span className={`truncate mr-3 ${!value ? 'text-slate-500 font-normal' : 'text-slate-900 font-medium'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] overflow-hidden"
          >
            <ul className="py-1 max-h-60 overflow-y-auto">
              <li
                className={`px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm transition-colors ${value === '' ? 'bg-slate-50 text-gold font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                onClick={() => { onChange(''); setIsOpen(false); }}
              >
                <span>{placeholder}</span>
                {value === '' && <Check className="h-4 w-4 text-gold" />}
              </li>
              
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm transition-colors ${value === option.value ? 'bg-slate-50 text-gold font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="h-4 w-4 text-gold" />}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
