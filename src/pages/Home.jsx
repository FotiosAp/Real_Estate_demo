import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Search, Home as HomeIcon, Shield, TrendingUp, MapPin, Phone, Mail, Clock, Building2, ArrowRight, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import CustomSelect from '../components/CustomSelect';

const BackgroundBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Large architectural circles */}
    <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full border-2 border-slate-300/90" />
    <div className="absolute top-[50px] left-[-50px] w-[350px] h-[350px] rounded-full border-[4px] border-[#d4af37]/50" />
    
    {/* Watermark Icon */}
    <Building2 className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] text-slate-200/90 transform -rotate-6" strokeWidth={1} />
  </div>
);

const ContactBackground = () => {
  const images = [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)), url(${images[currentImage]})` }}
        />
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { properties } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [sqftRange, setSqftRange] = useState('');
  
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if (!searchTerm && !filterType && !priceRange && !minBedrooms && !sqftRange) {
      return;
    }
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (filterType) params.append('type', filterType);
    if (priceRange) params.append('priceRange', priceRange);
    if (minBedrooms) params.append('minBeds', minBedrooms);
    if (sqftRange) params.append('sqft', sqftRange);
    
    navigate(`/properties?${params.toString()}`);
  };
  
  const navType = useNavigationType();

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('homeScrollPos', window.scrollY.toString());
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (navType !== 'POP') {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 50);
    } else {
      const savedScroll = sessionStorage.getItem('homeScrollPos');
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' });
        }, 50);
      }
    }
  }, [navType]);

  useEffect(() => {
    if (properties.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % Math.min(properties.length, 5));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [properties]);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[100svh] h-[100svh] flex items-center justify-center overflow-hidden">
        
        <motion.div className="absolute inset-0 z-0 bg-black">
          <AnimatePresence>
            {properties.length > 0 && (
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                src={properties[currentImageIndex].images[0]} 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60"></div>
        </motion.div>
        
        <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-0 pb-16 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 tracking-tight drop-shadow-2xl leading-tight">
              Εκλεπτυσμένη <span className="text-[#e8dcc5] italic font-light">Διαβίωση</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xl md:text-2xl text-white/90 font-light mb-12 max-w-2xl mx-auto drop-shadow-lg">
              Ανακαλύψτε μοναδικά ακίνητα υψηλής αισθητικής που ταιριάζουν απόλυτα στις προσδοκίες σας.
            </p>
          </motion.div>
          
          {/* Desktop Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block w-full max-w-5xl mx-auto mt-12 relative z-20"
          >
            <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl md:rounded-full shadow-2xl border border-white/40 p-2 md:p-0 backdrop-blur-sm bg-white/95">
               <div className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-slate-100 items-center min-w-0">
                
                <div className="flex-1 min-w-0 w-full px-4 md:px-3 lg:px-6 xl:px-8 py-3 md:py-3 lg:py-4 rounded-t-2xl md:rounded-none md:rounded-l-full hover:bg-slate-50 transition-colors duration-300">
                  <label className="block text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 text-left truncate">ΚΩΔΙΚΟΣ ΑΚΙΝΗΤΟΥ</label>
                  <input 
                    type="text" 
                    placeholder="Πληκτρολογήστε..." 
                    className="w-full bg-transparent border-none outline-none text-slate-900 placeholder-slate-500 font-medium text-sm md:text-xs lg:text-sm xl:text-base p-0 truncate"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex-1 min-w-0 w-full px-4 md:px-3 lg:px-6 py-3 md:py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300 text-left">
                  <label className="block text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 truncate">Τυπος</label>
                  <div className="text-sm md:text-xs lg:text-sm xl:text-base">
                    <CustomSelect 
                    value={filterType}
                    onChange={setFilterType}
                    placeholder="Όλοι"
                    options={[
                      { value: 'Διαμέρισμα', label: 'Διαμέρισμα' },
                      { value: 'Ρετιρέ', label: 'Ρετιρέ' },
                      { value: 'Μονοκατοικία', label: 'Μονοκατοικία' },
                      { value: 'Loft', label: 'Loft' },
                      { value: 'Studio', label: 'Studio' }
                    ]}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 w-full px-4 md:px-3 lg:px-6 py-3 md:py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300 text-left">
                  <label className="block text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 truncate">Τιμη</label>
                  <div className="text-sm md:text-xs lg:text-sm xl:text-base">
                    <CustomSelect 
                    value={priceRange}
                    onChange={setPriceRange}
                    placeholder="Οποιαδήποτε"
                    options={[
                      { value: '0-100000', label: '0 - 100.000€' },
                      { value: '100000-200000', label: '100.000 - 200.000€' },
                      { value: '200000-300000', label: '200.000 - 300.000€' },
                      { value: '300000+', label: '300.000€+' }
                    ]}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 w-full px-4 md:px-3 lg:px-6 py-3 md:py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300 text-left">
                  <label className="block text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 truncate">Δωματια</label>
                  <div className="text-sm md:text-xs lg:text-sm xl:text-base">
                    <CustomSelect 
                    value={minBedrooms}
                    onChange={setMinBedrooms}
                    placeholder="Οποιοδήποτε"
                    options={[
                      { value: '1', label: '1' },
                      { value: '2', label: '2' },
                      { value: '3', label: '3' },
                      { value: '4', label: '4' }
                    ]}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 w-full px-4 md:px-3 lg:px-6 py-3 md:py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300 text-left">
                  <label className="block text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 truncate">Εμβαδον</label>
                  <div className="text-sm md:text-xs lg:text-sm xl:text-base">
                    <CustomSelect 
                    value={sqftRange}
                    onChange={setSqftRange}
                    placeholder="Οποιοδήποτε"
                    options={[
                      { value: '0-50', label: '0 - 50 τ.μ.' },
                      { value: '50-100', label: '50 - 100 τ.μ.' },
                      { value: '100-150', label: '100 - 150 τ.μ.' },
                      { value: '150-200', label: '150 - 200 τ.μ.' },
                      { value: '200+', label: '200+ τ.μ.' }
                    ]}
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto p-2 md:p-1 lg:p-2 flex justify-center md:justify-end shrink-0">
                <button 
                  onClick={handleSearch}
                  className="bg-black hover:bg-gold text-white hover:text-black font-semibold px-8 md:px-4 lg:px-6 xl:px-8 py-3 md:py-3 lg:py-4 rounded-2xl md:rounded-full transition-all duration-300 w-full md:w-auto whitespace-nowrap md:h-[48px] lg:h-[60px] flex items-center justify-center shadow-lg hover:shadow-xl text-sm md:text-xs lg:text-sm xl:text-base"
                >
                  Αναζήτηση
                </button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Filter Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden w-full max-w-sm mx-auto mt-8 relative z-20 px-4"
          >
            <div className="w-full bg-white/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40">
              <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Αναζήτηση (Περιοχή, Τιμή...)"
                className="w-full bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 font-medium text-[15px] py-3 cursor-text"
              />
              <button 
                type="button"
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 ml-2 shadow-md cursor-default"
              >
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        >
          <span className="text-white/60 text-xs tracking-[0.2em] uppercase mb-3 font-semibold">Scroll</span>
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
          ></motion.div>
        </motion.div>
      </section>

      {/* Quick Actions Section */}
      <section className="bg-slate-50 pt-20 pb-4 relative overflow-hidden">
        <BackgroundBlobs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <Link to="/properties" className="group relative block w-full rounded-3xl overflow-hidden h-64 md:h-[28rem] shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Εύρεση Ακινήτου" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 md:mb-4 drop-shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">Εύρεση Ακινήτου</h3>
                  <p className="text-white/90 text-sm md:text-xl font-medium mb-4 md:mb-8 max-w-sm drop-shadow-md transform group-hover:-translate-y-2 transition-transform duration-500 delay-75 opacity-0 group-hover:opacity-100">Ανακαλύψτε το ιδανικό ακίνητο μέσα από χιλιάδες επιλογές.</p>
                  <div className="bg-white text-slate-900 group-hover:bg-gold group-hover:text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 transform group-hover:-translate-y-2 shadow-xl flex items-center gap-2">
                    <span>Δείτε τα ακίνητα</span>
                    <Search className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: isMobile ? 0 : 0.2 }}
              className="w-full lg:w-1/2"
            >
              <Link to="/estimation" className="group relative block w-full rounded-3xl overflow-hidden h-64 md:h-[28rem] shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Ανάθεση Ακινήτου" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 md:mb-4 drop-shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">Ανάθεση Ακινήτου</h3>
                  <p className="text-white/90 text-sm md:text-xl font-medium mb-4 md:mb-8 max-w-sm drop-shadow-md transform group-hover:-translate-y-2 transition-transform duration-500 delay-75 opacity-0 group-hover:opacity-100">Εμπιστευτείτε μας το ακίνητό σας για σίγουρη και γρήγορη πώληση.</p>
                  <div className="bg-white text-slate-900 group-hover:bg-gold group-hover:text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 transform group-hover:-translate-y-2 shadow-xl flex items-center gap-2">
                    <span>Ζητήστε μία δωρεάν εκτίμηση</span>
                    <HomeIcon className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About / Features Section */}
      <section id="about" className="pt-24 pb-12 md:py-24 bg-slate-50 relative overflow-hidden">
        <BackgroundBlobs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-0 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative mx-auto max-w-md lg:max-w-none px-4 md:px-0"
            >
              <div className="absolute -inset-4 bg-slate-200 rounded-3xl transform -rotate-2"></div>
              <img 
                src="/handshake.png" 
                alt="Συνεργάτης και πελάτης δίνουν τα χέρια" 
                className="relative z-10 w-full h-auto rounded-3xl shadow-xl object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl z-20 hidden lg:block border border-slate-100">
                <div className="text-4xl font-bold text-slate-900 mb-1">10+</div>
                <div className="text-slate-500 font-medium">Χρόνια Εμπειρίας</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left px-4 md:px-0"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900 mb-6 leading-tight">
                Το Μεσιτικό Γραφείο που <span className="text-slate-500 italic">εμπιστεύεστε</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Με πολυετή εμπειρία στον χώρο του real estate, προσφέρουμε ολοκληρωμένες υπηρεσίες 
                και σας καθοδηγούμε σε κάθε βήμα για την εύρεση του ιδανικού ακινήτου ή την πώληση της περιουσίας σας.
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Στόχος μας είναι η δημιουργία σχέσεων εμπιστοσύνης με τους πελάτες μας, βασισμένες στην ειλικρίνεια, την ταχύτητα και τον επαγγελματισμό.
              </p>
            </motion.div>
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={isMobile ? {} : {
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0 } },
                hover: { y: -10, transition: { duration: 0.3 } }
              }}
              className="group relative bg-white p-10 rounded-3xl shadow-sm border border-slate-100 overflow-hidden cursor-default transition-all duration-300"
            >
              {/* Overlay Background */}
              <div className="absolute inset-0 bg-slate-900 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-slate-50 group-hover:bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300">
                  <HomeIcon className="h-8 w-8 text-slate-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-white mb-4 transition-colors duration-300">Εύρεση Κατοικίας</h3>
                <p className="text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors duration-300">Διαθέτουμε πλούσιο χαρτοφυλάκιο επιλεγμένων ακινήτων για να βρείτε το σπίτι των ονείρων σας.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={isMobile ? {} : {
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
                hover: { y: -10, transition: { duration: 0.3 } }
              }}
              className="group relative bg-white p-10 rounded-3xl shadow-sm border border-slate-100 overflow-hidden cursor-default transition-all duration-300"
            >
              {/* Overlay Background */}
              <div className="absolute inset-0 bg-slate-900 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-slate-50 group-hover:bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300">
                  <Shield className="h-8 w-8 text-slate-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-white mb-4 transition-colors duration-300">Αξιοπιστία & Ασφάλεια</h3>
                <p className="text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors duration-300">Όλες οι διαδικασίες γίνονται με πλήρη διαφάνεια, παρέχοντας νομική και συμβολαιογραφική υποστήριξη.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={isMobile ? {} : {
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
                hover: { y: -10, transition: { duration: 0.3 } }
              }}
              className="group relative bg-white p-10 rounded-3xl shadow-sm border border-slate-100 overflow-hidden cursor-default transition-all duration-300"
            >
              {/* Overlay Background */}
              <div className="absolute inset-0 bg-slate-900 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-slate-50 group-hover:bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300">
                  <TrendingUp className="h-8 w-8 text-slate-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-white mb-4 transition-colors duration-300">Σωστή Εκτίμηση</h3>
                <p className="text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors duration-300">Αναλαμβάνουμε την ακριβή και ρεαλιστική εκτίμηση του ακινήτου σας με βάση τα τρέχοντα δεδομένα της αγοράς.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Areas Section */}
      <section className="pt-12 pb-24 md:py-24 bg-white relative overflow-hidden">
        <BackgroundBlobs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-slate-900 mb-4">Δημοφιλείς Τοποθεσίες</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Ανακαλύψτε επιλεγμένα ακίνητα στις πιο περιζήτητες περιοχές της Ελλάδας.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/property" className="group relative block rounded-3xl overflow-hidden h-80 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Αθήνα Κέντρο" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end text-center lg:text-left">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">Αθήνα Κέντρο</h3>
                    <p className="text-gold font-medium text-sm">450+ Ακίνητα</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform md:translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : 0.2 }}
            >
              <Link to="/property" className="group relative block rounded-3xl overflow-hidden h-80 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Βόρεια Προάστια" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end text-center lg:text-left">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">Βόρεια Προάστια</h3>
                    <p className="text-gold font-medium text-sm">210+ Ακίνητα</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform md:translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : 0.4 }}
            >
              <Link to="/property" className="group relative block rounded-3xl overflow-hidden h-80 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Νότια Προάστια" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end text-center lg:text-left">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">Νότια Προάστια</h3>
                    <p className="text-gold font-medium text-sm">320+ Ακίνητα</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform md:translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Insights Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <BackgroundBlobs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end mb-16 text-center lg:text-left"
          >
            <div className="mb-6 lg:mb-0">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-2 block">Insights</span>
              <h2 className="text-4xl font-serif font-semibold text-slate-900">Νέα της Αγοράς</h2>
            </div>
            <Link to="/" className="hidden md:flex items-center text-slate-600 hover:text-black font-medium transition-colors">
              Δείτε όλα τα άρθρα
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-48 md:h-60 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="News 1" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8 flex-grow flex flex-col text-center lg:text-left items-center lg:items-start">
                  <p className="text-gold font-medium text-sm mb-3">Συμβουλές</p>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 group-hover:text-gold transition-colors duration-300">Πώς να αυξήσετε την αξία του ακινήτου σας πριν την πώληση</h3>
                  <div className="mt-auto flex items-center justify-center md:justify-start text-slate-500 font-medium w-full">
                    <span>Περισσότερα</span>
                    <Plus className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : 0.2 }}
            >
              <Link to="/" className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-48 md:h-60 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="News 2" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8 flex-grow flex flex-col text-center lg:text-left items-center lg:items-start">
                  <p className="text-gold font-medium text-sm mb-3">Αγορά Ακινήτων</p>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 group-hover:text-gold transition-colors duration-300">Τάσεις της αγοράς για το 2026: Τι πρέπει να γνωρίζετε</h3>
                  <div className="mt-auto flex items-center justify-center md:justify-start text-slate-500 font-medium w-full">
                    <span>Περισσότερα</span>
                    <Plus className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : 0.4 }}
            >
              <Link to="/" className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-48 md:h-60 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="News 3" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8 flex-grow flex flex-col text-center lg:text-left items-center lg:items-start">
                  <p className="text-gold font-medium text-sm mb-3">Νομοθεσία</p>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 group-hover:text-gold transition-colors duration-300">Όλες οι αλλαγές στη φορολογία μεταβίβασης ακινήτων</h3>
                  <div className="mt-auto flex items-center justify-center md:justify-start text-slate-500 font-medium w-full">
                    <span>Περισσότερα</span>
                    <Plus className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified CTA & Contact Section */}
      <section id="contact" className="py-10 lg:py-12 bg-[#0a0a0a] relative overflow-hidden min-h-[calc(100svh-80px)] flex flex-col justify-center">
        <ContactBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* CTA Block */}
          <div className="text-center max-w-4xl mx-auto mb-10 pb-8 lg:pb-10 border-b border-white/10">
            <span className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Το Επομενο Βημα</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-8 text-white leading-tight">
              Ανακαλύψτε την αξία του <br className="hidden md:block"/><span className="font-semibold text-gold italic">ακινήτου σας</span> σήμερα.
            </h2>
            <Link to="/estimation" className="inline-flex items-center justify-center bg-gold text-white hover:bg-white hover:text-black px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              Ζητηστε Δωρεαν Εκτιμηση
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
          
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10">
            
            {/* Brand & Address */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2 mb-8">
                <Building2 className="h-8 w-8 text-gold" />
                <span className="font-serif text-3xl font-semibold text-white tracking-tight">Esthete.</span>
              </div>
              <p className="text-white/60 mb-8 font-light leading-relaxed pr-4">
                Πρωτοπορούμε στην αγορά πολυτελών ακινήτων, προσφέροντας απαράμιλλη εξυπηρέτηση και πρόσβαση στα πιο αποκλειστικά ακίνητα της Ελλάδας.
              </p>
              <div className="flex items-start space-x-4 mb-4">
                <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
                <p className="text-white/80 font-light">Λεωφόρος Κηφισίας 123,<br/>Αθήνα, 11524</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                <p className="text-white/80 font-light">+30 210 1234567</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-8">Αναζητηση</h4>
              <ul className="space-y-4">
                <li><Link to="/property" className="text-white/60 hover:text-gold transition-colors font-light">Βίλες</Link></li>
                <li><Link to="/property" className="text-white/60 hover:text-gold transition-colors font-light">Διαμερίσματα</Link></li>
                <li><Link to="/property" className="text-white/60 hover:text-gold transition-colors font-light">Ρετιρέ</Link></li>
                <li><Link to="/property" className="text-white/60 hover:text-gold transition-colors font-light">Παραθαλάσσια</Link></li>
                <li><Link to="/property" className="text-white/60 hover:text-gold transition-colors font-light">Νέα Έργα</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-8">Η Εταιρεια</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white/60 hover:text-gold transition-colors font-light">Το Γραφείο μας</Link></li>
                <li><Link to="/" className="text-white/60 hover:text-gold transition-colors font-light">Οι Σύμβουλοι</Link></li>
                <li><Link to="/" className="text-white/60 hover:text-gold transition-colors font-light">Καριέρα</Link></li>
                <li><Link to="/" className="text-white/60 hover:text-gold transition-colors font-light">Νέα & Insights</Link></li>
                <li><Link to="/" className="text-white/60 hover:text-gold transition-colors font-light">Επικοινωνία</Link></li>
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="md:col-span-3 lg:text-right">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-8">Newsletter</h4>
              <p className="text-white/60 mb-6 font-light leading-relaxed">
                Εγγραφείτε για να λαμβάνετε πρώτοι τα νέα μας ακίνητα και αναλύσεις της αγοράς.
              </p>
              <div className="relative mb-10">
                <input type="email" placeholder="Το Email σας" className="bg-transparent border-b border-white/20 text-white placeholder-white/40 pb-3 w-full outline-none focus:border-gold transition-colors font-light" />
                <button className="absolute right-0 top-0 text-gold hover:text-white transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex lg:justify-end gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-300 cursor-pointer">
                  <span className="font-serif italic text-lg leading-none">f</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-300 cursor-pointer">
                  <span className="font-serif italic text-lg leading-none">in</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-300 cursor-pointer">
                  <span className="font-serif italic text-lg leading-none">ig</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 lg:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-light text-white/40">
            <p>&copy; {new Date().getFullYear()} Esthete Luxury Real Estate. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="hover:text-gold transition-colors">Όροι Χρήσης</Link>
              <Link to="/" className="hover:text-gold transition-colors">Πολιτική Απορρήτου</Link>
              <Link to="/" className="hover:text-gold transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
