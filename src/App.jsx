import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import AdminDashboard from './pages/AdminDashboard';
import Estimation from './pages/Estimation';

function App() {
  const location = useLocation();
  const isEstimationPage = location.pathname === '/estimation';

  return (
    <div className="flex flex-col min-h-screen relative w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/estimation" element={<Estimation />} />
        </Routes>
      </main>
      {!isEstimationPage && <Footer />}
    </div>
  );
}

export default App;
