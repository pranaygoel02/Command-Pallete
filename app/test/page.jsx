'use client'
import React, { useState } from 'react';
import './YourComponent.css'; // Import your component-specific CSS file

const Page = () => {
  const [searchResults, setSearchResults] = useState([
    'Item 1',
    'Item 2',
  ]);

  const handleSearch = (query) => {
    // Perform your search logic and update the searchResults state
    // For simplicity, here we just filter items based on a substring match
    const filteredResults = ['Item 1', 'Item 2', 'Item 3'].filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="container" style={{ height: `${searchResults.length * 40}px` }}>
        <ul>
          {searchResults.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
