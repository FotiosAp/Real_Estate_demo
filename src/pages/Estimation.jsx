import React, { useState, useEffect } from 'react';
import { Link, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, Building, Building2, MapPin, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const propertyTypes = [
  { id: 'apartment', title: 'Διαμέρισμα', icon: Building2 },
  { id: 'house', title: 'Μονοκατοικία', icon: HomeIcon },
  { id: 'villa', title: 'Βίλα', icon: HomeIcon },
  { id: 'commercial', title: 'Επαγγελματικός Χώρος', icon: Building },
  { id: 'land', title: 'Οικόπεδο', icon: MapPin },
];

const Estimation = () => {
  const { addEstimation } = useAppContext();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [navType]);

  const [step, setStep] = useState(1);

  // Scroll to top on every step change (especially useful for mobile to see the green tick)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    sqft: '',
    yearBuilt: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (typeId) => {
    setFormData((prev) => ({ ...prev, propertyType: typeId }));
    handleNext();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEstimation(formData);
    handleNext();
  };

  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center pt-20">
      
      {/* Full Page Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Client Meeting in Office" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm font-medium mb-8 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 w-max">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Επιστροφή στην Αρχική
        </Link>
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Panel - Copy */}
          <div className="flex flex-col lg:w-1/2 justify-center lg:pr-12 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <h2 className="hidden lg:block text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
                Η Πραγματική Αξία της <span className="italic text-gold font-light">Ιδιοκτησίας</span> σας
              </h2>
              <p className="hidden lg:block text-lg text-white/90 font-light leading-relaxed mb-10 drop-shadow-md max-w-lg">
                Εμπιστευτείτε την εξειδικευμένη ομάδα μας για μια δωρεάν, ρεαλιστική και τεκμηριωμένη εκτίμηση του ακινήτου σας, βασισμένη στα πιο πρόσφατα δεδομένα της αγοράς.
              </p>
            
            <div className="space-y-6 pt-8 border-t border-white/20 max-w-md">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-5 border border-white/20 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-gold" />
                </div>
                <span className="font-medium text-white/90 tracking-wide text-lg">Απόλυτη Εχεμύθεια</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-5 border border-white/20 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-gold" />
                </div>
                <span className="font-medium text-white/90 tracking-wide text-lg">Γρήγορη Ανταπόκριση (24 ώρες)</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-5 border border-white/20 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-gold" />
                </div>
                <span className="font-medium text-white/90 tracking-wide text-lg">Χωρίς Καμία Δέσμευση</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Form Wizard */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2">
          
          {/* Header / Progress */}
          {step < 4 && (
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 drop-shadow-md">Ζητήστε Εκτίμηση</h1>
              <p className="text-white/80 text-lg drop-shadow-md">Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε άμεσα.</p>
              
              <div className="flex justify-center lg:justify-start items-center mt-8 space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 shadow-sm ${
                      step >= i ? 'bg-gold text-slate-900 border-none' : 'bg-white/10 text-white/50 border border-white/20 backdrop-blur-md'
                    }`}>
                      {i}
                    </div>
                    {i < 3 && (
                      <div className={`w-12 h-1 transition-colors duration-300 rounded-full mx-2 ${
                        step > i ? 'bg-gold' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Content */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 min-h-[300px] md:min-h-[350px] max-w-md mx-auto lg:max-w-none w-full relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Property Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full flex flex-col justify-center"
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6 text-center">Τι είδους ακίνητο διαθέτετε;</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.propertyType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => handleTypeSelect(type.id)}
                          className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 hover:border-black hover:shadow-sm group ${
                            isSelected ? 'border-black bg-slate-50' : 'border-slate-200 bg-white'
                          }`}
                        >
                          <div className={`p-2 rounded-full transition-colors duration-300 ${isSelected ? 'bg-black' : 'bg-slate-50 group-hover:bg-slate-100'}`}>
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-black'}`} />
                          </div>
                          <span className={`font-medium text-xs md:text-sm text-center md:text-left ${isSelected ? 'text-black' : 'text-slate-600'}`}>
                            {type.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-2xl font-semibold text-slate-900 mb-8 text-center">Λεπτομέρειες Ακινήτου</h2>
                  <div className="space-y-6 max-w-xl mx-auto">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Περιοχή / Διεύθυνση *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="π.χ. Γλυφάδα, Αθήνα"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Τετραγωνικά (τ.μ.)</label>
                        <input
                          type="number"
                          name="sqft"
                          value={formData.sqft}
                          onChange={handleInputChange}
                          placeholder="π.χ. 120"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Έτος Κατασκευής</label>
                        <input
                          type="number"
                          name="yearBuilt"
                          value={formData.yearBuilt}
                          onChange={handleInputChange}
                          placeholder="π.χ. 2015"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
                      <button onClick={handlePrev} className="flex items-center text-slate-500 hover:text-black font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-100">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Πίσω
                      </button>
                      <button 
                        onClick={handleNext} 
                        disabled={!formData.location}
                        className="flex items-center bg-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-slate-800 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg"
                      >
                        Συνέχεια <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Contact */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-2xl font-semibold text-slate-900 mb-8 text-center">Τα Στοιχεία σας</h2>
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Ονοματεπώνυμο *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Μαρία Παπαδοπούλου"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Τηλέφωνο *</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+30 691 234 5678"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="maria@example.com"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Σχόλια (Προαιρετικό)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Πρόσθετες πληροφορίες για το ακίνητο..."
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none bg-slate-50 focus:bg-white"
                      ></textarea>
                    </div>
                    <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
                      <button type="button" onClick={handlePrev} className="flex items-center text-slate-500 hover:text-black font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-100">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Πίσω
                      </button>
                      <button 
                        type="submit" 
                        disabled={!formData.name || !formData.phone}
                        className="flex items-center bg-gold text-white px-8 py-3.5 rounded-xl font-medium hover:bg-yellow-600 transition-all shadow-lg shadow-gold/20 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                      >
                        Υποβολή Αιτήματος
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, type: 'spring' } }}
                  className="flex flex-col items-center justify-center text-center py-12 h-full"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Το αίτημά σας ελήφθη!</h2>
                  <p className="text-slate-600 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                    Ευχαριστούμε για την εμπιστοσύνη. Ένας εξειδικευμένος εκτιμητής της ομάδας μας θα μελετήσει τα στοιχεία και θα επικοινωνήσει μαζί σας εντός 24 ωρών.
                  </p>
                  <a href="/" className="px-8 py-4 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium text-slate-900 transition-colors shadow-sm">
                    Επιστροφή στην Αρχική
                  </a>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Estimation;
