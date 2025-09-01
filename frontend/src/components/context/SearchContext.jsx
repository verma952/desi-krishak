// src/components/context/SearchContext.jsx

import React, { createContext, useState } from "react";

const SearchContext = createContext();

// ✅ Make sure this "export" keyword is present!
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;