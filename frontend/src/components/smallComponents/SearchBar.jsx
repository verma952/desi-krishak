import React, { useState, useContext } from "react";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";
import SearchContext from "../context/SearchContext"; // ✅ correct default import

function SearchBar({ onSearch }) {          // onSearch is now optional
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useContext(SearchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;

    // update global state
    setSearchQuery(trimmed);

    // call onSearch ONLY if it exists and is a function
    if (typeof onSearch === "function") {
      onSearch(trimmed);
    }
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button><BsSearch /></button>
    </form>
  );
}

export default SearchBar;
