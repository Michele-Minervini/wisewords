import React from 'react';

/**
 * AphorismCard displays a summary view of an aphorism.
 * Clicking the card triggers a callback for a detailed view.
 */
function AphorismCard({ aphorism, onClick }) {
  return (
    <div
      className="aphorism-card"
      onClick={() => onClick(aphorism)}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      <p><strong>{aphorism.text}</strong></p>
      <p>- {aphorism.author}</p>
      <p><em>{aphorism.source}</em></p>
      <div>
        {aphorism.categories.map((cat, index) => (
          <span
            key={index}
            style={{
              marginRight: '5px',
              background: '#f0f0f0',
              padding: '2px 5px',
              borderRadius: '3px'
            }}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AphorismCard;
