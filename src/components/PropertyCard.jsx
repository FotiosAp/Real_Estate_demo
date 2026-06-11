import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100/60"
    >
      <Link 
        to={`/property/${property.id}`} 
        onClick={() => sessionStorage.setItem('homeScroll', window.scrollY)}
        className="block h-full w-full"
      >
        <div className="relative overflow-hidden aspect-[16/9] sm:aspect-[4/3]">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transform"
          />
          <div className="absolute top-5 left-5 z-20 glass-panel px-4 py-1.5 rounded-full text-sm font-semibold text-slate-900">
            €{property.price.toLocaleString('el-GR')}
          </div>
          <div className="absolute top-5 right-5 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-white tracking-widest border border-white/10">
            #{property.code}
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-serif text-2xl font-semibold text-slate-900 group-hover:text-gold transition-colors duration-300">
              {property.title}
            </h3>
          </div>
          
          <div className="flex items-center text-slate-500 text-sm mb-6 font-medium">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-slate-400" />
            <span className="truncate">{property.location}</span>
          </div>
          
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 text-slate-600">
            <div className="flex items-center space-x-2">
              <Bed className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium">{property.bedrooms} <span className="hidden sm:inline">Υπν.</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <Bath className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium">{property.bathrooms} <span className="hidden sm:inline">Μπάνια</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <Square className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium">{property.sqft} τ.μ.</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
