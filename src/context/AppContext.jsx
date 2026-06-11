import React, { createContext, useState, useContext } from 'react';
import { initialProperties } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [inquiries, setInquiries] = useState([]);
  const [estimations, setEstimations] = useState([]);

  // Admin function: Add a new property
  const addProperty = (newProperty) => {
    setProperties((prev) => [{ ...newProperty, id: `prop-${Date.now()}` }, ...prev]);
  };

  // Client function: Submit an inquiry
  const addInquiry = (newInquiry) => {
    setInquiries((prev) => [{ ...newInquiry, id: `inq-${Date.now()}`, date: new Date().toISOString() }, ...prev]);
  };

  // Client function: Submit an estimation request
  const addEstimation = (newEstimation) => {
    setEstimations((prev) => [{ ...newEstimation, id: `est-${Date.now()}`, date: new Date().toISOString() }, ...prev]);
  };

  return (
    <AppContext.Provider value={{ properties, inquiries, estimations, addProperty, addInquiry, addEstimation }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
