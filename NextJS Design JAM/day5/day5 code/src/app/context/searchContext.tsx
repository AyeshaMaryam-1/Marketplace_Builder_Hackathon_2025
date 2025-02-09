"use client"

import { createContext, useContext, useState } from "react";

// Create Context
const SearchContext = createContext({
  searchQuery: "",
  setSearchQuery: (query: string) => {},
});

// Provider Component
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook for easy access
export const useSearch = () => useContext(SearchContext);
