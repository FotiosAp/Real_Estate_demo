import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to recenter map when properties change
const RecenterMap = ({ properties }) => {
  const map = useMap();
  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => p.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);
  return null;
};

const MapComponent = ({ properties }) => {
  // Default center to Greece
  const defaultCenter = [38.2749, 23.8103];

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={6} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {properties.map((property) => (
          <Marker key={property.id} position={property.coordinates}>
            <Popup className="custom-popup">
              <div className="w-48">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-32 object-cover rounded-t-lg mb-2"
                />
                <div className="px-2 pb-2">
                  <h4 className="font-semibold text-slate-900 truncate">{property.title}</h4>
                  <p className="text-black font-medium mb-2">€{property.price.toLocaleString('el-GR')}</p>
                  <Link 
                    to={`/property/${property.id}`}
                    className="block w-full text-center bg-white text-black border border-black py-1.5 rounded-md text-sm hover:bg-slate-50 transition-colors font-medium"
                  >
                    Προβολή Ακινήτου
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <RecenterMap properties={properties} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
