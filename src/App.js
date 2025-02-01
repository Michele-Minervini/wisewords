import React, { useState, useEffect } from 'react';
import AphorismList from './components/AphorismList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import RandomButton from './components/RandomButton';
import AddAphorismModal from './components/AddAphorismModal';
import AphorismDetail from './components/AphorismDetail';

/**
 * App component is the main container for the WiseWords application.
 */
function App() {
  // State for all aphorisms loaded from the JSON file
  const [aphorisms, setAphorisms] = useState([]);
  // State for the list of aphorisms after filtering/searching
  const [filteredAphorisms, setFilteredAphorisms] = useState([]);
  // State for the current search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for the selected category filter
  const [selectedCategory, setSelectedCategory] = useState('');
  // State for toggling the "Add New Aphorism" modal
  const [showAddModal, setShowAddModal] = useState(false);
  // State for showing the detail view of an aphorism
  const [selectedAphorism, setSelectedAphorism] = useState(null);

  // Fetch aphorisms from the static JSON file when the component mounts
  useEffect(() => {
    fetch('/aphorisms.json')
      .then((response) => response.json())
      .then((data) => {
        setAphorisms(data);
        setFilteredAphorisms(data);
      })
      .catch((error) => console.error('Error fetching aphorisms:', error));
  }, []);

  // Update filtered aphorisms when search query or category changes
  useEffect(() => {
    let filtered = aphorisms;
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(a => a.categories.includes(selectedCategory));
    }
    setFilteredAphorisms(filtered);
  }, [searchQuery, selectedCategory, aphorisms]);

  // Function to add a new aphorism (client-side only)
  const addAphorism = (newAphorism) => {
    // In this demo, assign a new id manually.
    newAphorism.id = aphorisms.length ? aphorisms[aphorisms.length - 1].id + 1 : 1;
    const updatedAphorisms = [...aphorisms, newAphorism];
    setAphorisms(updatedAphorisms);
    setShowAddModal(false);
  };

  // Function to pick and show a random aphorism
  const handleRandom = () => {
    if (aphorisms.length === 0) return;
    const randomIndex = Math.floor(Math.random() * aphorisms.length);
    setSelectedAphorism(aphorisms[randomIndex]);
  };

  // Function to close the detail modal
  const closeDetailModal = () => {
    setSelectedAphorism(null);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>WiseWords</h1>
        <div className="header-buttons">
          <RandomButton onClick={handleRandom} />
          <button onClick={() => setShowAddModal(true)} className="add-button">+</button>
        </div>
      </header>
      <div className="controls">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterBar
          aphorisms={aphorisms}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <AphorismList
        aphorisms={filteredAphorisms}
        onAphorismClick={(aphorism) => setSelectedAphorism(aphorism)}
      />
      {showAddModal && (
        <AddAphorismModal
          onClose={() => setShowAddModal(false)}
          onAdd={addAphorism}
        />
      )}
      {selectedAphorism && (
        <AphorismDetail
          aphorism={selectedAphorism}
          onClose={closeDetailModal}
        />
      )}
    </div>
  );
}

export default App;
