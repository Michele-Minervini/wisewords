import React from 'react';

/**
 * FilterBar displays categories (tags) and allows filtering of aphorisms.
 */
function FilterBar({ aphorisms, selectedCategory, setSelectedCategory }) {
  // Create a set of unique categories from the aphorism data
  const categories = Array.from(new Set(aphorisms.flatMap(a => a.categories)));
  
  return (
    <div className="filter-bar">
      <span>Filter by Category:</span>
      <button
        onClick={() => setSelectedCategory('')}
        style={{
          margin: '0 5px',
          background: selectedCategory === '' ? '#ccc' : '#f0f0f0'
        }}
      >
        All
      </button>
      {categories.map((cat, index) => (
        <button
          key={index}
          onClick={() => setSelectedCategory(cat)}
          style={{
            margin: '0 5px',
            background: selectedCategory === cat ? '#ccc' : '#f0f0f0'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
