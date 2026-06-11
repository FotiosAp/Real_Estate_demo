import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Inbox, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
  const { inquiries, estimations, addProperty } = useAppContext();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    image: '',
    description: ''
  });

  const [publishStatus, setPublishStatus] = useState('idle');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    setPublishStatus('publishing');
    
    setTimeout(() => {
      addProperty({
        id: `prop-${Date.now()}`,
        title: formData.title,
        price: parseInt(formData.price, 10),
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms, 10),
        bathrooms: parseInt(formData.bathrooms, 10),
        sqft: parseInt(formData.sqft, 10),
        images: formData.image ? formData.image.split(',').map(s => s.trim()) : [
          "/images/living_room.png",
          "/images/bedroom.png",
          "/images/kitchen.png",
          "/images/bathroom.png",
          "/images/balcony.png"
        ],
        coordinates: [37.9838, 23.7275], // Default Athens center for mock
        description: formData.description || 'Ένα υπέροχο νέο ακίνητο.',
        features: ['Νέα Καταχώρηση', 'Εξαιρετική Τοποθεσία']
      });
      setPublishStatus('success');
      
      setTimeout(() => {
        setFormData({ title: '', price: '', location: '', bedrooms: '', bathrooms: '', sqft: '', image: '', description: '' });
        setPublishStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2 flex items-center">
            <Settings className="h-8 w-8 mr-3 text-black" />
            Πίνακας Ελέγχου Διαχειριστή
          </h1>
          <p className="text-slate-500">Διαχειριστείτε τα ακίνητα και τις εκδηλώσεις ενδιαφέροντος των πελατών σας.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inbox Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                  <Inbox className="h-5 w-5 mr-2 text-slate-500" />
                  Εισερχόμενα Μηνύματα
                </h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveTab('inquiries')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'inquiries' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    Ερωτήματα ({inquiries.length})
                  </button>
                  <button 
                    onClick={() => setActiveTab('estimations')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'estimations' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    Εκτιμήσεις ({estimations ? estimations.length : 0})
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {activeTab === 'inquiries' ? (
                  inquiries.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                      <p>Δεν υπάρχουν νέα μηνύματα.</p>
                      <p className="text-sm mt-1">Όταν οι πελάτες εκδηλώνουν ενδιαφέρον, τα μηνύματά τους θα εμφανίζονται εδώ.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                            <th className="px-6 py-4">Στοιχεία Πελάτη</th>
                            <th className="px-6 py-4">Ακίνητο Ενδιαφέροντος</th>
                            <th className="px-6 py-4">Μήνυμα</th>
                            <th className="px-6 py-4">Ημερομηνία</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {inquiries.map(inquiry => (
                            <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="font-medium text-slate-900">{inquiry.name}</div>
                                <div className="text-xs text-slate-500">{inquiry.email}</div>
                                <div className="text-xs text-slate-500">{inquiry.phone}</div>
                              </td>
                              <td className="px-6 py-4 font-medium">{inquiry.propertyTitle}</td>
                              <td className="px-6 py-4 max-w-xs truncate" title={inquiry.message}>{inquiry.message}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{new Date(inquiry.date).toLocaleDateString('el-GR')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                ) : (
                  (!estimations || estimations.length === 0) ? (
                    <div className="p-12 text-center text-slate-500">
                      <p>Δεν υπάρχουν νέα αιτήματα εκτίμησης.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                            <th className="px-6 py-4">Στοιχεία Πελάτη</th>
                            <th className="px-6 py-4">Τύπος</th>
                            <th className="px-6 py-4">Λεπτομέρειες</th>
                            <th className="px-6 py-4">Ημερομηνία</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {estimations.map(est => (
                            <tr key={est.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="font-medium text-slate-900">{est.name}</div>
                                <div className="text-xs text-slate-500">{est.email}</div>
                                <div className="text-xs text-slate-500">{est.phone}</div>
                              </td>
                              <td className="px-6 py-4 font-medium capitalize">
                                {est.propertyType === 'apartment' ? 'Διαμέρισμα' : 
                                 est.propertyType === 'house' ? 'Μονοκατοικία' : 
                                 est.propertyType === 'villa' ? 'Βίλα' : 
                                 est.propertyType === 'commercial' ? 'Επαγγελματικό' : 
                                 est.propertyType === 'land' ? 'Οικόπεδο' : est.propertyType}
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-medium">{est.location}</div>
                                <div className="text-xs text-slate-500">{est.sqft ? `${est.sqft} τ.μ.` : '-'} {est.yearBuilt ? ` | ${est.yearBuilt}` : ''}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">{new Date(est.date).toLocaleDateString('el-GR')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Add Property Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-28">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                  <PlusCircle className="h-5 w-5 mr-2 text-slate-500" />
                  Καταχώρηση Νέου Ακινήτου
                </h2>
                <p className="text-sm text-slate-500 mt-1">Συμπληρώστε τα παρακάτω στοιχεία. Το ακίνητο θα δημοσιευτεί άμεσα.</p>
              </div>

              <div className="p-6">
                {publishStatus === 'success' ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">Το ακίνητο δημοσιεύτηκε επιτυχώς!</h3>
                    <p className="text-sm text-slate-500 mt-2">Επιστροφή στη φόρμα...</p>
                  </div>
                ) : (
                  <form onSubmit={handlePublish} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Τίτλος Ακινήτου</label>
                      <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="π.χ. Πολυτελές Ρετιρέ" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Τιμή (€)</label>
                        <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="1000000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Τοποθεσία</label>
                        <input required type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" placeholder="Κολωνάκι, Αθήνα" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Υπνοδωμάτια</label>
                        <input required type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Μπάνια</label>
                        <input required type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Τ.Μ.</label>
                        <input required type="number" name="sqft" value={formData.sqft} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Σύνδεσμοι Φωτογραφιών (χωρισμένοι με κόμμα)</label>
                      <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm" placeholder="https://..., https://..." />
                      <p className="text-xs text-slate-500 mt-1">Αφήστε κενό για να χρησιμοποιηθούν αυτόματα οι προεπιλεγμένες επαγγελματικές φωτογραφίες.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Περιγραφή</label>
                      <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border rounded-md resize-none"></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={publishStatus === 'publishing'}
                      className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-slate-800 transition-colors disabled:bg-slate-400"
                    >
                      {publishStatus === 'publishing' ? 'Δημοσίευση...' : 'Δημοσίευση Ακινήτου'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
