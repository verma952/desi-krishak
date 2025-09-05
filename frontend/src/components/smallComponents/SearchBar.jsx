// src/components/smallComponents/SearchBar.js - Corrected with navigation

import React, { useState, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";
import SearchContext from "../context/SearchContext";
import { useNavigate } from "react-router-dom"; // ✅ 1. Import useNavigate

function SearchBar() { // Remove onSearch prop if it's not needed elsewhere
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate(); // ✅ 2. Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;

    // First, update the global state so the results page will have the query
    setSearchQuery(trimmed);

    // ✅ 3. Navigate to the search results page
    // Make sure you have a route like "/search" in your App.jsx
    navigate("/search");
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