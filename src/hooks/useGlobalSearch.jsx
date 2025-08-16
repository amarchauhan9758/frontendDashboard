import { useState, useContext, createContext } from "react";

// Create context
const SearchContext = createContext();

// Hook to provide search state globally
export const useGlobalSearch = () => {
  return useContext(SearchContext);
};

// Provider component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearch = (term) => setSearchTerm(term);

  return (
    <SearchContext.Provider value={{ searchTerm, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
