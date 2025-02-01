import React, { useState } from 'react';

/**
 * AddAphorismModal displays a form to add a new aphorism.
 * For persistent storage, additional backend integration is required.
 */
function AddAphorismModal({ onClose, onAdd }) {
  // Local state for each form field
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [categories, setCategories] = useState('');
  const [date, setDate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAphorism = {
      text,
      author,
      source,
      // Split comma-separated categories and trim whitespace
      categories: categories.split(',').map(cat => cat.trim()).filter(cat => cat !== ''),
      date
    };
    onAdd(newAphorism);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>Add New Aphorism</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Aphorism Text:</label>
            <br />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{ width: '100%', height: '80px' }}
            />
          </div>
          <div>
            <label>Author:</label>
            <br />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Source:</label>
            <br />
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Categories (comma separated):</label>
            <br />
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Date:</label>
            <br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button type="submit" style={{ padding: '5px 10px' }}>
            Add Aphorism
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAphorismModal;
