import React, { useState } from "react";
import axios from "axios";
import "./Search.css"; // Import the external CSS file

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {result && (
        <div className="result-container">
          <h2 className="canonical-name">{result.canonicalName}</h2>
          <p className="variations">
            <strong>Variations:</strong> {result.variations.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;