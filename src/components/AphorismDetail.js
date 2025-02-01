import React from 'react';

/**
 * AphorismDetail displays detailed information about an aphorism.
 */
function AphorismDetail({ aphorism, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>Aphorism Detail</h2>
        <p><strong>Text:</strong> {aphorism.text}</p>
        <p><strong>Author:</strong> {aphorism.author}</p>
        <p><strong>Source:</strong> {aphorism.source}</p>
        <p><strong>Date:</strong> {aphorism.date}</p>
        <p><strong>Categories:</strong> {aphorism.categories.join(', ')}</p>
        {/* Future enhancement: Add comments/annotations here */}
      </div>
    </div>
  );
}

export default AphorismDetail;
