import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid, Map as MapIcon, ArrowLeft, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';
import MapComponent from '../components/MapComponent';
import CustomSelect from '../components/CustomSelect';

const Properties = () => {
  const { properties } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || '';
  const initialMaxPrice = searchParams.get('maxPrice') || '';
  const initialMinBeds = searchParams.get('minBeds') || '';
  const initialSqft = searchParams.get('sqft') || '';

  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filterType, setFilterType] = useState(initialType);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [minBedrooms, setMinBedrooms] = useState(initialMinBeds);
  const [sqftRange, setSqftRange] = useState(initialSqft);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: initialSearch,
    filterType: initialType,
    maxPrice: initialMaxPrice,
    minBedrooms: initialMinBeds,
    sqftRange: initialSqft
  });

  // Update states when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updatedFilters = {
      searchTerm: params.get('search') || '',
      filterType: params.get('type') || '',
      maxPrice: params.get('maxPrice') || '',
      minBedrooms: params.get('minBeds') || '',
      sqftRange: params.get('sqft') || ''
    };
    setSearchTerm(updatedFilters.searchTerm);
    setFilterType(updatedFilters.filterType);
    setMaxPrice(updatedFilters.maxPrice);
    setMinBedrooms(updatedFilters.minBedrooms);
    setSqftRange(updatedFilters.sqftRange);
    setAppliedFilters(updatedFilters);
  }, [location.search]);

  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 50);
    }
  }, [navType, location.pathname]);

  const filteredProperties = properties.filter(p => {
    const searchLower = appliedFilters.searchTerm.toLowerCase();
    const matchesSearch = appliedFilters.searchTerm === '' || (
      (p.code && p.code.includes(appliedFilters.searchTerm)) ||
      p.location.toLowerCase().includes(searchLower) || 
      p.title.toLowerCase().includes(searchLower) ||
      (p.keywords && p.keywords.some(k => k.toLowerCase().includes(searchLower))) ||
      (p.features && p.features.some(f => f.toLowerCase().includes(searchLower))) ||
      (p.type && p.type.toLowerCase().includes(searchLower))
    );

    const matchesType = appliedFilters.filterType === '' || p.type === appliedFilters.filterType;
    const matchesPrice = appliedFilters.maxPrice === '' || p.price <= parseInt(appliedFilters.maxPrice);
    const matchesBeds = appliedFilters.minBedrooms === '' || p.bedrooms >= parseInt(appliedFilters.minBedrooms);
    
    let matchesSqft = true;
    if (appliedFilters.sqftRange) {
      if (appliedFilters.sqftRange.includes('-')) {
        const [min, max] = appliedFilters.sqftRange.split('-');
        matchesSqft = p.sqft >= parseInt(min) && p.sqft <= parseInt(max);
      } else if (appliedFilters.sqftRange.includes('+')) {
        matchesSqft = p.sqft >= parseInt(appliedFilters.sqftRange);
      }
    }

    return matchesSearch && matchesType && matchesPrice && matchesBeds && matchesSqft;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-slate-500 hover:text-black transition-colors text-sm font-medium mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Επιστροφή στην Αρχική
        </button>

        {/* Title */}
        <div className="mb-6 lg:mb-12 hidden lg:block">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Αναζήτηση Ακινήτου</h1>
            <p className="text-xl text-slate-500 max-w-2xl">Ανακαλύψτε χιλιάδες επιλογές κατοικιών, πολυτελών βιλών και επαγγελματικών χώρων.</p>
        </div>

        {/* Results Info & Toggles */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-10 gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-slate-900 mb-1 lg:mb-2">Διαθέσιμα Ακίνητα</h2>
            <p className="text-sm lg:text-base text-slate-500">Προβάλλονται {filteredProperties.length} ακίνητα</p>
          </div>
          
          <div className="flex w-full lg:w-auto items-center justify-between gap-3 lg:gap-4">
            {/* Filter Toggle Button (Mobile Only) */}
            <button 
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden flex-1 bg-white border border-slate-200 rounded-full py-3 px-4 flex items-center justify-center font-medium text-slate-700 shadow-sm"
            >
              <Search className="h-4 w-4 mr-2" />
              {isMobileFiltersOpen ? 'Απόκρυψη Φίλτρων' : 'Επιλέξτε Φίλτρα'}
            </button>

            {/* Grid / Map Toggle */}
            <div className="bg-slate-50 p-1 rounded-full border border-slate-200 inline-flex shadow-sm shrink-0">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center px-4 lg:px-4 py-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white text-black shadow-sm font-medium' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Grid className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Πλέγμα</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center px-4 lg:px-4 py-2 rounded-full transition-all ${viewMode === 'map' ? 'bg-white text-black shadow-sm font-medium' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <MapIcon className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Χάρτης</span>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Filters Section */}
        <div className={`relative z-30 mb-8 lg:mb-12 transition-all duration-300 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-col lg:flex-row items-center bg-white rounded-3xl lg:rounded-full shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-2 lg:p-0">
            <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-slate-100 items-center">
              
              <div className="flex-1 w-full px-4 lg:px-8 py-3 lg:py-4 rounded-t-2xl lg:rounded-none lg:rounded-l-full hover:bg-slate-50 transition-colors duration-300">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">ΚΩΔΙΚΟΣ ΑΚΙΝΗΤΟΥ</label>
                <input 
                  type="text" 
                  placeholder="Πληκτρολογήστε..." 
                  className="w-full bg-transparent border-none outline-none text-slate-900 placeholder-slate-500 font-medium text-sm lg:text-base p-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex-1 w-full px-4 lg:px-6 py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Τυπος</label>
                <CustomSelect 
                  value={filterType}
                  onChange={setFilterType}
                  placeholder="Όλοι"
                  options={[
                    { value: 'Διαμέρισμα', label: 'Διαμέρισμα' },
                    { value: 'Ρετιρέ', label: 'Ρετιρέ' },
                    { value: 'Μονοκατοικία', label: 'Μονοκατοικία' },
                    { value: 'Οροφοδιαμέρισμα', label: 'Οροφοδιαμέρισμα' },
                    { value: 'Loft', label: 'Loft' },
                    { value: 'Studio', label: 'Studio' }
                  ]}
                />
              </div>

              <div className="flex-1 w-full px-4 lg:px-6 py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Τιμη</label>
                <CustomSelect 
                  value={maxPrice}
                  onChange={setMaxPrice}
                  placeholder="Οποιαδήποτε"
                  options={[
                    { value: '300000', label: 'Έως 300.000€' },
                    { value: '500000', label: 'Έως 500.000€' },
                    { value: '800000', label: 'Έως 800.000€' },
                    { value: '1000000', label: 'Έως 1.000.000€' },
                    { value: '1500000', label: 'Έως 1.500.000€' }
                  ]}
                />
              </div>

              <div className="flex-1 w-full px-4 lg:px-6 py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Δωματια</label>
                <CustomSelect 
                  value={minBedrooms}
                  onChange={setMinBedrooms}
                  placeholder="Οποιοδήποτε"
                  options={[
                    { value: '1', label: '1+' },
                    { value: '2', label: '2+' },
                    { value: '3', label: '3+' },
                    { value: '4', label: '4+' }
                  ]}
                />
              </div>

              <div className="flex-1 w-full px-4 lg:px-6 py-3 lg:py-4 relative hover:bg-slate-50 transition-colors duration-300">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Εμβαδον</label>
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
            <div className="w-full lg:w-auto p-2 lg:p-2 lg:pl-0 flex flex-row lg:flex-row justify-center lg:justify-end shrink-0 gap-2">
              <button 
                onClick={() => {
                  setAppliedFilters({ searchTerm, filterType, maxPrice, minBedrooms, sqftRange });
                  setIsMobileFiltersOpen(false);
                }}
                className="bg-black hover:bg-gold text-white font-semibold px-4 lg:px-6 py-3 lg:py-4 rounded-2xl lg:rounded-full transition-all w-1/2 lg:w-auto whitespace-nowrap lg:h-[60px] flex items-center justify-center"
              >
                Αναζήτηση
              </button>
              <button 
                onClick={() => { 
                  setFilterType(''); setMaxPrice(''); setMinBedrooms(''); setSqftRange(''); setSearchTerm(''); 
                  setAppliedFilters({ searchTerm: '', filterType: '', maxPrice: '', minBedrooms: '', sqftRange: '' });
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black font-semibold px-4 lg:px-6 py-3 lg:py-4 rounded-2xl lg:rounded-full transition-all w-1/2 lg:w-auto whitespace-nowrap lg:h-[60px] flex items-center justify-center"
              >
                Εκκαθάριση
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MapComponent properties={filteredProperties} />
          </motion.div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Δεν βρέθηκαν ακίνητα που να ταιριάζουν στα κριτήριά σας.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-black font-medium hover:underline"
            >
              Εκκαθάριση
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Properties;
