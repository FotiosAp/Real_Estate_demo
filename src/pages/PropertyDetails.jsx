import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useNavigationType, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Square, ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, addInquiry } = useAppContext();
  
  const navType = useNavigationType();

  // Scroll to top when the component mounts, unless going back
  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [navType]);
  
  const property = properties.find(p => p.id === id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'Ενδιαφέρομαι να μάθω περισσότερες πληροφορίες για αυτό το ακίνητο.'
  });
  
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="pt-32 min-h-screen text-center">
        <h2 className="text-2xl font-serif mb-4">Το ακίνητο δεν βρέθηκε</h2>
        <Link to="/" className="text-black hover:underline">Επιστροφή στην Αρχική</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate network delay
    setTimeout(() => {
      addInquiry({
        ...formData,
        propertyId: property.id,
        propertyTitle: property.title
      });
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 pb-20">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-slate-500 hover:text-black transition-colors text-sm font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Επιστροφή στα Ακίνητα
        </button>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Main Large Image */}
          <div className="md:col-span-3 rounded-2xl overflow-hidden h-64 sm:h-80 md:h-[65vh] shadow-sm relative group bg-black">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={property.images[currentImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails Sidebar */}
          <div className="hidden md:flex flex-col gap-4 h-[65vh]">
            {property.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative flex-1 rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-black opacity-100 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Μικρογραφία ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Mobile Thumbnails */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt={`Μικρογραφία ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                <div>
                  <div className="inline-block bg-slate-100 text-slate-600 font-semibold px-3 py-1 rounded-md text-sm mb-3 tracking-wider">
                    ΚΩΔΙΚΟΣ: {property.code}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">{property.title}</h1>
                  <div className="flex items-center text-slate-500 text-lg">
                    <MapPin className="h-5 w-5 mr-2" />
                    {property.location}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-3xl font-semibold text-black">
                  €{property.price.toLocaleString('el-GR')}
                </div>
              </div>

              {/* Key Features Bar */}
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-200 mb-8">
                <div className="flex items-center text-slate-700">
                  <Bed className="h-6 w-6 mr-3 text-slate-400" />
                  <span className="text-lg font-medium">{property.bedrooms} <span className="text-slate-500 font-normal">Υπνοδωμάτια</span></span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Bath className="h-6 w-6 mr-3 text-slate-400" />
                  <span className="text-lg font-medium">{property.bathrooms} <span className="text-slate-500 font-normal">Μπάνια</span></span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Square className="h-6 w-6 mr-3 text-slate-400" />
                  <span className="text-lg font-medium">{property.sqft} <span className="text-slate-500 font-normal">Τετραγωνικά</span></span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-semibold text-slate-900 mb-4">Σχετικά με το Ακίνητο</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-serif font-semibold text-slate-900 mb-4">Κύρια Χαρακτηριστικά</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <ChevronRight className="h-5 w-5 text-black mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Sidebar / Sticky Form */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 sticky top-28"
            >
              <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-6">Εκδήλωση Ενδιαφέροντος</h3>
              
              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-xl font-medium text-slate-900 mb-2">Το Μήνυμα Εστάλη</h4>
                  <p className="text-slate-500">Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-black hover:underline font-medium"
                  >
                    Αποστολή νέου μηνύματος
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ονοματεπώνυμο</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Μαρία Παπαδοπούλου"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Διεύθυνση Email</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="maria@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Τηλέφωνο Επικοινωνίας</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="+30 691 234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Μήνυμα</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:bg-slate-400 mt-2"
                  >
                    {formStatus === 'submitting' ? 'Αποστολή...' : 'Ζήτηση Πληροφοριών'}
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-4">
                    Με την υποβολή της φόρμας, αποδέχεστε τους Όρους Χρήσης και την Πολιτική Απορρήτου μας.
                  </p>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
