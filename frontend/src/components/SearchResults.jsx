// src/components/SearchResults.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchContext from './context/SearchContext'; // Import the context
import ProductList from './ProductList';
import Loader from './smallComponents/Loader';
import './SearchResults.css'; // Add some simple styling

const API_URL = import.meta.env.VITE_API_URL;

function SearchResults() {
  // Get the search query from the global context
  const { searchQuery } = useContext(SearchContext);
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This effect runs whenever the searchQuery changes
  useEffect(() => {
    if (!searchQuery) {
      setLoading(false);
      return; // Don't search if the query is empty
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use our smart backend API to search for products
        const response = await axios.get(`${API_URL}/api/products`, {
          params: { search: searchQuery }
        });
        setResults(response.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Could not load search results. Please try again. / खोज परिणाम लोड नहीं हो सके। कृपया पुन: प्रयास करें।");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]); // Dependency array ensures this runs when a new search is made

  return (
    <div className="search-results-page">
      <h2 className="search-results-title">
        {searchQuery 
          ? `Results for: "${searchQuery}" / "${searchQuery}" के लिए परिणाम` 
          : "Please enter a search term / कृपया एक खोज शब्द दर्ज करें"
        }
      </h2>

      {loading && <Loader />}
      {error && <p className="info-message error">{error}</p>}
      {!loading && !error && (
        results.length > 0
          ? <ProductList products={results} />
          : <p className="info-message">No products found matching your search. / आपकी खोज से मेल खाने वाले कोई उत्पाद नहीं मिले।</p>
      )}
    </div>
  );
}

export default SearchResults;