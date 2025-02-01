import React from 'react';

/**
 * SearchBar allows the user to filter aphorisms by a keyword.
 */
function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search aphorisms..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '5px', width: '300px' }}
      />
    </div>
  );
}

export default SearchBar;
