import React, { useState, useEffect } from 'react';
import AphorismList from './components/AphorismList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import RandomButton from './components/RandomButton';
import AddAphorismModal from './components/AddAphorismModal';
import AphorismDetail from './components/AphorismDetail';

function App() {
  const [aphorisms, setAphorisms] = useState([]);
  const [filteredAphorisms, setFilteredAphorisms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAphorism, setSelectedAphorism] = useState(null);

  // Load aphorisms from localStorage or fallback to the JSON file
  useEffect(() => {
    const storedAphorisms = localStorage.getItem("aphorisms");
    if (storedAphorisms) {
      const parsedAphorisms = JSON.parse(storedAphorisms);
      setAphorisms(parsedAphorisms);
      setFilteredAphorisms(parsedAphorisms);
    } else {
      fetch('/aphorisms.json')
        .then((response) => response.json())
        .then((data) => {
          setAphorisms(data);
          setFilteredAphorisms(data);
          localStorage.setItem("aphorisms", JSON.stringify(data));
        })
        .catch((error) => console.error('Error fetching aphorisms:', error));
    }
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

  // Function to add a new aphorism and update localStorage
  const addAphorism = (newAphorism) => {
    newAphorism.id = aphorisms.length ? aphorisms[aphorisms.length - 1].id + 1 : 1;
    const updatedAphorisms = [...aphorisms, newAphorism];
    setAphorisms(updatedAphorisms);
    localStorage.setItem("aphorisms", JSON.stringify(updatedAphorisms));
    setShowAddModal(false);
  };

  // Function to pick and show a random aphorism
  const handleRandom = () => {
    if (aphorisms.length === 0) return;
    const randomIndex = Math.floor(Math.random() * aphorisms.length);
    setSelectedAphorism(aphorisms[randomIndex]);
  };

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

