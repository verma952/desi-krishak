// src/components/smallComponents/SearchBar.js - Corrected

import React, { useState, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";
import SearchContext from "../context/SearchContext";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useContext(SearchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;
    setSearchQuery(trimmed);

    if (typeof onSearch === "function") {
      onSearch(trimmed);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search for cattle, grains..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button" aria-label="Search">
       <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;