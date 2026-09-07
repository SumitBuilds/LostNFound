import React, { createContext, useState, useContext } from 'react';

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  return (
    <FiltersContext.Provider value={{ 
      searchTerm, setSearchTerm, 
      filterType, setFilterType,
      category, setCategory,
      status, setStatus
    }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    console.warn("useFilters used outside of FiltersProvider. Returning fallback.");
    return {
      searchTerm: '', setSearchTerm: () => {},
      filterType: 'all', setFilterType: () => {},
      category: 'all', setCategory: () => {},
      status: 'all', setStatus: () => {}
    };
  }
  return context;
};
